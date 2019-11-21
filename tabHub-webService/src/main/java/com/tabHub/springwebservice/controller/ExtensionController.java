package com.tabHub.springwebservice.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/ajax")
public class ExtensionController {
	
	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
	SecurityContextRepository repository;

	@PostMapping(value = "/login")
	@ResponseBody
	public ModelMap login(HttpServletRequest request, HttpServletResponse response,
		@RequestParam(value = "id") String username,
		@RequestParam(value = "password") String password) {

		ModelMap map = new ModelMap();

		UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
			username, password);

		try {
			// 로그인
			Authentication auth = authenticationManager.authenticate(token);	//토큰 검증. 성공시 auth 인스턴스 리턴
			SecurityContextHolder.getContext().setAuthentication(auth);
			repository.saveContext(SecurityContextHolder.getContext(), request, response);

			map.put("success", true);
			//map.put("",); 확장 프로그램으로 보내줄 내용 
		} catch (BadCredentialsException e) {
			map.put("success", false);
			map.put("message", e.getMessage());
		}

		return map;
	}
	
}
