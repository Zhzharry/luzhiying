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
    private String content;
    private List<String> relatedCampSlugs;
}
