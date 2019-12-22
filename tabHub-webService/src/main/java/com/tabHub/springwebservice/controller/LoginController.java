package com.tabHub.springwebservice.controller;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.RememberMeAuthenticationProvider;
import org.springframework.security.authentication.RememberMeAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.RememberMeServices;
import org.springframework.security.web.authentication.rememberme.RememberMeAuthenticationFilter;
import org.springframework.security.web.authentication.rememberme.TokenBasedRememberMeServices;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tabHub.springwebservice.service.UserDetailsServiceImpl;

@Controller
public class LoginController {
	private static final Logger logger = LoggerFactory.getLogger(LoginController.class);
	
	//security
	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
	SecurityContextRepository repository;
	
	@Autowired
	RememberMeServices rememberMeServices;
	
	@Autowired
	UserDetailsServiceImpl userDetailsServiceImpl;
	
	@GetMapping("/account/login")
	public String login() {
		logger.debug("loginPage");
		return "login";
	}
	
	@PostMapping("/account/login")
	public String login(String id, String pw) {
		logger.debug("id = "+id+", pw = "+pw);
		return "";
	}

	///전체허용(*)말고 방법이 있을 것 같은데(chrome extension만 허용하는) 찾아보자
	@CrossOrigin("*")
	@PostMapping("/ajax/account/login")
	@ResponseBody
	public ModelMap ajaxLogin(HttpServletRequest request, HttpServletResponse response,
			@RequestParam(value = "id") String username,
			@RequestParam(value = "password") String password,
			@RequestParam(value = "remember-me") String rememberMe) throws IOException, ServletException {
		ModelMap map = new ModelMap();

		UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
			username, password);

		try {
			// 로그인
			logger.debug(rememberMe);
			if(rememberMe.equals("on") || rememberMe.equals("true")) {
				rememberMeServices.loginSuccess(request, response, authenticationManager.authenticate(token));
				Authentication rememberMeAuth = rememberMeServices.autoLogin(request,response);
				if(rememberMeAuth==null) {
					//RememberMeAuthenticationToken tokenR = new RememberMeAuthenticationToken("myTabhubUniqueKey", auth, auth.getAuthorities());
					//rememberMeAuth = authenticationManager.authenticate(tokenR);
				}
				SecurityContextHolder.getContext().setAuthentication(rememberMeAuth);
				repository.saveContext(SecurityContextHolder.getContext(), request, response);
			}else {
				Authentication auth = authenticationManager.authenticate(token);
				SecurityContextHolder.getContext().setAuthentication(auth);
				repository.saveContext(SecurityContextHolder.getContext(), request, response);
			}
			
			map.put("success", true);
			map.put("returnUrl", getReturnUrl(request, response));
		} catch (BadCredentialsException e) {
			map.put("success", false);
			map.put("message", e.getMessage());
		}

		return map;
	}
	
	//cookie가 아직 존재하고, 만료되지 않았을 때 자동로그인이 되도록 설정
	@CrossOrigin("*")
	@PostMapping("/ajax/account/isAutoLogin")
	@ResponseBody
	public ModelMap isAutoLogin(HttpServletRequest request, HttpServletResponse response, @CookieValue(value="tabhub-login-remember-me", required = false) Cookie rememberMeCookie) throws IOException, ServletException {
		ModelMap map = new ModelMap();
		logger.debug(rememberMeCookie.getName());
		logger.debug(rememberMeCookie.getValue());
		
		try {
			
			Authentication rememberMeAuth = rememberMeServices.autoLogin(request,response);
			SecurityContextHolder.getContext().setAuthentication(rememberMeAuth);
			repository.saveContext(SecurityContextHolder.getContext(), request, response);
			
			
			map.put("success", true);
			map.put("returnUrl", "된다");
		} catch (BadCredentialsException e) {
			map.put("success", false);
			map.put("message", e.getMessage());
		}

		return map;
	}
	
	/**
	 * 로그인 하기 전의 요청했던 URL을 알아낸다.
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	private String getReturnUrl(HttpServletRequest request, HttpServletResponse response) {
		RequestCache requestCache = new HttpSessionRequestCache();
		SavedRequest savedRequest = requestCache.getRequest(request, response);
		if (savedRequest == null) {
			return request.getSession().getServletContext().getContextPath();
		}
		return savedRequest.getRedirectUrl();
	}
	
	
}
