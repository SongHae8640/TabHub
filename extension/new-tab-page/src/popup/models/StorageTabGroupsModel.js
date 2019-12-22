export default {
  data: [
    { id : 1 , 
      title : '첫번쨰',
      tabs:[
        {title : '네이버', url : 'https://www.naver.com'},
        {title : '구글', url : 'https://www.google.com'},
      ],
      isOpen : true,
      usedDate : new Date()
    },
    { id : 2 , 
      title : '두번쨰',
      tabs:[
        {title : '파란', url : 'https://www.naver.com'},
        {title : '다음', url : 'https://www.google.com'},
      ],
      isOpen : false,
      usedDate : new Date()
    },
    { id : 3 , 
      title : '세번쨰',
      tabs:[
        {title : '야후', url : 'https://www.naver.com'},
        {title : '구글', url : 'https://www.google.com'},
      ],
      isOpen : false,
      usedDate : new Date()
    },
    { id : 4 , 
      title : '네번쨰',
      tabs:[
        {title : '야후', url : 'https://www.naver.com'},
        {title : '구글', url : 'https://www.google.com'},
      ],
      isOpen : true,
      usedDate : new Date()
    },
  ],

  list() {
    return Promise.resolve(this.data)
  },
  
  add(keyword = '') {
    
  },
  
  remove(tabGroupId) {
    this.data = this.data.filter(item => item.id !== tabGroupId)
  }
}