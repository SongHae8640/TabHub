package com.tabHub.springwebservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

@Configuration //dispatcherservlet을 초기화시키며 커스텀한 설정을 할 수 있도록 도와주는 어노테이션
@EnableWebMvc //스프링 MVC를 설정하는데 필요한 빈을 자동으로 등록
public class WebConfig implements WebMvcConfigurer{
	
	//CORS(다른 서버에서 우리 서버로 접근 금지)를 부분허용하기 위해
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
		.allowedOrigins("http://127.0.0.1:3000","http://ec2-15-164-124-3.ap-northeast-2.compute.amazonaws.com:3000");
	}
	
	//jsp의 사용을 위해, prefix와 suffix를 설정
	@Bean
	public InternalResourceViewResolver viewResolver() {
		return new InternalResourceViewResolver("/WEB-INF/jsp/", ".jsp");
	}

}
