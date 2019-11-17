package com.tabHub.springwebservice.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        //유저 인증 정보를 설정 할 수 있다. jdbc와 연결
    	
//    	auth.inMemoryAuthentication()
//        .withUser("user") // user 계정을 생성했다. 이부분에 로그인아이디가 된다.
//        .password(passwordEncoder().encode("1234")) // passwordEncoder 로 등록 한 인코더로 1234 를 암호화한다.
//        .roles("USER"); // 유저에게 USER 라는 역할을 제공한다.
    	
    	auth
    		.userDetailsService(userDetailsService()).passwordEncoder(passwordEncoder());
    }

    @Override
    public void configure(WebSecurity web) {
    	// static 파일 (css, js 등)인증이 피룡 없는 리소스 설정
    	web.ignoring()
    		.antMatchers("/css", "/js");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
    	// 리소스 보안 부분 
    	http // HttpSecurity 객체를 설정한다.
        .authorizeRequests() // 권한요청 처리 설정 메서드이다.
        .antMatchers("/private/**").hasAnyRole("USER") // /private 이하의 모든 요청은 USER 역할이 있어야한다.
        .anyRequest().permitAll() // 다른 요청은 누구든지 접근 할 수 있다.
		.and()
		    .formLogin() // 로그인 form 을 사용한다.
    		.loginPage("/login")	//로그인 페이지 추가
    		.usernameParameter("id")	//지정한  id의 name
    		.passwordParameter("pw");	//지정한  id의 pw
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
    
    @Bean
    public UserDetailsService userDetailsService() {
    	return new UserDetailsServiceImpl();
    }
}