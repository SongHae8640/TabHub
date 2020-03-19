<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>main</title>
<%@ include file="/WEB-INF/jsp/template/header.jsp" %>
</head>
<body>
  <div class="container">
  	<div class="row">
      <div class="col-12">
        <a href="/account/login">login</a>
        <a href="/account/join">join</a>
        <a href="/account/logout">logout</a>
        <a href="/mypage">mypage</a>
      </div>
    </div>
    <div class="row">
      <div class="col-12 text-center">
        <h1>TabHub</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12 text-center">
        <div>
		    <img> <!-- icon -->
		    <input placeholder="search!">
		    <a type="button" class="btn btn-primary">search</a>
		  </div>
      </div>
    </div>

    <br><br>
    <!--추천 리스트 -->
    <div class="row">
      <div class="container text-center">
        <div class="row" >
          <div class="col-4">
            <a type="button" class="btn btn-primary" href="'/posts/'+recommend.id">post</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>