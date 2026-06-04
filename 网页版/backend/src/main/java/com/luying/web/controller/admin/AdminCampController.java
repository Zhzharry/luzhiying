package com.luying.web.controller.admin;

import com.luying.web.common.api.BaseController;
import com.luying.web.common.constants.ApiConstants;
import com.luying.web.common.result.ApiResponse;
import com.luying.web.service.CampService;
import com.luying.web.support.CurrentUserSupport;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(ApiConstants.API_PREFIX + "/admin/camps")
public class AdminCampController extends BaseController {

    private final CampService campService;
    private final CurrentUserSupport currentUserSupport;

    public AdminCampController(CampService campService, CurrentUserSupport currentUserSupport) {
        this.campService = campService;
        this.currentUserSupport = currentUserSupport;
    }

    @GetMapping
    public ApiResponse<List<Map<String, Object>>> list(
            @RequestHeader(value = "Authorization", required = false) String authorization
    ) {
        currentUserSupport.requireAdmin(authorization);
        return ok(campService.list(null, null, null, null, null, null, null).getList().stream()
                .map(item -> Map.<String, Object>of(
                        "name", item.getName(),
                        "city", item.getCity(),
                        "slug", item.getSlug()
                ))
                .toList());
    }

    @PostMapping
    public ApiResponse<Map<String, Object>> create(
            @RequestHeader(value = "Authorization", required = false) String authorization
    ) {
        currentUserSupport.requireAdmin(authorization);
        return ok(Map.of("message", "管理端创建营地接口占位"));
    }

    @PatchMapping("/{id}")
    public ApiResponse<Map<String, Object>> update(
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @PathVariable Long id
    ) {
        currentUserSupport.requireAdmin(authorization);
        return ok(Map.of("id", id, "message", "管理端更新营地接口占位"));
    }
}
