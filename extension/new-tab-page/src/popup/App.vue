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
          <tab-group-list v-bind:data="favoriteTabGroups" v-bind:type="tabsMenu[0]" v-on:@delete="onDeleteTabGroup" v-on:@change="onChangeTabGroup" v-on:@addTab="onAddTab" v-on:@sort="onSortTabGroup"></tab-group-list>
          <tab-group-add-box v-bind:title="newTabGroupTitle" v-on:@addTabGroup="onAddTabGroup"></tab-group-add-box>

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
  import TabGroupAddBoxComponent from './components/TabGroupAddBoxComponent.vue'

  export default {
  	name :'app',
    data () {
      return {
      	tabsMenu : ['Favorite', 'Storage', 'Message'],
        newTabGroupTitle : '',
      	selectedTabsMenu : '',
        favoriteTabGroups : [],
        storageTabGroups : [],
      }
    },
    components :{
    	'tabs-menu' : TabMenuComponent,
      'tab-group-list' : TabGroupListComponent,
      'tab-group-add-box' : TabGroupAddBoxComponent,
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
      onAddTabGroup(title){
        FavoriteTabGroupsModel.addCreatedData(title)
      },
      onDeleteTabGroup(tabGroupId){
        FavoriteTabGroupsModel.deleteData(tabGroupId).then(
          this.fetchFavoriteTabGroups)
      },
      onChangeTabGroup(tabGroup){
        console.log("onChangeTabGroup",this.favoriteTabGroups)
        FavoriteTabGroupsModel.changeData(tabGroup,this.favoriteTabGroups)
      },
      onSortTabGroup(tabGroup){
        FavoriteTabGroupsModel.changeData(tabGroup, this.favoriteTabGroups).then(
          this.fetchFavoriteTabGroups
        )
      },
      onAddTab(tabGroup){
        FavoriteTabGroupsModel.changeData(tabGroup,this.favoriteTabGroups)
      },
      fetchStorageTabGroups(){
        StorageTabGroupsModel.list().then(data =>{
          this.storageTabGroups = data
        })
      },
      fetchFavoriteTabGroups(){
        FavoriteTabGroupsModel.getData().then(data =>{
          console.log(data)
          this.favoriteTabGroups = data
        })
      },
    }
  }
</script>
