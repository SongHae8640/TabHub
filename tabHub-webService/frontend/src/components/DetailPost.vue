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
          조회수, 다운로드수, 날짜, 좋아요, 싫어요, ...버튼(수정,삭제,신고)
        </div>
        <div class="col-12">
          작성자
          내용
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
      <div class="col-12">
        <span>아이콘 + Comment</span><span> 댓글 수</span>
      </div>
      <div class="col-12">
        <img><input type="text" placeholder="댓글입력" />
      </div>
      <div class="col-12">
        <div class="container">
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
      </div>
    </div>

  </div>
</template>

<script>
import CommentComponent from "./blocks/CommentComponent";

export default {
  name: 'DetailPost',
  components : {
    'comment' : CommentComponent,
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
</style>