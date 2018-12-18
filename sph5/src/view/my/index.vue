<template>
    <div class="my">
        <loading :show="showloding" :text="text"></loading>
    </div>
</template>
<script>
    import { Loading,Alert,AlertModule } from 'vux'
    import { UserInfo } from '@/api/index'
    export default {
        name: 'user',
        components:{Loading,Alert},
        data(){
            return{
                text:'正在加载',
                showloding:true
            }
        },
        mounted() {
            let info = this.$route.query;
            if(info.nickname){
                UserInfo({id:info.userid}).then(user=>{
                    this.showloding = false;
                    if(user){
                        this.$cookies.set('nickname',info.nickname);
                        this.$cookies.set('avater',info.avater);
                        this.$cookies.set('userid',info.userid);
                        this.$store.dispatch('GetUserInfo', user);
                        this.$router.push({path:'/my/order'});
                    }else{
                        this.$vux.alert.show({title:'提示',content:'没有获取到当前用户信息',onHide(){
                            this.$router.push({path:'/home'});
                        }})
                    }
                })
            }else{
                this.showloding = false;
                AlertModule.show({
                    title: '登录错误',
                    content: '请重新登录',
                    onShow () {
                    },
                    onHide () {
                        self.$router.push({path:'/home'})
                    }
                })
            }
        },
    }
</script>