package com.tabHub.webservice.web;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = RANDOM_PORT)
public class WebControllerTest {

	@Autowired
	private TestRestTemplate restTemplate;
	
	//test어노테이션 잘 보고 붙일 것 (org.junit.Test)
	@Test
	public void mainpage_loading() {
		//when
		String body = this.restTemplate.getForObject("/", String.class);
		System.out.println(body);
		
		//then
		//한글처리 안된 이유는 프로젝트가 utf-8이 아니라서
		assertThat(body).contains("스프링부트로 시작하는 웹 서비스");
	}
}
