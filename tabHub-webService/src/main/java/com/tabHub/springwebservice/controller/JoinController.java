package com.tabHub.springwebservice.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import com.tabHub.springwebservice.entity.AccountEntity;
import com.tabHub.springwebservice.service.AccountService;
import com.tabHub.springwebservice.service.EmailService;
import com.tabHub.springwebservice.service.UserDetailsServiceImpl;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class JoinController {
	
	@Autowired
	AccountService accountService;
	
	@Autowired
	private EmailService emailService;
	
	@Autowired
	UserDetailsServiceImpl userDetailsServiceImpl;
	
	@GetMapping("/account/join")
	public String join() {
		return "join";
	}
	
	@PostMapping("/account/join")
	public String join(@RequestParam String id, @RequestParam String pw, @RequestParam String rePw, @RequestParam String email) {
		//pw와 rePw 일치 여부 확인
		if(!pw.equals(rePw)) {
			
			///에러 메세지와 함께
			//join 페이지로 이동
			return "join";
		}
		
		//해당 정보로 회원 가입
		AccountEntity accountEntity = new AccountEntity(id,pw,email);
		
		//계정 추가
		accountService.insertAccount(accountEntity);
		
		//이메일 발송
		emailService.sendMail(accountEntity.getEmail(), "Tab Hub 가입을 축하드립니다.", "email check code : "+accountEntity.getEmailCheckCode());
		
		
		///mav로 변경해서 로그인 정보랑 같이 보냄
		return "joinCheck";
	}
	
	@GetMapping("/account/joinCheck")
	public String goJoinCheck() {
		return "joinCheck";
	}
	
	
	@PostMapping("/account/joinCheck")
	public String join(@RequestParam String confirmCode, Principal principal) {
		log.debug("principal name =  {}, {}",principal.getName(), principal.toString());
		
		UserDetails user = userDetailsServiceImpl.loadUserByUsername(principal.getName());
		
		AccountEntity accountEntity = new AccountEntity(user);
		accountEntity.setPassword(accountEntity.getPassword().substring(6));
		accountEntity.setEmailCheckCode(confirmCode);
		log.debug(accountEntity.toString());
		
		int result = accountService.AuthenticateByEamil(accountEntity);
		
		if(result == 0) {
			return "/account/joinCheck";
		}
		return "main";
	}
}
