<template>
  <div>
  	<div class="container" id="tabs">
    	<tabs-menu v-bind:tabsMenu="tabsMenu" v-bind:selectedTabsMenu="selectedTabsMenu" v-on:@change="onClickTabsMenu"></tabs-menu>
  	</div>
  	<div class="content">
  		<div v-if="selectedTabsMenu === tabsMenu[2]">
  			메세지
  		</div>
  		<div v-else>
  			<div v-if="selectedTabsMenu == tabsMenu[0]">
		  		즐겨찾기
		  	</div>
		  	<div v-else>
		  		보관함
		  	</div>
  		</div>

  		
  	</div>
  	
  </div>
  
  
</template>

<script>
	import TabMenuComponent from './components/TabMenuComponent.vue'

export default {
	name :'app',
  data () {
    return {
    	tabsMenu : ['Favorite', 'Storage', 'Message'],
    	selectedTabsMenu : '',
    }
  },
  components :{
  	'tabs-menu' : TabMenuComponent,
  },
  created(){
  	this.selectedTabsMenu = this.tabsMenu[0]
  },
  methods:{
  	onClickTabsMenu(tabsMenu){
  		this.selectedTabsMenu = tabsMenu
  	},
  }

}
</script>
