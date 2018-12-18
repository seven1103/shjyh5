<template>
    <p style="font-size:0.2rem;font-color:#ccc">正在跳转,请稍后...</p>
</template>
<script>
    import { axiosGetRequest } from '../utils/request.js'
    export default{
        created() {
            let id = this.$route.query.id;
            let openid = this.$route.query.openid;
            //获取用户个人信息
            axiosGetRequest ({},'/users/userinfo/'+id).then(res=>{
                res.result.openid = openid;
                this.$cookies.set('userinfo',JSON.stringify(res.result),60 * 60 * 24);
                //跳转
                this.$router.push({name:'index'})
            })
        }
    }
</script>