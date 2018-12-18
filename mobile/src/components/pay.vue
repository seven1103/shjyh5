<template>
  <div class="page">
    <x-header
      class="header"
      style="background-color:#fff;"
      :left-options="{backText: ''}"
      title="首杯酱香酒大抢购活动"></x-header>
    <section class="r-body">
      <div class="order-info">
        <div class="info">
          <p>订单详情</p>
          <span>订单号：{{commodity.orderNumber}}</span>
          <span>订单数量：{{commodity.number}}{{commodity.unit}}</span>
          <strong>订单总额：￥{{price}}</strong>
        </div>
        <div class="receiving-info">
          <p>填写收货方式</p>
          <div class="input-box">
            <p>姓名</p>
            <div class="input-item">
              <input type="text"  v-model="addr.name">
            </div>
          </div>
          <div class="input-box">
            <p>联系电话</p>
            <div class="input-item">
              <input type="text"  v-model="addr.phone">
            </div>
          </div>
          <div class="input-box">
            <p>收货地址</p>
            <div class="input-item">
              <x-address title="" placeholder="选择地区 >>" v-model="addrArr" :list="addressData"></x-address>
              <textarea placeholder="详细地址"  v-model="addr.info"></textarea>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="paybox">
      <p>合计{{commodity.number}}{{commodity.unit}}:<span>￥{{price}}</span></p>
      <XButton
        @click.native="payOrder"
        class="pay-btn"
        type="warn"
        text="立即支付"
        action-type="button"
        mini></XButton>
    </section>
    <x-dialog 
      v-model="dailogshow"
      :dialog-style="{'overflow':'auto',width: '60%'}">
      <div class="dailog">
        <img @click="closedaiLog" class="close" src="../../static/images/guanbi.png">
        <div class="dailogbox">
          <p>支付成功</p>
          <img src="../../static/images/zhifuchenggong.png">
          <span>订单已支付成功，我们会在24小时内安排发货！</span>
          <XButton
            @click.native = "toOders"
            type="warn"
            text="查看订单"
            action-type="button"
            mini></XButton>
        </div>
      </div>
    </x-dialog>
    <loading :show="loading" text="加载中"></loading>
  </div>
