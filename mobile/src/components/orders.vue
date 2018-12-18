<template>
  <div class="page">
    <x-header
      @on-click-back="toHome"
      class="header"
      style="background-color:#fff;"
      :left-options="{backText: '',preventGoBack:true}"
      title="首杯酱香酒大抢购活动"></x-header>
    <div>
      <tab :line-width="2" custom-bar-width="60px" active-color='#E74D3D' v-model="index">
        <tab-item  selected @click="demo2 = item" :key="0">我的订单</tab-item>
        <tab-item  @click="demo2 = item" :key="1">待发货</tab-item>
        <tab-item  @click="demo2 = item" :key="2">待收货</tab-item>
      </tab>
      <scroller class="scroller" v-show="index===0" lock-x scrollbar-y use-pullup :pullup-config="pullupConfig" ref="all_oder" @on-pullup-loading="loadlist(0)">
        <div>
          <div class="order-item" v-for="item in all_orders">
            <div class="order-item-header">
              <p>订单号：{{item._id}}</p>
              <p>{{item.timed}}</p>
            </div>
            <div class="order-item-content">
              <img :src="item.goods.goodimg[0] | imgurl">
              <div class="info">
                <p class="title">{{item.goods.content}}</p>
                <p class="parameter" v-if="item.goods.origin">产地：{{item.goods.origin.provice +" "+ item.goods.origin.city +" "+ item.goods.origin.county}}</p>
                <p class="price">￥{{item.goods.price}}</p>
              </div>
              <div class="status">
                <p>{{item.statusText}}</p>
                <span>x{{item.count}}</span>
              </div>
            </div>
            <div class="order-item-footer">
              <p>合计:<span>￥{{item.goods.price}}</span></p>
              <XButton
                v-if="item.status === 1 && item.expressid"
                @click.native="looklogistics(item)"
                class="logistics-btn"
                text="查看物流"
                action-type="button"
                mini></XButton>
            </div>
          </div>
        </div>
      </scroller>
      <scroller class="scroller" v-show="index===1" lock-x scrollbar-y use-pullup :pullup-config="pullupConfig" ref="back_orders" @on-pullup-loading="loadlist(1)">
        <div>
          <div class="order-item" v-for="item in back_orders">
            <div class="order-item-header">
              <p>订单号：{{item._id}}</p>
              <p>{{item.timed}}</p>
            </div>
            <div class="order-item-content">
              <img :src="item.goods.goodimg[0] | imgurl">
              <div class="info">
                <p class="title">{{item.goods.content}}</p>
                <p class="parameter" v-if="item.goods.origin">产地：{{item.goods.origin.provice +" "+ item.goods.origin.city +" "+ item.goods.origin.county}}</p>
                <p class="price">￥{{item.goods.price}}</p>
              </div>
              <div class="status">
                <p>{{item.statusText}}</p>
                <span>x{{item.count}}</span>
              </div>
            </div>
            <div class="order-item-footer">
              <p>合计:<span>￥{{item.goods.price}}</span></p>
            </div>
          </div>
        </div>
      </scroller>
      <scroller class="scroller" v-show="index===2" lock-x scrollbar-y use-pullup :pullup-config="pullupConfig" ref="receive_orders" @on-pullup-loading="loadlist(2)">
        <div>
          <div class="order-item" v-for="item in receive_orders">
            <div class="order-item-header">
              <p>订单号：{{item._id}}</p>
              <p>{{item.timed}}</p>
            </div>
            <div class="order-item-content">
              <img :src="item.goods.goodimg[0] | imgurl">
              <div class="info">
                <p class="title">{{item.goods.content}}</p>
                <p class="parameter" v-if="item.goods.origin">产地：{{item.goods.origin.provice +" "+ item.goods.origin.city +" "+ item.goods.origin.county}}</p>
                <p class="price">￥{{item.goods.price}}</p>
              </div>
              <div class="status">
                <p>{{item.statusText}}</p>
                <span>x{{item.count}}</span>
              </div>
            </div>
            <div class="order-item-footer">
              <p>合计:<span>￥{{item.goods.price}}</span></p>
              <XButton
                v-if="item.status === 1 && item.expressid"
                @click.native="looklogistics(item)"
                class="logistics-btn"
                text="查看物流"
                action-type="button"
                mini></XButton>
            </div>
          </div>
        </div>
      </scroller>

    </div>
    <div
      class="myaddress"
      @click="myAddress">
      我的收货地址
    </div>
    <loading :show="loading" text="加载中"></loading>
  </div>
