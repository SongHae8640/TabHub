package com.tabHub.springwebservice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tabHub.springwebservice.model.mapper.MybatisTestMapper;


@Service
public class MybatisTestService {
	
	@Autowired
	private MybatisTestMapper mybatisTestMapper;

    public List<String> get() {
        return mybatisTestMapper.getUsers();
    }
}
