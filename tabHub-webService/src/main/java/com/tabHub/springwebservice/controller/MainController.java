package com.tabHub.springwebservice.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MainController {
	
	@ResponseBody
	@GetMapping("/posts/recommend/{accountId}")
	public String getRecommends(@PathVariable int accountId) {
		
		//메인페이지 추천 탭그룹, 사용자별로 다르게 보내주기
		return "문자열이 그대로 가는지";
	}
}
