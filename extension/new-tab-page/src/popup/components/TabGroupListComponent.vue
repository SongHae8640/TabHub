<template>
	<div>
		<div v-for="(tabGroup, index) in data"  v-if="tabGroup.category===type">
	
				<div class="TG row">
          <div class="col-8">
          	<button v-on:click="onOpenTabGroup(tabGroup)">open</button>
            <span class="TG-title" v-show="!tabGroup.isOpen">{{tabGroup.title}}</span>
            <input type="text" v-model=tabGroup.title  v-show="tabGroup.isOpen" v-on:keyup="onKeyupTitle(tabGroup)">
            <span class="TG-tabs-count">{{tabGroup.tabs.length}}</span>tabs
            <input class="btn-show-detail" type="checkbox" v-bind:checked="tabGroup.isOpen" v-on:click="toggleOpenTabs(tabGroup),onChangeTabGroupTitle(tabGroup)">
          </div>
          
          <!--onHover-->
          <div class="col-4 container">
            <div class="row">
            	<button class="btn-save-TG col-6" v-show="storageType" v-on:click="changeCategory(tabGroup,'Favorite')">favorite</button>
              <button class="btn-save-TG col-6" v-show="favoriteType"  v-on:click="changeCategory(tabGroup,'Storage')">storage</button>
              <button class="btn-share-TG col-6">share</button>
            </div>
          </div>

          <div class="TG-tabs container" v-show="tabGroup.isOpen" >
          	<div class="TG-tab row">
          		<button class="btn-delete-TG col-3 offset-3" v-on:click="onDeleteTabGroup(tabGroup.localId)">delete</button>
          		<button class="btn-sync-TG col-3" v-on:click="onSyncTabGroup(tabGroup)">sync</button>
          	</div>
			  <draggable handle=".handle" v-model=tabGroup.tabs @end="checkMove(tabGroup)">
				<div class="TG-tab row" v-for="(tab,index) in tabGroup.tabs">
				<button class="btn-move-tab col-1 offset-1 handle" >※</button>
				<span class="TG-tab-title col-7" v-bind:href="tab.url" v-on:click="openTab(tab.url)" v-show="!tab.isEditMode">{{tab.title}}</span>
				<input type="text" v-model=tab.title v-show="tab.isEditMode">

				<button class="col-1" v-show="tab.isEditMode" v-on:click="toggleEditMode(tab) , onChangeTabGroup(tabGroup)">save</button>
				<button class="col-1" v-show="!tab.isEditMode" v-on:click="toggleEditMode(tab)">edit</button>
				<button class="btn-delete-tab col-1" v-on:click="onDeleteTab(tabGroup,index)">x</button>
				</div>
			 </draggable>

            <div class="TG-tab row" >
            	<input type="text" id="new-tab-url" placeholder="New Tab Url" class="col-9 offset-1" v-model="newTabUrl">
    					<button id="btn-add-tab" class="col-1" v-on:click="onAddTab(tabGroup)">+</button>
            </div>
	       </div>
        </div>





		</div>
	</div>
</template>

<script>
 import draggable from 'vuedraggable'
	export default{
		props :['data', 'type', 'newTabUrl'],
		components:{
			draggable
		},
		computed :{
			favoriteType(){
				return this.type === 'Favorite'
			},
			storageType(){
				return this.type ==='Storage'
			}
		},
		methods:{
			checkMove(tabGroup){
				this.$emit('@change', tabGroup)
			},
			openTab(url){
				chrome.tabs.create({url : url})
			},
			toggleOpenTabs(tabGroup){
				tabGroup.isOpen = !tabGroup.isOpen
			},
			onOpenTabGroup(tabGroup){
				//윈도우 생성의 url을 탭의 가장 마지막 껄로 해야 탭그룹의 탭 순서대로 나옴
				chrome.windows.create({url : tabGroup.tabs[0].url},function (newWindow) {
			        var id = newWindow.id;
			        //가장 마지막 탭으로 윈도우를 열었기 때문에 마지막 탭 제외하고 생성된 윈도우에서 탭 열것
			        for (var i = 1; i < tabGroup.tabs.length; i++) {
			            chrome.tabs.create({"windowId": id, "url": tabGroup.tabs[i].url});
			        }
				})
				tabGroup.useDate = new Date().getTime();
				this.$emit('@sort', tabGroup)
			},
			onDeleteTabGroup(tabGroupId){
				this.$emit('@delete', tabGroupId)
			},
			onChangeTabGroup(tabGroup){
				this.$emit('@change', tabGroup)
			},
			onChangeTabGroupTitle(tabGroup){
				if(tabGroup.isEditedTitle){
					this.$emit('@changeTitle',tabGroup)
				}
			},
			onKeyupTitle(tabGroup){
				tabGroup.isEditedTitle = true
			},
			onAddTab(tabGroup){
				if(this.newTabUrl.indexOf('http')===-1){
					this.newTabUrl = 'http://'+this.newTabUrl
				}
				tabGroup.tabs.push({title : this.newTabUrl , url : this.newTabUrl})
				this.$emit('@addTab', tabGroup)
				this.newTabUrl = ''
			},
			toggleEditMode(tab){
				tab.isEditMode = !tab.isEditMode
			},
			onSyncTabGroup(tabGroup){
				let _this = this
				tabGroup.tabs = []
				chrome.tabs.getAllInWindow(function(newTabs){
	        if(newTabs.length === 0) return

	        for (var i = 0; i< newTabs.length; i++) {
	          tabGroup.tabs.push({title : newTabs[i].title , url :newTabs[i].url, isEditMode:false})
	        }

	        tabGroup.useDate = new Date().getTime()
	        _this.$emit('@change', tabGroup) 
	      })
			},
			changeCategory(tabGroup, category){
				tabGroup.category = category
				tabGroup.isOpen = false
				tabGroup.useDate = new Date().getTime()
				this.$emit('@change', tabGroup)
			},
			onDeleteTab(tabGroup,index){
				tabGroup.tabs.splice(index,1)
				this.$emit('@change', tabGroup)
			},

		}
	}

</script>