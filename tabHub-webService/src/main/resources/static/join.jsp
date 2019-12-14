<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
	<meta charset="UTF-8">
	<title>Join</title>
	<link rel="stylesheet" href="/static/css/bootstrap.min.css" type="text/css">
	<script src="/static/js/jquery-3.4.1.min.js"></script>
	<script src="/static/js/poper.min.js"></script>
	<script src="/static/js/bootstrap.min.js"></script>
	</head>
	<body>
		<div class="container">
		    <h1>Join</h1>
		    <form>
		      <div class="form-group">
		        <label for="id">ID</label>
		        <input class="form-control" id="id" placeholder="Enter ID" >
		      </div>
		      <div class="form-group">
		        <label for="password">Password</label>
		        <input type="password" class="form-control" id="password" placeholder="Password" >
		      </div>
		      <div class="form-group">
		        <label for="confirm-password">Password</label>
		        <input type="password" class="form-control" id="confirm-password" placeholder="Confirm Password" >
		        <span><!-- 비밀번호 일치 여부 확인 --></span>
		      </div>
		      <div class="form-group">
		        <label for="email">E-mail</label>
		        <div class="container">
		          <div class="row">
		            <input type="email" class="col-9 form-control" id="email" placeholder="Enter e-mail" >
		            <button type="button" class="col-3 btn btn-secondary">Confirm</button>  
		          </div>
		          <div class="row" >
		            <input type="text" class="col-3 form-control" id="confirm-code" placeholder="code">
		            <button type="button" class="col-3 btn btn-secondary">Check</button>
		            <span>fail code</span>
		          </div>
		        </div>
		                
		        
		      </div>
		      <a class="float-left" href="/login">login</a>
		      <button type="button" class="btn btn-primary float-right">Submit</button>
		
		    </form>
		</div>
	</body>
</html>