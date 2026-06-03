package com.luying.web.vo.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SessionUserVO {
    private Long id;
    private String name;
    private String email;
    private String role;
    private String token;
}
