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
    private Long authorId;
    private String authorName;
    private String authorRole;
    private String publishedAt;
    private java.util.List<String> moodTags;
}
