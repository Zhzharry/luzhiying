package com.luying.web.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("camp_facility")
public class CampFacility {
    @TableId(type = IdType.AUTO)
    private Long id;
    private Long campId;
    private Boolean hasToilet;
    private Boolean hasShower;
    private Boolean hasPower;
    private Boolean hasWater;
    private Boolean allowFire;
    private Boolean canOvernight;
    private Boolean petFriendly;
    private Boolean familyFriendly;
    private Boolean carAccessible;
    private String signalStrength;
    private String roadCondition;
    private String parkingDistance;
}
