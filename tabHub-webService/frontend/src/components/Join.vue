<template>
  <div class="container">
    <h1>Join</h1>
    <form>
      <div class="form-group">
        <label for="id">ID</label>
        <input class="form-control" id="id" placeholder="Enter ID" v-model="id">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" placeholder="Password" v-model="pw">
      </div>
      <div class="form-group">
        <label for="confirm-password">Password</label>
        <input type="password" class="form-control" id="confirm-password" placeholder="Confirm Password" v-model="rePw">
        <span><!-- 비밀번호 일치 여부 확인 --></span>
      </div>
      <div class="form-group">
        <label for="email">E-mail</label>
        <div class="container">
          <div class="row">
            <input type="email" class="col-9 form-control" id="email" placeholder="Enter e-mail" v-model="email">
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
      <button type="button" v-on:click="onClickJoinBtn" class="btn btn-primary float-right">Submit</button>

    </form>
  </div>
</template>

<script>
import AccountModel from "../models/AccountModel"
export default {
  name: 'Join',
  data(){
    return{
      id : '',
      pw : '',
      rePw : '',
      email : '',
    }

  },
  methods : {
    async onClickJoinBtn(){
      if(!this.id.trim().length){
        return 
      }

      if(!this.pw.trim().length){
        return
      }

      if(!this.rePw.trim().length){
        return
      }

      if(!this.email.trim().length){
        return
      }

      const response = await AccountModel.join(this.id, this.pw, this.rePw, this.email)
      
      //회원가입 성공
      if(true){
        this.$router.push('/login')

      }else{//회원가입 실패

      }
    },

  },
}
</script>