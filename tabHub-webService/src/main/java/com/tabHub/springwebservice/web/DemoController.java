package com.tabHub.springwebservice.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class DemoController {
	
	@RequestMapping("/hi")
	public String hi() {
		System.out.println("오는지 안오는지");
		return "index";
	}
}
