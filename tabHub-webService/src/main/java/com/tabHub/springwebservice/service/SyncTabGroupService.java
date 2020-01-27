package com.tabHub.springwebservice.service;

import java.util.List;

import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tabHub.springwebservice.entity.SyncTabEntity;
import com.tabHub.springwebservice.entity.SyncTabGroupEntity;
import com.tabHub.springwebservice.model.mapper.SyncTabGroupMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
public class SyncTabGroupService {
	@Autowired
	SyncTabGroupMapper syncTabGroupMapper;

	public List<SyncTabGroupEntity> syncExtensionWithTabHub(List<SyncTabGroupEntity> newSyncTabGroups) {
//		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//		User user = (User) auth.getPrincipal();
		String tempAccountId = "user";
		
		//새로운 탭그룹 저장
		insertTabGroupList(newSyncTabGroups);
		
		
		// 합쳐진 탭그룹 조회
		List<SyncTabGroupEntity> sumSyncTabGroup = syncTabGroupMapper.selectTabGroupListByAccountId(tempAccountId);
		
		for (SyncTabGroupEntity syncTabGroupEntity : sumSyncTabGroup) {
			List<SyncTabEntity> tabs = syncTabGroupMapper.selectTabListBySyncId(syncTabGroupEntity.getId());
			syncTabGroupEntity.setTabs(tabs);
		}
		
		
		return sumSyncTabGroup;
		
	}

	public void deletTabGroupsAndTabs() {
		syncTabGroupMapper.deleteTabGroups();
		syncTabGroupMapper.deleteTabs();
		
	}

	public void insertTabGroupList(List<SyncTabGroupEntity> oldTabGroupList) {
		for (SyncTabGroupEntity syncTabGroupEntity : oldTabGroupList) {
			syncTabGroupMapper.insertTabGroup(syncTabGroupEntity);
			
			///id 받아서 같이 insert 
			List<SyncTabEntity> tabs = syncTabGroupEntity.getTabs();
			for (SyncTabEntity tab : tabs) {
				tab.setSyncId(syncTabGroupEntity.getId());
				log.debug("tab : {}", tab);
				syncTabGroupMapper.insertTab(tab);
				
			}
			
			System.out.println();
		}
		
	}
	
	

}
