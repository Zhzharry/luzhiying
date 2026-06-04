package com.luying.web.controller.site;

import com.luying.web.common.api.BaseController;
import com.luying.web.common.constants.ApiConstants;
import com.luying.web.common.result.ApiResponse;
import com.luying.web.dto.review.ReviewCreateRequest;
import com.luying.web.service.ReviewService;
import com.luying.web.vo.review.ReviewVO;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
    public ApiResponse<List<ReviewVO>> byCamp(
            @PathVariable String slug,
            @RequestParam(defaultValue = "latest") String sortBy
    ) {
        return ok(reviewService.byCampSlug(slug, sortBy));
    }

    @PostMapping
    public ApiResponse<ReviewVO> create(
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @Valid @RequestBody ReviewCreateRequest request
    ) {
        return ok(reviewService.create(authorization, request));
    }

    @PatchMapping("/{id}/helpful")
    public ApiResponse<ReviewVO> helpful(@PathVariable Long id) {
        return ok(reviewService.increaseHelpful(id));
    }

    @PostMapping("/{id}/report")
    public ApiResponse<Map<String, Object>> report(@PathVariable Long id) {
        return ok(Map.of("id", id, "message", "举报已受理"));
    }
}
