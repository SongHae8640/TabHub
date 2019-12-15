<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>login</title>
<%@ include file="/WEB-INF/jsp/template/header.jsp" %>
<link rel="stylesheet" href="/resources/css/bootstrap.min.css" type="text/css">
<script src="/resources/js/jquery-3.4.1.min.js"></script>
<script src="/resources/js/popper.min.js"></script>
<script src="/resources/js/bootstrap.min.js"></script>
</head>
<body>
  <div class="container">
    <h1>Login</h1>
    <form>
      <div class="form-group">
        <label for="id">ID</label>
        <input class="form-control" id="id" placeholder="Enter ID">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" placeholder="Password">
      </div>
      <a class="float-left" href="/join">join</a>
      <button type="button" class="btn btn-primary float-right">Submit</button>

    </form>
  </div>
</body>
</html>