<template>
  <div class="page">
    <x-header
      class="header"
      style="background-color:#fff;"
      :left-options="{backText: ''}"
      title="首杯酱香酒大抢购活动"></x-header>
    <section class="address">
      <p>收货地址</p>
      <span>{{logisticsInfo.address.name}}，{{logisticsInfo.address.phone}}，{{logisticsInfo.address.provice}}
        {{logisticsInfo.address.city}} {{logisticsInfo.address.county}} {{logisticsInfo.address.info}}</span>
    </section>
    <section class="logistics">
      <p>物流消息</p>
      <p>发货方式：快递</p>
      <p>物流公司：{{logisticsInfo.Express.expName}}</p>
      <p>运单号码：{{logisticsInfo.Express.number}}</p>
      <div class="trace">
        <p>物流跟踪：</p>
        <div class="trace-info">
          <p v-if="logisticsInfo.Express.list.length<1">已发货</p>
          <p v-for="(value, index) in logisticsInfo.Express.list" :class="(logisticsInfo.Express.list.length-1)==index ? 'active':''">
          {{value.time}} {{value.status}}</p>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { XHeader } from 'vux'
import { axiosGetRequest } from '../utils/request.js'
export default {
  data() {
    return {
      logisticsInfo:{
        address:{
          city: "",
          county: "",
          info: "",
          name: "",
          phone: "",
          provice: "",
        },
        Express: {
          deliverystatus: "",
          expName: "",
          expPhone: "",
          expSite: "",
          issign: "",
          list: [],
          number: "",
          type: "",
        }
      }
    }
  },
  components:{
    XHeader,
  },
  methods:{
  },
  created () {
    var params = {
      orderid:this.$route.params._id
    }
    axiosGetRequest (params,`/users/orderdetail/${this.$route.params._id}`)
    .then((res) => {
      this.logisticsInfo = res.result
      // console.log(res)
    }).catch(error => {
      console.log(error)
    })
  }
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
.address{
  position: relative;
  margin-top: .1rem;
  padding: .1rem;
  font-size: .12rem;
  color: #333333;
  background: #ffffff;
  overflow: hidden;
}
.address p{
  font-size: .18rem;
  margin-bottom: .1rem;
}
.address span{
  color: #666666;
  /* padding-top: .3rem; */
}
.address:after{
  content: "";
  position: absolute;
  bottom: 0;
  left: .1rem;
  width: 100%;
  height: 1px;
  background: #F2F2F2;
}
.logistics{
  padding: .1rem .1rem .1rem .1rem;
  font-size: .12rem;
  color: #333333;
  background: #ffffff;
}
.logistics p{
  line-height: .2rem;
}
.logistics>p:first-child{
  font-size: .18rem;
  margin-bottom: .1rem;
  line-height: auto;
}
.trace{
  display: -webkit-box;
  
}
.trace>p{
  min-width:.6rem ;
  max-width:.6rem ;
  -webkit-box-flex: 1;
  box-flex: 1;
}
.trace .trace-info{
  -webkit-box-flex: 1;
  box-flex: 1;
}
.trace .trace-info p{
  color: #808080;
  margin-bottom: .1rem;
}
.active{
  color: #E74D3D !important;
}
</style>


