import { resolve, reject } from "q";

export default{
    data : [
        {
            id : 1,
            writer : 'account1',
            title : 'title1',
            content : 'content1',
            likeCount : 1,
            hateCount : 0,
            commentCount : 4,
            viewCount : 100,
            downloadCount : 4,
            writeDate : '2019-11-02',
            tabs :[
                {title : '네이버' , url : 'http://www.naver.com'},
                {title : '구글' , url : 'http://www.google.com'},
                {title : '유튭' , url : 'http://www.youtube.com'},
            ]
        },
        {
            id : 2,
            writer : 'account2',
            title : 'title2',
            content : 'content2',
            likeCount : 1,
            hateCount : 0,
            commentCount : 4,
            viewCount : 100,
            downloadCount : 4,
            writeDate : '2019-11-02',
        },
        {
            id : 3,
            writer : 'account3',
            title : 'title3',
            content : 'content3',
            likeCount : 1,
            hateCount : 0,
            commentCount : 4,
            viewCount : 100,
            downloadCount : 4,
            writeDate : '2019-11-02',
        },{
            id : 4,
            writer : 'account4',
            title : 'title4',
            content : 'content4',
            likeCount : 1,
            hateCount : 0,
            commentCount : 4,
            viewCount : 100,
            downloadCount : 4,
            writeDate : '2019-11-02',
        },
        {
            id : 5,
            writer : 'account5',
            title : 'title5',
            content : 'content5',
            likeCount : 1,
            hateCount : 0,
            commentCount : 4,
            viewCount : 100,
            downloadCount : 4,
            writeDate : '2019-11-02',
            tabs :[
                {title : '네이버' , url : 'http://www.naver.com'},
                {title : '구글' , url : 'http://www.google.com'},
                {title : '유튭' , url : 'http://www.youtube.com'},
            ]
        }
    ],
    getListRelevance(keyword){
        return new Promise((resolve, reject){
            resolve(this.data)
        })
    },
    getListViews(keyword){
        return new Promise((resolve, reject){
            resolve(this.data)
        })
    },
    getListLikeCount(keyword){
        return new Promise((resolve, reject){
            resolve(this.data)
        })
    },
    getDetail(id){
        return new Promise((resolve, reject){
            resolve(this.data[0])
        })
    }


}