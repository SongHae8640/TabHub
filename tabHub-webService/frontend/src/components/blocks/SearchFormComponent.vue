<template>
  <div>
    <img> <!-- icon -->
    <input placeholder="search!" v-model="keyword">
    <a type="button" class="btn btn-primary" v-on:click="getSearchResults()">search</a>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data (){
    return {keyword : ''}
  },
  created(){
    this.keyword = this.$route.query.keyword
  },
  methods:{
    getSearchResults(){
      if(this.$route.path==='/posts/search'){
        this.$router.push('/posts/search?keyword='+this.keyword+'&filter=relevance').catch(err =>{
          //console.log(this.$route)
        })
        this.$emit('@search', this.keyword)
      }else{
        this.$router.push('/posts/search?keyword='+this.keyword+'&filter=relevance');
      }
      
      //this.$router.push('/posts/search?keyword='+this.keyword+'&filter=relevance');
      //window.location = '/posts/search?keyword='+this.keyword+'&filter=relevance'
    },
  }
}
</script>