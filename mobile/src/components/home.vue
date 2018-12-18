<template>
  <div class="main">
    <section class="rush" :style="{backgroundImage: 'url(' + imgurl(commodity.mbanner[0]) + ')', backgroundSize:'contain'}">
      <div class="logo"></div>
      <div class="countdown">
        <p :class="countdownStatus != 0 ? '' : 'forbiddenText'">{{countdownText}}</p>
        <div class="time" :class="countdownStatus != 0 ? '' : 'forbidden'">
          <span>{{countdown.hours}}</span>
          <p>:</p>
          <span>{{countdown.minutes}}</span>
          <p>:</p>
          <span>{{countdown.seconds}}</span>
        </div>
      </div>
      <div class="propaganda">
        <div class="propaganda-img">
          <img  class="p-img" src="../../static/images/dabiaoti.png">
          <img  class="p-icon" src="../../static/images/xianshiqianggou.png">
        </div>
        <div class="line"></div>
        <img class="English" src="../../static/images/English.png">
      </div>
      <div class="price">
        <span>{{commodity.price}}元</span>
        {{commodity.content}}
      </div>
      <XButton
        @click.native="toRush"
        class="rush-btn"
        :class="countdownStatus != 0 && countdownStatus != 1 ? '' : 'forbiddenBtn'"
        type="warn"
        text="立即抢购"
        action-type="button"
        mini></XButton>
    </section>
    <!-- <section class="describe" :style="{backgroundImage: 'url(' + imgurl(goods.banner[0]) + ')', backgroundSize:'contain'}"></section> -->
    <section class="describe" v-if="commodity.mbanner.length>1" v-for="(item,index) in commodity.mbanner" v-show="index!==0" :style="{backgroundImage: 'url(' + imgurl(commodity.mbanner[index]) + ')', backgroundSize:'contain'}"></section>
    <!-- <section class="describe"></section>
    <section class="describe"></section> -->
    <!-- <img class="head" @click="toOrders" src="../../static/images/weixindenglu.png"> -->
    <img class="head" @click="toOrders" :src="avater">
    <img class="top" v-if="retrueTopShow" @click="scrollTop" src="../../static/images/dingbu.png">
    <x-dialog 
      v-model="dailogshow"
      :dialog-style="{'overflow':'auto',width: '60%'}">
      <div class="dailog">
        <img @click="closedaiLog" class="close" src="../../static/images/guanbi.png">
        <div class="dailogbox">
          <p>微型登录</p>
          <img src="../../static/images/weixindenglu.png">
          <span>使用微信登录首杯</span>
          <XButton
            type="warn"
            text="确定"
            action-type="button"
            mini></XButton>
        </div>
      </div>
    </x-dialog>
  </div>
