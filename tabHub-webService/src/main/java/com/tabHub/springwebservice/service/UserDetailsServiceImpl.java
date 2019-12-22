package com.tabHub.springwebservice.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.tabHub.springwebservice.domain.Account;
import com.tabHub.springwebservice.model.mapper.UserMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	
	private static final String ROLE_PREFIX = "ROLE_";
    
    @Autowired
    UserMapper userMapper;
 
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        
    	log.debug(username);
        Account account = userMapper.readUser(username);
        
        //java.lang.IllegalArgumentException: There is no PasswordEncoder mapped for the id "null"
        //오류가 나서 해결해주기위해서는 noop으로 비밀번호 인코더 방식을 지정해줘야한다.
        account.setPassword("{noop}"+account.getPassword());
        
        if(account != null) {
        	account.setAuthorities(makeGrantedAuthority(userMapper.readAuthority(username)));
        }
		return new User(account.getId(), account.getPassword(), account.getAuthorities());
    }
    
    private static List<GrantedAuthority> makeGrantedAuthority(List<String> roles){
        List<GrantedAuthority> list = new ArrayList<>();
        roles.forEach(role -> list.add(new SimpleGrantedAuthority(ROLE_PREFIX + role)));
        return list;
    }

}
