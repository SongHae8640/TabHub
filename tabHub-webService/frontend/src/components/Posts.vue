<template>
  <div class="container">
    <div class="row text-center">
      <div class="col-8">
        <searchForm v-on:@search="onSearchInPosts"></searchForm>
      </div>
      <div class="col-4">
        <user></user>
      </div>
    </div>

    <div class="row">
      <img class="col-1" src="" alt=""><!-- 필터 아이콘 -->
      <span class="col-2">filter</span>
      <div class="form-group col-4">
        <select class="form-control" v-model="selectedOption" v-on:change="onSearchTabGroup">
          <option>relevance</option>
          <option>views</option>
          <option>like count</option>
        </select>
      </div>
    </div>
    <div class="row"><!-- 탭그룹 리스트 -->
      <div class="container">
        <div class="row" v-for="tabGroup in tabGroupList">
          <tabGroup v-bind:tabGroup="tabGroup"></tabGroup>
          <br>
        </div>
      </div>
    </div>

    
  </div>
</template>

<script>
import TabGroupComponent from "./blocks/TabGroupComponent";
import TabGroupModel from "../models/TabGroupModel"

export default {
  name: 'Posts',
  data(){
    return{
      tabGroupList : [],
      selectedOption : 'relevance',
      keyword : '',
    }
  },
  components: {
    'tabGroup' : TabGroupComponent,
  },
  created(){
    console.log(this.$route.query.keyword)
    this.keyword = this.$route.query.keyword
    this.onSearchTabGroup()
  },
  methods : {
    async onSearchTabGroup(){
      this.tabGroupList = await TabGroupModel.getTabGroupList(this.keyword,this.selectedOption)
      console.log(this.tabGroupList)
    },
    onSearchInPosts(keyword){
      this.$route.query.keyword = keyword
      this.keyword = keyword
      this.onSearchTabGroup()
    }
  },
}
</script>