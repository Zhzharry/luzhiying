package com.luying.web.dto.favorite;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class FavoriteItemRequest {
    @NotBlank
    private String campSlug;
}
