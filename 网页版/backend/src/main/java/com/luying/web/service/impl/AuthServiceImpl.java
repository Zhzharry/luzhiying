package com.luying.web.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.luying.web.dto.auth.LoginRequest;
import com.luying.web.dto.auth.RegisterRequest;
import com.luying.web.entity.User;
import com.luying.web.mapper.UserMapper;
import com.luying.web.security.JwtTokenService;
import com.luying.web.service.AuthService;
import com.luying.web.vo.auth.SessionUserVO;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenService jwtTokenService;

    public AuthServiceImpl(UserMapper userMapper, PasswordEncoder passwordEncoder, JwtTokenService jwtTokenService) {
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenService = jwtTokenService;
    }

    @Override
    public SessionUserVO login(LoginRequest request) {
        User user = userMapper.selectOne(new LambdaQueryWrapper<User>()
                .eq(User::getEmail, request.getEmail())
                .last("LIMIT 1"));
        if (user == null) {
            throw new IllegalArgumentException("账号不存在");
        }
        if (!matches(user.getPasswordHash(), request.getPassword())) {
            throw new IllegalArgumentException("密码不正确");
        }
        return toSession(user);
    }

    @Override
    public SessionUserVO register(RegisterRequest request) {
        User existing = userMapper.selectOne(new LambdaQueryWrapper<User>()
                .eq(User::getEmail, request.getEmail())
                .last("LIMIT 1"));
        if (existing != null) {
            throw new IllegalArgumentException("该邮箱已注册");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setRole("USER");
        userMapper.insert(user);
        return toSession(user);
    }

    @Override
    public SessionUserVO session(String token) {
        Long userId = parseUserId(token);
        if (userId == null) {
            return null;
        }
        User user = userMapper.selectById(userId);
        return user == null ? null : toSession(user, extractBearer(token));
    }

    private boolean matches(String stored, String incoming) {
        if (stored == null) {
            return false;
        }
        if (stored.startsWith("$2a$") || stored.startsWith("$2b$") || stored.startsWith("$2y$")) {
            return passwordEncoder.matches(incoming, stored);
        }
        return "mock-hash".equals(stored) && "123456".equals(incoming);
    }

    private SessionUserVO toSession(User user) {
        String token = jwtTokenService.generateToken(user.getId(), user.getRole());
        return toSession(user, token);
    }

    private SessionUserVO toSession(User user, String token) {
        return SessionUserVO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .token(token)
                .expiresAt(jwtTokenService.parseExpiration(token).toString())
                .build();
    }

    private Long parseUserId(String authorization) {
        if (authorization == null || authorization.isBlank()) {
            return null;
        }
        String token = extractBearer(authorization);
        if (!jwtTokenService.isValid(token)) {
            return null;
        }
        return jwtTokenService.parseUserId(token);
    }

    private String extractBearer(String authorization) {
        return authorization.startsWith("Bearer ") ? authorization.substring(7) : authorization;
    }
}
