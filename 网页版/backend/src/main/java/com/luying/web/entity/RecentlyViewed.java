package com.luying.web.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@TableName("recently_viewed")
public class RecentlyViewed {
    @TableId(type = IdType.AUTO)
    private Long id;
    private Long userId;
    private Long campId;
    private LocalDateTime viewedAt;
}
