<template>
  <div class="container">
    <div class="row">
    <div class="col-2">
        <img :src="comment.profileUrl" class="col-12">
    </div>
    <div class="col-10">
        <span>{{comment.writerId}} {{comment.writeDate}}</span>
        <div class="btn-group dropright float-right">
            <button type="button" class="btn btn-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            </button>
            <div class="dropdown-menu">
              <a href="#" class="dropdown-item" v-show="false">수정</a>
              <a href="#" class="dropdown-item" v-show="false">삭제</a>
              <a href="#" class="dropdown-item">신고</a>
            </div>
          </div>
        <p>댓글내용</p>
        <div>
            <button>좋아요</button> <span>{{comment.likeCount}}</span>
            <button>싫어요</button> <span>{{comment.hateCount}}</span>
            <button>답글</button>
        </div>
        <div class="row">
            <div class="col-12">
                <img class="col-1" src="../../img/profile.png"><input type="text" class="col-11" placeholder="답댓글입력">
            </div>
            <div class="col-12">
                <div class="float-right">
                    <button>취소</button>
                    <button>답글</button>
                </div>
            </div>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Comment',
    props : ['comment'],
}
</script>