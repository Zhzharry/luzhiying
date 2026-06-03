package com.luying.web.controller.site;

import com.luying.web.common.api.BaseController;
import com.luying.web.common.constants.ApiConstants;
import com.luying.web.common.result.ApiResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping(ApiConstants.API_PREFIX + "/corrections")
public class CorrectionController extends BaseController {

    @PostMapping
    public ApiResponse<Map<String, Object>> create() {
        return ok(Map.of("message", "信息纠错接口占位"));
    }
}
