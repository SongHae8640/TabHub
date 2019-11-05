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

export default {
  name: 'Main',
  props :['recommends'],
  
  async created(){
    this.recommends = await this.getRecommends()
  },
  methods : {
    getRecommends(){
        let accountId = 1;
        let recommendsList = axios.get('/posts/recommend/1')
        //id, title, writer, views
        recommendsList = [
          {
            id: 1,
            title: "test1",
            writer: "tabhub",
            views: 30
          },
          {
            id: 2,
            title: "test2",
            writer: "tabhub",
            views: 20
          },
          {
            id: 3,
            title: "test3",
            writer: "tabhub",
            views: 300
          },
          {
            id: 4,
            title: "test4",
            writer: "tabhub",
            views: 303
          },
          {
            id: 5,
            title: "test5",
            writer: "tabhub",
            views: 33243
          },
          {
            id: 6,
            title: "test6",
            writer: "tabhub",
            views: 2322
          },
        ]

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
