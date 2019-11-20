package com.tabHub.springwebservice.security;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name ="ACCOUNT")
@Getter
@Setter
public class AccountEntitiy {

	@Id
	private String id;
	
	private String email;
	
	private String password;
	
	private String profile_url;
	
	private String role;

	@Override
	public String toString() {
		return "AccountEntitiy [id=" + id + ", email=" + email + ", password=" + password + ", profile_url="
				+ profile_url + ", role=" + role + "]";
	}
	
	
	
}
