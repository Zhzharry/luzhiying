package com.luying.web.controller.site;

import com.luying.web.common.api.BaseController;
import com.luying.web.common.constants.ApiConstants;
import com.luying.web.common.result.ApiResponse;
import com.luying.web.common.result.PageResult;
import com.luying.web.service.CampService;
import com.luying.web.vo.camp.CampCardVO;
import com.luying.web.vo.camp.CampDetailVO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(ApiConstants.API_PREFIX + "/camps")
public class CampController extends BaseController {

    private final CampService campService;

    public CampController(CampService campService) {
        this.campService = campService;
    }

    @GetMapping
    public ApiResponse<PageResult<CampCardVO>> list(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String city
    ) {
        return ok(campService.list(keyword, city));
    }

    @GetMapping("/{slug}")
    public ApiResponse<CampDetailVO> detail(@PathVariable String slug) {
        return ok(campService.detail(slug));
    }

    @GetMapping("/{slug}/reviews")
    public ApiResponse<List<Map<String, Object>>> reviews(@PathVariable String slug) {
        return ok(campService.reviews(slug));
    }

    @GetMapping("/{slug}/similar")
    public ApiResponse<List<CampCardVO>> similar(@PathVariable String slug) {
        return ok(campService.similar(slug));
    }

    @PostMapping("/compare")
    public ApiResponse<List<CampCardVO>> compare(@RequestBody(required = false) Map<String, List<String>> payload) {
        return ok(campService.compare(payload == null ? List.of() : payload.get("slugs")));
    }
}
