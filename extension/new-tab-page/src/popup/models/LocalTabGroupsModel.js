export default {
  data: [],
  getData() {
    var _this = this
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(['key'], function(result){
        
        if(!result.key) result.key = []
        _this.data = result.key

        for (var i = 0; i < _this.data.length; i++) {
          _this.data[i].isOpen = false
          _this.data[i].isEditedTitle = false
          for (var j = 0; j < _this.data[i].tabs.length; j++) {
            _this.data[i].tabs[j].isEditMode = false
          }
        }

        if (_this.data.length >= 0) {
          resolve(_this.data)
        }
        else {
          reject('failure reason')
        }
      })      
    })
  },

  async addCreatedData(newTitle){
    let newTabGroup = await this.createNewTabGroup(newTitle)
    debugger;
    this.data.push(newTabGroup)
    this.sortDataByDate()
    this.setData()
  },
  createNewTabGroup(newTitle) {
    return new Promise(function(resolve, reject) {
      if(!newTitle) reject('failure createNewTabGroup()')
      newTitle = newTitle.trim()

      let newTabGroup ={id : -1,
                  localId : new Date().getTime(),
                  title : newTitle,
                  tabs:[],
                  isOpen : false,
                  isEditedTitle : false,
                  useDate : new Date().getTime(),
                  category : 'Favorite'
                }
      chrome.tabs.getAllInWindow(function(newTabs){
        if(newTabs.length === 0) return

        for (var i = 0; i< newTabs.length; i++) {
          newTabGroup.tabs.push({title : newTabs[i].title , url :newTabs[i].url, isEditMode:false})
        }
        resolve(newTabGroup)
      })
    })
  },  
  async deleteData(tabGroupId) {
    await this.filterData(tabGroupId)
    this.setData()
  },

  filterData(tabGroupId){
    this.data = this.data.filter(item => item.localId !== tabGroupId)
  },
  async changeData(tabGroup,data){
    let tempData =[]

    for (var i = 0; i < this.data.length; i++) {
      if(this.data[i].localId === tabGroup.localId){
        tempData.push(tabGroup)
      }else{
        tempData.push(this.data[i])
      }
    }

    await this.sortDataByDate()
    await this.setData() 
  },

  sortDataByDate(){
    this.data.sort(function(a,b){
      return a['useDate'] < b['useDate'] ? 1 : -1;
    })
  },

  setData(){
    let _data = this.data
    return new Promise((resolve, reject) =>{
      chrome.storage.local.set({key : _data}, function(){
       if (_data.length >= 0) {
          resolve("success setData()")
        }
        else {
          reject('failure setData()')
        }
      })
    })
  },
}