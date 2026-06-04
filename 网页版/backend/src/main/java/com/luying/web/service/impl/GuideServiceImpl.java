package com.luying.web.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.luying.web.entity.Camp;
import com.luying.web.entity.Guide;
import com.luying.web.entity.User;
import com.luying.web.mapper.CampMapper;
import com.luying.web.mapper.GuideMapper;
import com.luying.web.mapper.UserMapper;
import com.luying.web.service.GuideService;
import com.luying.web.vo.guide.GuideDetailVO;
import com.luying.web.vo.guide.GuideVO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GuideServiceImpl implements GuideService {

    private final GuideMapper guideMapper;
    private final CampMapper campMapper;
    private final UserMapper userMapper;

    public GuideServiceImpl(GuideMapper guideMapper, CampMapper campMapper, UserMapper userMapper) {
        this.guideMapper = guideMapper;
        this.campMapper = campMapper;
        this.userMapper = userMapper;
    }

    @Override
    public List<GuideVO> list(String keyword, String cityScope, String category) {
        return guideMapper.selectList(new LambdaQueryWrapper<Guide>()
                        .eq(Guide::getStatus, "PUBLISHED")
                        .eq(cityScope != null && !cityScope.isBlank(), Guide::getCityScope, cityScope)
                        .eq(category != null && !category.isBlank(), Guide::getCategory, category)
                        .and(keyword != null && !keyword.isBlank(), wrapper -> wrapper
                                .like(Guide::getTitle, keyword)
                                .or()
                                .like(Guide::getSummary, keyword)
                                .or()
                                .like(Guide::getCategory, keyword)
                                .or()
                                .like(Guide::getContent, keyword))
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

        User author = resolveAuthor(guide);
        return GuideDetailVO.builder()
                .id(guide.getId())
                .slug(guide.getSlug())
                .title(guide.getTitle())
                .summary(guide.getSummary())
                .category(guide.getCategory())
                .cityScope(guide.getCityScope())
                .authorId(author.getId())
                .authorName(author.getName())
                .authorRole(author.getRole())
                .publishedAt(guide.getPublishedAt() == null ? "" : guide.getPublishedAt().toString())
                .moodTags(resolveMoodTags(guide))
                .content(guide.getContent())
                .relatedCampSlugs(relatedCampSlugs)
                .build();
    }

    private GuideVO toGuideVO(Guide guide) {
        User author = resolveAuthor(guide);
        GuideVO vo = new GuideVO();
        vo.setId(guide.getId());
        vo.setSlug(guide.getSlug());
        vo.setTitle(guide.getTitle());
        vo.setSummary(guide.getSummary());
        vo.setCategory(guide.getCategory());
        vo.setCityScope(guide.getCityScope());
        vo.setAuthorId(author.getId());
        vo.setAuthorName(author.getName());
        vo.setAuthorRole(author.getRole());
        vo.setPublishedAt(guide.getPublishedAt() == null ? "" : guide.getPublishedAt().toString());
        vo.setMoodTags(resolveMoodTags(guide));
        return vo;
    }

    private User resolveAuthor(Guide guide) {
        long authorId = guide.getId() % 2 == 0 ? 3L : 2L;
        User author = userMapper.selectById(authorId);
        if (author == null) {
            author = userMapper.selectById(1L);
        }
        return author;
    }

    private List<String> resolveMoodTags(Guide guide) {
        String category = guide.getCategory() == null ? "" : guide.getCategory();
        if (category.contains("装备")) {
            return List.of("装备日常", "经验分享");
        }
        if (category.contains("亲子")) {
            return List.of("亲子露营", "周末记录");
        }
        if (category.contains("风险")) {
            return List.of("现场提醒", "生活观察");
        }
        return List.of("周末生活", "露营随笔");
    }
}
