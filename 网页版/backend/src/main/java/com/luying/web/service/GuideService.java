package com.luying.web.service;

import com.luying.web.vo.guide.GuideVO;
import com.luying.web.vo.guide.GuideDetailVO;

import java.util.List;

public interface GuideService {
    List<GuideVO> list(String keyword, String cityScope, String category);

    GuideDetailVO detail(String slug);
}
