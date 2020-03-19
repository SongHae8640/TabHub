package com.tabHub.springwebservice.controller;

import static org.junit.jupiter.api.Assertions.assertNotEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.tabHub.springwebservice.entity.AccountEntity;
import com.tabHub.springwebservice.service.AccountService;
import com.tabHub.springwebservice.service.AccountServiceTest;
import com.tabHub.springwebservice.service.EmailService;

import lombok.extern.slf4j.Slf4j;

@SpringBootTest
@Slf4j
public class JoinControllerTest {
	
	@Autowired
	private AccountService accountService;
	
	@Autowired
	private EmailService emailService;

	
	@Test
	public void join() {
		AccountEntity accountEntity = new AccountEntity();
		accountEntity.setId("test");
		accountEntity.setEmail("thdgo456@naver.com");
		accountEntity.setPassword("1234");
		
		accountService.deleteAccountById(accountEntity.getId());
		
		accountService.insertAccount(accountEntity);
		
	
	}
	
	//@Test
	public void 이메일_인증() {
		AccountEntity accountEntity = new AccountEntity();
		accountEntity.setId("test");
		accountEntity.setEmail("thdgo456@naver.com");
		accountEntity.setPassword("1234");
		
		/*
		int result = accountService.AuthenticateByEamil(accountEntity, "324634");
		
		assertNotEquals(0, result);
		*/
	}
	
	

}
