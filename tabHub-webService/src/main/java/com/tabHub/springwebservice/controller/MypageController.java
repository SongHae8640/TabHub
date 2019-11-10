package com.tabHub.springwebservice.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/axios")
public class MypageController {
	private static final Logger logger = LoggerFactory.getLogger(MypageController.class);
	
	@GetMapping("/accounts/{accountId}/comments")
	public String getCommentListByAccountId(@PathVariable("accountId") int accountId) {
		logger.debug("accountId = "+accountId);
		return "getCommentListByPostId : "+accountId;
	}
}
