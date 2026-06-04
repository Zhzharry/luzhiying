package com.luying.web.vo.camp;

import lombok.Data;

@Data
public class CampCardVO {
    private Long id;
    private String slug;
    private String name;
    private String city;
    private String district;
    private String summary;
    private String priceText;
    private Double score;
    private Double distanceKm;
}
