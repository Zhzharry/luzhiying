package com.luying.web.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.luying.web.entity.Camp;
import com.luying.web.entity.FavoriteList;
import com.luying.web.entity.FavoriteListItem;
import com.luying.web.entity.User;
import com.luying.web.mapper.CampMapper;
import com.luying.web.mapper.FavoriteListItemMapper;
import com.luying.web.mapper.FavoriteListMapper;
import com.luying.web.service.FavoriteService;
import com.luying.web.support.CurrentUserSupport;
import com.luying.web.vo.camp.CampCardVO;
import com.luying.web.vo.favorite.FavoriteListVO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoriteServiceImpl implements FavoriteService {

    private final FavoriteListMapper favoriteListMapper;
    private final FavoriteListItemMapper favoriteListItemMapper;
    private final CampMapper campMapper;
    private final CurrentUserSupport currentUserSupport;
    private final CampServiceImpl campService;

    public FavoriteServiceImpl(
            FavoriteListMapper favoriteListMapper,
            FavoriteListItemMapper favoriteListItemMapper,
            CampMapper campMapper,
            CurrentUserSupport currentUserSupport,
            CampServiceImpl campService
    ) {
        this.favoriteListMapper = favoriteListMapper;
        this.favoriteListItemMapper = favoriteListItemMapper;
        this.campMapper = campMapper;
        this.currentUserSupport = currentUserSupport;
        this.campService = campService;
    }

    @Override
    public List<FavoriteListVO> list(String authorization) {
        User user = currentUserSupport.requireUser(authorization);
        ensureDefaultList(user.getId(), "默认收藏夹");
        return favoriteListMapper.selectList(new LambdaQueryWrapper<FavoriteList>()
                        .eq(FavoriteList::getUserId, user.getId())
                        .orderByAsc(FavoriteList::getId))
                .stream()
                .map(this::toVO)
                .toList();
    }

    @Override
    public FavoriteListVO createDefaultIfMissing(String authorization, String name) {
        User user = currentUserSupport.requireUser(authorization);
        return toVO(ensureDefaultList(user.getId(), name == null || name.isBlank() ? "默认收藏夹" : name));
    }

    @Override
    public FavoriteListVO addItem(String authorization, Long listId, String campSlug) {
        User user = currentUserSupport.requireUser(authorization);
        FavoriteList list = favoriteListMapper.selectById(listId);
        if (list == null || !list.getUserId().equals(user.getId())) {
            throw new IllegalArgumentException("收藏夹不存在");
        }
        Camp camp = campMapper.selectOne(new LambdaQueryWrapper<Camp>().eq(Camp::getSlug, campSlug).last("LIMIT 1"));
        if (camp == null) {
            throw new IllegalArgumentException("营地不存在");
        }
        FavoriteListItem existing = favoriteListItemMapper.selectOne(new LambdaQueryWrapper<FavoriteListItem>()
                .eq(FavoriteListItem::getListId, listId)
                .eq(FavoriteListItem::getCampId, camp.getId())
                .last("LIMIT 1"));
        if (existing == null) {
            FavoriteListItem item = new FavoriteListItem();
            item.setListId(listId);
            item.setCampId(camp.getId());
            favoriteListItemMapper.insert(item);
        }
        return toVO(list);
    }

    @Override
    public Boolean removeItem(String authorization, Long listId, Long campId) {
        User user = currentUserSupport.requireUser(authorization);
        FavoriteList list = favoriteListMapper.selectById(listId);
        if (list == null || !list.getUserId().equals(user.getId())) {
            throw new IllegalArgumentException("收藏夹不存在");
        }
        favoriteListItemMapper.delete(new LambdaQueryWrapper<FavoriteListItem>()
                .eq(FavoriteListItem::getListId, listId)
                .eq(FavoriteListItem::getCampId, campId));
        return Boolean.TRUE;
    }

    private FavoriteList ensureDefaultList(Long userId, String name) {
        FavoriteList list = favoriteListMapper.selectOne(new LambdaQueryWrapper<FavoriteList>()
                .eq(FavoriteList::getUserId, userId)
                .last("LIMIT 1"));
        if (list != null) {
            return list;
        }
        FavoriteList created = new FavoriteList();
        created.setUserId(userId);
        created.setName(name);
        favoriteListMapper.insert(created);
        return created;
    }

    private FavoriteListVO toVO(FavoriteList list) {
        List<Long> campIds = favoriteListItemMapper.selectList(new LambdaQueryWrapper<FavoriteListItem>()
                        .eq(FavoriteListItem::getListId, list.getId())
                        .orderByDesc(FavoriteListItem::getCreatedAt))
                .stream()
                .map(FavoriteListItem::getCampId)
                .toList();
        List<CampCardVO> camps = campIds.isEmpty()
                ? List.of()
                : campMapper.selectBatchIds(campIds).stream().map(campService::toCampCardPublic).toList();
        return FavoriteListVO.builder()
                .id(list.getId())
                .name(list.getName())
                .itemCount(camps.size())
                .camps(camps)
                .build();
    }
}