</template>
<script>
import store from '@/store'
import { mapMutations } from 'vuex'
import { XButton ,XDialog } from 'vux'
import { axiosGetRequest } from '../utils/request.js'
export default {
  data() {
    return {
      dailogshow:false,
      retrueTopShow:false,
      countdown:{
        hours:'00',
        minutes:'00',
        seconds:'00'
      },
      avater:'',
      countdownStatus:0,
      commodity:{mbanner:[]},
      now:new Date()
    }
  },
  components:{
    XButton,
    XDialog
  },
  methods:{
    ...mapMutations(['SET_COMMODITY']),
    closedaiLog:function(){
      this.dailogshow = false;
    },
    toRush:function(){
      if(this.countdownStatus === 2){
        this.$router.push({
          name:'rush'
        })
      }
    },
    scrollUpdate() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      const browserHeight = window.outerHeight;
      this.retrueTopShow = scrollTop > browserHeight ? true : false;
    },
    scrollTop() {
      const scrollToptimer = setInterval(function () {
        var top = document.body.scrollTop || document.documentElement.scrollTop;
        var speed = top / 4;
        if (document.body.scrollTop!=0) {
            document.body.scrollTop -= speed;
        }else {
            document.documentElement.scrollTop -= speed;
        }
        if (top == 0) {
            clearInterval(scrollToptimer);
        }
      }, 30);
    },
    timeDown:function(endDate){
      let _this = this
      const timer = setInterval(function(){
        let leftTime = parseInt((endDate*1000 - new Date().getTime()) / 1000)
        var d, h, m, s, ms;
        h = Math.floor(leftTime  / 60 / 60);
        m = Math.floor(leftTime  / 60 % 60);
        s = Math.floor(leftTime  % 60);
        ms = Math.floor(leftTime);
        if(ms < 100) {
            ms = "0" + ms;
        }
        if(s < 10) {
            s = "0" + s;
        }
        if(m < 10) {
            m = "0" + m;
        }
        if(h < 10) {
            h = "0" + h;
        }
        _this.countdown.hours = h === '000'?'00':h
        _this.countdown.minutes = m === '000'?'00':m
        _this.countdown.seconds = s === '000'?'00':s
        if(_this.countdown.hours==='00'&&_this.countdown.minutes==='00'&&_this.countdown.seconds==='00'&&_this.countdownStatus===1){
          clearInterval(timer)
          _this.countdownStatus = 2
          _this.timeDown(_this.commodity.time.finished)
        }else if(_this.countdown.hours==='00'&&_this.countdown.minutes==='00'&&_this.countdown.seconds==='00'&&_this.countdownStatus===2){
          clearInterval(timer)
          _this.countdownStatus = 0
        }
      },1000)
    },
    toOrders:function(){
      this.$router.push({
        name:'orders'
      })
    },
    imgurl(src){
        let host = 'http://www.shoubei9.com/image';
        return host + src;
    }
  },
  computed:{
    countdownText:function(){
      if (this.countdownStatus===0) {
        return '活动已结束 :'
      }else if(this.countdownStatus===1) {
        return '距离活动开始还有 :'
      }else if(this.countdownStatus===2) {
        return '距离活动结束还有 :'
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.scrollUpdate)
    document.title = this.commodity.content||''
  },
  created () {
    axiosGetRequest ({},'/users/index')
    .then((res) => {
      document.title = res.result.content
      // console.log(res.result)
      this.commodity = res.result
      this.commodity.number = 1
      if(res.result.time.start*1000 > new Date().getTime()){
        this.countdownStatus = 1;
        this.timeDown(res.result.time.start)
      }else if(res.result.time.finished*1000 < new Date().getTime()){
        this.countdownStatus = 0;
      }else if(res.result.time.start*1000 <= new Date().getTime()<=res.result.time.finished*1000){
        this.countdownStatus = 2;
        this.timeDown(res.result.time.finished)
      }
      store.commit('SET_COMMODITY',res.result)
    }).catch(error => {
      console.log(error)
    })

    //判断当前是否授权登录
    if(!this.$cookies.get('userinfo')){
      axiosGetRequest ({},'/oauth/wx_login_g').then(res=>{
        if(res.code==0){
          window.location.href = res.result
        } 
      })
    }else{
      this.avater = this.$store.getters.useravater
    }
    
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollUpdate); 
  },
  store
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main .describe{
    width: 100%;
    height: 160vw;
  }
  .main .describe:nth-child(2){
    background: url('../../static/images/tu2.png') no-repeat;
    background-size: 100%;
  }
  .main .describe:nth-child(3){
    background: url('../../static/images/tu3.png') no-repeat;
    background-size: 100%;
  }
  .main .describe:nth-child(4){
    background: url('../../static/images/tu4.png') no-repeat;
    background-size: 100%;
  }
  .rush{
    position: relative;
    width: 100%;
    height: 160vw;
    background: url('../../static/images/tu1_beijing.png') no-repeat;
    background-size: 100%;
  }
  .logo{
    position: absolute;
    top: 15vw;
    right: .3rem;
    width: .45rem;
    height: .6rem;
    background: url('../../static/images/logo.png') no-repeat;
    background-size: 100%;
  }
  .countdown{
    position: absolute;
    top: 30vw;
    left: 13.6%;
    
  }
  .countdown p{
    color: #E74D3D;
    font-size: .15rem;
  }
  .time{
    margin-top: .1rem;
    font-size: .15rem;
    color: #E74D3D;
    display:-moz-box; /* Firefox */
    display:-webkit-box; /* Safari and Chrome */
    display:box;
  }
  .time span{
    display: block;
    background-color: #E74D3D;
    width: .4rem;
    text-align: center;
    line-height: .4rem;
    color: #ffffff;
    border-radius: .05rem;
  }
  .time p{
    display: block;
    width: .2rem;
    font-size: .25rem;
    text-align: center;
  }
  .propaganda{
    position: absolute;
    width: 100%;
    top: 55vw;
  }
  .propaganda-img{
    position: relative;
    width: 72.8%;
    left: 13.6%;
  }
  .p-img{
    float: left;
    width: 90%;
  }
  .p-icon{
    float: left;
    width: 8%;
    margin-left: 2%;
  }
  .line{
    position: relative;
    top: 10vw;
    width: 100%;
    height: 2vw;
    background: url('../../static/images/zhixian.png') no-repeat center;
    background-size: 100%;
  }
  .English{
    display: block;
    position: relative;
    left: 13.6%;
    top: 8vw;
    width: 72.8%;
    height: 3vw;
  }
  .price{
    width: 72.8%;
    position: relative;
    left: 13.6%;
    top: 78vw;
    color: #4D4D4D;
    font-size: .15rem;
  }
  .price span{
    color: #E74D3D;
    font-size: .25rem;
  }
  .top{
    position: fixed;
    bottom: 10vw;
    right: 4%;
    width: .4rem;
  }
  .rush-btn{
    position: absolute;
    bottom: 20vw;
    left: 12.8%;
    font-size: .15rem;
    background-color: #E74D3D;
    width: 1.3rem;
    line-height: .4rem;
    color: #ffffff;
    text-align: center;
    border-radius: .05rem;
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
  .forbiddenBtn{
    background-color: #CCCCCC !important;
  }
  .forbidden span{
    background-color: #CCCCCC !important;
  }
  .forbidden p{
    color: #CCCCCC !important;
  }
  .forbiddenText{
    color: #999797 !important;
  }
  .head{
    position: absolute;
    top: 15vw;
    left: 4%;
    width: .4rem;
    border-radius: 50%;
  }
</style>
