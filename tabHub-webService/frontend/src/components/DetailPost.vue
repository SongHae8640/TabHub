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
        <span id="tabGroup-title">tabGroup title</span><b> - (00 TABs)</b>
        <div class="col-12">
          <span>조회수</span>
          <span>다운로드수</span>
          <span>2019.03.15</span>
          <span>좋아요 00</span>
          <span>싫어요 00</span>
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
          <span>작성자</span>
          <p>내용</p>
          <div class="container">
            <div class="row" v-for="tab in ['tabs', 'tabs']">
              <div class="col-12">
                탭제목
              </div>
              <div class="col-12">
                탭URL
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
            <span>아이콘 + Comment</span><span> (00) </span>
          </div>
        </div>
        <div class="row">
          <div class="col-1">
            <img src="../img/profile.png" alt="">
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
              <div class="row" v-for="comment in ['contents', 'contents']">
                <comment></comment>
                <div v-if="true" class="col-12">
                  <a href="#" v-show="false"><img class="down-arrow">▽ 00개 더보기</a>
                  <a href="#" v-show="true"><img class="down-arrow">△ 00개 숨기기</a>
                  <div class="container" v-show="true">
                    <div class="row" v-for="comment in ['contents']">
                      <comment></comment>
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

export default {
  name: 'DetailPost',
  components : {
    'comment' : CommentComponent,
  },
  data(){
    tabGroup : {}
  },
  created(){
    console.log(this.$route.params.id)
    this.onSearchTab(this.$route.params.id)
  },
  methods : {
    async onSearchTab(postId){
      const tabGroup = await TabGroupModel.getPost(postId);
      console.log(tabGroup)
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