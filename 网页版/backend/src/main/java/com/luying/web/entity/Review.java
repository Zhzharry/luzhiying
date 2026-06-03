package com.luying.web.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@TableName("review")
public class Review {
    @TableId(type = IdType.AUTO)
    private Long id;
    private Long campId;
    private Long userId;
    private Integer overallScore;
    private Integer sceneScore;
    private Integer cleanScore;
    private Integer quietScore;
    private Integer accessScore;
    private Integer newbieScore;
    private Integer familyScore;
    private Integer costScore;
    private String content;
    private LocalDate visitDate;
    private Integer helpfulCount;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
