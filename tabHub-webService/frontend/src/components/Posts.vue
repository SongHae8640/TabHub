<template>
  <div class="container">
    <div class="row text-center">
      <div class="col-8">
        <searchForm></searchForm>
      </div>
      <div class="col-4">
        <user></user>
      </div>
    </div>


    <div class="row">
      <img class="col-1" src="" alt=""><!-- 필터 아이콘 -->
      <span class="col-2">filter</span>
      <div class="form-group col-4">
        <select class="form-control" id="exampleFormControlSelect1">
          <option>relevance</option>
          <option>views</option>
          <option>like count</option>
        </select>
      </div>
    </div>
    <div class="row"><!-- 탭그룹 리스트 -->
      <div class="container">
        <div class="row" v-for="tabGroup in ['tabGroup', 'tabGroup']">
          <div class="container">
            <div class="row">
              <a href="/posts/1">tabGroup title - (00 TABs)</a>
            </div>
            <div class="row">
              <img class="col-1" src="" alt="">
              <span class="col-1">00</span>
              <img class="col-1 offset-col-1" src="" alt="">
              <span class="col-1">00</span>
            </div>
            <div class="row">
              tabGroup content
            </div>
          </div>
          <br>
        </div>
      </div>
    </div>
      

      
    </div>

    
  </div>
</template>

<script>
export default {
  name: 'Posts',
}
</script>