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
            const params = new URLSearchParams();
            params.append('id', id);
            params.append('pw', pw);
            console.log(params);

            const response = axios({
                method : 'post',
                url : '/axios/account/login',
                data : params
            })

            resolve(response)
        })
    },
    join(id, pw, rePw, email){
        return new Promise(function(resolve, reject){
            const params = new URLSearchParams();
            params.append('id', id);
            params.append('pw', pw);
            params.append('rePw', rePw);
            params.append('email', email);
            console.log(params);

            const response = axios({
                method : 'post',
                url : '/axios/account/join',
                data : params
            })

            resolve(response)
        })
    }
}