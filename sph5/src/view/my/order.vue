<template>
    <div class="orderlist">
        <tab>
            <tab-item :selected="index===0" @on-item-click="onItemClick(0)">已发货</tab-item>
            <tab-item :selected="index===1" @on-item-click="onItemClick(1)">未发货</tab-item>
            <tab-item :selected="index===2" @on-item-click="onItemClick(2)">全部订单</tab-item>
        </tab>
        <swiper v-model="index" class="silder" height="80vh" :show-dots="false">
            <div class="tabtitle">
                <span>商品</span>
                <span>单价</span>
                <span>数量</span>
                <span>实付款</span>
                <span>交易状态</span>
                <span>交易操作</span>
            </div>
            <swiper-item v-for="(item, index) in list" :key="index">
                <div class="tab-swiper vux-center">
                    <div class="order-item" v-for="(items,indexs) in list[index]" :key="indexs">
                        <p class="title">
                            <span><input name="Fruit" type="checkbox" value="" />&nbsp;&nbsp;{{items.timed | getTime}}&nbsp;&nbsp;订单号:{{items._id}}</span>
                            <span @click="deleteByid(items,indexs)">删除<i></i></span>                             
                        </p>
                        <div class="order">
                            <div class="info">
                                <img :src="items.goods.goodimg[0] | imgurl" alt="">
                                <div style="width:100%" v-if="items.goods.origin">
                                    <h4>{{items.goods.content}}</h4>
                                    <p>产地: {{items.goods.origin.provice + items.goods.origin.city + items.goods.origin.county}}&nbsp;&nbsp;&nbsp;&nbsp; 重量：{{items.goods.weight + items.goods.weight_unit}}</p>
                                </div>
                            </div>
                            <div class="price">
                                    ¥{{ items.goods.price | toFixedTwo}}
                            </div>
                            <div class="num">
                                1*{{items.count}}
                            </div>
                            <div class="totall">
                                    <p>¥{{ items.Rpayment | toFixedTwo}}</p>
                                    <p>(含运送费¥0.00)</p>
                            </div>
                            <div class="status">
                                <p  class="node">买家已付款</p>
                                <p>{{items.status | trastatusB(items.expressid)}}</p>
                                <p v-show="items.expressid" @click="todetail(items._id)">订单详情</p>
                            </div>
                            <div class="oprate">
                                暂无
                            </div>
                        </div>
                    </div>
                    <page :current=listpage[index] :next=hasnext[index] :tabindex=index @page-data='pagedata'></page>
                </div>
            </swiper-item>
        </swiper>
    </div>
</template>
<script>
    import { Tab, TabItem,Swiper, SwiperItem } from 'vux'
    import Page from '@/components/Page'
    import { UserOrder,deleteUserOrder } from '@/api/index'
    export default{
        name:'order',
        components:{
            Tab, TabItem,Swiper, SwiperItem,Page
        },
        data(){
            return{
                index:1,
                list:[[],[],[]],
                listpage:[1,1,1],
                typearr:[1,2,'all'],
                hasnext:[false,false,false]
            }
        },
        created() {
            // 默认加载已发货订单
            UserOrder({userid:this.$store.getters.userid,type:2}).then(res=>{
                if(res.code===0) {
                    this.$set(this.list,1,res.result);
                    this.$set(this.hasnext,1,res.hasnext);
                }
            })
        },
        methods:{
            onItemClick(index){
                this.index = index
                // 切换加载数据
                // 判断当前列表是否存在数据
                if(this.list[index].length===0){
                    UserOrder({userid:this.$store.getters.userid,type:this.typearr[index]}).then(res=>{
                        if(res.code===0){
                            //this.list[index] = res.result;
                            this.$set(this.list,index,res.result);
                            this.$set(this.hasnext,index,res.hasnext);
                        }
                    })
                }
            },
            todetail(id){
                this.$router.push({path:'/my/detail',query:{id:id}})
            },
            deleteByid(item,index){
                // 判断当前订单是否能被删除
                if(item.status==2){
                    let self = this;
                    this.$vux.confirm.show({title:'提示',content:'是否删除当前订单',onConfirm(){
                        deleteUserOrder({userid:self.$store.getters.userid,orderid:item._id}).then(res=>{
                            if(res.code===0){
                                self.$vux.alert.show({title:'提示',content:'删除成功'})
                                self.list[self.index].splice(index,1)
                                // self.$set(self.list,self.index,self.list[self.index].splice(index,1));
                                // console.log(self.list[self.index])
                            }else self.$vux.alert.show({title:'提示',content:'删除失败'})
                        })
                    }})
                }else{
                    this.$vux.alert.show({title:'提示',content:'当前订单尚未完成,暂时不能被删除'})
                }
            },
            pagedata(data){
                // 处理分页传来的数据
                if(data.code==0){
                    this.$set(this.list,this.index,data.result);
                    this.$set(this.hasnext,this.index,data.hasnext);
                }
            }
        }
    }
</script>
<style scoped>
    .orderlist{
        width: 100%;
    }
    .vux-tab .vux-tab-item.vux-tab-selected{
        color: #E74D3D !important;
        border-bottom: 1px solid #E74D3D !important;
    }
    .vux-slider > .vux-swiper > .vux-swiper-item{
        top: 1rem !important
    }
    .vux-tab-ink-bar{background: none !important}
    .vux-slider{overflow: auto !important}
    .vux-swiper{overflow: auto !important}
    .tabtitle{height: 0.5rem;width: 100%;background: #D79500;margin-top: 0.3rem}
    .tabtitle>span{font-size: 0.2rem;color: #fff;text-align: center;display: inline-block;line-height: 0.5rem}
    .tabtitle>span:nth-child(1){width: 25%}
    .tabtitle>span:nth-child(2){width: 15%}
    .tabtitle>span:nth-child(3){width: 10%}
    .tabtitle>span:nth-child(4){width: 15%}
    .tabtitle>span:nth-child(5){width:15% }
    .tabtitle>span:nth-child(6){width: 15%}
    .order-item{height: 1.7rem;border: 1px solid #D79500;margin-bottom: 0.2rem}
    .title{font-size: 0.13rem;color: #666666;display: flex;
    justify-content: space-between;line-height: 0.4rem;background:#FBF4E5;padding-left: 0.2rem;padding-right: 0.6rem }
    .title>span:nth-child(2){cursor: pointer}
    .title>span:nth-child(2)>i{
        content: url('../../../static/image/shanchu.png');
        height: 0.12rem;
        width: 0.12rem;
        margin-left: 0.05rem;
    }
    .order{padding:0.1rem 0.15rem;display: flex;font-size: 0.18rem;text-align: center;}
    .order>.info{display: flex;width: 25%;}
    .order>.info>div{position: relative;padding: 0.1rem}
    .order>.info>div>p{position: absolute;bottom: 0;width: 100%;text-align: left}
    .order>.price{width: 15%}
    .order>.num{width: 10%}
    .order>.totall{width: 15%}
    .order>.status{width: 15%}
    .order>.oprate{width: 20%}
    .order>.info>img{height: 1.1rem;width: 0.9rem;}
    .order>.info>div>h4{font-size: 0.15rem;color: #333333;}
    .order>.info>div>p{font-size: 0.14rem;color: #999797;}
    .order p{line-height: 0.3rem}
    .totall>p:nth-child(2),.status>p:nth-child(2),.status>p:nth-child(3){color: #666666;font-size:0.13rem}
    .tab-swiper{height: 70vh;overflow: auto;padding-bottom: 0.5rem;position: relative;}
</style>