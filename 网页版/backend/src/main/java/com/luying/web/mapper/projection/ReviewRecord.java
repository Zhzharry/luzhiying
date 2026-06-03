package com.luying.web.mapper.projection;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ReviewRecord {
    private Long id;
    private String campSlug;
    private String campName;
    private String author;
    private Integer overallScore;
    private String content;
    private String status;
    private LocalDate visitDate;
}
