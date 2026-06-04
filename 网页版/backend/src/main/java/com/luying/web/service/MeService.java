package com.luying.web.service;

import com.luying.web.vo.me.MeOverviewVO;
import com.luying.web.vo.review.ReviewVO;

import java.util.List;

public interface MeService {
    MeOverviewVO overview(String authorization);

    List<ReviewVO> reviews(String authorization);
}
