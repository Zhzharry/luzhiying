package com.luying.web.common.api;

import com.luying.web.common.result.ApiResponse;

public abstract class BaseController {

    protected <T> ApiResponse<T> ok(T data) {
        return ApiResponse.success(data);
    }
}
