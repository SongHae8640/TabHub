package com.tabHub.springwebservice.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.tabHub.springwebservice.entity.AccountEmailCheckEntity;
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
	UserDetailsServiceImpl userDetailsServiceImpl;
	
	@GetMapping("/account/join")
	public String join() {
		return "join";
	}
	
	@PostMapping("/account/join")
	public String join(
			@RequestParam String id, 
			@RequestParam String pw, 
			@RequestParam String rePw, 
			@RequestParam String email) {
		
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
		
		
		
		///mav로 변경해서 로그인 정보랑 같이 보냄
		return "joinCheck";
	}
	
	@GetMapping("/account/joinCheck")
	public String goJoinCheck() {
		return "joinCheck";
	}
	
	
	@PostMapping("/account/joinCheck")
	public String join(@RequestParam String confirmEmailCode, Principal principal) {
		log.debug("principal name =  {}, {}",principal.getName(), principal.toString());
		
		UserDetails user = userDetailsServiceImpl.loadUserByUsername(principal.getName());
		
		AccountEmailCheckEntity accountEmailCheckEntity = new AccountEmailCheckEntity();
		accountEmailCheckEntity.setAccountId(user.getUsername());
		accountEmailCheckEntity.setCheckCode(confirmEmailCode);
		
		int result = accountService.AuthenticateByEamil(accountEmailCheckEntity);
		
		if(result == 0) {
			return "redirect:/account/joinCheck";
		}
		
		//권한 다시 로드하기
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		List<GrantedAuthority> updatedAuthorities = new ArrayList<>(auth.getAuthorities());
		updatedAuthorities.add(new SimpleGrantedAuthority("ROLE_USER"));
		Authentication newAuth = new UsernamePasswordAuthenticationToken(auth.getPrincipal(), auth.getCredentials(), updatedAuthorities);
		SecurityContextHolder.getContext().setAuthentication(newAuth);
		return "redirect:/";
	}
}
