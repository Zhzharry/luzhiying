package com.luying.web.vo.me;

import com.luying.web.vo.auth.SessionUserVO;
import com.luying.web.vo.camp.CampCardVO;
import com.luying.web.vo.review.ReviewVO;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class MeOverviewVO {
    private SessionUserVO user;
    private Integer favoriteCount;
    private Integer recentCount;
    private Integer reviewCount;
    private List<CampCardVO> favoriteCamps;
    private List<CampCardVO> recentCamps;
    private List<ReviewVO> myReviews;
}
