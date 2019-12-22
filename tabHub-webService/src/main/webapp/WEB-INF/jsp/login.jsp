<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>login</title>
<%@ include file="/WEB-INF/jsp/template/header.jsp" %>
</head>
<body>
  <div class="container">
    <h1>Login</h1>
    <form action="/account/login" method="post">
      <div class="form-group">
        <label for="id">ID</label>
        <input class="form-control" id="id" name="id" placeholder="Enter ID">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" name="password" placeholder="Password">
      </div>
      <div class="form-group">
        <label for="remember-me">자동 로그인</label>
      	<input name="remember-me" id="remember-me" type="checkbox">
      </div>
      <a class="float-left" href="/join">join</a>
      <button type="submit" class="btn btn-primary float-right">Submit</button>

    </form>
  </div>
</body>
</html>