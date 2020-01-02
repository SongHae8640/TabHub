package com.tabHub.springwebservice.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SyncTabEntity {
	private int syncId;
	private String title;
	private String url;
	
}
