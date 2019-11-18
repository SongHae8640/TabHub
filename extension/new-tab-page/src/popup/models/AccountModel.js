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
            const params = new URLSearchParams();
            params.append('id', accountData.id);
            params.append('pw', accountData.pw);
            console.log(params);

            //XMLHttpRequest을 이용한 통신

            resolve(response)
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
    }
}