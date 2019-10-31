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
          <tabGroup></tabGroup>
          <br>
        </div>
      </div>
    </div>

    
  </div>
</template>

<script>
import TabGroupComponent from "./blocks/TabGroupComponent";

export default {
  name: 'Posts',
  components: {
    'tabGroup' : TabGroupComponent,
  },
}
</script>