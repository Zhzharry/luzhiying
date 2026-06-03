package com.luying.web.controller.site;

import com.luying.web.common.api.BaseController;
import com.luying.web.common.constants.ApiConstants;
import com.luying.web.common.result.ApiResponse;
import com.luying.web.service.GuideService;
import com.luying.web.vo.guide.GuideDetailVO;
import com.luying.web.vo.guide.GuideVO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(ApiConstants.API_PREFIX + "/guides")
public class GuideController extends BaseController {

    private final GuideService guideService;

    public GuideController(GuideService guideService) {
        this.guideService = guideService;
    }

    @GetMapping
    public ApiResponse<List<GuideVO>> list() {
        return ok(guideService.list());
    }

    @GetMapping("/{slug}")
    public ApiResponse<GuideDetailVO> detail(@PathVariable String slug) {
        return ok(guideService.detail(slug));
    }
}
