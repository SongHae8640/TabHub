package com.tabHub.springwebservice.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.tabHub.springwebservice.entity.AccountEntity;

@Repository
@Mapper
public interface AccountMapper {
	String getAccount();

}
