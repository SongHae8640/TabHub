<template>
	<div id="add-TG-row" class="row">
    <input type="text" id="new-TG-title" placeholder="New TabGroup Title" class="col-10" v-model="tabGroupTitle">
    <button id="btn-add-TG" class="col-2" v-on:click="onAddTabGroup">+</button>
  </div>
</template>

<script>
	export default {
		props: ['title'],
    data(){
        return{
            tabGroupTitle : this.title
        }
    },
		methods :{
			onAddTabGroup(){
				this.$emit('@addTabGroup', this.tabGroupTitle.trim())
				this.tabGroupTitle = ''
			},
		}

	}
</script>