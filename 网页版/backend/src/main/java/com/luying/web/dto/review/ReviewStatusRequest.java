package com.luying.web.dto.review;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ReviewStatusRequest {
    @NotBlank
    private String status;
}
