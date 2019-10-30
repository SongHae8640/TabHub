<template>
  <div class="container">
    <div class="row">
      <div class="col-8"></div>
      <div class="col-4">
        <user></user> 
      </div>
    </div>
    <div class="row">
      <div class="col-12 text-center">
        <h1>TabHub</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12 text-center">
        <searchForm></searchForm>
      </div>
    </div>
    
    

    <br><br>
    <div class="row">
      <div class="container"><!--추천 리스트 -->
        <div class="row">
          <div class="col-4">
            <a type="button" class="btn btn-primary" href="/posts/1">추천1</a>
          </div>
          <div class="col-4">
            <a type="button" class="btn btn-primary" href="/posts/2">추천2</a>
          </div>
          <div class="col-4">
            <a type="button" class="btn btn-primary" href="/posts/3">추천3</a>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <a type="button" class="btn btn-primary" href="/posts/1">추천1</a>
          </div>
          <div class="col-4">
            <a type="button" class="btn btn-primary" href="/posts/2">추천2</a>
          </div>
          <div class="col-4">
            <a type="button" class="btn btn-primary" href="/posts/3">추천3</a>
          </div>
        </div>

      </div>


    </div>
  </div>
</template>

<script>

export default {
  name: 'Main',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
