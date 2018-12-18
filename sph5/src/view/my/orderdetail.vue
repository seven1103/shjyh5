<template>
    <div class="detailpage">
        
        <div v-if="info" class="content">
            <div class="progress">
                    <flow v-if="info.step==2">
                        <flow-state state="1" title="拍下商品" is-done></flow-state>
                        <flow-line is-done></flow-line>
                        <flow-state title="微信支付" state="2" is-done></flow-state>
                        <flow-line tip="进行中"></flow-line>
                        <flow-state state="3" title="卖家发货"></flow-state>
                        <flow-line></flow-line>
                        <flow-state state="4" title="确认收货"></flow-state>
                    </flow>
                    <flow v-if="info.step==3">
                        <flow-state state="1" title="拍下商品" is-done></flow-state>
                        <flow-line is-done></flow-line>
                        <flow-state title="微信支付" state="2" is-done></flow-state>
                        <flow-line is-done></flow-line>
                        <flow-state state="3" title="卖家发货" is-done></flow-state>
                        <flow-line tip="进行中"></flow-line>
                        <flow-state state="4" title="确认收货"></flow-state>
                    </flow>
                    <flow v-if="info.step==4">
                        <flow-state state="1" title="拍下商品" is-done></flow-state>
                        <flow-line is-done></flow-line>
                        <flow-state title="微信支付" state="2" is-done></flow-state>
                        <flow-line is-done></flow-line>
                        <flow-state state="3" title="卖家发货" is-done></flow-state>
                        <flow-line is-done></flow-line>
                        <flow-state state="4" title="确认收货" is-done></flow-state>
                    </flow>
            </div>
            <div class="orderaddress">
                <p class="title">收货地址</p>
                <p class="info"> {{info.address.name + ',' + info.address.phone + ',' + info.address.provice + info.address.city + '  ' + info.address.county + '  '+ info.address.info}}</p>
            </div>
            <div class="expressinfo">
                <P class="title">物流信息</P>
                <div class="info">
                        <p>发货方式：&nbsp;&nbsp;&nbsp;&nbsp;快递</p>
                        <p>物流公司：&nbsp;&nbsp;&nbsp;&nbsp;{{info.Express.expName}}</p>
                        <P>运单号码：&nbsp;&nbsp;&nbsp;&nbsp;{{info.Express.number}}</P>
                        <p>物流跟踪：&nbsp;&nbsp;&nbsp;&nbsp;</p>
                        <p v-for="(item,index) in info.Express.list" :key=index :class="index+1==info.Express.list.length?'pinfo sucess':'pinfo'">{{item.time}} {{item.status}}</p>
                        <!-- <p class="pinfo">2018-10-26 22:56:56【杭州市】圆通速递 浙江省杭州市九堡收件员 已揽件</p>
                        <p class="pinfo">2018-10-26 22:56:56【杭州市】圆通速递 浙江省杭州市九堡收件员 已揽件</p>
                        <p class="pinfo">2018-10-26 22:56:56【杭州市】圆通速递 浙江省杭州市九堡收件员 已揽件</p>
                        <p class="pinfo">2018-10-26 22:56:56【杭州市】圆通速递 浙江省杭州市九堡收件员 已揽件</p>
                        <p class="pinfo sucess">2018-10-26 22:56:56【杭州市】圆通速递 浙江省杭州市九堡收件员 已揽件</p> -->
                </div>
            </div>
        </div>
        <div v-else class="nothing">
            暂无订单消息
        </div>
    </div> 
</template>
<script>
    import { Flow, FlowState, FlowLine } from 'vux'
    import { orderdetail } from '@/api/index'
    export default{
        name:'orderdetail',
        data(){
            return{
                info:null
            }
        },
        components:{Flow, FlowState, FlowLine},
        created() {
            // 获取订单详情
            orderdetail({orderid: this.$route.query.id}).then(res=>{
                if(res.code==0){
                    console.log(res.result)
                    this.info = res.result;
                }
            })
        },
    }
</script>
<style scoped>
    .progress{background: rgba(215,149,0,0.20);}
    .title{
        font-size: 0.18rem;color: #332C2B;font-weight: 800;
        background: #d7950033;
        line-height: 0.4rem;padding: 0 0.3rem
    }
    .nothing{line-height: 1rem;text-align: center}
    .detailpage>div>div{
        margin-bottom: 0.3rem;
    }
    .orderaddress,.expressinfo{
        border: 1px solid #D79500;
    }
    .orderaddress>.info{padding: 0 0.3rem;font-size: 0.16rem;
    color: #666666;line-height: 0.6rem;}
    .expressinfo p{
        font-size: 0.16rem;color: #666666;
        line-height: 0.4rem;
    }
    .expressinfo>.info{padding: 0.2rem 0.3rem}
    .pinfo{text-indent: 1rem}
    .sucess{color: #E74D3D !important}
</style>