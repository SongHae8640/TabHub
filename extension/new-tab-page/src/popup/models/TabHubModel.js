export default {
    data : [],
    syncLocalAndTabHub(tabGroups, accountData){
        debugger;
        this.data = tabGroups;
        var _this = this;
        return new Promise(function(resolve, reject){
            /// id가 -1인 것만 필터링
            _this.filterSyncedTabGroup();
            console.log("TabHubModel.filterSyncedTabGroup this.data :: ",_this.data);
            //합친 tabGroup을 허브에 저장
            
            $.ajax({
                method : 'POST',
                url : 'http://localhost:9091/ajax/account/'+accountData.id+'/tabGroups',
                contentType : 'application/json',
                dataType : 'json',
                data : JSON.stringify(_this.data) ,
                success : function(response){
                    for(var i = 0 ; i < response.length ; i++){
                        response[i].isOpen = false;
                        response[i].isEditedTitle = false
                        for(var j = 0 ; j < response[i].tabs.length ; j++){
                            response[i].tabs[j].isEditMode = false;
                        }
                    }
                    console.log(response)
                    resolve(response)
                },
                errror : function(response){
                    console.log(response)
                    resolve(response)
                },
            })
            
        })
    },
    filterSyncedTabGroup(){
        debugger;
        console.log("TabHubModel.filterSyncedTabGroup this.data :: ",this.data);
        this.data = this.data.filter(item => item.id === -1)
    },
}