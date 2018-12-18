const fn = {
    RndNum(n){
        var rnd = "";
        for (var i = 0; i < n; i++) {
            rnd += Math.floor(Math.random() * 10);
        }
        return rnd;
    },
    getcookieValue(vue,key){
        if(vue.$cookies.get('userinfo')){
            let userobj = vue.$cookies.get('userinfo');
            return userobj[key];
        }else return null
    }
}
export default fn;