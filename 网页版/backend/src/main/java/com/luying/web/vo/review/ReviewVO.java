package com.luying.web.vo.review;

import lombok.Data;

@Data
public class ReviewVO {
    private Long id;
    private String campSlug;
    private String campName;
    private String author;
    private Integer overallScore;
    private String content;
    private String status;
    private String visitDate;
    private java.util.List<String> tags;
}
