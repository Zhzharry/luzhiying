package com.luying.web.vo.camp;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FacilityVO {
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
