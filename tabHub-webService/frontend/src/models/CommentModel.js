
export default{
    data :[
        {
            id : 1,
            profileUrl : "adsad",
            utgId : 1,
            writerId : 1,
            likeCount : 5,
            hateCount : 2,
            content : 'content1',
            writeDate : '2019-11-01',
            isOpen : false,
            reComments :[
                {
                    id : 4,
                    profileUrl : "",
                    utgId : 1,
                    writerId : 1,
                    likeCount : 5,
                    hateCount : 2,
                    content : 'content4',
                    writeDate : '2019-11-01',
                },
                {
                    id : 5,
                    profileUrl : "",
                    utgId : 1,
                    writerId : 1,
                    likeCount : 5,
                    hateCount : 2,
                    content : 'content5',
                    writeDate : '2019-11-01',
                },
            ]
        },
        {
            id : 2,
            profileUrl : "",
            utgId : 1,
            writerId : 1,
            likeCount : 5,
            hateCount : 2,
            content : 'content2',
            writeDate : '2019-11-01',
            isOpen : false,
            reComments :[],
        },
        {
            id : 3,
            profileUrl : "",
            utgId : 1,
            writerId : 3,
            likeCount : 5,
            hateCount : 2,
            content : 'content3',
            writeDate : '2019-11-03',
            isOpen : false,
            reComments :[],
        },
    ],
    getCommentListByPostId(tabGroupId){
        var _this = this
        return new Promise(function(resolve, reject){
            //let comments = axios.get('/posts/'+tabGroupId+'/comments');
            resolve(_this.data)
            //resolve(comments)
        })
    },

    getCommentListByAccountId(accountId){
        var _this = this
        return new Promise(function(resolve, reject){
            //let comments = axios.get('/accounts/'+accountId+'/comments');
            resolve(_this.data)
            //resolve(comments)
        })
    },
}