package com.luying.web.service;

import com.luying.web.dto.review.ReviewCreateRequest;
import com.luying.web.vo.review.ReviewVO;

import java.util.List;

public interface ReviewService {
    List<ReviewVO> list();

    List<ReviewVO> byCampSlug(String slug, String sortBy);

    List<ReviewVO> byUserId(Long userId);

    ReviewVO create(String authorization, ReviewCreateRequest request);

    ReviewVO updateStatus(String authorization, Long id, String status);

    ReviewVO increaseHelpful(Long id);
}
