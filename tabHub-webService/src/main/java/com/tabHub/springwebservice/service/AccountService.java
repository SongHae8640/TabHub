package com.tabHub.springwebservice.service;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.tabHub.springwebservice.entity.AccountEntity;
import com.tabHub.springwebservice.mapper.AccountMapper;

@Service
public class AccountService {
	
	@Autowired
	private AccountMapper accountMapper;
	
	private JavaMailSender javaMailSender;

	public void insertAccount(AccountEntity accountEntity) {
		
		int emailCheckCode = new Random().nextInt(4589362) + 49311;
		accountEntity.setEmailCheckCode(emailCheckCode+"");
		
		//계정 추가
		accountMapper.insertAccount(accountEntity);

	}

	public void deleteAccountById(String id) {
		accountMapper.deleteAccountById(id);
		
	}
	
	

}
