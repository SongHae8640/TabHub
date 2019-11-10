import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '@/components/Login'
import Join from '@/components/Join'
import Mypage from '@/components/Mypage'
import DetailPost from '@/components/DetailPost'
import Posts from '@/components/Posts'
import NewPost from '@/components/NewPost'

//알림개수 전역변수로 설정
//login될 때마다 값 가져오기
//변경은 node js socket...
Vue.prototype.notificationCount = '3';
Vue.use(Router)

export default new Router({
  mode : 'history',
  routes: [
    {
      name: 'Main',
      path: '/',
      component: Main
    },
    {
      name: 'Login',
      path : '/login',
      component: Login
    },
    {
      name: 'Join',
      path : '/join',
      component: Join
    },
    {
      name: 'Mypage',
      path : '/mypage',
      component: Mypage
    },
    {
      name: 'Posts',
      path : '/posts/search',
      component: Posts
    },
    {
      name: 'NewPost',
      path : '/posts/new',
      component: NewPost
    },
    {
      name: 'DetailPost',
      path : '/posts/:id',
      component: DetailPost
    },
  ],
  
})
