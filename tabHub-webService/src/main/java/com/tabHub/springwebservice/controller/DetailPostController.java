package com.tabHub.springwebservice.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@RequestMapping("/axios")
public class DetailPostController {
	private static final Logger logger = LoggerFactory.getLogger(DetailPostController.class);
	
	@GetMapping("/posts/{postId}")
	public String getPost(@PathVariable("postId") int postId) {
		logger.debug(""+postId);
		return "getPost : "+postId;
	}
	
	
	@GetMapping("/posts/{postId}/comments")
	public String getCommentListByPostId(@PathVariable("postId") int postId) {
		logger.debug("postId = "+postId);
		return "getCommentListByPostId : "+postId;
	}
	
}
