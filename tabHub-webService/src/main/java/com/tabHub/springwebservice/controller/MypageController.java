package com.tabHub.springwebservice.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.catalina.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.tabHub.springwebservice.entity.SyncTabGroupEntity;
import com.tabHub.springwebservice.service.SyncTabGroupService;

import lombok.extern.slf4j.Slf4j;


@Controller
@Slf4j
public class MypageController {
	
	@Autowired
	SyncTabGroupService syncTabGroupService;
	
	@GetMapping("/mypage")
	public String goMypage() {
		return "mypage";
	}
	
	@ResponseBody
	@CrossOrigin("*")
	@PostMapping("/ajax/account/{accountId}/tabGroups")
	public List<SyncTabGroupEntity> syncLocalWithGlobal(@PathVariable("accountId") String accountId, @RequestBody List<SyncTabGroupEntity> newSyncTabGroups) {

//		///로그인이 적용되어을때 사용
//		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//		User user = (User) auth.getPrincipal();
//		
//		if(! user.getUsername().equals(accountId) ) {
//			
//			///error and return
//		}
		
		for (SyncTabGroupEntity syncTabGroupEntity : newSyncTabGroups) {
			syncTabGroupEntity.setAccountId(accountId);
			log.debug("syncTabGroupEntity = {}",syncTabGroupEntity.toString());
		}
		
		
		List<SyncTabGroupEntity> sumSyncTabGroups = syncTabGroupService.syncExtensionWithTabHub(newSyncTabGroups);
		
		
		
		return sumSyncTabGroups;
	}
	
	
}
