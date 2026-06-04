package com.luying.web.service;

import com.luying.web.vo.favorite.FavoriteListVO;

import java.util.List;

public interface FavoriteService {
    List<FavoriteListVO> list(String authorization);

    FavoriteListVO createDefaultIfMissing(String authorization, String name);

    FavoriteListVO addItem(String authorization, Long listId, String campSlug);

    Boolean removeItem(String authorization, Long listId, Long campId);
}
