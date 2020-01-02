package com.tabHub.springwebservice.controller;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

import lombok.extern.slf4j.Slf4j;


@Controller
@Slf4j
public class MypageController {
	
	@GetMapping("/mypage")
	public String goMypage() {
		return "mypage";
	}
	
	@ResponseBody
	@CrossOrigin("*")
	@PostMapping("/ajax/account/{accountId}/tabGroup")
	public Map<String, Object> syncLocalAndTabHub(@PathVariable("accountId") String accountId, @RequestBody SyncTabGroupEntity syncTabGroup) {
		Map<String , Object> map = new HashMap<String, Object>();
		map.put("name", "호호");
		map.put("age", 28);	
		
		
		log.debug(syncTabGroup.toString());
		log.debug("acccount id = {}",accountId);
		
		
		return map;
	}
	
	
}
