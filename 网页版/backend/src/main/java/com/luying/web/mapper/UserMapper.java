package com.luying.web.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.luying.web.entity.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper extends BaseMapper<User> {
}
