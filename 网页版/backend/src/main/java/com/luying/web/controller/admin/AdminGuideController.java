package com.luying.web.controller.admin;

import com.luying.web.common.api.BaseController;
import com.luying.web.common.constants.ApiConstants;
import com.luying.web.common.result.ApiResponse;
import com.luying.web.service.GuideService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(ApiConstants.API_PREFIX + "/admin/guides")
public class AdminGuideController extends BaseController {

    private final GuideService guideService;

    public AdminGuideController(GuideService guideService) {
        this.guideService = guideService;
    }

    @GetMapping
    public ApiResponse<List<Map<String, Object>>> list() {
        return ok(guideService.list(null, null).stream()
                .map(item -> Map.<String, Object>of(
                        "title", item.getTitle(),
                        "status", "PUBLISHED",
                        "slug", item.getSlug()
                ))
                .toList());
    }

    @PostMapping
    public ApiResponse<Map<String, Object>> create() {
        return ok(Map.of("message", "管理端创建攻略接口占位"));
    }

    @PatchMapping("/{id}")
    public ApiResponse<Map<String, Object>> update(@PathVariable Long id) {
        return ok(Map.of("id", id, "message", "管理端更新攻略接口占位"));
    }
}
