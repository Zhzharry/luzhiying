package com.luying.web.controller.site;

import com.luying.web.common.api.BaseController;
import com.luying.web.common.constants.ApiConstants;
import com.luying.web.common.result.ApiResponse;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(ApiConstants.API_PREFIX + "/favorite-lists")
public class FavoriteController extends BaseController {

    @GetMapping
    public ApiResponse<List<Map<String, Object>>> list() {
        return ok(List.of(Map.of("id", 1, "name", "默认收藏夹")));
    }

    @PostMapping
    public ApiResponse<Map<String, Object>> create() {
        return ok(Map.of("message", "创建收藏夹接口占位"));
    }

    @PostMapping("/{id}/items")
    public ApiResponse<Map<String, Object>> addItem(@PathVariable Long id) {
        return ok(Map.of("listId", id, "message", "添加收藏项接口占位"));
    }

    @DeleteMapping("/{id}/items/{campId}")
    public ApiResponse<Map<String, Object>> removeItem(@PathVariable Long id, @PathVariable Long campId) {
        return ok(Map.of("listId", id, "campId", campId, "message", "删除收藏项接口占位"));
    }
}
