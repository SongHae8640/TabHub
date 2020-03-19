package com.tabHub.springwebservice.entity;

import org.springframework.security.core.userdetails.UserDetails;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Data
public class AccountEntity {
	private String id;
	private String password;
	private String email;
	private String role;
	
	public AccountEntity() {}
	
	public AccountEntity(String id, String password, String email) {
		super();
		this.id = id;
		this.password = password;
		this.email = email;
	}
	
	public AccountEntity(UserDetails user) {
		this.id = user.getUsername();
		this.password = user.getPassword();
	}
	
}
