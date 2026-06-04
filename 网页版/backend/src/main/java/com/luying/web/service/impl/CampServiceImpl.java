package com.luying.web.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.luying.web.common.result.PageResult;
import com.luying.web.entity.RecentlyViewed;
import com.luying.web.entity.Camp;
import com.luying.web.entity.CampFacility;
import com.luying.web.mapper.CampFacilityMapper;
import com.luying.web.mapper.CampMapper;
import com.luying.web.mapper.RecentlyViewedMapper;
import com.luying.web.mapper.ReviewMapper;
import com.luying.web.service.CampService;
import com.luying.web.support.CurrentUserSupport;
import com.luying.web.util.JsonArrayUtils;
import com.luying.web.vo.camp.CampCardVO;
import com.luying.web.vo.camp.CampDetailVO;
import com.luying.web.vo.camp.FacilityVO;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class CampServiceImpl implements CampService {

    private final CampMapper campMapper;
    private final CampFacilityMapper campFacilityMapper;
    private final ReviewMapper reviewMapper;
    private final RecentlyViewedMapper recentlyViewedMapper;
    private final CurrentUserSupport currentUserSupport;
    private final JsonArrayUtils jsonArrayUtils;

    public CampServiceImpl(
            CampMapper campMapper,
            CampFacilityMapper campFacilityMapper,
            ReviewMapper reviewMapper,
            RecentlyViewedMapper recentlyViewedMapper,
            CurrentUserSupport currentUserSupport,
            JsonArrayUtils jsonArrayUtils
    ) {
        this.campMapper = campMapper;
        this.campFacilityMapper = campFacilityMapper;
        this.reviewMapper = reviewMapper;
        this.recentlyViewedMapper = recentlyViewedMapper;
        this.currentUserSupport = currentUserSupport;
        this.jsonArrayUtils = jsonArrayUtils;
    }

    @Override
    public PageResult<CampCardVO> list(
            String keyword,
            String city,
            String locationText,
            Double latitude,
            Double longitude,
            Integer radiusKm,
            String sortBy
    ) {
        String locationTerm = normalizeLocation(locationText);
        LambdaQueryWrapper<Camp> query = new LambdaQueryWrapper<Camp>()
                .eq(city != null && !city.isBlank(), Camp::getCity, city)
                .and(keyword != null && !keyword.isBlank(), wrapper -> wrapper
                        .like(Camp::getName, keyword)
                        .or()
                        .like(Camp::getSummary, keyword)
                        .or()
                        .like(Camp::getDistrict, keyword)
                        .or()
                        .like(Camp::getCampType, keyword))
                .and(locationTerm != null && !locationTerm.isBlank(), wrapper -> wrapper
                        .like(Camp::getCity, locationTerm)
                        .or()
                        .like(Camp::getDistrict, locationTerm)
                        .or()
                        .like(Camp::getAddress, locationTerm))
                .orderByDesc(Camp::getUpdatedAt)
                .orderByDesc(Camp::getId);

        int effectiveRadius = radiusKm == null || radiusKm <= 0 ? 80 : radiusKm;
        List<CampCardVO> items = campMapper.selectList(query).stream()
                .map(camp -> toCampCard(camp, latitude, longitude))
                .filter(item -> item.getDistanceKm() == null || item.getDistanceKm() <= effectiveRadius)
                .sorted(buildComparator(sortBy))
                .toList();

        return PageResult.<CampCardVO>builder()
                .total((long) items.size())
                .pageNum(1L)
                .pageSize(10L)
                .list(items)
                .build();
    }

    @Override
    public CampDetailVO detail(String slug) {
        Camp camp = campMapper.selectOne(new LambdaQueryWrapper<Camp>().eq(Camp::getSlug, slug).last("LIMIT 1"));
        if (camp == null) {
            return null;
        }

        CampFacility facility = loadFacility(camp.getId());
        List<String> suitableFor = jsonArrayUtils.readStringList(camp.getSuitableForJson());
        List<String> rules = jsonArrayUtils.readStringList(camp.getRulesJson());

        return CampDetailVO.builder()
                .id(camp.getId())
                .slug(camp.getSlug())
                .name(camp.getName())
                .province(camp.getProvince())
                .city(camp.getCity())
                .district(camp.getDistrict())
                .address(camp.getAddress())
                .campType(camp.getCampType())
                .coverImage(camp.getCoverImage())
                .gallery(jsonArrayUtils.readStringList(camp.getGalleryJson()))
                .priceType(camp.getPriceType())
                .priceMin(camp.getPriceMin())
                .priceMax(camp.getPriceMax())
                .bookingRequired(Boolean.TRUE.equals(camp.getBookingRequired()))
                .openingStatus(camp.getOpeningStatus())
                .sourceType(camp.getSourceType())
                .bestSeason(camp.getBestSeason())
                .arrivalTips(camp.getArrivalTips())
                .riskTips(camp.getRiskTips())
                .summary(camp.getSummary())
                .suitableFor(suitableFor)
                .rules(rules)
                .tags(buildTags(camp, facility, suitableFor))
                .facility(toFacilityVO(facility))
                .score(scoreOf(camp.getId()))
                .build();
    }

    @Override
    public List<Map<String, Object>> reviews(String slug) {
        return reviewMapper.selectByCampSlug(slug).stream()
                .filter(item -> Objects.equals(item.getStatus(), "APPROVED"))
                .map(item -> Map.<String, Object>of(
                        "id", item.getId(),
                        "author", item.getAuthor(),
                        "overallScore", item.getOverallScore(),
                        "content", item.getContent(),
                        "status", item.getStatus(),
                        "visitDate", item.getVisitDate() == null ? "" : item.getVisitDate().toString(),
                        "tags", List.of("真实到访", "结构化评价")
                ))
                .collect(Collectors.toList());
    }

    @Override
    public List<CampCardVO> similar(String slug) {
        Camp current = campMapper.selectOne(new LambdaQueryWrapper<Camp>().eq(Camp::getSlug, slug).last("LIMIT 1"));
        if (current == null) {
            return List.of();
        }

        return campMapper.selectList(new LambdaQueryWrapper<Camp>()
                        .ne(Camp::getSlug, slug)
                        .and(wrapper -> wrapper.eq(Camp::getCity, current.getCity()).or().eq(Camp::getCampType, current.getCampType()))
                        .last("LIMIT 3"))
                .stream()
                .map(this::toCampCard)
                .sorted(Comparator.comparing(CampCardVO::getScore).reversed())
                .toList();
    }

    @Override
    public List<CampCardVO> compare(List<String> slugs) {
        List<Camp> camps;
        if (slugs == null || slugs.isEmpty()) {
            camps = campMapper.selectList(new LambdaQueryWrapper<Camp>().last("LIMIT 4"));
        } else {
            camps = campMapper.selectList(new LambdaQueryWrapper<Camp>().in(Camp::getSlug, slugs));
        }
        return camps.stream()
                .map(this::toCampCard)
                .sorted(Comparator.comparing(CampCardVO::getScore).reversed())
                .toList();
    }

    @Override
    public void recordView(String authorization, String slug) {
        Camp camp = campMapper.selectOne(new LambdaQueryWrapper<Camp>().eq(Camp::getSlug, slug).last("LIMIT 1"));
        if (camp == null) {
            return;
        }
        Long userId = currentUserSupport.requireUser(authorization).getId();
        recentlyViewedMapper.delete(new LambdaQueryWrapper<RecentlyViewed>()
                .eq(RecentlyViewed::getUserId, userId)
                .eq(RecentlyViewed::getCampId, camp.getId()));
        RecentlyViewed viewed = new RecentlyViewed();
        viewed.setUserId(userId);
        viewed.setCampId(camp.getId());
        recentlyViewedMapper.insert(viewed);
    }

    private CampCardVO toCampCard(Camp camp) {
        return toCampCard(camp, null, null);
    }

    public CampCardVO toCampCardPublic(Camp camp) {
        return toCampCard(camp, null, null);
    }

    private CampCardVO toCampCard(Camp camp, Double latitude, Double longitude) {
        CampCardVO card = new CampCardVO();
        card.setId(camp.getId());
        card.setSlug(camp.getSlug());
        card.setName(camp.getName());
        card.setCity(camp.getCity());
        card.setDistrict(camp.getDistrict());
        card.setSummary(camp.getSummary());
        card.setPriceText(buildPriceText(camp));
        card.setScore(scoreOf(camp.getId()));
        card.setDistanceKm(calculateDistance(latitude, longitude, camp.getLatitude(), camp.getLongitude()));
        return card;
    }

    private CampFacility loadFacility(Long campId) {
        CampFacility facility = campFacilityMapper.selectOne(
                new LambdaQueryWrapper<CampFacility>().eq(CampFacility::getCampId, campId).last("LIMIT 1")
        );
        return facility == null ? new CampFacility() : facility;
    }

    private FacilityVO toFacilityVO(CampFacility facility) {
        return FacilityVO.builder()
                .hasToilet(Boolean.TRUE.equals(facility.getHasToilet()))
                .hasShower(Boolean.TRUE.equals(facility.getHasShower()))
                .hasPower(Boolean.TRUE.equals(facility.getHasPower()))
                .hasWater(Boolean.TRUE.equals(facility.getHasWater()))
                .allowFire(Boolean.TRUE.equals(facility.getAllowFire()))
                .canOvernight(Boolean.TRUE.equals(facility.getCanOvernight()))
                .petFriendly(Boolean.TRUE.equals(facility.getPetFriendly()))
                .familyFriendly(Boolean.TRUE.equals(facility.getFamilyFriendly()))
                .carAccessible(Boolean.TRUE.equals(facility.getCarAccessible()))
                .signalStrength(facility.getSignalStrength())
                .roadCondition(facility.getRoadCondition())
                .parkingDistance(facility.getParkingDistance())
                .build();
    }

    private List<String> buildTags(Camp camp, CampFacility facility, List<String> suitableFor) {
        List<String> tags = new ArrayList<>();
        tags.add(camp.getCampType());
        if (Boolean.TRUE.equals(facility.getCanOvernight())) {
            tags.add("可过夜");
        }
        if (Boolean.TRUE.equals(facility.getAllowFire())) {
            tags.add("可明火");
        }
        if (Boolean.TRUE.equals(facility.getFamilyFriendly())) {
            tags.add("亲子友好");
        }
        if (Boolean.TRUE.equals(facility.getPetFriendly())) {
            tags.add("宠物友好");
        }
        if (suitableFor.stream().anyMatch(item -> item.contains("新手"))) {
            tags.add("新手友好");
        }
        return tags.stream().distinct().toList();
    }

    private Double scoreOf(Long campId) {
        Double score = reviewMapper.selectAverageScoreByCampId(campId);
        return score == null ? 0D : score;
    }

    private String buildPriceText(Camp camp) {
        if (camp.getPriceMin() == null && camp.getPriceMax() == null) {
            return "价格待确认";
        }
        return "¥" + camp.getPriceMin() + " - ¥" + camp.getPriceMax();
    }

    private String normalizeLocation(String location) {
        if (location == null || location.isBlank()) {
            return location;
        }
        List<String> supportedCities = List.of("杭州", "苏州", "成都");
        for (String city : supportedCities) {
            if (location.contains(city)) {
                return city;
            }
        }
        return location;
    }

    private Comparator<CampCardVO> buildComparator(String sortBy) {
        if ("distance".equalsIgnoreCase(sortBy)) {
            return Comparator.comparing(item -> item.getDistanceKm() == null ? Double.MAX_VALUE : item.getDistanceKm());
        }
        if ("newbie".equalsIgnoreCase(sortBy)) {
            return Comparator.comparing((CampCardVO item) -> item.getSummary() != null && item.getSummary().contains("第一次") ? 1 : 0)
                    .reversed()
                    .thenComparing(CampCardVO::getScore, Comparator.reverseOrder());
        }
        if ("hot".equalsIgnoreCase(sortBy)) {
            return Comparator.comparing(CampCardVO::getScore, Comparator.reverseOrder())
                    .thenComparing(CampCardVO::getId, Comparator.reverseOrder());
        }
        return Comparator.comparing(CampCardVO::getScore, Comparator.reverseOrder());
    }

    private Double calculateDistance(Double latitude, Double longitude, BigDecimal campLatitude, BigDecimal campLongitude) {
        if (latitude == null || longitude == null || campLatitude == null || campLongitude == null) {
            return null;
        }
        double lat1 = Math.toRadians(latitude);
        double lon1 = Math.toRadians(longitude);
        double lat2 = Math.toRadians(campLatitude.doubleValue());
        double lon2 = Math.toRadians(campLongitude.doubleValue());
        double deltaLat = lat2 - lat1;
        double deltaLon = lon2 - lon1;
        double a = Math.pow(Math.sin(deltaLat / 2), 2)
                + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return Math.round(6371 * c * 10.0) / 10.0;
    }
}
