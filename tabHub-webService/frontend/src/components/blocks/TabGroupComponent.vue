<template>
    <div class="container">
        <div class="row">
            <a :href="'/posts/'+tabGroup.id">{{tabGroup.title}} - ({{tabGroup.tabs.length}} TABs)</a>
        </div>
        <div class="row">
            <img class="col-1 views" src="" alt="">
            <span class="col-1">{{tabGroup.viewCount}}</span>
            <img class="col-1 offset-col-1 likeCount" src="" alt="">
            <span class="col-1">{{tabGroup.likeCount}}</span>
        </div>
        <div class="row">
            {{this.tabGroup.content}}
        </div>
    </div>
</template>

<script>
export default {
    props : ['tabGroup'],
    
}
</script>