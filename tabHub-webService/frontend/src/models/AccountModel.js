export default{
    data: {
        id : 'Tabhub',
        profileUrl : '../img/profile.png',
    },
    getData(){
        //서버 만든 후에  ajax 통신으로 가져올 것 
        return this.data
    },
    login(id, pw){

        return new Promise(function(resolve, reject){
            const response = axios({
                method : 'post',
                url : '/axios/account',
                data :{
                    id : id,
                    pw : pw
                }
            })

            resolve(response)
        })
    }
}