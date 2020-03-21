package com.tabHub.springwebservice.service;

import java.util.HashMap;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tabHub.springwebservice.entity.AccountEmailCheckEntity;
import com.tabHub.springwebservice.entity.AccountEntity;
import com.tabHub.springwebservice.model.mapper.AccountMapper;

@Transactional
@Service
public class AccountService {
	
	@Autowired
	private AccountMapper accountMapper;
	
	@Autowired
	private EmailService emailService;
	
	//private JavaMailSender javaMailSender;

	public void insertAccount(AccountEntity accountEntity) {
		//emailCheckCode 생성
		int emailCheckCode = new Random().nextInt(4589362) + 49311;
		AccountEmailCheckEntity accountEmailCheckEntity = new AccountEmailCheckEntity();
		accountEmailCheckEntity.setAccountId(accountEntity.getId());
		accountEmailCheckEntity.setCheckCode("" + emailCheckCode);
		
		
		//계정 추가
		accountMapper.insertAccount(accountEntity);
		accountMapper.insertAccountEmailCheck(accountEmailCheckEntity);
		
		//이메일 발송
		emailService.sendMail(accountEntity.getEmail(), "Tab Hub 가입을 축하드립니다.", "email check code : "+emailCheckCode);
		

	}

	public void deleteAccountById(String id) {
		accountMapper.deleteAccountEmailCheckById(id);
		accountMapper.deleteAccountById(id);	
	}
	
	public int AuthenticateByEamil(AccountEmailCheckEntity accountEmailCheckEntity) {
		int accountEmailCheckCount = accountMapper.selectAccountEmailCheckCount(accountEmailCheckEntity);
		
		if(accountEmailCheckCount != 1) return 0;
		
		
		//role을 USER로 변경
		accountMapper.updateAccountRoleToUser(accountEmailCheckEntity);
		
		//이메일 인증 테이블에서 삭제
		accountMapper.deleteAccountEmailCheckById(accountEmailCheckEntity.getAccountId());
		
		
		return 1;
	}

	public boolean isJoinedAccount(String id) {
		if(accountMapper.selectAccountCountById(id) != 0) return true;
		return false;
	}


	
	

}
