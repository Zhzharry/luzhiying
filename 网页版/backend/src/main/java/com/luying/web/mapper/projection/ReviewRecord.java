package com.luying.web.mapper.projection;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class ReviewRecord {
    private Long id;
    private Long authorId;
    private String campSlug;
    private String campName;
    private String author;
    private Integer overallScore;
    private String content;
    private String status;
    private LocalDate visitDate;
    private Integer helpfulCount;
    private LocalDateTime createdAt;
}
