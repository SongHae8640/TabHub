package com.tabHub.springwebservice.service;

import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tabHub.springwebservice.entity.AccountEntity;
import com.tabHub.springwebservice.model.mapper.AccountMapper;

@Transactional
@Service
public class AccountService {
	
	@Autowired
	private AccountMapper accountMapper;
	
	private JavaMailSender javaMailSender;

	public void insertAccount(AccountEntity accountEntity) {
		//emailCheckCode 생성
		int emailCheckCode = new Random().nextInt(4589362) + 49311;
		accountEntity.setEmailCheckCode(emailCheckCode+"");
		
		//계정 추가
		accountMapper.insertAccount(accountEntity);

	}

	public void deleteAccountById(String id) {
		accountMapper.deleteAccountById(id);	
	}
	
	public int AuthenticateByEamil(AccountEntity accountEntity) {
		
		//role을 USER로 변경
		accountMapper.updateAccountRoleToUser(accountEntity);
		List<AccountEntity> accountEntityList = accountMapper.getAccount(accountEntity);
		accountEntity = accountEntityList.get(0);
		if(accountEntity.getRole().equals("USER")) return 1;	
		return 0;
		
	}
	
	

}
