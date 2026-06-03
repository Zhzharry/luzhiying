package com.luying.web.controller.admin;

import com.luying.web.common.api.BaseController;
import com.luying.web.common.constants.ApiConstants;
import com.luying.web.common.result.ApiResponse;
import com.luying.web.service.ReviewService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(ApiConstants.API_PREFIX + "/admin/reviews")
public class AdminReviewController extends BaseController {

    private final ReviewService reviewService;

    public AdminReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping
    public ApiResponse<List<Map<String, Object>>> list() {
        return ok(reviewService.list().stream()
                .map(item -> Map.<String, Object>of(
                        "campName", item.getCampName(),
                        "author", item.getAuthor(),
                        "status", item.getStatus()
                ))
                .toList());
    }

    @PatchMapping("/{id}/status")
    public ApiResponse<Map<String, Object>> updateStatus(@PathVariable Long id) {
        return ok(Map.of("id", id, "message", "评论审核状态更新接口占位"));
    }
}
