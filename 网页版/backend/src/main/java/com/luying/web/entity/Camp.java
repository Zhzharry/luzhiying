package com.luying.web.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@TableName("camp")
public class Camp {
    @TableId(type = IdType.AUTO)
    private Long id;
    private String slug;
    private String name;
    private String province;
    private String city;
    private String district;
    private String address;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private String mapRegionKey;
    private Integer mapX;
    private Integer mapY;
    private String campType;
    private String coverImage;
    private String galleryJson;
    private String priceType;
    private Integer priceMin;
    private Integer priceMax;
    private Boolean bookingRequired;
    private String openingStatus;
    private String sourceType;
    private String bestSeason;
    private String arrivalTips;
    private String riskTips;
    private String suitableForJson;
    private String rulesJson;
    private String summary;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
