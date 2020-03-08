package com.tabHub.springwebservice.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

	private JavaMailSender javaMailSender;
	
	public EmailService(JavaMailSender javaMailSender) {
		this.javaMailSender = javaMailSender;
	}
	
	//받을 이메일, 제목, 내용
	public void sendMail(String toEmail, String subject, String message) {
		SimpleMailMessage mailMessage= new SimpleMailMessage();
		
		mailMessage.setTo(toEmail);
		mailMessage.setSubject(subject);
		mailMessage.setText(message);
		
		
		javaMailSender.send(mailMessage);
		
		
	}

}