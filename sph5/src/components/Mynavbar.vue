<template>
    <div class="nav">
        <img @click="toaddress" class="avater" :src="avater" alt="">
        <ul class="navbar">
            <li @click="tohome">返回首页</li>
            <li @click="toorder" :class="index==1?'active':''">我的订单</li>
            <li @click="toaddress" :class="index==2?'active':''">我的收货地址</li>
            <li @click="logout">退出登录</li>
        </ul>
    </div>
</template>
<script>
    export default {
        name:'Mynavbar',
        data(){
            return{
                index:1,
                avater:this.$store.state.user.avater||'../../static/image/avater.png'
            }
        },
        methods:{
            tohome(){
                this.$router.push({path:'/home'})
            },
            logout(){
                //清除用户数据
                this.$store.dispatch('ClearUserInfo')
                this.$cookies.remove('nickname')
                this.$cookies.remove('avater')
                this.$cookies.remove('userid')
                this.$router.push({path:'/home'})
            },
            toorder(){
                this.index=1;
                this.$router.push({path:'/my/order'})
            },
            toaddress(){
                this.index=2;
                this.$router.push({path:'/my/address'})
            }
        },
        computed:{
            listenAvater(){
                return this.$store.state.user.avater;
            }
        },
        watch:{
            listenAvater(){
                this.avater = this.listenAvater
            }
        }
    }
</script>
<style>
    .nav{height: 100vh;width: 1.86rem;background: #FBF4E5;text-align: center;cursor: pointer}
    .avater{width: 1.1rem;height: 1.1rem;border-radius: 50%;margin: 0.8rem 0}
    .navbar{font-size: 0.24rem;color: #333;}
    .navbar>li{height: 0.64rem;line-height: 0.64rem;}
    li.active{background: rgba(186,129,0, 0.2);color:  #BA8100}

</style>