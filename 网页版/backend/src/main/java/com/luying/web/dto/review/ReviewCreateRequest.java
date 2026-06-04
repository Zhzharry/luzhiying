package com.luying.web.dto.review;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class ReviewCreateRequest {
    @NotNull
    private Long campId;

    @NotNull
    @Min(1)
    @Max(5)
    private Integer overallScore;

    @NotNull
    @Min(1)
    @Max(5)
    private Integer sceneScore;

    @NotNull
    @Min(1)
    @Max(5)
    private Integer cleanScore;

    @NotNull
    @Min(1)
    @Max(5)
    private Integer quietScore;

    @NotNull
    @Min(1)
    @Max(5)
    private Integer accessScore;

    @NotNull
    @Min(1)
    @Max(5)
    private Integer newbieScore;

    @NotNull
    @Min(1)
    @Max(5)
    private Integer familyScore;

    @NotNull
    @Min(1)
    @Max(5)
    private Integer costScore;

    @Size(min = 10, max = 500)
    private String content;

    @NotNull
    private LocalDate visitDate;

    private List<String> recommendTags;
    private List<String> warningTags;
}
