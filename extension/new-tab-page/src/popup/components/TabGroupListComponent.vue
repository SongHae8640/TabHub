<template>
	<div v-if="data.length">
		<div v-for="(tabGroup, index) in data">
			<div class="TG row">
          <div class="col-8">
          	<button v-on:click="onOpenTabGroup(index)">open</button>
            <span class="TG-title">{{tabGroup.title}}</span>
            <span class="TG-tabs-count">{{tabGroup.tabs.length}}</span>tabs
            <input class="btn-show-detail" type="checkbox" v-bind:checked="tabGroup.isOpen" v-on:click="toggleOpenTabs(tabGroup)">
          </div>
          
          <!--onHover-->
          <div class="col-4 container">
            <div class="row">
              <button class="btn-save-TG col-6">storage</button>
              <button class="btn-share-TG col-6">share</button>
            </div>
          </div>

          <div class="TG-tabs container"  v-show="tabGroup.isOpen">
          	<div class="TG-tab row">
          		<button class="btn-delete-TG col-3 offset-3" v-on:click="onDeleteTabGroup(index)">delete</button>
          		<button class="btn-sync-TG col-3">sync</button>
          	</div>
	            <div class="TG-tab row" v-for="tab in tabGroup.tabs">
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
			onOpenTabGroup(index){
				//윈도우 생성의 url을 탭의 가장 마지막 껄로 해야 탭그룹의 탭 순서대로 나옴
				chrome.windows.create({url : this.data[index].tabs[0].url},function (newWindow) {
			        var id = newWindow.id;
			        //가장 마지막 탭으로 윈도우를 열었기 때문에 마지막 탭 제외하고 생성된 윈도우에서 탭 열것
			        for (var i = 1; i < this.data[index].tabs.length; i++) {
			            chrome.tabs.create({"windowId": id, "url": this.data[index].tabs[i].url});
			        }
				})
			},
			onDeleteTabGroup(index){
				this.$emit('@delete', index)
			},
		}
	}

</script>