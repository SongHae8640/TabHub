// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import SearchFormComponent from "./components/blocks/SearchFormComponent"
import UserComponent from './components/blocks/UserComponent.vue';

Vue.component('searchForm', SearchFormComponent);
Vue.component('user', UserComponent);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App, SearchFormComponent, UserComponent },
  template: '<App/>'
})