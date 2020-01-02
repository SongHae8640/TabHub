export default{
    syncLocalAndTabHub(tabgGroups, accountData){
        return new Promise(function(resolve, reject){
            //허브에 있는 tabGroup을 가져옴
    
            //local에 있는 tabGroup과 허브에서 가져온 tabGroup의 id를 비교
    
                //같으면 허브에서 가져온 tabGroup 제거
    
            //local과 허브의 tabGroup을 합침

            console.log(tabgGroups[0])
    
            //합친 tabGroup을 허브에 저장
            $.ajax({
                method : 'POST',
                url : 'http://localhost:9091/ajax/account/'+accountData.id+'/tabGroup',
                //data : tabgGroups[0],
                sucess : function(response){
                    console.log(response)
                    resolve(response)
                },
                errror : function(response){
                    console.log(response)
                    resolve(response)
                }

            })

            
            //합친 tabGroup return
        })
    }
}