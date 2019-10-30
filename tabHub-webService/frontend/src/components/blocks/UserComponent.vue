<template>
  <div v-if="true">
    <a href="/login">login</a>
    <a href="/join">join</a>
  </div>
  <div v-else>
    <img> <!-- 프로필 -->
    <a href="/mypage">Mypage</a>
    <a href="#">logout</a>
  </div>
</template>

<script>
export default {
  name: 'User',
}
</script>