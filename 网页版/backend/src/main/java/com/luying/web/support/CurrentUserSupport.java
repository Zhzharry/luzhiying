package com.luying.web.support;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.luying.web.common.exception.BusinessException;
import com.luying.web.entity.User;
import com.luying.web.mapper.UserMapper;
import com.luying.web.security.JwtTokenService;
import com.luying.web.vo.auth.SessionUserVO;
import org.springframework.stereotype.Component;

import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

@Component
public class CurrentUserSupport {

    private final UserMapper userMapper;
    private final JwtTokenService jwtTokenService;

    public CurrentUserSupport(UserMapper userMapper, JwtTokenService jwtTokenService) {
        this.userMapper = userMapper;
        this.jwtTokenService = jwtTokenService;
    }

    public User requireUser(String authorization) {
        Long userId = parseUserId(authorization);
        if (userId == null) {
            throw new BusinessException(401, "请先登录");
        }
        User user = userMapper.selectById(userId);
        if (user == null) {
            throw new BusinessException(401, "用户不存在");
        }
        return user;
    }

    public User requireAdmin(String authorization) {
        User user = requireUser(authorization);
        if (!"ADMIN".equals(user.getRole())) {
            throw new BusinessException(403, "无权限访问管理接口");
        }
        return user;
    }

    public User optionalUser(String authorization) {
        Long userId = parseUserId(authorization);
        return userId == null ? null : userMapper.selectById(userId);
    }

    public SessionUserVO toSession(User user) {
        String token = jwtTokenService.generateToken(user.getId(), user.getRole());
        return toSession(user, token);
    }

    public SessionUserVO toSession(User user, String token) {
        return SessionUserVO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .token(token)
                .expiresAt(jwtTokenService.parseExpiration(token)
                        .atZone(ZoneId.systemDefault())
                        .toLocalDateTime()
                        .format(DateTimeFormatter.ISO_LOCAL_DATE_TIME))
                .build();
    }

    public User findByEmail(String email) {
        return userMapper.selectOne(new LambdaQueryWrapper<User>()
                .eq(User::getEmail, email)
                .last("LIMIT 1"));
    }

    private Long parseUserId(String authorization) {
        if (authorization == null || authorization.isBlank()) {
            return null;
        }
        String token = authorization.startsWith("Bearer ") ? authorization.substring(7) : authorization;
        if (!jwtTokenService.isValid(token)) {
            return null;
        }
        return jwtTokenService.parseUserId(token);
    }
}
