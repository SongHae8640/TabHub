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
        <searchForm v-on:@searchTabGroup="onSearchTabGroup"></searchForm>
      </div>
    </div>

    <br><br>
    <!--추천 리스트 -->
    <div class="row">
      <div class="container text-center">
        <div class="row" >
          <div class="col-4" v-for="recommend in this.recommends">
            <a type="button" class="btn btn-primary" :href="'/posts/'+recommend.id">{{recommend.title}}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TabGroupModel from "../models/TabGroupModel"

export default {
  name: 'Main',
  data(){
    return{
      recommends : []
    }
  },
  async created(){
    this.recommends = await this.getRecommends()
  },
  methods : {
    async getRecommends(){
        let accountId = 1;
        let recommendsList = await TabGroupModel.getRecommends(accountId)
        
        console.log(recommendsList);
        return recommendsList
    },
    onSearchTabGroup(keyword){
      console.log(keyword)
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
