package com.luying.web.vo.guide;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class GuideDetailVO {
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
    private List<String> moodTags;
    private String content;
    private List<String> relatedCampSlugs;
}
