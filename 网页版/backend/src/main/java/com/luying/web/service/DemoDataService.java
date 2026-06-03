package com.luying.web.service;

import com.luying.web.vo.camp.CampCardVO;
import com.luying.web.vo.camp.CampDetailVO;
import com.luying.web.vo.camp.FacilityVO;
import com.luying.web.vo.guide.GuideDetailVO;
import com.luying.web.vo.guide.GuideVO;
import com.luying.web.vo.review.ReviewVO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class DemoDataService {

    private final List<CampDetailVO> camps;
    private final List<GuideDetailVO> guides;
    private final List<ReviewVO> reviews;

    public DemoDataService() {
        camps = List.of(
                CampDetailVO.builder()
                        .id(1L)
                        .slug("hangzhou-lake-breeze")
                        .name("湖风松坡营地")
                        .province("浙江省")
                        .city("杭州")
                        .district("临安")
                        .address("临安区天目山脚下湖风松坡营地")
                        .campType("湖边营地")
                        .coverImage("/camp/camp-1.jpg")
                        .gallery(List.of("/camp/camp-1.jpg", "/camp/camp-2.jpg"))
                        .priceType("收费营地")
                        .priceMin(198)
                        .priceMax(398)
                        .bookingRequired(true)
                        .openingStatus("OPEN")
                        .sourceType("EDITORIAL")
                        .bestSeason("春秋最佳")
                        .arrivalTips("导航到游客中心后继续前行 800 米。")
                        .riskTips("雨后土路稍滑，夜间温差较大。")
                        .summary("湖边视野开阔，设施齐整，适合第一次带家人出发。")
                        .suitableFor(List.of("新手家庭", "周末轻露营", "拍照党"))
                        .rules(List.of("22:30 后控制音量", "明火需在指定区域"))
                        .tags(List.of("新手友好", "亲子露营", "可过夜", "湖边风景"))
                        .facility(FacilityVO.builder()
                                .hasToilet(true).hasShower(true).hasPower(true).hasWater(true)
                                .allowFire(true).canOvernight(true).petFriendly(true).familyFriendly(true)
                                .carAccessible(true).signalStrength("4G 稳定")
                                .roadCondition("全程铺装路，最后 300 米缓坡")
                                .parkingDistance("车可停到营位旁 20 米")
                                .build())
                        .score(4.8)
                        .build(),
                CampDetailVO.builder()
                        .id(2L)
                        .slug("suzhou-lake-pier")
                        .name("太湖栈桥营地")
                        .province("江苏省")
                        .city("苏州")
                        .district("吴中")
                        .address("吴中区太湖边栈桥营地")
                        .campType("湖边营地")
                        .coverImage("/camp/camp-2.jpg")
                        .gallery(List.of("/camp/camp-2.jpg", "/camp/camp-3.jpg"))
                        .priceType("收费营地")
                        .priceMin(168)
                        .priceMax(298)
                        .bookingRequired(true)
                        .openingStatus("OPEN")
                        .sourceType("OFFICIAL")
                        .bestSeason("春秋最佳")
                        .arrivalTips("西门进更近，日落位靠湖边木栈道。")
                        .riskTips("节假日停车等待时间长。")
                        .summary("城市周边最省心的湖边营地之一，照片出片且设施稳定。")
                        .suitableFor(List.of("亲子", "拍照", "第一次露营"))
                        .rules(List.of("晚 10 点后不可外放音响"))
                        .tags(List.of("新手友好", "亲子露营", "湖边风景", "拍照出片"))
                        .facility(FacilityVO.builder()
                                .hasToilet(true).hasShower(true).hasPower(true).hasWater(true)
                                .allowFire(false).canOvernight(true).petFriendly(true).familyFriendly(true)
                                .carAccessible(true).signalStrength("5G 稳定")
                                .roadCondition("导航直达").parkingDistance("步行 20 米")
                                .build())
                        .score(4.7)
                        .build(),
                CampDetailVO.builder()
                        .id(3L)
                        .slug("chengdu-cloud-lake")
                        .name("云湖牧歌营地")
                        .province("四川省")
                        .city("成都")
                        .district("邛崃")
                        .address("邛崃市云湖牧歌营地")
                        .campType("湖边营地")
                        .coverImage("/camp/camp-3.jpg")
                        .gallery(List.of("/camp/camp-3.jpg", "/camp/camp-4.jpg"))
                        .priceType("收费营地")
                        .priceMin(168)
                        .priceMax(328)
                        .bookingRequired(true)
                        .openingStatus("OPEN")
                        .sourceType("OFFICIAL")
                        .bestSeason("春秋")
                        .arrivalTips("节假日建议中午前到。")
                        .riskTips("午后紫外线较强，遮阳要足。")
                        .summary("景观和设施平衡得很好，是成都周边很稳的一类营地。")
                        .suitableFor(List.of("亲子", "烧烤", "新手"))
                        .rules(List.of("烧烤区域需按营地引导使用"))
                        .tags(List.of("新手友好", "可过夜", "可明火", "湖边风景"))
                        .facility(FacilityVO.builder()
                                .hasToilet(true).hasShower(true).hasPower(true).hasWater(true)
                                .allowFire(true).canOvernight(true).petFriendly(true).familyFriendly(true)
                                .carAccessible(true).signalStrength("全网稳定")
                                .roadCondition("高速转县道，整体轻松").parkingDistance("车位 20 米")
                                .build())
                        .score(4.8)
                        .build()
        );

        guides = List.of(
                GuideDetailVO.builder()
                        .id(1L)
                        .slug("hangzhou-first-camp")
                        .title("杭州周边第一次露营怎么选营地")
                        .summary("围绕营地筛选、设施判断和新手决策展开。")
                        .category("新手指南")
                        .cityScope("杭州")
                        .content("先看是否可过夜，再看卫生与交通，再看真实评论中的避坑标签。")
                        .relatedCampSlugs(List.of("hangzhou-lake-breeze"))
                        .build(),
                GuideDetailVO.builder()
                        .id(2L)
                        .slug("suzhou-family-camp")
                        .title("苏州亲子露营营地避坑清单")
                        .summary("适合家庭周末出发前快速查阅。")
                        .category("新手指南")
                        .cityScope("苏州")
                        .content("优先选择有卫生间、车可达、规则清晰的营地。")
                        .relatedCampSlugs(List.of("suzhou-lake-pier"))
                        .build(),
                GuideDetailVO.builder()
                        .id(3L)
                        .slug("chengdu-newbie-overnight")
                        .title("成都第一次过夜露营先看这 5 条")
                        .summary("从新手视角缩短试错路径。")
                        .category("新手指南")
                        .cityScope("成都")
                        .content("第一次过夜尽量避开风大高海拔营地。")
                        .relatedCampSlugs(List.of("chengdu-cloud-lake"))
                        .build()
        );

        reviews = List.of(
                review(1L, "hangzhou-lake-breeze", "湖风松坡营地", "林周末", 5,
                        "第一次带家人去，卫生和路况都比预期稳。", "APPROVED", "2026-04-12", List.of("落日好看", "卫生间比预期好")),
                review(2L, "suzhou-lake-pier", "太湖栈桥营地", "许小露", 4,
                        "节假日人流会多，但营地秩序整体还可以。", "PENDING", "2026-04-20", List.of("建议提前预约")),
                review(3L, "chengdu-cloud-lake", "云湖牧歌营地", "林周末", 5,
                        "景观和设施平衡得很好，适合第一次过夜。", "APPROVED", "2026-05-03", List.of("新手友好", "信号稳定"))
        );
    }

    private ReviewVO review(Long id, String campSlug, String campName, String author, Integer score,
                            String content, String status, String visitDate, List<String> tags) {
        ReviewVO item = new ReviewVO();
        item.setId(id);
        item.setCampSlug(campSlug);
        item.setCampName(campName);
        item.setAuthor(author);
        item.setOverallScore(score);
        item.setContent(content);
        item.setStatus(status);
        item.setVisitDate(visitDate);
        item.setTags(tags);
        return item;
    }

    public List<CampDetailVO> getCamps(String keyword, String city) {
        return camps.stream()
                .filter(item -> keyword == null || keyword.isBlank() ||
                        item.getName().toLowerCase(Locale.ROOT).contains(keyword.toLowerCase(Locale.ROOT)) ||
                        item.getSummary().toLowerCase(Locale.ROOT).contains(keyword.toLowerCase(Locale.ROOT)) ||
                        item.getTags().stream().anyMatch(tag -> tag.toLowerCase(Locale.ROOT).contains(keyword.toLowerCase(Locale.ROOT))))
                .filter(item -> city == null || city.isBlank() || Objects.equals(item.getCity(), city))
                .sorted(Comparator.comparing(CampDetailVO::getScore).reversed())
                .collect(Collectors.toList());
    }

    public CampDetailVO getCampBySlug(String slug) {
        return camps.stream().filter(item -> item.getSlug().equals(slug)).findFirst().orElse(null);
    }

    public List<CampDetailVO> getSimilarCamps(String slug) {
        CampDetailVO current = getCampBySlug(slug);
        if (current == null) {
            return List.of();
        }
        return camps.stream()
                .filter(item -> !item.getSlug().equals(slug))
                .filter(item -> item.getCity().equals(current.getCity()) || item.getCampType().equals(current.getCampType()))
                .limit(3)
                .collect(Collectors.toList());
    }

    public List<GuideDetailVO> getGuides() {
        return guides;
    }

    public GuideDetailVO getGuideBySlug(String slug) {
        return guides.stream().filter(item -> item.getSlug().equals(slug)).findFirst().orElse(null);
    }

    public List<ReviewVO> getReviewsByCampSlug(String slug) {
        return reviews.stream().filter(item -> item.getCampSlug().equals(slug)).collect(Collectors.toList());
    }

    public List<ReviewVO> getAllReviews() {
        return reviews;
    }

    public List<CampCardVO> toCampCards(List<CampDetailVO> detailList) {
        List<CampCardVO> result = new ArrayList<>();
        for (CampDetailVO item : detailList) {
            CampCardVO card = new CampCardVO();
            card.setId(item.getId());
            card.setSlug(item.getSlug());
            card.setName(item.getName());
            card.setCity(item.getCity());
            card.setDistrict(item.getDistrict());
            card.setSummary(item.getSummary());
            card.setPriceText("¥" + item.getPriceMin() + " - ¥" + item.getPriceMax());
            card.setScore(item.getScore());
            result.add(card);
        }
        return result;
    }

    public List<GuideVO> toGuideCards(List<GuideDetailVO> detailList) {
        return detailList.stream().map(item -> {
            GuideVO vo = new GuideVO();
            vo.setId(item.getId());
            vo.setSlug(item.getSlug());
            vo.setTitle(item.getTitle());
            vo.setSummary(item.getSummary());
            vo.setCategory(item.getCategory());
            vo.setCityScope(item.getCityScope());
            return vo;
        }).collect(Collectors.toList());
    }
}
