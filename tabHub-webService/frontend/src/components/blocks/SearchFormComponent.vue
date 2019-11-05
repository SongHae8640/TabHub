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
  methods:{
    getSearchResults(){
      console.log( this.keyword)
      this.$emit('@searchTabGroup', this.keyword)
    },
  }
}
</script>