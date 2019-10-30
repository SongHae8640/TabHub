<template>
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
      <button type="submit" class="btn btn-primary float-right">Submit</button>

    </form>
  </div>
</template>

<script>
export default {
  name: 'login',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
