package com.tabHub.springwebservice.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;


@Controller
@Slf4j
public class MypageController {
	
	@GetMapping("/mypage")
	public String goMypage() {
		return "mypage";
	}
	
	
}
