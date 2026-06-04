package com.luying.web.service.impl;

import com.luying.web.common.exception.BusinessException;
import com.luying.web.dto.review.ReviewCreateRequest;
import com.luying.web.entity.Camp;
import com.luying.web.entity.Review;
import com.luying.web.entity.User;
import com.luying.web.mapper.CampMapper;
import com.luying.web.mapper.ReviewMapper;
import com.luying.web.mapper.projection.ReviewRecord;
import com.luying.web.service.ReviewService;
import com.luying.web.support.CurrentUserSupport;
import com.luying.web.vo.review.ReviewVO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Comparator;

@Service
public class ReviewServiceImpl implements ReviewService {

    private final ReviewMapper reviewMapper;
    private final CampMapper campMapper;
    private final CurrentUserSupport currentUserSupport;

    public ReviewServiceImpl(ReviewMapper reviewMapper, CampMapper campMapper, CurrentUserSupport currentUserSupport) {
        this.reviewMapper = reviewMapper;
        this.campMapper = campMapper;
        this.currentUserSupport = currentUserSupport;
    }

    @Override
    public List<ReviewVO> list() {
        return reviewMapper.selectAllWithRelations().stream().map(this::toVO).toList();
    }

    @Override
    public List<ReviewVO> byCampSlug(String slug, String sortBy) {
        List<ReviewRecord> records = reviewMapper.selectByCampSlug(slug).stream()
                .filter(item -> Objects.equals(item.getStatus(), "APPROVED"))
                .toList();
        Comparator<ReviewRecord> comparator = "hot".equalsIgnoreCase(sortBy)
                ? Comparator.comparing((ReviewRecord item) -> item.getHelpfulCount() == null ? 0 : item.getHelpfulCount()).reversed()
                    .thenComparing(ReviewRecord::getCreatedAt, Comparator.nullsLast(Comparator.reverseOrder()))
                : Comparator.comparing(ReviewRecord::getCreatedAt, Comparator.nullsLast(Comparator.reverseOrder()))
                    .thenComparing(ReviewRecord::getId, Comparator.reverseOrder());

        List<ReviewVO> result = records.stream()
                .sorted(comparator)
                .map(this::toVO)
                .toList();
        for (int i = 0; i < result.size(); i++) {
            result.get(i).setFloor(i + 1);
        }
        return result;
    }

    @Override
    public List<ReviewVO> byUserId(Long userId) {
        return reviewMapper.selectByUserId(userId).stream().map(this::toVO).toList();
    }

    @Override
    public ReviewVO create(String authorization, ReviewCreateRequest request) {
        User user = currentUserSupport.requireUser(authorization);
        Camp camp = campMapper.selectById(request.getCampId());
        if (camp == null) {
            throw new BusinessException(404, "营地不存在");
        }
        Review review = new Review();
        review.setCampId(request.getCampId());
        review.setUserId(user.getId());
        review.setOverallScore(request.getOverallScore());
        review.setSceneScore(request.getSceneScore());
        review.setCleanScore(request.getCleanScore());
        review.setQuietScore(request.getQuietScore());
        review.setAccessScore(request.getAccessScore());
        review.setNewbieScore(request.getNewbieScore());
        review.setFamilyScore(request.getFamilyScore());
        review.setCostScore(request.getCostScore());
        review.setContent(request.getContent());
        review.setVisitDate(request.getVisitDate());
        review.setHelpfulCount(0);
        review.setStatus("APPROVED");
        reviewMapper.insert(review);
        return byId(review.getId());
    }

    @Override
    public ReviewVO updateStatus(String authorization, Long id, String status) {
        currentUserSupport.requireAdmin(authorization);
        Review review = reviewMapper.selectById(id);
        if (review == null) {
            throw new BusinessException(404, "评论不存在");
        }
        review.setStatus(status);
        reviewMapper.updateById(review);
        return byId(id);
    }

    @Override
    public ReviewVO increaseHelpful(Long id) {
        Review review = reviewMapper.selectById(id);
        if (review == null) {
            throw new BusinessException(404, "评论不存在");
        }
        review.setHelpfulCount((review.getHelpfulCount() == null ? 0 : review.getHelpfulCount()) + 1);
        reviewMapper.updateById(review);
        return byId(id);
    }

    private ReviewVO byId(Long id) {
        ReviewRecord record = reviewMapper.selectByIdWithRelations(id);
        if (record == null) {
            throw new BusinessException(404, "评论不存在");
        }
        return toVO(record);
    }

    private ReviewVO toVO(ReviewRecord item) {
        ReviewVO vo = new ReviewVO();
        vo.setId(item.getId());
        vo.setAuthorId(item.getAuthorId());
        vo.setCampSlug(item.getCampSlug());
        vo.setCampName(item.getCampName());
        vo.setAuthor(item.getAuthor());
        vo.setOverallScore(item.getOverallScore());
        vo.setContent(item.getContent());
        vo.setStatus(item.getStatus());
        vo.setVisitDate(item.getVisitDate() == null ? "" : item.getVisitDate().toString());
        vo.setHelpfulCount(item.getHelpfulCount() == null ? 0 : item.getHelpfulCount());
        vo.setCreatedAt(item.getCreatedAt() == null ? "" : item.getCreatedAt().toString());
        vo.setTags(List.of("真实到访", "结构化评价"));
        return vo;
    }
}
