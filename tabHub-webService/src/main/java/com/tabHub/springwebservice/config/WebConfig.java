package com.tabHub.springwebservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

@Configuration // 이 어노테이션이 문제
@EnableWebMvc //이 어노테이션이 문제
public class WebConfig implements WebMvcConfigurer{
	
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
		.allowedOrigins("http://127.0.0.1:3000","http://ec2-15-164-124-3.ap-northeast-2.compute.amazonaws.com:3000");
	}
	

}
