<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
	<head>
	<meta charset="UTF-8">
	<title>Join</title>
	<%@ include file="/WEB-INF/jsp/template/header.jsp" %>
	</head>
	<body>
		<div class="container">
		    <h1>Join</h1>
		    <form action="/account/join" method="post">
		      <div class="form-group">
		        <label for="id">ID</label>
		        <input class="form-control" id="id" placeholder="Enter ID" name="id">
		      </div>
		      <div class="form-group">
		        <label for="password">Password</label>
		        <input type="password" class="form-control" id="password" placeholder="Password" name="pw">
		      </div>
		      <div class="form-group">
		        <label for="confirm-password">Password check</label>
		        <input type="password" class="form-control" id="confirm-password" placeholder="Confirm Password" name="rePw">
		        <span><!-- 비밀번호 일치 여부 확인 --></span>
		      </div>
		      <div class="form-group">
		        <label for="email">E-mail</label>
		        <div class="container">
		          <div class="row">
		            <input type="email" class="col-9 form-control" id="email" placeholder="Enter e-mail" name="email">  
		          </div>
		        </div>
		                
		        
		      </div>
		      <a class="float-left" href="/login">login</a>
		      <button type="submit" class="btn btn-primary float-right" >Submit</button>
		
		    </form>
		</div>
	</body>
</html>