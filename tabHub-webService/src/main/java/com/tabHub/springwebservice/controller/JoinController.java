package com.tabHub.springwebservice.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/axios")
public class JoinController {
	private static final Logger logger = LoggerFactory.getLogger(JoinController.class);
	
	@PostMapping("/account/join")
	public String join(String id, String pw, String rePw, String email) {
		logger.debug("id = "+id+", pw = "+pw+", rePw = "+rePw+", email = "+email);
		return "";
	}
}
