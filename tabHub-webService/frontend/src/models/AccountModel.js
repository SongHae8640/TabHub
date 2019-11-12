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
                url : '/axios/account/login',
                data :{
                    id : id,
                    pw : pw
                }
            })

            resolve(response)
        })
    },
    join(id, pw, rePw, email){
        return new Promise(function(resolve, reject){
            console.log(id, pw,rePw, email)
            const response = axios({
                method : 'post',
                url : '/axios/account/join',
                data :{
                    id : id,
                    pw : pw,
                    rePw : rePw,
                    email : email
                }
            })

            resolve(response)
        })
    }
}