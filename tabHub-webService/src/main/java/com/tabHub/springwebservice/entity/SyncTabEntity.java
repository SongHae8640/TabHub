package com.tabHub.springwebservice.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SyncTabEntity {
	private Long syncId;
	private String title;
	private String url;
	
}
