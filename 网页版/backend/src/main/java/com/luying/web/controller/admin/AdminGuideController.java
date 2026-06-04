package com.luying.web.controller.admin;

import com.luying.web.common.api.BaseController;
import com.luying.web.common.constants.ApiConstants;
import com.luying.web.common.result.ApiResponse;
import com.luying.web.service.GuideService;
import com.luying.web.support.CurrentUserSupport;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(ApiConstants.API_PREFIX + "/admin/guides")
public class AdminGuideController extends BaseController {

    private final GuideService guideService;
    private final CurrentUserSupport currentUserSupport;

    public AdminGuideController(GuideService guideService, CurrentUserSupport currentUserSupport) {
        this.guideService = guideService;
        this.currentUserSupport = currentUserSupport;
    }

    @GetMapping
    public ApiResponse<List<Map<String, Object>>> list(
            @RequestHeader(value = "Authorization", required = false) String authorization
    ) {
        currentUserSupport.requireAdmin(authorization);
        return ok(guideService.list(null, null, null).stream()
                .map(item -> Map.<String, Object>of(
                        "title", item.getTitle(),
                        "status", "PUBLISHED",
                        "slug", item.getSlug()
                ))
                .toList());
    }

    @PostMapping
    public ApiResponse<Map<String, Object>> create(
            @RequestHeader(value = "Authorization", required = false) String authorization
    ) {
        currentUserSupport.requireAdmin(authorization);
        return ok(Map.of("message", "管理端创建攻略接口占位"));
    }

    @PatchMapping("/{id}")
    public ApiResponse<Map<String, Object>> update(
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @PathVariable Long id
    ) {
        currentUserSupport.requireAdmin(authorization);
        return ok(Map.of("id", id, "message", "管理端更新攻略接口占位"));
    }
}
