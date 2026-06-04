package com.luying.web.service;

import com.luying.web.common.result.PageResult;
import com.luying.web.vo.camp.CampCardVO;
import com.luying.web.vo.camp.CampDetailVO;

import java.util.List;

public interface CampService {
    PageResult<CampCardVO> list(
            String keyword,
            String city,
            String locationText,
            Double latitude,
            Double longitude,
            Integer radiusKm,
            String sortBy
    );

    CampDetailVO detail(String slug);

    List<java.util.Map<String, Object>> reviews(String slug);

    List<CampCardVO> similar(String slug);

    List<CampCardVO> compare(List<String> slugs);

    void recordView(String authorization, String slug);
}
