package com.tabHub.springwebservice.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.tabHub.springwebservice.entity.SyncTabEntity;
import com.tabHub.springwebservice.entity.SyncTabGroupEntity;

@Repository
@Mapper
public interface SyncTabGroupMapper {
	
	public void insertTabGroup(SyncTabGroupEntity syncTabGroupEntity);

	public void insertTab(SyncTabEntity tab);

	public List<SyncTabGroupEntity> selectTabGroupListByAccountId(String accountId);

	public List<SyncTabEntity> selectTabListBySyncId(Long syncId);

	public void deleteTabGroups();

	public void deleteTabs();

	public void deleteTabsByTabGroupId(Long syncId);

	public void deleteTabGroupByTabGroupId(Long syncId);

	public void updateTabGroup(SyncTabGroupEntity updateTabGroup);

}
