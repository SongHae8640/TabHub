package com.tabHub.springwebservice.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.tabHub.springwebservice.domain.Account;

@Repository
@Mapper
public interface UserMapper {
	
	//user맞는지
	public Account readUser(String username);
	
	//권한 맞는지
    public List<String> readAuthority(String username);

}
