<template>
  <div class="page">
    <x-header
      class="header"
      style="background-color:#fff;"
      :left-options="{backText: ''}"
      title="首杯酱香酒大抢购活动"></x-header>
    <section class="address" v-if="addrinfo.ishave">
      <XButton
        @click.native="updateAddr(1)"
        class="update-btn"
        text="修改地址"
        action-type="button"
        mini></XButton>
      <p>我的收货地址</p>
      <span>{{addrinfo.name}}，{{addrinfo.phone}}，{{addrinfo.provice}} {{addrinfo.city}} {{addrinfo.county}} 
      {{addrinfo.info}}</span>
    </section>
     <XButton
      v-if="!addrinfo.ishave"
      class="add"
      @click.native="updateAddr(0)"
      text="添加地址"
      action-type="button"
      mini></XButton>
  </div>
</template>
<script>
import store from '@/store'
import { XHeader ,XButton } from 'vux'
import { axiosGetRequest } from '../utils/request.js'

export default {
  data() {
    return {
      addrinfo:{
        ishave:false
      }
    }
  },
  components:{
    XHeader,
    XButton
  },
  methods:{
    updateAddr:function(type){
      if(type){
        this.$router.push({
          name:'updateAddr',
          params:this.addrinfo
        })
      }else{
        this.$router.push({
          name:'updateAddr'
        })
      }
    }
  },
  created (){
    console.log(store.getters.username)
    this.addrinfo = store.getters.useraddress;
    this.addrinfo.ishave = true;
    // console.log(store.getters.userid)
    // var params = {
    //   id:store.getters.userid
    // }
    // axiosGetRequest (params,`/users/userinfo/${params.id}`)
    // .then((res) => {
    //   if(res.result.address){
    //     this.addrinfo = res.result.address
    //     this.addrinfo.ishave = true
    //   }
    // }).catch(error => {
    //   console.log(error)
    // })
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
.address >>> .weui-btn:after{
  border: none;
}
.address >>> .weui-btn{
  font-size: .1rem;
  color: #999797;
}
.update-btn{
  position: absolute;
  right: .1rem;
  border: none;
  border-radius: .15rem;
}
.add{
  font-size: .18rem;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  width: 1.5rem;
  line-height: .5rem;
  border-radius: .3rem;
}
</style>


