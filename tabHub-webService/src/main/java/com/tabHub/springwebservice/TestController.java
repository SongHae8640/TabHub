package com.tabHub.springwebservice;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TestController {
	
	@GetMapping("/join")
	public String test() {
		return "join";
	}
}
