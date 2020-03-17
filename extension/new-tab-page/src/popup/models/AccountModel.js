export default{
    data: {
        id : 'Tabhub',
        profileUrl : '../img/profile.png',
    },
    getData(){
        //서버 만든 후에  ajax 통신으로 가져올 것 
        return this.data
    },
    login(accountData){

        return new Promise(function(resolve, reject){
            //비동기 통신

            $.ajax({
                method : 'POST',
                url : 'http://localhost:9091/ajax/account/login',
                data :{
                    id : accountData.id,
                    password : accountData.pw,
                    "remember-me" : accountData.rememberMe
                },
                success : function(response){
                    console.log(response)
                    resolve(response.success)
                },
                error : function(response){
                    console.log(response)
                    resolve(false)
                }

            })
            
        })
    },
    join(accountData){
        return new Promise(function(resolve, reject){
            const params = new URLSearchParams();
            params.append('id', accountData.id);
            params.append('pw', accountData.pw);
            params.append('rePw', accountData.rePw);
            params.append('email', accountData.email);
            console.log(params);

            //XMLHttpRequest을 이용한 통신

            resolve(response)
        })
    },

    logout(){
        return true;
        /*
        return new Promise(function(resolve, reject){
            //비동기 통신
            $.ajax({
                method : 'POST',
                url : 'http://localhost:9091/logout',
                success : function(response, textStatus, jqXHR){
                    console.log(textStatus, jqXHR)
                    resolve(textStatus ==='success')
                },
                error : function(response){
                    resolve(false)
                }

            })
        })
        */
    }
}