package com.tabHub.springwebservice.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class MainController {
	
	@GetMapping("/")
	public String goMainPage() {
		return "main";
	}
	
	@GetMapping("/axios/posts/recommend/{accountId}")
	public String getRecommends(@PathVariable int accountId) {
		//메인페이지 추천 탭그룹, 사용자별로 다르게 보내주기
		//id, title, writer, views
		String result = "[{id:\"1\",title:\"example\"}]";
		
		return "getRecommends : "+result;
	}
	
	@GetMapping("/axios/notifications/count/{accountId}")
	public String getNotificationCount(@PathVariable int accountId) {
		//사용자별 알림개수 보내주기
		return "";
	}
}
