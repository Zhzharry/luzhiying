package com.luying.web.controller.site;

import com.luying.web.common.api.BaseController;
import com.luying.web.common.constants.ApiConstants;
import com.luying.web.common.result.ApiResponse;
import com.luying.web.service.MeService;
import com.luying.web.vo.me.MeOverviewVO;
import com.luying.web.vo.review.ReviewVO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(ApiConstants.API_PREFIX + "/me")
public class MeController extends BaseController {

    private final MeService meService;

    public MeController(MeService meService) {
        this.meService = meService;
    }

    @GetMapping("/overview")
    public ApiResponse<MeOverviewVO> overview(
            @RequestHeader(value = "Authorization", required = false) String authorization
    ) {
        return ok(meService.overview(authorization));
    }

    @GetMapping("/reviews")
    public ApiResponse<List<ReviewVO>> reviews(
            @RequestHeader(value = "Authorization", required = false) String authorization
    ) {
        return ok(meService.reviews(authorization));
    }
}
