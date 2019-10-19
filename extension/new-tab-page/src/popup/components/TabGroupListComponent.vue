<template>
	<div v-if="data.length">
		<div v-for="tabGroup in data">
			<div class="TG row">
          <div class="col-6">
            <span class="TG-title">{{tabGroup.title}}</span>
            <span class="TG-tabs-count">{{tabGroup.tabs.length}}</span>tabs
            <input class="btn-show-detail" type="checkbox" v-on:click="toggleOpenTabs(tabGroup)">
          </div>
          
          <!--onHover-->
          <div class="col-6 container">
            <div class="row">
              <button class="btn-save-TG col-4">storage</button>
              <button class="btn-share-TG col-4">share</button>
              <button class="btn-delete-TG col-4">delete</button>
            </div>
          </div>

          <div class="TG-tabs container" v-for="tab in tabGroup.tabs" v-show="tabGroup.isOpen">
	            <div class="TG-tab row">
	              <button class="btn-move-tab col-1 offset-1">※</button>
	              <span class="TG-tab-title col-8" v-bind:href="tab.url" v-on:click="openTab(tab.url)">{{tab.title}}</span>
	              <button class="btn-delete-tab col-1">x</button>
	            </div>
	          </div>
        </div>

		</div>
	</div>
	<div v-else>
		<span v-if="favoriteType">no favorite list</span>
		<span v-if="storageType">no storage list</span>
	</div>
	

</template>

<script>
	export default{
		props :['data', 'type'],
		computed :{
			favoriteType(){
				return this.type === 'Favorite'
			},
			storageType(){
				return this.type ==='Storage'
			}
		},
		methods:{
			openTab(url){
				chrome.tabs.create({url : url})
			},
			toggleOpenTabs(tabGroup){
				tabGroup.isOpen = !tabGroup.isOpen
			},
		}
	}

</script>