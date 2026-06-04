package com.luying.web.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@TableName("favorite_list_item")
public class FavoriteListItem {
    @TableId(type = IdType.AUTO)
    private Long id;
    private Long listId;
    private Long campId;
    private LocalDateTime createdAt;
}
