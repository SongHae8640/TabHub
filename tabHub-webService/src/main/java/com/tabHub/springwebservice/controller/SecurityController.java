package com.tabHub.springwebservice.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.bind.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class SecurityController {

    @GetMapping(value = "/")
    public String home() {
        return "index2";
    }
    
    @PostMapping(value = "/")
    public String home2() {
        return "index2";
    }

    @GetMapping(value = "/private")
    public String privatePage() {
        return "private";
    }
    
    @GetMapping(value="/private/context")
    public String privateContextPage(@AuthenticationPrincipal Authentication authentication) {
    	
    	log.debug(authentication.getPrincipal()+"");
    	return "private";
    }

    @GetMapping(value = "/public")
    public String publicPage() {
        return "public";
    }
    
    @GetMapping(value = "/test")
    @ResponseBody
    public String XMLHttpRequestTest() {
    	return "ok";
    }
    @PostMapping(value = "/test")
    @ResponseBody
    public String XMLHttpRequestTest2() {
    	return "ok";
    }
    
    
    @GetMapping(value = "/login")
    public String loginPage() {
    	return "login";	
    }
    
    /*
    @PostMapping(value = "/login")
    public String loginPage2() {
    	return "login";	
    }
    */
    
    
//    
//    @GetMapping(value = "/admin")
//    public String adminPage() {
//        return "admin";
//    }
//
//    @GetMapping(value = "/access_denied")
//    public String accessDeniedPage() {
//        return "access_denied";
//    }
    
}
