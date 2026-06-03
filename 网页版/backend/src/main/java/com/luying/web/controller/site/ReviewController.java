package com.luying.web.controller.site;

import com.luying.web.common.api.BaseController;
import com.luying.web.common.constants.ApiConstants;
import com.luying.web.common.result.ApiResponse;
import com.luying.web.service.ReviewService;
import com.luying.web.vo.review.ReviewVO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(ApiConstants.API_PREFIX + "/reviews")
public class ReviewController extends BaseController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping
    public ApiResponse<List<ReviewVO>> list() {
        return ok(reviewService.list());
    }

    @GetMapping("/camp/{slug}")
    public ApiResponse<List<ReviewVO>> byCamp(@PathVariable String slug) {
        return ok(reviewService.byCampSlug(slug));
    }

    @PostMapping
    public ApiResponse<Map<String, Object>> create() {
        return ok(Map.of("message", "评论创建接口占位"));
    }

    @PatchMapping("/{id}/helpful")
    public ApiResponse<Map<String, Object>> helpful(@PathVariable Long id) {
        return ok(Map.of("id", id, "message", "有帮助+1"));
    }

    @PostMapping("/{id}/report")
    public ApiResponse<Map<String, Object>> report(@PathVariable Long id) {
        return ok(Map.of("id", id, "message", "举报已受理"));
    }
}
