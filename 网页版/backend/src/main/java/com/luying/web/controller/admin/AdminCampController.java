package com.luying.web.controller.admin;

import com.luying.web.common.api.BaseController;
import com.luying.web.common.constants.ApiConstants;
import com.luying.web.common.result.ApiResponse;
import com.luying.web.service.CampService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(ApiConstants.API_PREFIX + "/admin/camps")
public class AdminCampController extends BaseController {

    private final CampService campService;

    public AdminCampController(CampService campService) {
        this.campService = campService;
    }

    @GetMapping
    public ApiResponse<List<Map<String, Object>>> list() {
        return ok(campService.list(null, null).getList().stream()
                .map(item -> Map.<String, Object>of(
                        "name", item.getName(),
                        "city", item.getCity(),
                        "slug", item.getSlug()
                ))
                .toList());
    }

    @PostMapping
    public ApiResponse<Map<String, Object>> create() {
        return ok(Map.of("message", "管理端创建营地接口占位"));
    }

    @PatchMapping("/{id}")
    public ApiResponse<Map<String, Object>> update(@PathVariable Long id) {
        return ok(Map.of("id", id, "message", "管理端更新营地接口占位"));
    }
}
