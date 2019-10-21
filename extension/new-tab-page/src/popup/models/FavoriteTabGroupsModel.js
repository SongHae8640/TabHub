export default {
  data: [],

  test(){


    return this.getData(this.data)
  },

  addData(newTitle){
    return new Promise((resolve, reject) =>{
      this.createNewTabGroup(newTitle)
      console.log(this.data)
      resolve(this.data)
    })


    // return new Promise((resolve, reject) =>{
    //   this.createNewTabGroup(newTitle).then(
    //   this.sortDataByDate(this.data)).then(
    //   this.setData(this.data))
    //   resolve(this.data)
    // })

    // return new Promise((resolve, reject) =>{
    //   const resolvedPromise = new Promise(resolve => resolve(this.createNewTabGroup(newTitle)));
    //   resolvedPromise.then(
    //   this.sortDataByDate(this.data)).then(
    //   this.setData(this.data))
    //   resolve(this.data)
    // })   
  },
  getData() {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(['key'], function(result){
        this.data = result.key

        if (this.data.length >= 0) {
          console.log(this.data)
          resolve(this.data)
        }
        else {
          reject('failure reason')
        }
      })      
    });
  },
  
  createNewTabGroup(newTitle = '') {
    

    return new Promise((resolve, reject) =>{
      if(!newTitle) reject('failure createNewTabGroup()')
      newTitle = newTitle.trim()

      let newTabGroup ={id :0,
                  title : newTitle,
                  tabs:[],
                  isOpen : false,
                  useDate : new Date()
                }
      chrome.tabs.getAllInWindow(function(newTabs){
        if(newTabs.length === 0) return

        for (var i = 0; i< newTabs.length; i++) {
          //console.log(newTabs[i].title, newTabs[i].url)
          newTabGroup.tabs.push({title : newTabs[i].title , url :newTabs[i].url})
        }
        this.data.push(newTabGroup)

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
  remove(tabGroupId) {
    this.data = this.data.filter(item => item.id !== tabGroupId)
  },

  sortDataByDate(data){
    console.log(data, "sortDataByDate()");
    this.data = data
    return new Promise((resolve, reject) =>{
      this.data.sort(function(a,b){
        var dateA = new Date(a['useDate']).getTime();
        var dateB = new Date(b['useDate']).getTime();
        return dateA < dateB ? 1 : -1;
      })
      resolve(this.data)
    })
    
  },

  setData(data){
    console.log(data, "setData()");
    this.data = data
    return new Promise((resolve, reject) =>{
      chrome.storage.sync.set({key : this.data}, function(){
       if (this.data.length >= 0) {
          resolve(this.data)
        }
        else {
          reject('failure createNewTabGroup()')
        }
      })
    })
    
  }


}