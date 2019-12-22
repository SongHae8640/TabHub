<template>
  <div>
    <div class="container">
      <div class="row">
          <h1>TabHub</h1>
          <img src="" alt="" class="icon">
      </div>
    </div>


    <div v-if="isTabGroupPage" id="tabGroup">
      <div class="container">
        <div v-if="isLogin" class="row">
            <div class="col-4">{{accountData.id}} 님 </div>
            <div class="col-8" v-on:click="onClickLogoutBtn"><button>logout</button></div>

        </div>
        <div v-else>
            <div class="row">
                <button v-on:click="onClickLoginPageBtn">login</button>
                <button v-on:click="onClickJoinPageBtn">join</button>
            </div>
            <div class="row">
                동기화를 위해서는 로그인이 필요합니다.
            </div>
        </div>
      </div>
      <div class="container" id="tabs">
        <tabs-menu v-bind:tabsMenu="tabsMenu" v-bind:selectedTabsMenu="selectedTabsMenu" v-on:@change="onClickTabsMenu"></tabs-menu>
      </div>
      <div class="content container">
        <div v-if="selectedTabsMenu === tabsMenu[2]">
          메세지
        </div>
        <div v-else>
          <tab-group-list v-bind:data="tabGroups" v-bind:type="selectedTabsMenu" 
          v-on:@delete="onDeleteTabGroup" v-on:@change="onChangeTabGroup" 
          v-on:@changeTitle="onChangeTabGroupTitle" v-on:@addTab="onAddTab" 
          v-on:@sort="onSortTabGroup"></tab-group-list>
          <tab-group-add-box v-bind:title="newTabGroupTitle" v-on:@addTabGroup="onAddTabGroup" v-show="isFavorite()"></tab-group-add-box>
        </div>
      </div>
    </div>


    <div v-else id="auth">
      <div v-if="isLoginPage">
        <h1>Login</h1>
        <form action="http://localhost:9091/ajax/account/login">
          <div class="form-group">
            <label for="id">ID</label>
            <input class="form-control" id="id" name="id" placeholder="Enter ID" v-model="accountData.id">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" name="password" id="password" placeholder="Password" v-model="accountData.pw">
          </div>
          <div class="form-group">
            <label for="remember-me">auto Login</label>
            <input type="checkbox" name="remember-me" v-model="accountData.rememberMe">
          </div>
          <a class="float-left" v-on:click="onClickJoinPageBtn">join</a>
          <button v-on:click="onClickMainPageBtn" class="btn btn-primary float-right">cancel</button>
          <button v-on:click="onClickLoginBtn" type="submit" class="btn btn-primary float-right">Submit</button>
        </form>
      </div>
      <div v-else>
        <h1>Join</h1>
        <form>
          <div class="form-group">
            <label for="id">ID</label>
            <input class="form-control" id="id" placeholder="Enter ID" v-model="accountData.id">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" placeholder="Password" v-model="accountData.pw">
          </div>
          <div class="form-group">
            <label for="confirm-password">Password</label>
            <input type="password" class="form-control" id="confirm-password" placeholder="Confirm Password" v-model="accountData.rePw">
            <span><!-- 비밀번호 일치 여부 확인 --></span>
          </div>
          <div class="form-group">
            <label for="email">E-mail</label>
            <div class="container">
              <div class="row">
                <input type="email" class="col-9 form-control" id="email" placeholder="Enter e-mail" v-model="accountData.email">
                <button type="button" class="col-3 btn btn-secondary">Confirm</button>  
              </div>
              <div class="row" v-show="true">
                <input type="text" class="col-3 form-control" id="confirm-code" placeholder="code" v-model="accountData.confirmCode">
                <button type="button" class="col-3 btn btn-secondary">Check</button>
                <span v-show="false">fail code</span>
              </div>
            </div>
                    
            
          </div>
          <a class="float-left" v-on:click="onClickLoginPageBtn">login</a>
          <button v-on:click="onClickMainPageBtn" class="btn btn-primary float-right">cancel</button>
          <button type="button" v-on:click="onClickJoinBtn" class="btn btn-primary float-right">Submit</button>

        </form>
      </div>

    </div>
    

  		
  </div>
  
  
</template>

<script>
  import LocalTabGroupsModel from './models/LocalTabGroupsModel.js'
  import AccountModel from './models/AccountModel.js'

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
        isLogin : false,
        isTabGroupPage : true,
        isLoginPage : true,

        accountData :{
          id :'user',
          pw :'1234',
          rePw :'',
          email :'',
          confirmCode : '',
          rememberMe : ''
        }

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
    updated(){
      //this.onClickLoginBtn()
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

      onClickLoginPageBtn(){
        this.isTabGroupPage = false
        this.isLoginPage = true
      },

      onClickJoinPageBtn(){
        this.isTabGroupPage = false
        this.isLoginPage = false
      },

      onClickMainPageBtn(){
        this.isTabGroupPage = true
      },

      async onClickLoginBtn(){

        //로그인 성공
        if(await AccountModel.login(this.accountData)){
          this.isLogin = true
          this.isTabGroupPage = true
          this.isLoginPage = false

          //sync 통신 

          //message 통신


        }
        //로그인 실패
        else{
          alert('login에 실패 했습니다.')

        }

      },

      onClickJoinBtn(){
        console.log(this.accountData)
      },

      async onClickLogoutBtn(){
        if(await AccountModel.logout()){
          this.isLogin = false
          this.isTabGroupPage = false
          this.isLoginPage = true
        }else{

        }
      },
    }
  }
</script>


