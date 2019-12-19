package com.tabHub.springwebservice.controller;

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
		
		emailService.sendMail(accountEntity.getEmail(), "test", "email check code : "+accountEntity.getEmailCheckCode());
		
	}
	

}
