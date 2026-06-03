package com.luying.web.service.impl;

import com.luying.web.dto.auth.LoginRequest;
import com.luying.web.dto.auth.RegisterRequest;
import com.luying.web.service.AuthService;
import com.luying.web.vo.auth.SessionUserVO;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Override
    public SessionUserVO login(LoginRequest request) {
        return SessionUserVO.builder()
                .id(1L)
                .name("露之营管理员")
                .email(request.getEmail())
                .role("ADMIN")
                .token("mock-jwt-token")
                .build();
    }

    @Override
    public SessionUserVO register(RegisterRequest request) {
        return SessionUserVO.builder()
                .id(2L)
                .name(request.getName())
                .email(request.getEmail())
                .role("USER")
                .token("mock-jwt-token")
                .build();
    }

    @Override
    public SessionUserVO mockSession() {
        return SessionUserVO.builder()
                .id(1L)
                .name("露之营管理员")
                .email("admin@luying.local")
                .role("ADMIN")
                .token("mock-jwt-token")
                .build();
    }
}
