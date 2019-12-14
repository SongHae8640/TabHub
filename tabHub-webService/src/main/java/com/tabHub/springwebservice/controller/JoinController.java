package com.tabHub.springwebservice.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class JoinController {
	private static final Logger logger = LoggerFactory.getLogger(JoinController.class);
	
	@GetMapping("/account/join")
	public String join() {
		return "join";
	}
	
	@PostMapping("/account/join")
	public String join(String id, String pw, String rePw, String email) {
		logger.debug("id = "+id+", pw = "+pw+", rePw = "+rePw+", email = "+email);
		return "";
	}
}
