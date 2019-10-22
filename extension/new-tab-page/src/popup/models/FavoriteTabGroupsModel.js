export default {
  data: [],
  newTitle : '',
  getData() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(['key'], function(result){
        
        if(!result.key) result.key = []
        this.data = result.key

        if (this.data.length >= 0) {
          resolve(this.data)
        }
        else {
          reject('failure reason')
        }
      })      
    });
  },

  addCreatedData(newTitle){
    this.createNewTabGroup(newTitle)
      .then(this.sortDataByDate)
      .then(this.setData)
      .then(result =>{
        this.data = result
      })
  },
  createNewTabGroup(newTitle) {
    return new Promise(function(resolve, reject) {
      if(!newTitle) reject('failure createNewTabGroup()')
      newTitle = newTitle.trim()

      let newTabGroup ={id :new Date().getTime(),
                  title : newTitle,
                  tabs:[],
                  isOpen : false,
                  useDate : new Date().getTime()
                }
      chrome.tabs.getAllInWindow(function(newTabs){
        if(newTabs.length === 0) return

        for (var i = 0; i< newTabs.length; i++) {
          //console.log(newTabs[i].title, newTabs[i].url)
          newTabGroup.tabs.push({title : newTabs[i].title , url :newTabs[i].url})
        }

        this.data.push(newTabGroup)
        resolve(this.data)
      })
    })  
  },  
  deleteData(tabGroupId) {
    return this.getData().then(data =>{
      this.filterData(tabGroupId, data)
    })
  },

  filterData(tabGroupId, data){
    return new Promise((resolve,reject) =>{
        window.data = data.filter(item => item.id !== tabGroupId)
        resolve(window.data)
    }).then(this.setData)
  },


  sortDataByDate(data){
    return new Promise((resolve, reject) =>{
      data.sort(function(a,b){
        return a['useDate'] < b['useDate'] ? 1 : -1;
      })
      resolve(data)
    })    
  },

  setData(data){
    return new Promise((resolve, reject) =>{
      chrome.storage.local.set({key : data}, function(){
       if (this.data.length >= 0) {
          resolve(this.data)
        }
        else {
          reject('failure createNewTabGroup()')
        }
      })
    })
  },
}