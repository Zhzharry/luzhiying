package com.luying.web.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.luying.web.entity.Camp;
import com.luying.web.entity.FavoriteList;
import com.luying.web.entity.FavoriteListItem;
import com.luying.web.entity.RecentlyViewed;
import com.luying.web.entity.User;
import com.luying.web.mapper.CampMapper;
import com.luying.web.mapper.FavoriteListItemMapper;
import com.luying.web.mapper.FavoriteListMapper;
import com.luying.web.mapper.RecentlyViewedMapper;
import com.luying.web.service.MeService;
import com.luying.web.service.ReviewService;
import com.luying.web.support.CurrentUserSupport;
import com.luying.web.vo.camp.CampCardVO;
import com.luying.web.vo.me.MeOverviewVO;
import com.luying.web.vo.review.ReviewVO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MeServiceImpl implements MeService {

    private final CurrentUserSupport currentUserSupport;
    private final FavoriteListMapper favoriteListMapper;
    private final FavoriteListItemMapper favoriteListItemMapper;
    private final RecentlyViewedMapper recentlyViewedMapper;
    private final CampMapper campMapper;
    private final ReviewService reviewService;
    private final CampServiceImpl campService;

    public MeServiceImpl(
            CurrentUserSupport currentUserSupport,
            FavoriteListMapper favoriteListMapper,
            FavoriteListItemMapper favoriteListItemMapper,
            RecentlyViewedMapper recentlyViewedMapper,
            CampMapper campMapper,
            ReviewService reviewService,
            CampServiceImpl campService
    ) {
        this.currentUserSupport = currentUserSupport;
        this.favoriteListMapper = favoriteListMapper;
        this.favoriteListItemMapper = favoriteListItemMapper;
        this.recentlyViewedMapper = recentlyViewedMapper;
        this.campMapper = campMapper;
        this.reviewService = reviewService;
        this.campService = campService;
    }

    @Override
    public MeOverviewVO overview(String authorization) {
        User user = currentUserSupport.requireUser(authorization);
        List<FavoriteList> lists = favoriteListMapper.selectList(new LambdaQueryWrapper<FavoriteList>()
                .eq(FavoriteList::getUserId, user.getId()));
        List<Long> listIds = lists.stream().map(FavoriteList::getId).toList();
        List<Long> favoriteCampIds = listIds.isEmpty() ? List.of() : favoriteListItemMapper.selectList(new LambdaQueryWrapper<FavoriteListItem>()
                        .in(FavoriteListItem::getListId, listIds)
                        .orderByDesc(FavoriteListItem::getCreatedAt))
                .stream()
                .map(FavoriteListItem::getCampId)
                .distinct()
                .toList();
        List<Long> recentCampIds = recentlyViewedMapper.selectList(new LambdaQueryWrapper<RecentlyViewed>()
                        .eq(RecentlyViewed::getUserId, user.getId())
                        .orderByDesc(RecentlyViewed::getViewedAt))
                .stream()
                .map(RecentlyViewed::getCampId)
                .distinct()
                .limit(6)
                .toList();
        List<CampCardVO> favoriteCamps = selectCampCards(favoriteCampIds, 6);
        List<CampCardVO> recentCamps = selectCampCards(recentCampIds, 6);
        List<ReviewVO> myReviews = reviewService.byUserId(user.getId());
        return MeOverviewVO.builder()
                .user(currentUserSupport.toSession(user))
                .favoriteCount(favoriteCampIds.size())
                .recentCount(recentCampIds.size())
                .reviewCount(myReviews.size())
                .favoriteCamps(favoriteCamps)
                .recentCamps(recentCamps)
                .myReviews(myReviews)
                .build();
    }

    @Override
    public List<ReviewVO> reviews(String authorization) {
        User user = currentUserSupport.requireUser(authorization);
        return reviewService.byUserId(user.getId());
    }

    private List<CampCardVO> selectCampCards(List<Long> ids, int limit) {
        if (ids.isEmpty()) {
            return List.of();
        }
        List<CampCardVO> mapped = campMapper.selectBatchIds(ids).stream()
                .map(campService::toCampCardPublic)
                .collect(Collectors.toList());
        return mapped.stream().limit(limit).toList();
    }
}
