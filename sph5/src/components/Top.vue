<template>
    <div class="Top" v-if="goTopShow" @click="goTop">
        <img src="../../static/image/dingbu.png" alt="">
    </div>
</template>
<script>
    export default{
        name:'Top',
        data(){
            return{
                scrollTop:'',
                goTopShow:false
            }
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll);
          },
        destroyed(){
            window.removeEventListener('scroll', this.handleScroll)
        },
        methods:{
            handleScroll(){
                this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                if(this.scrollTop>500) this.goTopShow = true
                else this.goTopShow = false
            },
            goTop(){
                document.body.scrollTop = 0
                document.documentElement.scrollTop = 0
            }
        }
    }
</script>
<style scoped>
    .Top{position: fixed;right: 0.5rem;top: 45%}
    .Top>img{height: 1.18rem;width: 0.7rem}
</style>