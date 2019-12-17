package com.tabHub.springwebservice.entity;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class AccountEntity {
	private String id;
	private String password;
	private String email;
	private String emailCheckCode;
	@Override
	public String toString() {
		return "AccountEntity [id=" + id + ", password=" + password + ", email=" + email + ", emailCheckCode="
				+ emailCheckCode + "]";
	}
	
	
	
}
