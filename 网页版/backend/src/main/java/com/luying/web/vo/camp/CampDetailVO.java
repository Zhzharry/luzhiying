package com.luying.web.vo.camp;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CampDetailVO {
    private Long id;
    private String slug;
    private String name;
    private String province;
    private String city;
    private String district;
    private String address;
    private String campType;
    private String coverImage;
    private List<String> gallery;
    private String priceType;
    private Integer priceMin;
    private Integer priceMax;
    private Boolean bookingRequired;
    private String openingStatus;
    private String sourceType;
    private String bestSeason;
    private String arrivalTips;
    private String riskTips;
    private String summary;
    private List<String> suitableFor;
    private List<String> rules;
    private List<String> tags;
    private FacilityVO facility;
    private Double score;
}
