package com.tabHub.springwebservice.security;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class UserDetailsServiceImpl implements UserDetailsService {
	
	
	private static final Logger log = LoggerFactory.getLogger(UserDetailsServiceImpl.class);


	@PersistenceContext
	private EntityManager em;	//JPA
	
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// 최종적으로 security context 객체인, UserDetails 를 반환해야한다.
		
		log.debug("start");
		
		List<AccountEntitiy> findUser = em
				.createQuery("SELECT v from AccountEntitiy v where v.id = :id", AccountEntitiy.class)
				.setParameter("id", username)
				.getResultList();
		
		if(findUser.size() == 0) {
			throw new UsernameNotFoundException("유저를 찾을 수 없습니다.");
		}
		
		AccountEntitiy accountEntity = findUser.get(0);
		
		List<GrantedAuthority> authorities = new ArrayList<>();
		
		authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
		
		if(username.equals("admin")) {
			authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
		}
		
		
		return new User(accountEntity.getId(), accountEntity.getPassword() , authorities);
	}

}
