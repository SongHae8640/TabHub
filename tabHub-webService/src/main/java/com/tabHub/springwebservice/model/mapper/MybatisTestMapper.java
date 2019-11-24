package com.tabHub.springwebservice.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface MybatisTestMapper {
    List<String> getUsers();
}
