<template>
    <div class="page">
        <span v-if="current===1" class="last btn default">上一页</span>
        <span v-else class="last btn" @click="lastclick">上一页</span>
        <span v-if="next" class="last btn" @click="nextclick">下一页</span>
        <span v-else class="next btn default">下一页</span>
    </div>
</template>
<script>
    import { UserOrder } from '@/api/index'
    const typearr = [1,2,'all'];
    export default{
        name:'Page',
        props:['current','next','tabindex'],
        methods:{
            lastclick(){
                // 拉取上一页
                this.$emit('page-data','上一页返回值')
                UserOrder({userid:this.$store.getters.userid,type:typearr[this.tabindex],page:this.current - 1 }).then(res=>{
                    this.$emit('page-data',res)
                })
            },
            nextclick(){
                // 拉取下一页
                UserOrder({userid:this.$store.getters.userid,type:typearr[this.tabindex],page:this.current + 1 }).then(res=>{
                    this.$emit('page-data',res)
                })
                
            }
        }
    }
</script>
<style scoped>
   .page{bottom: 1rem;width: 100%;text-align: center;}
   .last{margin-right: 1rem}
   .default{background: #ccc}
</style>