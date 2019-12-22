package com.tabHub.springwebservice.service;

import static org.junit.jupiter.api.Assertions.assertNotEquals;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.tabHub.springwebservice.entity.AccountEntity;
import com.tabHub.springwebservice.mapper.AccountMapper;

import lombok.extern.slf4j.Slf4j;

@SpringBootTest
@Slf4j
public class AccountServiceTest {
	
	@Autowired
	private AccountMapper accountMapper;
	
//	@Test
//	public void dbConnectionTest() {
//		List<AccountEntity> accountList = accountMapper.getAccount();
//		
////		for (int i = 0; i < accountList.size(); i++) {
////			log.debug(accountList.get(i).toString());
////		}
//		
//		assertNotEquals(0, accountList.size());
//	}
	
	
}