</template>
<script>
import store from '@/store'
import { XHeader ,Tab ,TabItem ,Scroller,Group ,XButton ,dateFormat ,Loading } from 'vux'
import { axiosGetRequest } from '../utils/request.js'
export default {
  data() {
    return {
      index:0,
      pullupConfig: {
        content: '上拉加载更多',
        downContent: '松开进行加载',
        upContent: '上拉加载更多',
        loadingContent: '加载中...'
      },
      loading:false,
      all_orders:[],
      back_orders:[],
      receive_orders:[],
      all_page:0,
      back_page:0,
      receive_page:0
    }
  },
  components:{
    XHeader,
    Tab,
    TabItem,
    Scroller,
    Group,
    XButton,
    Loading
  },
  methods:{
    loadlist:function(type){
      let page = 1
      let load_type = 'all'
      if(type === 0){
        page = ++this.all_page
        load_type = 'all'
      }else if(type === 1){
        page = ++this.back_page
        load_type = '2'
      }else if(type === 2){
        page = ++this.receive_page
        load_type = '1'
      }
      const params = {
        userid:this.$store.getters.userid,
        //userid:this.$fn.getcookieValue(this,'_id'),
        type:load_type,
        page
      }
      this.loading = true
      axiosGetRequest (params,`/users/order/${this.$store.getters.userid}`)
      .then((res) => {
        this.loading = false
        if(res.result.length<1){
          if(type === 0){
            this.$refs.all_oder.disablePullup()
          }else if(type === 1){
            this.$refs.back_orders.disablePullup()
          }else if(type === 2){
            this.$refs.receive_orders.disablePullup()
          }
          this.$vux.toast.show({
            text: '没有更多数据了'
          })
          return
        }
        for (const item of res.result) {
          item.goods.price = Number(item.goods.price).toFixed(2)
          item.timed = dateFormat(new Date(item.timed), 'YYYY-MM-DD HH:mm')
          if(item.status === 1 && !item.expressid){
            item.statusText = "未发货"
          }else if(item.status === 1 && item.expressid){
            item.statusText = "已发货"
          }else if(item.status === 2){
            item.statusText = "已完成"
          }
          if(type === 0){
            this.all_orders.push(item)
          }else if(type === 1){
            this.back_orders.push(item)
          }else if(type === 2){
            this.receive_orders.push(item)
          }
        }
        if(type === 0){
          this.$refs.all_oder.donePullup()
        }else if(type === 1){
          this.$refs.back_orders.donePullup()
        }else if(type === 2){
          this.$refs.receive_orders.donePullup()
        }
      }).catch(error => {
        console.log(error)
      })
    },
    toMyaddr:function(){
      this.$router.push({
        name:'address'
      })
    },
    looklogistics:function(item){
      this.$router.push({
        name:"logistics",
        params:item
      })
    },
    myAddress:function(){
      this.$router.push({
        name:"address"
      })
    },
    toHome:function(){
      this.$router.push({
        name:"index"
      })
    }
  },
  created () {
    this.loadlist(0)
    this.loadlist(1)
    this.loadlist(2)
  },store
}
</script>
<style scoped>
.page{
  width: 100%;
  height: 100%;
  background-color: #F2F2F2;
}
.page >>> .weui-toast{
  width: 2rem;
  min-height: 2rem;
}
.header >>> .vux-header-title{
  color: #333333;
}
.header >>> .left-arrow:before{
  border-color:#333333 !important;
}
.scroller{
  font-size: .1rem;
}
.order-item{
  font-size: .12rem;
  padding: 0 2.7%;
  background: #ffffff;
  margin-top: 2vw;
}

.order-item-header{
  position: relative;
  display: box;
  display: -webkit-box;
  padding: .1rem 0;
}
.order-item-header:after{
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 110%;
  height: 1px;
  background: #F2F2F2;
}
.order-item-header p{
  color: #999797;
  -webkit-box-flex: 3;
  box-flex: 3;
}
.order-item-header p:last-child{
  text-align: right;
}
.order-item-footer{
  position: relative;
  padding: .1rem 0;
  min-height: .3rem;
  text-align: right;
}
.order-item-footer p{
  position: absolute;
  top: 50%;
  color: #666666;
  font-size: .14rem;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
}
.order-item-footer span{
  padding-left: .1rem;
}
.order-item-footer button:last-child{
  margin-left: .2rem;
}
.order-item-footer button:last-child{
  margin-left: .2rem;
}
.order-item-footer >>> .weui-btn + .weui-btn {
    margin-top: 0;
}
.order-item-content{
  position: relative;
  display: -webkit-box;
  padding: .1rem 0;
}
.order-item-content img{
  /* display: block; */
  width: .8rem;
  /* box-flex: 1;
  -webkit-box-flex: 1; */
}
.order-item-content:after{
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 110%;
  height: 1px;
  background: #F2F2F2;
}
.info{
  padding: 0 .15rem 0 .1rem;
  box-flex: 1;
  -webkit-box-flex: 1;
}
.info .title{
  color:#333333;
  font-size: .15rem;
}
.info .parameter{
  color:#999797;
  font-size: .13rem;
  line-height: .25rem;
}
.info .price{
  color:#E74D3D;
  font-size: .15rem;
}
.status{
  position: relative;
}
.status p{
  color: #E74D3D;
}
.status span{
  position: absolute;
  bottom: 0;
  right: 0;
  color: #333333;
}
.scroller >>> .xs-plugin-pullup-container {
  line-height: .5rem;
  font-size: .15rem;
}
.myaddress{
  font-size: .14rem;
  width: 1.3rem;
  padding: 0 .1rem;
  line-height: .4rem;
  text-align: right;
  background:url('../../static/images/dizhi.png') no-repeat  #E74D3D;
  background-position: 10% center;
  background-size: .15rem;
  border-radius: .4rem;
  color: #ffffff;
  position: fixed;
  bottom: .3rem;
  left: 50%;
  transform: translateX(-50%);
  z-index:9999;
}
</style>