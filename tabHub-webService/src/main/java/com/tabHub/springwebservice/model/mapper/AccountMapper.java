package com.tabHub.springwebservice.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.tabHub.springwebservice.entity.AccountEmailCheckEntity;
import com.tabHub.springwebservice.entity.AccountEntity;

@Repository
@Mapper
public interface AccountMapper {
	//List<AccountEntity> getAccount();
	
	List<AccountEntity> getAccount(AccountEntity accountEntity);

	void insertAccount(AccountEntity accountEntity);

	void deleteAccountById(String id);
	
	void updateAccountRoleToUser(AccountEmailCheckEntity accountEntity);

	void insertAccountEmailCheck(AccountEmailCheckEntity accountEmailCheckEntity);

	int selectAccountEmailCheckCount(AccountEmailCheckEntity accountEmailCheckEntity);

	void deleteAccountEmailCheckById(AccountEmailCheckEntity accountEmailCheckEntity);

}
