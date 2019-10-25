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
        <tab-group-list v-bind:data="tabGroups" v-bind:type="selectedTabsMenu" v-on:@delete="onDeleteTabGroup" v-on:@change="onChangeTabGroup" v-on:@changeTitle="onChangeTabGroupTitle" v-on:@addTab="onAddTab" v-on:@sort="onSortTabGroup"></tab-group-list>
        <tab-group-add-box v-bind:title="newTabGroupTitle" v-on:@addTabGroup="onAddTabGroup" v-show="isFavorite()"></tab-group-add-box>

		  	</div>
  		</div>

  		
  	</div>
  	
  </div>
  
  
</template>

<script>
  import LocalTabGroupsModel from './models/LocalTabGroupsModel.js'

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
        tabGroups : [],
      }
    },
    components :{
    	'tabs-menu' : TabMenuComponent,
      'tab-group-list' : TabGroupListComponent,
      'tab-group-add-box' : TabGroupAddBoxComponent,
    },
    created(){
    	this.selectedTabsMenu = this.tabsMenu[0]
      this.fetchChromeTabGroups();
    },
    methods:{
    	onClickTabsMenu(tabsMenu){
    		this.selectedTabsMenu = tabsMenu
    	},
      isFavorite(){
        return this.selectedTabsMenu === this.tabsMenu[0]
      },
      onAddTabGroup(title){
        LocalTabGroupsModel.addCreatedData(title)
      },
      async onDeleteTabGroup(tabGroupId){
        await LocalTabGroupsModel.deleteData(tabGroupId)
        this.fetchChromeTabGroups()
      },
      onChangeTabGroup(tabGroup){
        LocalTabGroupsModel.changeData(tabGroup)
      },
      onChangeTabGroupTitle(tabGroup){
        LocalTabGroupsModel.changeData(tabGroup)
        ///디비와 싱크 때 따로 타이틀만 수정하기
      },
      async onSortTabGroup(tabGroup){
        await LocalTabGroupsModel.changeData(tabGroup)
        this.fetchChromeTabGroups()

      },
      onAddTab(tabGroup){
        LocalTabGroupsModel.changeData(tabGroup,this.tabGroups)
      },

      fetchChromeTabGroups(){
        LocalTabGroupsModel.getData().then(data =>{
          this.tabGroups = data
        })
      },
    }
  }
</script>
