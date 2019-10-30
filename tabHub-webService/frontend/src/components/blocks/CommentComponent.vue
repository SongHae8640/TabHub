<template>
  <div>
    <div class="col-2">
        <img>
    </div>
    <div class="col-10">
        <span>댓글쓴이 날짜</span>
        <p>댓글내용</p>
        <div>
            <button>좋아요</button> <span>00</span>
            <button>싫어요</button> <span>00</span>
            <button>답글</button>
        </div>
        <div class="row">
            <div class="col-12">
                <img><input type="text" placeholder="답댓글입력">
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
</template>

<script>
export default {
    name: 'Comment',
}
</script>