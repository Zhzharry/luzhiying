package com.luying.web.controller.site;

import com.luying.web.common.api.BaseController;
import com.luying.web.common.constants.ApiConstants;
import com.luying.web.common.result.ApiResponse;
import com.luying.web.service.GuideService;
import com.luying.web.support.CurrentUserSupport;
import com.luying.web.vo.guide.GuideDetailVO;
import com.luying.web.vo.guide.GuideVO;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(ApiConstants.API_PREFIX + "/guides")
public class GuideController extends BaseController {

    private final GuideService guideService;
    private final CurrentUserSupport currentUserSupport;

    public GuideController(GuideService guideService, CurrentUserSupport currentUserSupport) {
        this.guideService = guideService;
        this.currentUserSupport = currentUserSupport;
    }

    @GetMapping
    public ApiResponse<List<GuideVO>> list(
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String cityScope,
            @RequestParam(required = false) String category
    ) {
        currentUserSupport.requireUser(authorization);
        return ok(guideService.list(keyword, cityScope, category));
    }

    @GetMapping("/{slug}")
    public ApiResponse<GuideDetailVO> detail(
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @PathVariable String slug
    ) {
        currentUserSupport.requireUser(authorization);
        return ok(guideService.detail(slug));
    }
}
