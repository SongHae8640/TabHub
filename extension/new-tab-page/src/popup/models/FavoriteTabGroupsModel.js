export default {
  data: [],
  newTitle : '',
  getData() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(['key'], function(result){
        
        if(!result.key) result.key = []
        this.data = result.key

        for (var i = 0; i < this.data.length; i++) {
          this.data[i].isOpen = false
          for (var j = 0; j < this.data[i].tabs.length; j++) {
            this.data[i].tabs[j].isEditMode = false
          }
        }

        if (this.data.length >= 0) {
          resolve(this.data)
        }
        else {
          reject('failure reason')
        }
      })      
    })
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
          newTabGroup.tabs.push({title : newTabs[i].title , url :newTabs[i].url, isEditMode:false})
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
        data = data.filter(item => item.id !== tabGroupId)
        resolve(data)
    }).then(this.setData)
  },
  changeData(tabGroup,data){
    return new Promise((resolve,reject) =>{

      resolve(this.changeDataSet(tabGroup,data))
    }) 
  },
  changeDataSet(tabGroup, data){
    return new Promise((resolve, reject) =>{
      let tempData =[]

      for (var i = 0; i < data.length; i++) {
        if(data[i].id === tabGroup.id){
          tempData.push(tabGroup)
        }else{
          tempData.push(data[i])
        }
      }

      resolve(tempData)
    }).then(this.sortDataByDate).then(this.setData)
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
        console.log(this.data)
          resolve(this.data)
        }
        else {
          reject('failure createNewTabGroup()')
        }
      })
    })
  },
}