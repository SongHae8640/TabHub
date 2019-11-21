<template>
  <div id="app">
    <user v-bind:isLogin="isLogin"></user> 
    <router-view v-on:@login="onLogin"></router-view>
  </div>
</template>

<script>

import router from "./router";

export default {
  name: 'App',
  data(){
    return{
      isLogin : false,
    }
    
  },
  methods :{
    onLogin(){
      this.isLogin = true
    },
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  margin-top: 60px;
}
</style>
