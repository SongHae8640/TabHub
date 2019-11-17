package com.tabHub.springwebservice.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SecurityController {

    @GetMapping(value = "/")
    public String home() {
        return "index2";
    }

    @GetMapping(value = "/private")
    public String privatePage() {
        return "private";
    }

    @GetMapping(value = "/public")
    public String publicPage() {
        return "public";
    }
    
//    @GetMapping(value = "/login")
//    public String loginPage() {
//    	return "login";
//    }
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
