package com.luying.web.controller.site;

import com.luying.web.common.api.BaseController;
import com.luying.web.common.constants.ApiConstants;
import com.luying.web.common.result.ApiResponse;
import com.luying.web.dto.favorite.FavoriteItemRequest;
import com.luying.web.service.FavoriteService;
import com.luying.web.vo.favorite.FavoriteListVO;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(ApiConstants.API_PREFIX + "/favorite-lists")
public class FavoriteController extends BaseController {

    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @GetMapping
    public ApiResponse<List<FavoriteListVO>> list(
            @RequestHeader(value = "Authorization", required = false) String authorization
    ) {
        return ok(favoriteService.list(authorization));
    }

    @PostMapping
    public ApiResponse<FavoriteListVO> create(
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @RequestBody(required = false) Map<String, String> payload
    ) {
        return ok(favoriteService.createDefaultIfMissing(authorization, payload == null ? null : payload.get("name")));
    }

    @PostMapping("/{id}/items")
    public ApiResponse<FavoriteListVO> addItem(
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @PathVariable Long id,
            @Valid @RequestBody FavoriteItemRequest request
    ) {
        return ok(favoriteService.addItem(authorization, id, request.getCampSlug()));
    }

    @DeleteMapping("/{id}/items/{campId}")
    public ApiResponse<Boolean> removeItem(
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @PathVariable Long id,
            @PathVariable Long campId
    ) {
        return ok(favoriteService.removeItem(authorization, id, campId));
    }
}
