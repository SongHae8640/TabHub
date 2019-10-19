<template>
  <div>
  	<div class="container" id="tabs">
    	<tabs-menu v-bind:tabsMenu="tabsMenu" v-bind:selectedTabsMenu="selectedTabsMenu" v-on:@change="onClickTabsMenu"></tabs-menu>
  	</div>
  	<div class="content container">
  		<div v-if="selectedTabsMenu === tabsMenu[2]">
  			메세지
  		</div>
  		<div v-else>
  			<div v-if="selectedTabsMenu == tabsMenu[0]">
          <tab-group-list v-bind:data="favoriteTabGroups" v-bind:type="tabsMenu[0]"></tab-group-list>
		  	</div>
		  	<div v-else>
          <tab-group-list v-bind:data="storageTabGroups" v-bind:type="tabsMenu[1]"></tab-group-list>
		  	</div>
  		</div>

  		
  	</div>
  	
  </div>
  
  
</template>

<script>
  import FavoriteTabGroupsModel from './models/FavoriteTabGroupsModel.js'
  import StorageTabGroupsModel from './models/StorageTabGroupsModel.js'

	import TabMenuComponent from './components/TabMenuComponent.vue'
  import TabGroupListComponent from './components/TabGroupListComponent.vue'

  export default {
  	name :'app',
    data () {
      return {
      	tabsMenu : ['Favorite', 'Storage', 'Message'],
      	selectedTabsMenu : '',
        favoriteTabGroups : [],
        storageTabGroups : [],
      }
    },
    components :{
    	'tabs-menu' : TabMenuComponent,
      'tab-group-list' : TabGroupListComponent,
    },
    created(){
    	this.selectedTabsMenu = this.tabsMenu[0]
      this.fetchFavoriteTabGroups();
      this.fetchStorageTabGroups();
    },
    methods:{
    	onClickTabsMenu(tabsMenu){
    		this.selectedTabsMenu = tabsMenu
    	},

      fetchStorageTabGroups(){
        StorageTabGroupsModel.list().then(data =>{
          this.storageTabGroups = data
          console.log(data)
        })
      },
      fetchFavoriteTabGroups(){
        FavoriteTabGroupsModel.list().then(data =>{
          this.favoriteTabGroups = data
        })
      },
    }
  }
</script>