</template>
<script>
import store from '@/store'
import { XHeader ,XAddress ,XButton , Loading , XDialog,ChinaAddressV4Data, Value2nameFilter as value2name ,Name2valueFilter as name2value } from 'vux'
import { axiosPostRequest ,axiosGetRequest } from '../utils/request.js'
import wxpay from '../utils/wxpay.js'
export default {
  data() {
    return {
      dailogshow:false,
      commodity:this.$store.state.order_info.commodity,
      addrArr:[],
      addressData:ChinaAddressV4Data,
      addr:{
        name:'',
        phone:'',
        info:''
      },
      loading:false
    }
  },
  components:{
    XHeader,
    XAddress,
    XButton,
    XDialog,
    Loading
  },
  methods:{
    closedaiLog:function(){
      this.dailogshow = false;
    },
    validate:function() {
      const name_reg=/^([\u4e00-\u9fa5]){2,7}$/;
      const phone_reg=/^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/;
      if(this.addr.name == ''){
        return '请填写姓名'
      }else if(this.addr.phone == ''){
        return '请填写联系电话'
      }else if(this.addrArr.length<1){
        return '请选择收货地址'
      }else if(this.addr.address == ''){
        return '请填写详细地址'
      }else if(!phone_reg.test(this.addr.phone)){
        return '请填写正确的联系电话'
      }
      const addStr = value2name(this.addrArr, ChinaAddressV4Data)
      this.addr.provice = addStr.split(" ")[0]
      this.addr.city = addStr.split(" ")[1]
      this.addr.county = addStr.split(" ")[2]
      this.commodity.address = this.addr
      store.commit('SET_COMMODITY',this.commodity)
      return true
    },
    payOrder:function(){
      const validate = this.validate();
      if(typeof validate  === 'string') {
        this.$vux.toast.show({
          text: validate
        })
        return false;
      }
      this.h5pay()
    },
    h5pay:function(){
        this.loading = true;
        //var openid = this.$fn.getcookieValue(this,'openid');
        var openid = this.$store.getters.useropenid;
        var _self = this;
        //请求支付接口
        axiosGetRequest ({orderid:this.commodity.orderNumber,openid:openid,acount:parseInt(this.commodity.number)},'/oauth/orderg').then(data=>{
          this.loading = false;
          wxpay(data,res=>{
            _self.submitOrder();
            // 成功处理
          },err=>{
            // 失败处理
            _self.$vux.toast.show({
              text: err
            })
          })
        })
    },
    submitOrder:function(){
      const params = {
        _id:this.commodity.orderNumber,
        userid:this.$store.getters.userid,
        goodsid:this.commodity._id,
        count:parseInt(this.commodity.number),
        address:{
          name:this.addr.name,
          phone:this.addr.phone,
          provice:this.addr.provice,
          city:this.addr.city,
          county:this.addr.county,
          info:this.addr.info
        }
      }
      axiosPostRequest (params,'/users/addorder')
      .then((res) => {
        this.dailogshow = true
      }).catch(error => {
        console.log(error)
      })
    },

    toOders:function(){
      this.$router.push({
        name:'orders'
      })
    }
  },
  computed:{
    price:function(){
      return Number(this.commodity.price*this.commodity.number).toFixed(2)
    }
  },
  created(){
    let addarr = [];
      let address = store.getters.useraddress;
      if(address){
        this.addr.phone = address.phone
        this.addr.name = address.name
        this.addr.info = address.info
        addarr.push(address.provice)
        addarr.push(address.city)
        addarr.push(address.county)
        this.addrArr = name2value(addarr,ChinaAddressV4Data).split(' ')
      }
      this.commodity.orderNumber = Date.now().toString() + this.$fn.RndNum(6)
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
.r-body{
  background: #ffffff;
  padding: 0 .1rem;
  margin-top: .1rem;
}
.info{
  position: relative;
  padding: .2rem 0;
  border-bottom: 1px solid #F2F2F2;
}
.info p{
  font-size: .18rem;
  color: #333333;
  padding-bottom: .1rem;
}
.info span{
  display: block;
  color: #666666;
  padding:  .02rem 0;
  font-size: .16rem;
}
.info strong{
  font-size: .18rem;
  position: absolute;
  bottom: 5vw;
  right: 2.7%;
  color: #E74D3D;
}
.receiving-info{
  padding: .2rem 0;
  font-size: .16rem;
}
.receiving-info>p{
  font-size: .18rem;
  color: #333333;
  padding-bottom: .1rem;
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
.close{
  width: .2rem;
  position:absolute;
  top:-10vw;
  right: 0;
  z-index: 1000;
}
.dailogbox{
  padding: .3rem .3rem;
}
.dailogbox img{
  display: block;
  width: .5rem;
  margin: .3rem auto;
}
.dailogbox p{
  font-size: .2rem;
}
.dailogbox span{
  display: block;
  font-size: .15rem;
}
.dailogbox button{
  margin-top: .2rem;
  display: block;
}
.input-box{
  display: -webkit-box;
  -webkit-box-align: center;
}
.input-box:last-child{
  display: -webkit-box;
  -webkit-box-align:inherit;
}
.input-box:last-child>p{
  line-height: .5rem;
  width: .75rem;
  min-width:.75rem ;
}
.input-box p{
  -webkit-box-flex: 1;
  box-flex: 1;
  padding-right: .1rem;
  width: .8rem;
  font-size: .15rem;
  text-align:justify;
  text-align-last:justify;
  color: #666666;
}
.input-item{
  -webkit-box-flex: 5;
  box-flex: 5;
  padding-bottom: .1rem;
}
.input-item input{
  width: 100%;
  border: 1px solid #CCCCCC;
  border-radius: .02rem;
  font-size: .15rem;
  padding: .05rem .1rem;
  margin-top: .08rem;
}
.input-item textarea{
  width: 100%;
  border: 1px solid #CCCCCC;
  border-radius: .02rem;
  font-size: .15rem;
  padding: .05rem .1rem;
  margin-top: .08rem;
}
.input-item >>> .vux-cell-box{
  margin-top: .1rem;
  padding: .05rem 0;
}
.input-item >>> .vux-popup-picker-placeholder{
  color: #333333;
}
.input-item >>> .vux-popup-picker-select{
  color: #333333;
  font-size: .15rem;
  text-align: left !important;
}
</style>


