package com.tabHub.springwebservice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

	public void syncLocalAndTabHub(List<SyncTabGroupEntity> syncTabGroups) {
		// 기존 내용 조회
		List<SyncTabGroupEntity> oldSyncTabGroup = syncTabGroupMapper.selectTabGroupListByAccountId(syncTabGroups.get(0).getAccountId());
		
		for (SyncTabGroupEntity syncTabGroupEntity : oldSyncTabGroup) {
			List<SyncTabEntity> tabs = syncTabGroupMapper.selectTabListBySyncId(syncTabGroupEntity.getId());
			syncTabGroupEntity.setTabs(tabs);
		}
		System.out.println();
		
		/// 기존 탭그룹과 비교
			/// 다르면 > 탭그룹 id에 해당하는 탭그룹 삭제 
		
			// 새로운 탭그룹 저장
		//insertTabGroupList(syncTabGroups);
		
		
		
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
