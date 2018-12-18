<template>
  <div class="page">
    <x-header
      class="header"
      style="background-color:#fff;"
      :left-options="{backText: ''}"
      title="首杯酱香酒大抢购活动"></x-header>
    <section class="r-body">
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
    </section>
     <XButton
      class="preserve"
      @click.native="submitAddr"
      type="warn"
      text="保存"
      action-type="button"
      mini></XButton>
  </div>
</template>
<script>
import store from '@/store'
import { XHeader ,XAddress ,XButton ,ChinaAddressV4Data, Value2nameFilter as value2name ,Name2valueFilter as name2value } from 'vux'
import { axiosPostRequest } from '../utils/request.js'
export default {
  data() {
    return {
      addrArr:[],
      addr:{
        name:'',
        phone:'',
        info:''
      },
      addressData:ChinaAddressV4Data
    }
  },
  components:{
    XHeader,
    XAddress,
    XButton,
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
      }else if(this.addr.address == ''){
        return '请填写详细地址'
      }else if(!phone_reg.test(this.addr.phone)){
        return '请填写正确的联系电话'
      }
      const addStr = value2name(this.addrArr, ChinaAddressV4Data)
      this.addr.provice = addStr.split(" ")[0]
      this.addr.city = addStr.split(" ")[1]
      this.addr.county = addStr.split(" ")[2]
      return true
    },
    submitAddr:function(){
      const validate = this.validate();
      if(typeof validate  === 'string') {
        this.$vux.toast.show({
          text: validate
        })
        return false;
      }
      this.submitAddrRequest()
    },
    submitAddrRequest:function(){
      const params = {
        id:this.$store.getters.userid,
        name:this.addr.name,
        phone:this.addr.phone,
        provice:this.addr.provice,
        city:this.addr.city,
        county:this.addr.county,
        info:this.addr.info
      }
      axiosPostRequest (params,'/users/address')
      .then((res) => {
        if(res.code===0){
          this.$vux.toast.show({
            text: '修改成功'
          })
          this.$store.commit('SET_ADDRESS',res.result.address)
          this.$router.back(-1) 
        }else{
          this.$vux.toast.show({
            text: '修改失败'
          })
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  created() {
    if(this.$route.params.name){
      this.addr = this.$route.params
      let addarr = [];
      addarr.push(this.$route.params.provice)
      addarr.push(this.$route.params.city)
      addarr.push(this.$route.params.county)
      this.addrArr = name2value(addarr,ChinaAddressV4Data).split(' ')
    }
  },store
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
.r-body{
  background: #ffffff;
  padding: 0 .1rem;
  margin-top: .1rem;
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
.preserve{
  font-size: .13rem;
  position: fixed;
  background: #E74D3D;
  left: 50%;
  top: 65%;
  transform: translate(-50%,-50%);
  width: 1rem;
  line-height: .3rem;
  border-radius: .3rem;
}
</style>


