package com.luying.web.controller.site;

import com.luying.web.common.api.BaseController;
import com.luying.web.common.constants.ApiConstants;
import com.luying.web.common.result.ApiResponse;
import com.luying.web.dto.auth.LoginRequest;
import com.luying.web.dto.auth.RegisterRequest;
import com.luying.web.service.AuthService;
import com.luying.web.vo.auth.SessionUserVO;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(ApiConstants.API_PREFIX + "/auth")
public class AuthController extends BaseController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ApiResponse<SessionUserVO> login(@Valid @RequestBody LoginRequest request) {
        return ok(authService.login(request));
    }

    @PostMapping("/register")
    public ApiResponse<SessionUserVO> register(@Valid @RequestBody RegisterRequest request) {
        return ok(authService.register(request));
    }

    @PostMapping("/logout")
    public ApiResponse<Boolean> logout() {
        return ok(Boolean.TRUE);
    }

    @GetMapping("/session")
    public ApiResponse<SessionUserVO> session() {
        return ok(authService.mockSession());
    }
}
