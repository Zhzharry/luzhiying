package com.luying.web.service;

import com.luying.web.dto.auth.LoginRequest;
import com.luying.web.dto.auth.RegisterRequest;
import com.luying.web.vo.auth.SessionUserVO;

public interface AuthService {
    SessionUserVO login(LoginRequest request);

    SessionUserVO register(RegisterRequest request);

    SessionUserVO mockSession();
}
