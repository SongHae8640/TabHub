
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
            tabs :[
                {title : '네이버' , url : 'http://www.naver.com'},
                {title : '구글' , url : 'http://www.google.com'},
                {title : '유튭' , url : 'http://www.youtube.com'},
            ],
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
            tabs :[
                {title : '네이버' , url : 'http://www.naver.com'},
                {title : '구글' , url : 'http://www.google.com'},
                {title : '유튭' , url : 'http://www.youtube.com'},
            ],
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
            tabs :[
                {title : '네이버' , url : 'http://www.naver.com'},
                {title : '구글' , url : 'http://www.google.com'},
                {title : '유튭' , url : 'http://www.youtube.com'},
            ],
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
            ],
        }
    ],
    recommendsList : [
        {
          id: 1,
          title: "test1",
          writer: "tabhub",
          views: 30
        },
        {
          id: 2,
          title: "test2",
          writer: "tabhub",
          views: 20
        },
        {
          id: 3,
          title: "test3",
          writer: "tabhub",
          views: 300
        },
        {
          id: 4,
          title: "test4",
          writer: "tabhub",
          views: 303
        },
        {
          id: 5,
          title: "test5",
          writer: "tabhub",
          views: 33243
        },
        {
          id: 6,
          title: "test6",
          writer: "tabhub",
          views: 2322
        },
    ],
    getTabGroupList(keyword,filter){
        var _this = this
        return new Promise(function(resolve, reject){
            resolve(_this.data)
            
            //relevance, views, likeCount
            const tabGroups = axios.get('/axios/posts/search?keyword='+keyword+'&filter='+filter)
            console.log(tabGroups)
        })
    },
    getRecommends(accountId){
        var _this = this
        return new Promise(function(resolve, reject){
            
            const recommendsTabGroupList = axios.get('/axios/posts/recommend/1')
            console.log(recommendsTabGroupList)
            //_this.recommendsList = axios.get('/posts/recommend/1')
            resolve(_this.recommendsList)
        })
    },
    getPost(postId){
        var _this = this
        return new Promise(function(resolve, reject){
            const tabGroupTemp = axios.get('/axios/posts/'+postId)
            console.log(tabGroupTemp)
            resolve(_this.data[0])
        })
    }


}