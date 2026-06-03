package com.luying.web.service.impl;

import com.luying.web.mapper.ReviewMapper;
import com.luying.web.mapper.projection.ReviewRecord;
import com.luying.web.service.ReviewService;
import com.luying.web.vo.review.ReviewVO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class ReviewServiceImpl implements ReviewService {

    private final ReviewMapper reviewMapper;

    public ReviewServiceImpl(ReviewMapper reviewMapper) {
        this.reviewMapper = reviewMapper;
    }

    @Override
    public List<ReviewVO> list() {
        return reviewMapper.selectAllWithRelations().stream().map(this::toVO).toList();
    }

    @Override
    public List<ReviewVO> byCampSlug(String slug) {
        return reviewMapper.selectByCampSlug(slug).stream()
                .filter(item -> Objects.equals(item.getStatus(), "APPROVED"))
                .map(this::toVO)
                .toList();
    }

    private ReviewVO toVO(ReviewRecord item) {
        ReviewVO vo = new ReviewVO();
        vo.setId(item.getId());
        vo.setCampSlug(item.getCampSlug());
        vo.setCampName(item.getCampName());
        vo.setAuthor(item.getAuthor());
        vo.setOverallScore(item.getOverallScore());
        vo.setContent(item.getContent());
        vo.setStatus(item.getStatus());
        vo.setVisitDate(item.getVisitDate() == null ? "" : item.getVisitDate().toString());
        vo.setTags(List.of("真实到访", "结构化评价"));
        return vo;
    }
}
