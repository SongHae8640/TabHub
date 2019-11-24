package com.tabHub.springwebservice.security;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.security.web.authentication.rememberme.PersistentRememberMeToken;

import lombok.Data;
import lombok.Getter;

//jpa를 통해 persistent_logins 테이블 접근
@Data //@Getter, @Setter, @RequiredArgsConstructor, @ToString, @EqualsAndHashCode을 한꺼번에 설정해주 어노테이션
@Entity
@Table(name = "persistent_logins")
public class RememberMeEntity {

	//series
	@Id
	@Column(name = "series", unique = true)
    private String series;
	
	//username
    @Column(name = "username", nullable = false)
    private String username;

    //저장될 token값
    @Column(name = "token", nullable = false)
    private String token;

    //마지막으로 사용한 날짜
    @Column(name = "last_used", nullable = false)
    private Timestamp last_used;

    public RememberMeEntity() {
    }

    public RememberMeEntity(String username, String series, String token) {
        this.username = username;
        this.series = series;
        this.token = token;
    }
}
