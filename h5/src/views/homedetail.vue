<template>
        <div class="detail">
            <back></back>
            <div class="bottom-btn">
                <span class="introd" @click="introduction">企业介绍</span>
                <span class="join" @click="join">立即报名</span>
            </div>
        </div>
    </template>
    <script>
        import back from '@/components/back'
        export default{
            name:'homedetail',
            components:{back},
            data(){
                return{}
            },
            methods:{
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
        .detail{
            height: 100vh;
            background: url('../assets/image/detail.png') no-repeat center;
            background-size: cover;
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