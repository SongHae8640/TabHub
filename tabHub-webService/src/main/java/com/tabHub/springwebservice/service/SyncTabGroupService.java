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

	public List<SyncTabGroupEntity> addTabGroups(List<SyncTabGroupEntity> newSyncTabGroups) {
//		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//		User user = (User) auth.getPrincipal();
		String tempAccountId = "user";
		
		//새로운 탭그룹 저장
		for (SyncTabGroupEntity syncTabGroupEntity : newSyncTabGroups) {
			syncTabGroupMapper.insertTabGroup(syncTabGroupEntity);
			
			///id 받아서 같이 insert 
			List<SyncTabEntity> tabs = syncTabGroupEntity.getTabs();
			for (SyncTabEntity tab : tabs) {
				tab.setSyncId(syncTabGroupEntity.getId());
				log.debug("tab : {}", tab);
				syncTabGroupMapper.insertTab(tab);
				
			}
			
			//System.out.println();
		}
		
		
		// 합쳐진 탭그룹 조회
		return selectTabGroupsByAccountId(tempAccountId);
		
	}
	
	public List<SyncTabGroupEntity> deleteTabGroups(List<SyncTabGroupEntity> deletedTabGroups) {
//		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//		User user = (User) auth.getPrincipal();
		String tempAccountId = "user";
		
//		for (SyncTabGroupEntity deletedTabGroup : deletedTabGroups) {
//			
//			///나중에 삭제가 아니라 비활성화 시킬 수 도 있으니까 cascade 안하고 따로 해줌
//			//tab먼저 삭제
//			syncTabGroupMapper.deleteTabsByTabGroupId(deletedTabGroup.getId());
//			
//			//tabGroup 삭제
//			syncTabGroupMapper.deleteTabGroupByTabGroupId(deletedTabGroup.getId());
//		}

		
		//삭제된 이후의 탭그룹 조회
		return selectTabGroupsByAccountId(tempAccountId);
	}
	
	public List<SyncTabGroupEntity> selectTabGroupsByAccountId(String accountId){
		// 합쳐진 탭그룹 조회
		List<SyncTabGroupEntity> sumSyncTabGroup = syncTabGroupMapper.selectTabGroupListByAccountId(accountId);
		
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


}
