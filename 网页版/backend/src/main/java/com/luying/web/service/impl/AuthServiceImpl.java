package com.luying.web.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.luying.web.dto.auth.LoginRequest;
import com.luying.web.dto.auth.RegisterRequest;
import com.luying.web.entity.User;
import com.luying.web.mapper.UserMapper;
import com.luying.web.service.AuthService;
import com.luying.web.vo.auth.SessionUserVO;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserMapper userMapper;

    public AuthServiceImpl(UserMapper userMapper) {
        this.userMapper = userMapper;
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
        user.setPasswordHash(request.getPassword());
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
        return user == null ? null : toSession(user);
    }

    private boolean matches(String stored, String incoming) {
        if (stored == null) {
            return false;
        }
        if (stored.equals(incoming)) {
            return true;
        }
        return "mock-hash".equals(stored) && "123456".equals(incoming);
    }

    private SessionUserVO toSession(User user) {
        return SessionUserVO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .token("mock-token-" + user.getId())
                .build();
    }

    private Long parseUserId(String authorization) {
        if (authorization == null || authorization.isBlank()) {
            return null;
        }
        String token = authorization.startsWith("Bearer ") ? authorization.substring(7) : authorization;
        if (!token.startsWith("mock-token-")) {
            return null;
        }
        try {
            return Long.parseLong(token.substring("mock-token-".length()));
        } catch (NumberFormatException ignored) {
            return null;
        }
    }
}
