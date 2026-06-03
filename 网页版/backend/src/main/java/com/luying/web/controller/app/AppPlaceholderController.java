package com.luying.web.controller.app;

import com.luying.web.common.api.BaseController;
import com.luying.web.common.constants.ApiConstants;
import com.luying.web.common.result.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping(ApiConstants.API_PREFIX + "/app")
public class AppPlaceholderController extends BaseController {

    @GetMapping("/ping")
    public ApiResponse<Map<String, Object>> ping() {
        return ok(Map.of("message", "小程序端特有接口预留位"));
    }
}
