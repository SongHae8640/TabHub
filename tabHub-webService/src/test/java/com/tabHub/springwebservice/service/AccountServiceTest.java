package com.tabHub.springwebservice.service;

import static org.junit.jupiter.api.Assertions.assertNotEquals;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.tabHub.springwebservice.entity.AccountEntity;
import com.tabHub.springwebservice.mapper.AccountMapper;

public class AccountServiceTest {
	
	@Autowired
	private AccountMapper accountMapper;
	
	public void getAccount() {
		System.out.println(accountMapper.getAccount());
//		List<AccountEntity> accountList= accountMapper.getAccount();
//		
//		assertNotEquals(0, accountList.size());
//		System.out.println(accountList.get(0).toString());
		
	}

}
