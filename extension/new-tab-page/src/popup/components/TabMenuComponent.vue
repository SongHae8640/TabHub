<template>
	<ul id="tabs-menu" class="nav nav-tabs">
    <li class="nav-item">
      <a id="favorite-tabs-menu" class="nav-link" v-bind:class="{active: tabsMenu[0] === selectedTabsMenu}" v-on:click="onClickTabMenu(tabsMenu[0])">Favorite</a>
      
    </li>

    <li class="nav-item">
      <a id="storage-tabs-menu" class="nav-link" v-bind:class="{active: tabsMenu[1] === selectedTabsMenu}" v-on:click="onClickTabMenu(tabsMenu[1])">Storage</a>
      
    </li>

    <li class="nav-item">
      <a id="message-tabs-menu" class="nav-link" v-bind:class="{active: tabsMenu[2] === selectedTabsMenu}" v-on:click="onClickTabMenu(tabsMenu[2])">Message<span id="message-TG-count" class="badge badge-danger">5</span></a>
      
      
    </li>
  </ul>
</template>

<script>
	export default {
		props : ['tabsMenu' , 'selectedTabsMenu'],
		methods : {
			onClickTabMenu(tab){
				this.$emit('@change', tab)
			}
		}
	}

</script>