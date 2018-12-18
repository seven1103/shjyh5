<template>
    <div class="back" @click="back">
        <img class="back-icon" src="../assets/image/fanhui.png" alt="">
    </div>
</template>
<script>
    export default{
        name:'back',
        methods:{
            back(){
                this.$router.back(-1);
            }
        }
    }
</script>
<style>
    .back{
        height: 0.32rem;
        width: 0.32rem;
        position: fixed;
        top: 0.17rem;
        left: 0.15rem;
    }
    .back-icon{
        height: 0.32rem;
        width: 0.32rem;
        /* border-radius: 50%;
        background: rgba(0,0,0,0.2); */
    }
</style>