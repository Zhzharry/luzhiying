package com.luying.web.controller.site;

import com.luying.web.common.api.BaseController;
import com.luying.web.common.constants.ApiConstants;
import com.luying.web.common.result.ApiResponse;
import com.luying.web.service.CampService;
import com.luying.web.vo.camp.CampCardVO;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(ApiConstants.API_PREFIX + "/compare")
public class CompareController extends BaseController {

    private final CampService campService;

    public CompareController(CampService campService) {
        this.campService = campService;
    }

    @PostMapping
    public ApiResponse<List<CampCardVO>> compare(@RequestBody(required = false) Map<String, List<String>> payload) {
        return ok(campService.compare(payload == null ? List.of() : payload.get("slugs")));
    }
}
