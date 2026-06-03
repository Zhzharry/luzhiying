package com.luying.web.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.luying.web.entity.Review;
import com.luying.web.mapper.projection.ReviewRecord;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ReviewMapper extends BaseMapper<Review> {

    @Select("""
            SELECT ROUND(AVG(r.overall_score), 1)
            FROM review r
            WHERE r.camp_id = #{campId} AND r.status = 'APPROVED'
            """)
    Double selectAverageScoreByCampId(@Param("campId") Long campId);

    @Select("""
            SELECT
              r.id,
              c.slug AS camp_slug,
              c.name AS camp_name,
              u.name AS author,
              r.overall_score,
              r.content,
              r.status,
              r.visit_date
            FROM review r
            JOIN camp c ON c.id = r.camp_id
            JOIN user u ON u.id = r.user_id
            WHERE c.slug = #{slug}
            ORDER BY r.visit_date DESC, r.id DESC
            """)
    List<ReviewRecord> selectByCampSlug(@Param("slug") String slug);

    @Select("""
            SELECT
              r.id,
              c.slug AS camp_slug,
              c.name AS camp_name,
              u.name AS author,
              r.overall_score,
              r.content,
              r.status,
              r.visit_date
            FROM review r
            JOIN camp c ON c.id = r.camp_id
            JOIN user u ON u.id = r.user_id
            ORDER BY r.created_at DESC, r.id DESC
            """)
    List<ReviewRecord> selectAllWithRelations();
}
