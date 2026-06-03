package com.luying.web.service;

import com.luying.web.vo.review.ReviewVO;

import java.util.List;

public interface ReviewService {
    List<ReviewVO> list();

    List<ReviewVO> byCampSlug(String slug);
}
