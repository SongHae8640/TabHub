package com.tabHub.springwebservice.config;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.access.AccessDeniedHandlerImpl;

import com.tabHub.springwebservice.service.UserDetailsServiceImpl;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
public class UserDeniedHandler extends AccessDeniedHandlerImpl{
	
	
	
	@Override
	public void handle(HttpServletRequest request, HttpServletResponse response,
			AccessDeniedException accessDeniedException) throws IOException, ServletException {
		
		this.setErrorPage("/account/joinCheck");
		
		log.debug("Access Denied Request : {}, {}", request.getRemoteHost(), request.getRemoteUser());
		
		super.handle(request, response, accessDeniedException);
	}
	


}
