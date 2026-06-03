package com.luying.web.vo.guide;

import lombok.Data;

@Data
public class GuideVO {
    private Long id;
    private String slug;
    private String title;
    private String summary;
    private String category;
    private String cityScope;
}
