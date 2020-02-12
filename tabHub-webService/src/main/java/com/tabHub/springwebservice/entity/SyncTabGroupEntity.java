package com.tabHub.springwebservice.entity;

import java.util.List;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Data
@NoArgsConstructor
public class SyncTabGroupEntity {
	private Long id;
	private String accountId;
	private String title;
	private String category;
	private Long localId;
	private Long useDate;
	private List<SyncTabEntity> tabs;
}
