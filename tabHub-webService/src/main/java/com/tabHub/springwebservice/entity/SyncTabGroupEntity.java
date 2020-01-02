package com.tabHub.springwebservice.entity;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SyncTabGroupEntity {
	private int id;
	private String accountId;
	private String category;
	private List<SyncTabEntity> tabs;

}
