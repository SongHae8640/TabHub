<template>
  <div class="container">
    <h1>Login</h1>
    <form>
      <div class="form-group">
        <label for="id">ID</label>
        <input class="form-control" id="id" placeholder="Enter ID" v-model="id">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" placeholder="Password" v-model="pw">
      </div>
      <a class="float-left" href="/join">join</a>
      <button v-on:click="onClickLoginBtn" type="button" class="btn btn-primary float-right">Submit</button>

    </form>
  </div>
</template>

<script>
import AccountModel from "../models/AccountModel"

export default {
  name: 'login',
  data() {
    return {
      id : '',
      pw : '',
    }
  },
  methods :{
    async onClickLoginBtn(){

      if(!this.id.trim().length){
        return 
      }

      if(!this.pw.trim().length){
        return
      }


      const response = await AccountModel.login(this.id, this.pw)
      console.log(response)
      //로그인 성공
      if(true){
        this.$router.push('/')
        this.$emit('@login')

      }else{//로그인 실패

      }

      
      

    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
