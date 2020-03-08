<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
	<head>
	<meta charset="UTF-8">
	<title>Join Check</title>
	<%@ include file="/WEB-INF/jsp/template/header.jsp" %>
	</head>
	<body>
		<div class="container">
		    <h1>Join Check</h1>
		    <form action="/account/joinCheck" method="post">
		      <div class="form-group">
		        <label for="email">E-mail</label>
		        <div class="container">
		          <div class="row">
		          	<span>예시 로 이메일 확인 코드를 보냈습니다. 받은 코드를 입력해 주세요.</span>  
		          </div>
		          <div class="row" >
		            <input type="text" class="col-3 form-control" id="confirm-code" name="confirmCode" placeholder="code">
		            <button type="submit" class="col-3 btn btn-secondary">Check</button>
		            <span>fail code</span>
		          </div>
		        </div>
		      </div>		
		    </form>
		</div>
	</body>
</html>