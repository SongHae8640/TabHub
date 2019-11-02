
export default{
    data :[
        {
            id : 1,
            utgId : 1,
            writerId : 1,
            likeCount : 5,
            hateCount : 2,
            writeDate : '2019-11-01',
            refCommentId : 0,
            refAccountId : 0,
        },
        {
            id : 2,
            utgId : 1,
            writerId : 1,
            likeCount : 5,
            hateCount : 2,
            writeDate : '2019-11-01',
            refCommentId : 0,
            refAccountId : 0,
        },
        {
            id : 3,
            utgId : 1,
            writerId : 3,
            likeCount : 5,
            hateCount : 2,
            writeDate : '2019-11-03',
            refCommentId : 1,
            refAccountId : 1,
        },
    ],
    getList(tagGroupId){
        return new Promise((resolve, reject){
            resolve(this.data)
        })
    },
}