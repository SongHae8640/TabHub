<template>
  <div class="container">
    <h1>Join</h1>
    <form>
      <div class="form-group">
        <label for="id">ID</label>
        <input class="form-control" id="id" placeholder="Enter ID">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" placeholder="Password">
      </div>
      <div class="form-group">
        <label for="confirm-password">Password</label>
        <input type="password" class="form-control" id="confirm-password" placeholder="Confirm Password">
        <span><!-- 비밀번호 일치 여부 확인 --></span>
      </div>
      <div class="form-group">
        <label for="email">E-mail</label>
        <div class="container">
          <div class="row">
            <input type="email" class="col-9 form-control" id="email" placeholder="Enter e-mail">
            <button type="button" class="col-3 btn btn-secondary">Confirm</button>  
          </div>
          <div class="row" v-show="true">
            <input type="text" class="col-3 form-control" id="confirm-code" placeholder="code">
            <button type="button" class="col-3 btn btn-secondary">Check</button>
            <span v-show="false">fail code</span>
          </div>
        </div>
                
        
      </div>
      <a class="float-left" href="/login">login</a>
      <button type="submit" class="btn btn-primary float-right">Submit</button>

    </form>
  </div>
</template>

<script>
export default {
  name: 'Join',
}
</script>