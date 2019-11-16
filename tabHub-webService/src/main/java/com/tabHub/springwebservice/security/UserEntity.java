package com.tabHub.springwebservice.security;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name ="tbl_users")
@Getter
@Setter
public class UserEntity {

	@Id
	@GeneratedValue
	private Integer idx;
	
	private String username;
	
	private String password;
	
}
