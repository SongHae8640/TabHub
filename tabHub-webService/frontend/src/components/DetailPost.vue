<template>
  <div class="container">
    <div class="row text-center">
      <div class="col-8">
        <searchForm></searchForm>
      </div>
      <div class="col-4">
        <user></user>
      </div>
    </div>
    
    <div class="row">
      <div class="col-12">
        <span id="tabGroup-title">{{tabGroup.title}}</span><b> - ({{tabsCount}} TABs)</b>
        <div class="col-12">
          <span>조회수 {{tabGroup.viewCount}}</span>
          <span>다운로드수 {{tabGroup.downloadCount}}</span>
          <span>{{tabGroup.writeDate}}</span>
          <span>좋아요 {{tabGroup.likeCount}}</span>
          <span>싫어요 {{tabGroup.hateCount}}</span>
          <div class="btn-group dropright">
            <button type="button" class="btn btn-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            </button>
            <div class="dropdown-menu">
              <a href="#" class="dropdown-item" v-show="false">수정</a>
              <a href="#" class="dropdown-item" v-show="false">삭제</a>
              <a href="#" class="dropdown-item">신고</a>
            </div>
          </div>
        </div>
        <div class="col-12">
          <span>작성자 : {{tabGroup.writer}}</span>
          <p>내용 : {{tabGroup.content}}</p>
          <div class="container">
            <div class="row" v-for="tab in tabGroup.tabs">
              <div class="col-12">
                {{tab.title}}
              </div>
              <div class="col-12">
                {{tab.url}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <span>아이콘 + Comment</span><span> ({{comments.length}}) </span>
          </div>
        </div>
        <div class="row"> 
          <div class="col-1">
            <img src="../img/profile.png"  alt="">
          </div>
          <div class="col-11">
            <input type="text" class="col-12" placeholder="댓글입력" />
          </div>
          <div class="col-12">
            <div class="float-right">
                <button>취소</button>
                <button>답글</button>
            </div>
          </div>
        </div>
        
        <div class="row">
          <div class="col-12">
            <div class="container">
              <div class="row" v-for="comment in comments">
                <comment v-bind:comment="comment"></comment>
                <div v-if="true" class="col-12">
                  <a href="#" v-show="!comment.isOpen"><img class="down-arrow">▽ 00개 더보기</a>
                  <a href="#" v-show="comment.isOpen"><img class="down-arrow">△ 00개 숨기기</a>
                  <div class="container" v-show="comment.isOpen">
                    <div class="row" v-for="reComment in comment.reComments">
                      <comment v-bind:comment="reComment"></comment>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import CommentComponent from "./blocks/CommentComponent";
import TabGroupModel from "../models/TabGroupModel";
import CommentModel from "../models/CommentModel";

export default {
  name: 'DetailPost',
  components : {
    'comment' : CommentComponent,
  },
  data(){
    return{
      tabGroup : {},
      comments : [],
      tabsCount : -1,
      commentsCount : -1,
    }
  },
  created(){
    console.log(this.$route.params.id)
    this.onGetTabGroup(this.$route.params.id)
    this.onGetComments(this.$route.params.id)
  },
  methods : {
    async onGetTabGroup(postId){
      this.tabGroup = await TabGroupModel.getPost(postId);
      this.tabsCount = this.tabGroup.tabs.length
      console.log(this.tabGroup)
    },
    async onGetComments(postId){
      this.comments = await CommentModel.getCommentListByPostId(postId)
      this.commentsCount = this.comments.length
      console.log(this.comments)
    },
  },
}
</script>

<style scoped>
#tabGroup-title {
  font-size: 30px;
}
.row{
  border: 1px solid black;
}
img{
  width: 30px;
}
</style>