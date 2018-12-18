<template>
    <div class="home">
        <div class="detail" @click="detail">
            <span>活动详情</span>
            <img src="../assets/image/more.png" alt="">
        </div>
        <div class="bottom-btn">
            <span class="introd" @click="introduction">企业介绍</span>
            <span class="join" @click="join">立即报名</span>
        </div>
    </div>
</template>
<script>
    import SButton from '@/components/SButton'
    import back from '@/components/back'
    export default{
        name:'Home',
        components:{SButton,back},
        data(){
            return{
                Stitle:'确定'
            }
        },
        methods:{
            detail(){
                this.$router.push({path: '/homedetail'})
            },
            introduction(){
                this.$router.push({path: '/introduction'})
            },
            join(){
                this.$router.push({path: '/join'})
            }
        }
    }
</script>
<style scoped>
    .home{
        height: 100vh;
        background: url('../assets/image/home.png') no-repeat center;
        background-size: cover;
    }
    .detail{
        width: 100%;
        text-align: center;
        color: #6BB114;
        font-size: 0.14rem;
        position: fixed;
        bottom: 0.8rem;
    }
    .detail>img{
        width: 0.17rem;
        height: 0.1rem;
        display: block;
        margin: 0 auto;
        margin-top: 0.05rem
    }
    .bottom-btn{
        width: 100%;
        background: #6BB114;
        height: 0.5rem;
        border-top-left-radius: 0.3rem;
        border-top-right-radius: 0.3rem;
        position: fixed;
        bottom: 0;
        font-size: 0.18rem;
        text-align: center;
        color: #ffffff;
        line-height: 0.5rem;
        display: flex;
    }
    .bottom-btn>span{
        display: inline-block;
        width: 50%;
        position: relative;
    }
    .introd:after{
        position: absolute;
        content: '';
        width: 1px;
        height: 80%;
        background: #ffffff;
        top: 0.05rem;
        right: 0;
    }
</style>