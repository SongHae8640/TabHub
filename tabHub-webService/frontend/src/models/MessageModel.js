export default{
    data:[
        {
            id : 1,
            actionAccountId : '',
            type : 'post_like',
            message : '“젠더 이슈에 관한 탭 모...”에 12명이 좋아요를 눌렀습니다.',
            url : 'http://localhost:8080/posts/1',
            createDate : '2019-11-02',
            readDate : ''
        },
        {
            id : 2,
            actionAccountId : '',
            type : 'comment_like',
            message : '“프로젝트 같이하니까 좋...”에 24명이 좋아요를 눌렀습니다.',
            url : 'http://localhost:8080/posts/1',
            createDate : '2019-11-02',
            readDate : ''
        },
        {
            id : 3,
            actionAccountId : 'test1',
            type : 'comment',
            message : '“젠더 이슈에 관한 탭 모...”에 test1님이 댓글을 남겼습니다.',
            url : 'http://localhost:8080/posts/1',
            createDate : '2019-11-02',
            readDate : ''
        },
        {
            id : 4,
            action_account_id : 'test1',
            type : 'recomment',
            message : '“프로젝트 같이하니까 좋...”에 test1님이 대댓글을 남겼습니다.',
            url : 'http://localhost:8080/posts/1',
            createDate : '2019-11-02',
            readDate : ''
        },
        {
            id : 5,
            action_account_id : 'test1',
            type : 'follow',
            message : 'test1님이 팔로우하기 시작했습니다.',
            url : 'http://localhost:8080/mypage/test1',
            createDate : '2019-11-02',
            readDate : ''
        },
    ],
    getData(){
        return new Promise(function(resolve, reject){
            resolve(this.data)
        })
    }
}