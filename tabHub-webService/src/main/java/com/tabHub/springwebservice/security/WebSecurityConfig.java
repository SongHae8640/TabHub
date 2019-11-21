package com.tabHub.springwebservice.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import org.springframework.security.web.context.HttpSessionSecurityContextRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private CustomAccessDeniedHandler customAccessDeniedHandler;


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        //유저 인증 정보를 설정 할 수 있다. jdbc와 연결
    	
    	auth
        .userDetailsService(userDetailsService()).passwordEncoder(passwordEncoder());
    	
    	//SecurityContextHolder.getContext().setAuthentication();
    	
    	
    }

    @Override
    public void configure(WebSecurity web) {
    	// static 파일 (css, js 등)인증이 필요 없는 리소스 설정
    	web.ignoring()
    		.antMatchers("static/**");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
    	
    	log.debug(" 들어오는지 확인");
    	
    	
    	// 리소스 보안 부분 
    	http // HttpSecurity 객체를 설정한다.
        .authorizeRequests() // 권한요청 처리 설정 메서드이다.
        .antMatchers("/private/**").hasAnyRole("USER") // /private 이하의 모든 요청은 USER 역할이 있어야한다.
        .antMatchers("/admin/**").hasAnyRole("ADMIN")	// admin 이하의 모든 요청은 ADMIN 역할이 있어야 한다.
        .anyRequest().permitAll() // 다른 요청은 누구든지 접근 할 수 있다.
		.and()
		    .formLogin() // 로그인 form 을 사용한다.
		    .loginPage("/login")	//로그인 페이지 추가
    		.usernameParameter("id")	//지정한  id의 name
    		.passwordParameter("pw")	//지정한  id의 pw
    	
    		.failureForwardUrl("/login?error=true")
    	.and()
    		.logout()
    		.deleteCookies("JSESSIONID")
    		.clearAuthentication(true)
    		.invalidateHttpSession(true)
    	.and()
    		.exceptionHandling()
    			.accessDeniedHandler(customAccessDeniedHandler)
    	.and()
    		.cors()
    	.and()
    		.csrf().disable()
    	;
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
    
    @Bean
    public UserDetailsService userDetailsService() {
    	return new UserDetailsServiceImpl();
    }
    
    
    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
    	return super.authenticationManagerBean();
    }
    
    @Bean
    public SecurityContextRepository httpSessionSecurityContextRepository(){
        HttpSessionSecurityContextRepository httpSessionSecurityContextRepository = new HttpSessionSecurityContextRepository();
        return httpSessionSecurityContextRepository;
    }
    
    
    

    
    
}