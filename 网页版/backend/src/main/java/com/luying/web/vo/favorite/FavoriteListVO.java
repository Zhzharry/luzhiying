package com.luying.web.vo.favorite;

import com.luying.web.vo.camp.CampCardVO;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class FavoriteListVO {
    private Long id;
    private String name;
    private Integer itemCount;
    private List<CampCardVO> camps;
}
