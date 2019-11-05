<template>
  <div v-if="false">
    <a href="/login">login</a>
    <a href="/join">join</a>
  </div>
  <div v-else>
    <img> <!-- 프로필 -->
    <a href="/mypage">Mypage</a><span class="badge badge-danger">{{notificationCount}}</span>
    <a href="#">logout</a>
  </div>
</template>

<script>
export default {
  name: 'User',
  created(){
    this.notificationCount = 4;
  }
}
</script>