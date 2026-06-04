package com.luying.web.controller.admin;

import com.luying.web.common.api.BaseController;
import com.luying.web.common.constants.ApiConstants;
import com.luying.web.common.result.ApiResponse;
import com.luying.web.dto.review.ReviewStatusRequest;
import com.luying.web.service.ReviewService;
import com.luying.web.support.CurrentUserSupport;
import com.luying.web.vo.review.ReviewVO;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(ApiConstants.API_PREFIX + "/admin/reviews")
public class AdminReviewController extends BaseController {

    private final ReviewService reviewService;
    private final CurrentUserSupport currentUserSupport;

    public AdminReviewController(ReviewService reviewService, CurrentUserSupport currentUserSupport) {
        this.reviewService = reviewService;
        this.currentUserSupport = currentUserSupport;
    }

    @GetMapping
    public ApiResponse<List<Map<String, Object>>> list(
            @RequestHeader(value = "Authorization", required = false) String authorization
    ) {
        currentUserSupport.requireAdmin(authorization);
        return ok(reviewService.list().stream()
                .map(item -> Map.<String, Object>of(
                        "id", item.getId(),
                        "campName", item.getCampName(),
                        "author", item.getAuthor(),
                        "status", item.getStatus()
                ))
                .toList());
    }

    @PatchMapping("/{id}/status")
    public ApiResponse<ReviewVO> updateStatus(
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @PathVariable Long id,
            @Valid @RequestBody ReviewStatusRequest request
    ) {
        return ok(reviewService.updateStatus(authorization, id, request.getStatus()));
    }
}
