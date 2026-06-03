package com.luying.web.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.luying.web.entity.Camp;
import com.luying.web.entity.Guide;
import com.luying.web.mapper.CampMapper;
import com.luying.web.mapper.GuideMapper;
import com.luying.web.service.GuideService;
import com.luying.web.vo.guide.GuideDetailVO;
import com.luying.web.vo.guide.GuideVO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GuideServiceImpl implements GuideService {

    private final GuideMapper guideMapper;
    private final CampMapper campMapper;

    public GuideServiceImpl(GuideMapper guideMapper, CampMapper campMapper) {
        this.guideMapper = guideMapper;
        this.campMapper = campMapper;
    }

    @Override
    public List<GuideVO> list() {
        return guideMapper.selectList(new LambdaQueryWrapper<Guide>()
                        .eq(Guide::getStatus, "PUBLISHED")
                        .orderByDesc(Guide::getPublishedAt)
                        .orderByDesc(Guide::getId))
                .stream()
                .map(this::toGuideVO)
                .toList();
    }

    @Override
    public GuideDetailVO detail(String slug) {
        Guide guide = guideMapper.selectOne(new LambdaQueryWrapper<Guide>().eq(Guide::getSlug, slug).last("LIMIT 1"));
        if (guide == null) {
            return null;
        }

        List<String> relatedCampSlugs = campMapper.selectList(new LambdaQueryWrapper<Camp>()
                        .eq(guide.getCityScope() != null && !guide.getCityScope().isBlank(), Camp::getCity, guide.getCityScope())
                        .last("LIMIT 3"))
                .stream()
                .map(Camp::getSlug)
                .toList();

        return GuideDetailVO.builder()
                .id(guide.getId())
                .slug(guide.getSlug())
                .title(guide.getTitle())
                .summary(guide.getSummary())
                .category(guide.getCategory())
                .cityScope(guide.getCityScope())
                .content(guide.getContent())
                .relatedCampSlugs(relatedCampSlugs)
                .build();
    }

    private GuideVO toGuideVO(Guide guide) {
        GuideVO vo = new GuideVO();
        vo.setId(guide.getId());
        vo.setSlug(guide.getSlug());
        vo.setTitle(guide.getTitle());
        vo.setSummary(guide.getSummary());
        vo.setCategory(guide.getCategory());
        vo.setCityScope(guide.getCityScope());
        return vo;
    }
}
