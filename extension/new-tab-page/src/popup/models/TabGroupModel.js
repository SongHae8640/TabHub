export default {
  data: [],
  getLocalTabGroups() {
    var _this = this
    console.log("getLocalTabGroups :: ",_this.data)
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(['key'], function(result){
        if(result.key){
            _this.setFalseTabGruops(result.key)
        } 
        console.log(_this.data)
        resolve(_this.data)
      })      
    })
  },
  getTabHubTabGroup(accountDataId){
    var _this = this;
    return new Promise(function(resolve, reject){
        console.log("getTabHubTabGroup :: _this.data",_this.data, accountDataId);
        //_this.filterSyncedTabGroup(); 
        $.ajax({
            method : 'POST',
            url : 'http://localhost:9091/ajax/account/'+accountDataId+'/tabGroups',
            contentType : 'application/json',
            dataType : 'json',
            data : JSON.stringify([]) ,
            success : function(response){
              _this.setFalseTabGruops(response)
              resolve(_this.data)
            },
            errror : function(response){
              console.log("getTabHubTabGroup error :: ",response)
            },
        })
        
    })
  },

  addTabHubTabGroup(){
    
  },

  setFalseTabGruops(tabGroups){
      console.log("setFalseTabGruops :: this.data", this.data)
      this.data = tabGroups;
      for (var i = 0; i < this.data.length; i++) {
        this.data[i].isOpen = false
        this.data[i].isEditedTitle = false
        for (var j = 0; j < this.data[i].tabs.length; j++) {
            this.data[i].tabs[j].isEditMode = false
        }
      }
  },

    filterSyncedTabGroup(){
        console.log("TabHubModel.filterSyncedTabGroup this.data :: ",this.data);
        this.data = this.data.filter(item => item.id === -1)
    },

  async addCreatedData(newTitle){
    let newTabGroup = await this.createNewTabGroup(newTitle)
    this.data.push(newTabGroup)
    this.sortDataByDate()
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
    this.data = tempData;
  },

  sortDataByDate(){
    this.data.sort(function(a,b){
      return a['useDate'] < b['useDate'] ? 1 : -1;
    })
  },

  setLocalTabGroups(){
    let _data = this.data
    console.log(this.data);
    return new Promise((resolve, reject) =>{
      debugger;
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