<template>
  <div>
    <img> <!-- icon -->
    <input placeholder="search!" v-model="keyword">
    <a type="button" class="btn btn-primary" v-on:click="onSearch()">search</a>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data (){
    return {keyword : ''}
  },
  methods:{
    async onSearch(){
      //axios
      let returnVal = await axios.get('/hi')
      console.log(returnVal)
    },
  }
}
</script>