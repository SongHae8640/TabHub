package com.tabHub.springwebservice.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.tabHub.springwebservice.entity.AccountEntity;
import com.tabHub.springwebservice.service.AccountService;
import com.tabHub.springwebservice.service.EmailService;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class JoinController {
	
	@Autowired
	AccountService accountService;
	
	@Autowired
	private EmailService emailService;
	
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
		log.debug("id = "+id);
		
		AccountEntity accountEntity = new AccountEntity();
		accountEntity.setId(id);
		accountEntity.setPassword(pw);
		accountEntity.setEmail(email);
		
		//계정 추가
		accountService.insertAccount(accountEntity);
		
		//이메일 발송
		emailService.sendMail(accountEntity.getEmail(), "Tab Hub 가입을 축하드립니다.", "email check code : "+accountEntity.getEmailCheckCode());
		
		
		///mav로 변경해서 로그인 정보랑 같이 보냄
		return "joinCheck";
	}
	
	
	@PostMapping("/account/joinCheck")
	public String join(@RequestParam String confirmCode) {
		AccountEntity accountEntity = new AccountEntity();
		accountEntity.setId("test");
		accountEntity.setEmail("thdgo456@naver.com");
		accountEntity.setPassword("1234");
		accountEntity.setEmailCheckCode(confirmCode);
		
		int result = accountService.AuthenticateByEamil(accountEntity);
		
		if(result == 0) {
			return "errorPage";
		}
		return "main";
	}
}
