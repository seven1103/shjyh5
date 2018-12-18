<template>
  <div class="page">
    <x-header
      class="header"
      style="background-color:#fff;"
      :left-options="{backText: ''}"
      title="首杯酱香酒大抢购活动"></x-header>
    <section class="details">
      <div class="d-cell d-info">
        <img src="../../static/images/chanpin.png">
        <div class="info">
          <p>{{commodity.content}}</p>
          <strong>￥{{price}}</strong>
          <span>库存：{{commodity.stock}}{{commodity.unit}}</span>
        </div>
      </div>
      <div class="d-cell number">
        <p>购买数量<span v-if="commodity.limitcount>0">（限购{{commodity.limitcount}}件）</span></p>
        <div class="number-btn">
         <div 
          class="n-btn"
          @click="reduce">-</div>
         <p>{{num}}</p>
         <div
          class="n-btn"
          @click="add">+</div>
        </div>
      </div>
      <div class="d-cell">
        <p>产地</p>
        <p v-if="commodity.origin">{{commodity.origin.provice +" "+ commodity.origin.city +" "+ commodity.origin.county}}</p>
      </div>
      <div class="d-cell">
        <p>重量</p>
        <p>{{commodity.weight+commodity.weight_unit}}</p>
      </div>
      <div class="d-cell">
        <p>配送方式</p>
        <p>快递{{commodity.express?" "+commodity.express+"元":" 包邮"}}</p>
      </div>
      <div class="d-cell">
        <p>配送时间</p>
        <p>{{commodity.express_time}}</p>
      </div>
    </section>
    <section class="paybox">
      <p>合计{{num}}{{commodity.unit}}:<span>￥{{totalPrice}}</span></p>
      <XButton
        @click.native="queryStock"
        class="pay-btn"
        type="warn"
        text="立即抢购"
        action-type="button"
        mini></XButton>
    </section>
  </div>
</template>
<script>
import store from '@/store'
import { XHeader ,XButton ,XNumber } from 'vux'
import { mapMutations } from 'vuex'
import { axiosGetRequest } from '../utils/request.js'
export default {
  data() {
    return {
      commodity:this.$store.state.order_info.commodity,
      num:1
    }
  },
  components:{
    XHeader,
    XButton,
    XNumber 
  },
  methods:{
    ...mapMutations(['SET_COMMODITY']),
    queryStock:function(){
      const params = {
        id:this.commodity._id
      }
      axiosGetRequest (params,`/users/goodstock/${this.commodity._id}`)
      .then((res) => {
        if(res.result.count<1){
          this.$vux.toast.show({
            text: '商品已售罄'
          })
          this.$router.back(-1) 
        }
        this.commodity.number = this.num;
        this.commodity.orderNumber = ''
        store.commit('SET_COMMODITY',this.commodity)
        this.$router.push({
          name:'pay'
        })
      }).catch(error => {
        console.log(error)
      })
    },
    reduce:function(){
      if(this.num==1) return
      this.num = this.num - 1
    },
    add:function(){
      if(this.num == this.commodity.limitcount) return
       this.num = this.num + 1
    }
  },
  computed:{
    price:function(){
      return Number(this.commodity.price).toFixed(2)
    },
    totalPrice:function(){
      return Number(this.commodity.price*this.num).toFixed(2)
    }
  },
  created (){
    var params ={
      id:this.commodity._id
    }
    axiosGetRequest (params,`/users/goodstock/${this.commodity._id}`)
    .then((res) => {
      this.commodity.stock = res.result.count;
    }).catch(error => {
      console.log(error)
    })
  },
  store
}
</script>
<style scoped>
.page{
  width: 100%;
  height: 100%;
  background-color: #F2F2F2;
}
.header >>> .vux-header-title{
  color: #333333;
}
.header >>> .left-arrow:before{
  border-color:#333333 !important;
}
.paybox{
  width: 100%;
  position: fixed;
  bottom: 0;
  background: #ffffff;
  font-size: .15rem;
  padding: .15rem 0;
}
.paybox p{
  padding-left: 2.7%;
}
.paybox span{
  color: #E74D3D;
  font-size: .2rem;
  padding: 0 .1rem;
}
.pay-btn{
  position: absolute;
  top: 50%;
  right: 2.7%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}
.details{
  margin-top: .1rem;
  background: #ffffff;
  font-size: .15rem;
}
.d-cell{
  position: relative;
  padding:.1rem;
  overflow: hidden;
}
.d-cell:after{
  content: "";
  position: absolute;
  bottom: 0;
  left: .1rem;
  width: 100%;
  height: 1px;
  background: #F2F2F2;
}
.d-cell:last-child::after{
  height: 0px;
}
.number{
  padding:.15rem .1rem;
}
.number .number-btn{
  position: absolute;
  right: .1rem;
  top: 50%;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  display: -webkit-box;
  -webkit-box-align: center;
}
.number-btn .n-btn{
  box-flex: 1;
  -webkit-box-flex: 1;
  display: block;
  width: .3rem;
  background: #E7E6E6;
  color: #333333;
  text-align: center;
  height: .3rem;
  line-height: .3rem;
}
.number-btn p{
  box-flex: 1;
  -webkit-box-flex: 1;
  color: #333333;
  padding: 0 .1rem;
}
.d-cell>p{
  color: #333333;
}
.d-cell>p:last-child{
  position: absolute;
  right: .1rem;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  color: #999797;
}
.d-info{
  display: -webkit-box;

}
.d-info img{
  width: 1rem;
  -webkit-box-flex: 1;
  box-flex: 1;
  margin-right: .1rem;
}
.info{
  position: relative;
  -webkit-box-flex: 1;
  box-flex: 1;
  min-height: 1rem;
}
.info p{
  color: #333333;
}
.info strong{
  font-size: .18rem;
  position: absolute;
  left: 0;
  bottom: 0;
  color: #E74D3D;
}
.info span{
  font-size: .12rem;
  /* position: absolute; */
  right:0;
  bottom: 0;
  color: #999797;
}
</style>


