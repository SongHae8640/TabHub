package com.tabHub.springwebservice.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/axios")
public class PostsController {
	private static final Logger logger = LoggerFactory.getLogger(DetailPostController.class);

	@GetMapping("/posts/search")
	public String getTabGroupList(@RequestParam("keyword") String keyword, @RequestParam("filter") String filter) {
		logger.debug(keyword);
		logger.debug(filter);
		return "getTabGroupList : "+keyword;
	}
}
