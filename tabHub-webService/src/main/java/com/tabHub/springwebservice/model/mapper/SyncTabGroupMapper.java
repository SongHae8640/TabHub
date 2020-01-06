package com.tabHub.springwebservice.model.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.tabHub.springwebservice.entity.SyncTabEntity;
import com.tabHub.springwebservice.entity.SyncTabGroupEntity;

@Repository
@Mapper
public interface SyncTabGroupMapper {
	
	public void insertTabGroup(SyncTabGroupEntity syncTabGroupEntity);

	public void insertTab(SyncTabEntity tab);

}
