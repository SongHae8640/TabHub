<template>
  <div class="container">
    <!--검색창 login/logout-->
    <div class="row text-center">
      <div class="col-8">
        <searchForm></searchForm>
      </div>
      <div class="col-4">
        <user></user>
      </div>
    </div>
    <!--내 정보(팔로우,팔로잉)-->
    <div class="row">
      <div class="col-2">
        <img src="" alt="">
      </div>
      <div class="col-7">
        <div class="my-row">
          <h2>userId</h2>
           <a href="/posts/new">+newPost</a>
        </div>
        <span>Following 00</span>
        <span>Follower 00</span>
        <span>Upload 00</span>
      </div>
      <div class="col-3">
        <button type="button" class="btn btn-secondary">Follow</button>
      </div>
    </div>
    <!--메뉴-->
    <div class="row">
      <nav class="col-12">
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
          <a class="nav-item nav-link" id="nav-myNotifications-tab" data-toggle="tab" href="#nav-myNotifications" role="tab" aria-controls="nav-myNotifications" aria-selected="false">My Notifications</a>
          <a class="nav-item nav-link active" id="nav-myPosts-tab" data-toggle="tab" href="#nav-myPosts" role="tab" aria-controls="nav-myPosts" aria-selected="true">My Posts</a>
          <a class="nav-item nav-link" id="nav-myComments-tab" data-toggle="tab" href="#nav-myComments" role="tab" aria-controls="nav-myComments" aria-selected="false">My Comments</a>
          <a class="nav-item nav-link" id="nav-following-tab" data-toggle="tab" href="#nav-following" role="tab" aria-controls="nav-following" aria-selected="false">Following</a>
          <a class="nav-item nav-link" id="nav-follower-tab" data-toggle="tab" href="#nav-follower" role="tab" aria-controls="nav-follower" aria-selected="false">Follower</a>
        </div>
      </nav>
    </div>
    
    <div class="row tab-content" id="nav-tabContent">
      <!--피드백 알림-->
      <div class="container tab-pane fade" id="nav-myNotifications" role="tabpanel" aria-labelledby="nav-myNotifications-tab">
        <div class="row" v-for="notification in ['notification', 'notification']">
          <div class="col-8">
            <div class="alert alert-primary" role="alert">
              <a href="#">notification content</a><!-- href는 notification의 url -->
            </div>
          </div>
        </div>
      </div>
      <!--내가 쓴 글-->
      <div class="container tab-pane fade show active" id="nav-myPosts" role="tabpanel" aria-labelledby="nav-myPosts-tab">
        <div class="row" v-for="tabGroup in ['tabGroup', 'tabGroup']">
          <div class="col-12">
            <tabGroup></tabGroup>
            <br>
          </div>
        </div>
      </div>
      <!--내가 쓴 댓글-->
      <div class="container tab-pane fade" id="nav-myComments" role="tabpanel" aria-labelledby="nav-myComments-tab">
        <div class="row" v-for="comment in ['contents', 'contents']">
            <comment></comment>
            <div v-if="true" class="col-12">
              <img class="down-arrow"><p>00개 더보기</p>
              <div class="container" v-show="true">
                <div class="row" v-for="comment in ['contents']">
                  <comment></comment>
                </div>
              </div> 
            </div>
          </div>
      </div>
      <!--팔로잉-->
      <div class="container tab-pane fade" id="nav-following" role="tabpanel" aria-labelledby="nav-following-tab">
        <div class="row" v-for="account in ['account', 'account']">
          <div class="col-2">
            <img src="" alt=""> <!-- account img -->
          </div>
          <div class="col-4">
            <a>account id</a><!-- href는 notification의 url -->
          </div>
          <div class="col-2">
            <a type="button" class="btn btn-secondary">+follow</a>
          </div>
        </div>
      </div>
      <!--팔로워-->
      <div class="container tab-pane fade" id="nav-follower" role="tabpanel" aria-labelledby="nav-follower-tab">
        
      </div>
    </div>
  </div>
</template>

<script>
import TabGroupComponent from "./blocks/TabGroupComponent";
import CommentComponent from "./blocks/CommentComponent";

export default {
  name: 'Mypage',
  components : {
    'tabGroup' : TabGroupComponent,
    'comment' : CommentComponent,
  },
}
</script>

<style scoped>
 .my-row *{
   display: inline;
 }
</style>