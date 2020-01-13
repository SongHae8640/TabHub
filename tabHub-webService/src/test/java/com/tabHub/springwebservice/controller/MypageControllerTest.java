package com.tabHub.springwebservice.controller;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.tabHub.springwebservice.entity.SyncTabEntity;
import com.tabHub.springwebservice.entity.SyncTabGroupEntity;
import com.tabHub.springwebservice.service.SyncTabGroupService;

import lombok.extern.slf4j.Slf4j;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest
@Slf4j
public class MypageControllerTest {
	
	@Autowired
	SyncTabGroupService syncTabGroupService;
	
	@Test
	@Order(1)
	public void initSyncTabGroup() {
		//DB에 있는 SYNC_TG, SYNC_TAB 비우기
		syncTabGroupService.deletTabGroupsAndTabs();
		
		
		//SYNC_TG, SYNC_TAB에 초기값 넣기
		List<SyncTabGroupEntity> oldTabGroupList = getTestTabGroupList();
		
		syncTabGroupService.insertTabGroupList(oldTabGroupList);
	}
	
	
	@Test
	@Order(2)
	public void syncLocalAndTabHub() {
		log.debug("");
		
	}
	
	@Test
	@Order(3)
	public void testOrder() {
		log.debug("");
	}


	private List<SyncTabGroupEntity> getTestTabGroupList() {
		List<SyncTabGroupEntity> oldTabGroupList = new ArrayList<SyncTabGroupEntity>();
		
		SyncTabGroupEntity syncTabGroupEntity1 = new SyncTabGroupEntity();
		syncTabGroupEntity1.setAccountId("user");
		syncTabGroupEntity1.setCategory("Storage");
		syncTabGroupEntity1.setLocalId(1578212342149L);
		syncTabGroupEntity1.setUseDate(1578234870741L);
		syncTabGroupEntity1.setTitle("title1");
		syncTabGroupEntity1.setTabs(new ArrayList<SyncTabEntity>());
		
		SyncTabEntity syncTabEntity11 = new SyncTabEntity();
		syncTabEntity11.setTitle("Google 번역");
		syncTabEntity11.setUrl("https://translate.google.com/#view=home&op=translate&sl=en&tl=ko&text=nested");
		syncTabGroupEntity1.getTabs().add(syncTabEntity11);
		
		SyncTabEntity syncTabEntity12 = new SyncTabEntity();
		syncTabEntity12.setTitle("내 드라이브 - Google 드라이브");
		syncTabEntity12.setUrl("https://drive.google.com/drive/u/0/my-drive");
		syncTabGroupEntity1.getTabs().add(syncTabEntity12);
		
		SyncTabEntity syncTabEntity13 = new SyncTabEntity();
		syncTabEntity13.setTitle("login");
		syncTabEntity13.setUrl("http://localhost:9091/account/login");
		syncTabGroupEntity1.getTabs().add(syncTabEntity13);

		oldTabGroupList.add(syncTabGroupEntity1);
		
		SyncTabGroupEntity syncTabGroupEntity2 = new SyncTabGroupEntity();
		syncTabGroupEntity2.setAccountId("user");
		syncTabGroupEntity2.setCategory("Favorite");
		syncTabGroupEntity2.setLocalId(1577843720256L);
		syncTabGroupEntity2.setUseDate(1577882093809L);
		syncTabGroupEntity2.setTitle("title2");
		syncTabGroupEntity2.setTabs(new ArrayList<SyncTabEntity>());
		
		SyncTabEntity syncTabEntity21 = new SyncTabEntity();
		syncTabEntity21.setTitle("#Monday II 월요병 극복시켜주는 신나는 팝송 10곡 - YouTube");
		syncTabEntity21.setUrl("https://www.youtube.com/watch?v=OUJhceca_3c");
		syncTabGroupEntity2.getTabs().add(syncTabEntity21);
		
		SyncTabEntity syncTabEntity22 = new SyncTabEntity();
		syncTabEntity22.setTitle("[SPRING] 스프링 보안으로 사용자 업데이트시 권한을 다시로드하는 방법 복붙노트");
		syncTabEntity22.setUrl("https://cnpnote.tistory.com/entry/SPRING-%EC%8A%A4%ED%94%84%EB%A7%81-%EB%B3%B4%EC%95%88%EC%9C%BC%EB%A1%9C-%EC%82%AC%EC%9A%A9%EC%9E%90-%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8%EC%8B%9C-%EA%B6%8C%ED%95%9C%EC%9D%84-%EB%8B%A4%EC%8B%9C%EB%A1%9C%EB%93%9C%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95");
		syncTabGroupEntity2.getTabs().add(syncTabEntity22);
		
		SyncTabEntity syncTabEntity23 = new SyncTabEntity();
		syncTabEntity23.setTitle("2019-12-14(토) 회의록 - Google 문서");
		syncTabEntity23.setUrl("https://docs.google.com/document/d/1SRudBf-4896Qh9C-vtSgrkjySfHo5OqZMDDAGOHe85o/edit");
		syncTabGroupEntity2.getTabs().add(syncTabEntity23);

		oldTabGroupList.add(syncTabGroupEntity2);
		
		return oldTabGroupList;
	}
	
	
}
