<template>
    <div class="main">
        <div class="logo">
            <img src="../../static/image/logo.png" alt="">
        </div>
        <div class="startTime">
            <p :class="countdownStatus!==0?'node':'node defaults'">{{countdownText}}</p>
            <div :class="countdownStatus!==0?'time':'time defaults'">
                <span class="f">{{stime.h}}</span><span class="c">:</span>
                <span class="f">{{stime.m}}</span><span class="c">:</span>
                <span class="f">{{stime.s}}</span>
            </div>
            <div class="goodtitle">
                <img src="../../static/image/dabiaoti.png" alt="">
                <img src="../../static/image/xianshiqianggou.png" alt="">
                <p><span>{{goods.price + '元'}}</span>抢购”{{goods.title}}“</p>
                <p>{{goods.content}},库存仅剩最后<span>{{goods.stock}}</span>件</p>
            </div>
        </div>
        <div class="rushbuy" v-if="goods">
            <!-- <span class="rushbtn active" @click="showgood" v-if="isRushtime(goods.time.start,goods.time.finished)==1">立即抢购</span>
            <span class="rushbtn"  v-if="isRushtime(goods.time.start,goods.time.finished)==2">活动结束</span>
            <span class="rushbtn"  v-if="isRushtime(goods.time.start,goods.time.finished)==0">活动未开始</span> -->
            <span class="rushbtn active" @click="showgood" v-if="countdownStatus===2">立即抢购</span>
            <span class="rushbtn"  v-if="countdownStatus===0">活动结束</span>
            <span class="rushbtn"  v-if="countdownStatus===1">活动未开始</span>
        </div>
        <p v-show="countdownStatus==1" class="beforeaddress" @click="goaddress">闪抢购，<span>设置收货地址</span></p>
        <div class="banner">
            <img v-for="item in goods.banner" :key="item" :src="item | imgurl" alt="">
            <!-- <img src="../../static/image/tu1.jpg" alt="">
            <img src="../../static/image/tu2.jpg" alt="">
            <img src="../../static/image/tu3.jpg" alt="">
            <img src="../../static/image/tu4.jpg" alt=""> -->
        </div>
        <div class="login">
            <img v-if="avater"  @click="myorder" :src="avater" alt="">
            <span v-else @click="login">登录</span>
        </div>
        <!-- <p v-show="userid" class="setaddress" @click="goaddress">设置收货地址</p> -->
        <top></top>
        <sfooter></sfooter>
        <!-- 登录二维码 -->
        <x-dialog v-model="showlogin" class="dialog">
            <div @click="showlogin=false">
                <span class="vux-close">x</span>
            </div>
            <wxlogin class="wlogin" :appid="appid" :scope="scope" :redirect_uri="redirect_uri"></wxlogin>
        </x-dialog>
        <!-- 商品弹框 -->
        <x-dialog v-model="showgoods" class="dialog">
            <div @click="showgoods=false">
                <span class="vux-close">x</span>
            </div>
            <div class="dialogcontant">
                <!-- <img src="../../static/image/chanpin.png" alt=""> -->
                <img style="height:100%" :src="goods.goodimg[0] | imgurl" alt="">
                <div class="detail" v-if="goods">
                    <h4>{{goods.content}}</h4>
                    <p><label>价格</label><span class="price">￥{{goods.price}}</span></p>
                    <p><label>产地</label><span class="place">贵州仁怀</span></p>
                    <p><label>重量</label><span class="weight">{{goods.weight}}{{goods.weight_unit}}</span></p>
                    <p><label>服务支持</label><span class="express">免运费</span></p>
                    <p><label>库存</label><span class="stock">{{goods.stock}}</span></p>
                    <p>
                        <label>购买数量</label>
                        <span class="selectgroup">
                            <span class="num">{{selectgoodnum}}</span>
                            <span class="opeate">
                                <span @click="changenum(1)">+</span>
                                <span @click="changenum(-1)">-</span>
                            </span>
                        </span>
                        <span class="limit">(单笔限购{{goods.limitcount}})</span>
                    </p>
                    <span class="pushorder" @click="rushorder">立即抢购</span>
                </div>
            </div>
        </x-dialog>
        <!-- 立即支付 -->
        <x-dialog v-if="creatorder" v-model="creatorder" class="dialog goodsorder">
            <div @click="close">
                <span class="vux-close">x</span>
            </div>
            <div class="order">
                <h4>订单详情</h4>
                <P><label>订单号:</label>{{order._id}}</P>
                <p><label>订单数量:</label>{{order.count}}{{goods.unit}} <span class="ordertotall">订单总额：￥{{order.Rpayment}}.00</span></p>
            </div>
            <div class="address">
                <h4>填写收货方式</h4>
                <p><label>姓名</label><input type="text" v-model="addressForm.name" name="name"></p>
                <p><label>联系电话</label><input type="tel" v-model="addressForm.phone" name="phone"></p>
                <p class="paddress"><label>收货地址</label>
                    <!-- <input class="defaut_input" type="text">
                    <x-address title=""   v-model="addressForm.selectaddress" :list="addressData"  placeholder="点击选择地址"   :show.sync="showAddress"></x-address> -->
                    <area-select id="address" type="text" :level="2" v-model="addressForm.selectaddress" :data="pcaa"></area-select>
                </p>
                <p><label></label><input type="text" v-model="addressForm.info" placeholder="详细地址"></p>
            </div>
            <div class="payfor">
                <span @click="payfor">立即支付</span>
                <p>仅限微信支付</p>
            </div>
        </x-dialog>  
        <!-- 支付二维码      -->
        <x-dialog v-if="order.address" v-model="paycode" class="dialog">
            <div @click="closepaycode">
                <span class="vux-close">x</span>
            </div>
            <div class="paycode">
                    <h4>微信支付</h4>
                    <div class="code">
                        <qrcode :value="paycodeurl" :options="{ size: 200 }"></qrcode>
                    </div>
                    <p class="paynum">支付金额：￥{{order.Rpayment}}.00</p>
                    <p class="orderinfo">收货信息：{{order.address.provice + order.address.city + order.address.county + order.address.info + '   ' + order.address.name }}</p>
                    <!-- <button @click="tostatus">进入状态</button> -->
            </div>
        </x-dialog>
        <!-- 支付状态返回 -->
        <x-dialog v-model="payStatus" class="dialog">
            <div @click="payStatus=false">
                <span class="vux-close">x</span>
            </div>
            <div class="paystatus">
                <h4>支付成功</h4>
                <img src="" alt="">
                <p class="node">订单已支付成功，我们会在24小时内安排发货！</p>
                <span class="orderList btn" @click="myorder">查看订单</span>
            </div>
        </x-dialog>
    </div>
</template>
<style scoped>
    
    /* @media only screen and (max-width: 799px) {
        .logo>img{float: right}
        
    } */
    /* @media screen and (min-width:800px){ */
        p.defaults{color: #ccc !important}
        /* p.paddress{line-height: 1 !important} */
        #address{display: inline-block;line-height: 1 !important;margin-left: -15px}
        .defaut_input{
            z-index: -1;position: absolute;line-height: 0.4rem;top: 0.2rem;margin-left: -0.05rem;
        }
        .defaults>.f{background: #ccc !important}
        .main{position: relative;}
        .logo>img{margin-left: 4.55rem}
        .startTime{margin-left: 4.55rem}
        .logo{position: absolute;z-index: 1;width: 100%;top: 0.74rem}
        .logo>img{height: 1.46rem}
        .banner>img{width: 100%;margin: 0;padding: 0;outline-width:0px;vertical-align:top;}
        .startTime{
            position: absolute;
            top: 3.13rem;
        }
        .goodtitle{
            margin-top: 0.5rem;
            letter-spacing: 2px;
            font-size: 0.22rem;
        }
        .goodtitle>p{color: #333;line-height: 1.5}
        .goodtitle>p>span{color: #E74D3D;font-size: 0.3rem}
        .goodtitle>img{height: 0.5rem}
        .beforeaddress{position: absolute;top: 7.75rem;font-size: 0.16rem;margin-left: 4.55rem;color: #333}
        .beforeaddress>span{color: #E74D3D;text-decoration: underline;}
        .active{background: #E74D3D !important}
        .node{color: #E74D3D;font-size: 0.24rem;line-height: 0.6rem}
        .time>span.f{background: #E74D3D;color: #fff;font-size: 0.24rem;
        padding: 0.15rem 0.1rem;line-height: 0.54rem;border-radius: 0.1rem}
        .time>span.c{margin: 0.1rem;color: #E74D3D;font-size: 0.24rem}
        .rushbuy{position: absolute;top: 7rem;}
        .rushbtn{margin-left: 4.55rem;display: inline-block;width: 2.16rem;
        color: #fff;background-color: #cccccc;text-align: center;border-radius: 0.1rem;
        height: 0.64rem;line-height: 0.64rem;cursor: pointer}
        .login{
            position: absolute;right: 0.5rem;top: 40vh;
            width: 0.9rem;height: 0.9rem;color: #fff;background: #D79500;line-height: 0.9rem;
            border-radius: 50%;text-align: center;cursor: pointer;
        }
        .setaddress{position: absolute;width: 4vw;
        right: 0.5rem;top: 55vh;font-size: 0.2rem;background: #E74D3D;padding: 5px;color: #ddd}
        .login>img{
            width: 0.9rem;height: 0.9rem;border-radius: 50%
        }
        .dialogcontant{display: flex;}
        .dialogcontant>img{width: 35%}
        .dialogcontant>.detail{width: 55%;padding-left: 0.3rem;text-align: left}
        .dialogcontant>.detail>h4{color: #332C2B;line-height: 0.36rem;margin-bottom: 0.2rem}
        .dialogcontant>.detail>p{
            margin-bottom: 0.26rem;
            font-size: 0.18rem;
            color: #332C2B;
        }
        .dialogcontant>.detail>p>label{color: #999797;margin-right: 0.1rem}
        .selectgroup{display: inline-block;border: 1px solid #CCCCCC}
        .selectgroup>.num{
            font-size: 0.18rem;padding: 0 0.2rem;
            height: 0.37rem;line-height: 0.37rem;
        }
        .opeate{display: inline-block;border-left: 1px solid #ccc}
        .opeate>span{
            background: #f5f5f5;
            height: 0.3rem;
            display: block;
            width: 0.3rem;
            text-align: center;
            color: #ccc;
            font-size: 0.18rem;cursor: pointer;
        }
        .opeate>span:nth-child(1){border-bottom: 1px solid #ccc}
        .limit{color: #E74D3D}
        .ordertotall{color: #E74D3D;font-size: 0.2rem;float: right}
        .pushorder{display: inline-block;cursor: pointer;border-radius: 0.1rem;width: 1.73rem;height: 0.58rem;line-height: 0.58rem;text-align: center;color: #fff;background: #E74D3D;}
        .goodsorder{font-size: 0.2rem}
        .goodsorder h4{color: #332C2B;line-height: 0.6rem}
        .goodsorder p{line-height: 0.6rem}
        .goodsorder .order{border-bottom: 1px solid #D8D8D8;padding-bottom: 0.2rem}
        .payfor{text-align: center;margin-top: 0.6rem}
        .payfor>span{display: inline-block;background: #E74D3D;border-radius: 0.08rem;width: 1.73rem;height: 0.58rem;line-height: 0.58rem;text-align: center;
        color: #fff;}
        .payfor>p{font-size: 0.14rem;color: #999797;line-height: 0.4rem}
        .address>p{line-height: 0.6rem;cursor: pointer}
        .address>p>label{width: 15%;display: inline-block;text-align: justify;margin-right:5%;}
        .address>p>input{width: 66%;line-height: 0.4rem;outline: none;}
        .paycode{text-align: center;color: #332C2B;}
        .paycode>h4{font-size: 0.24rem;line-height: 0.6rem;}
        .paycode>.code{height: 2.45rem;width: 2.45rem;margin: 0.2rem auto}
        .paycode>.paynum{font-size: 0.18rem;line-height: 0.6rem;color: #E74D3D;margin-top: 0.5rem }
        .paycode>.orderinfo{font-size: 0.14rem}
        .paystatus{text-align: center;}
        .orderList{}
        .wlogin{text-align: center;}
    /* } */
</style>
<script>
    import { XDialog,XNumber,XAddress,ChinaAddressV4Data,Value2nameFilter as value2name,Name2valueFilter as name2value  } from 'vux'
    import Qrcode from '@xkeshi/vue-qrcode'
    import wxlogin from 'vue-wxlogin'
    import Sfooter from '@/components/Sfooter'
    import Top from '@/components/Top'
    import { paycode,indexData,GoodStock,AddOrder,OrderStatus,DefaultOrder,OverOrder } from '@/api/index'
    import 'vue-area-linkage/dist/index.css';
    import { pca, pcaa } from 'area-data'
    import { AreaSelect  } from 'vue-area-linkage'
    export default{
        name:'home',
        data(){
            return{
                appid:'wx1bcc3e268a0cac90',
                scope:'snsapi_login',
                redirect_uri:'https%3a%2f%2fwww.shoubei9.com%2foauth%2fget_wx_access_token',
                showlogin:false,
                showgoods:false,
                creatorder:false,
                paycode:false,
                payStatus:false,
                selectgoodnum:0,
                pcaa:pcaa,
                addressForm:{
                    selectaddress:[],
                    name:'',
                    phone:'',
                    info:''
                },
                countdownStatus:0,
                // selectaddress:[],
                addressData: ChinaAddressV4Data,
                showAddress: false,
                avater:this.$store.getters.useravater||null,
                userid:this.$store.getters.userid||null,
                paycodeurl:'',
                goods:{
                    _id:null,
                    banner:[],
                    goodimg:[],
                    time:{
                        finished:'1543998821'
                    }
                },
                order:{},
                orderTimer:null,
                paystatus:0,
                stime:{
                    h:'00',
                    s:'00',
                    m:'00'
                },
                enddate:'2018-11-30 01:50:00',
                timeout:''
            }
        },
        created() {
            //是否存在缓存
            if(this.$store.state.user.id){
                if(this.$store.state.user.address.name){
                    this.addressForm = {
                        name:this.$store.state.user.address.name,
                        phone:this.$store.state.user.address.phone,
                        info:this.$store.state.user.address.info
                    }
                    let str = [this.$store.state.user.address.provice,this.$store.state.user.address.city,this.$store.state.user.address.county]
                    // let str1 = name2value(str,ChinaAddressV4Data);
                    // let arr = str1.split(' ');
                    this.addressForm.selectaddress = str;
                }
            }
            //加载首页数据
            indexData().then(res=>{
                if(res.code==0) this.goods = res.result;
                //this.time(this.goods.time.start);
                if(res.result.time.start*1000 > new Date().getTime()){
                    this.countdownStatus = 1;
                    this.time(res.result.time.start)
                }else if(res.result.time.start*1000 <= new Date().getTime()<=res.result.time.finished*1000){
                    this.countdownStatus = 2;
                    this.time(res.result.time.finished)
                }else if(res.result.time.finished*1000 < new Date().getTime()){
                    this.countdownStatus = 0;
                }
            })
        },
        components: {
            XDialog,XNumber,wxlogin,XAddress,Sfooter,Top,Qrcode,AreaSelect
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
        methods:{
            close(){
                this.creatorder=false;
                this.order = {}
            },
            goaddress(){
                if(this.$store.state.user.id){
                    this.$router.push({path:'/my/address'})
                }else{
                    this.$vux.alert.show({title: '登录提示',content: '请先登录'})
                }
                
            },
            comparetime(timestamp){
                let nowtime = parseInt(Date.now()/1000);
                if(nowtime>timestamp) return false;
                else return true;
            },
            isRushtime(start,finished){
                let nowtime = parseInt(Date.now()/1000);
                if(nowtime<start) return 0
                else if(start<nowtime<finished) return 1
                else return 2
            },
            login(){
                this.showlogin = true;
                // if(!this.$store.state.user.id){
                //     this.$vux.alert.show({title: '登录提示',content: '请先登录'})
                // }else{
                //     this.showlogin = true;
                // }
            },
            showgood(){
                this.showgoods = true;
            },
            changenum(type){
                if(type==1){
                    if(this.selectgoodnum+1>this.goods.limitcount){
                        this.$vux.alert.show({title:'提示',content:'每人限购' + this.goods.limitcount })
                    }else if(this.selectgoodnum+1>this.goods.stock){
                        this.$vux.alert.show({title:'提示',content:'库存不足' })
                    }else{
                        this.selectgoodnum = this.selectgoodnum+1;
                    }
                }else{
                    if( this.selectgoodnum-1<0){

                    }else{this.selectgoodnum = this.selectgoodnum-1;}
                }
            },
            rushorder(){
                if(this.selectgoodnum===0){
                    this.$vux.alert.show({
                        title:'提示',
                        content:'请选择数量'
                    })
                }else{
                    // 判断当前用户是否登录
                    if(this.$store.getters.userid){
                         //查询库存
                        this.$vux.loading.show({text: '正在抢购'})
                        GoodStock({id:this.goods._id}).then(res=>{
                            this.$vux.loading.hide()
                            if(res.code===0){
                                if(res.result.count>this.selectgoodnum){
                                    this.order = {
                                        count:this.selectgoodnum,
                                        Rpayment:this.selectgoodnum * this.goods.price,
                                        goodsid:this.goods._id,
                                        userid:this.$store.state.user.id,
                                        _id:Date.now().toString() + this.$fn.RndNum(6)
                                    }
                                    this.showgoods = false;
                                    this.creatorder = true; 
                                }else{
                                    this.$vux.alert.show({title: '提示',content: '库存不足'})
                                }
                            }else{
                                this.$vux.alert.show({title: '提示',content: '请稍后重试'})
                            }
                        })
                    }else{
                        var self = this;
                        this.$vux.alert.show({title:'提示',content:'请先登录',onHide(){
                            self.showgoods = false;
                            self.showlogin = true;
                        }})
                    }
                   
                }
            },
            payfor(){
                 // 收货方式验证
                 if(!this.addressForm.name||!this.addressForm.phone||this.addressForm.selectaddress.length==0||!this.addressForm.info){
                     this.$vux.alert.show({title:'提示',content:'请完善收货信息'});
                     return;
                 }
                 let str =this.addressForm.selectaddress;
                 this.order.address = {
                    provice:str[0],
                    city:str[1],
                    county:str[2],
                    name:this.addressForm.name,
                    phone:this.addressForm.phone,
                    info:this.addressForm.info
                 }
                //  let str = value2name(this.addressForm.selectaddress,ChinaAddressV4Data);
                //  this.order.address = {
                //     provice:str.split(' ')[0],
                //     city:str.split(' ')[1],
                //     county:str.split(' ')[2],
                //     name:this.addressForm.name,
                //     phone:this.addressForm.phone,
                //     info:this.addressForm.info
                //  }
                 // 生成订单
                //  AddOrder(this.order).then(res=>{
                //      if(res.code===0){
                //         // 创建微信支付订单
                //         paycode({userid:this.$store.getters.userid,goodsid:this.goods._id,acount:this.order.Rpayment,orderid:this.order._id}).then(res=>{
                //             this.paycodeurl = res.code_url;
                //             // this.order.pay_id = res.prepay_id;
                //             this.creatorder = false;
                //             this.paycode = true;
                //             // 启动轮询,查询订单是否成功
                //             this.findorderstatus();
                //         })
                //      }else{
                //         this.$vux.alert.show({title:'提示',content:res.msg})
                //      }
                //  })
                paycode({userid:this.$store.getters.userid,goodsid:this.goods._id,acount:this.order.Rpayment,orderid:this.order._id}).then(res=>{
                    if(res.code_url){
                        this.paycodeurl = res.code_url;
                        // this.order.pay_id = res.prepay_id;
                        this.creatorder = false;
                        this.paycode = true;
                        return AddOrder(this.order)
                    }else{
                        this.$vux.alert.show({title:'提示',content:'支付调起失败'})
                    }
                }).then(ok=>{
                    if(ok){
                         // 启动轮询,查询订单是否成功
                        this.findorderstatus();
                    }else{
                        this.$vux.alert.show({title:'提示',content:'提交订单失败'})
                    }
                }).catch(err=>{
                    this.$vux.alert.show({title:'提示',content:err})
                })
                
                
            },
            tostatus(){
                this.paycode = false;
                this.payStatus = true;
            },
            myorder(){
                this.$router.push({path:'/my/order'})
            },
            findorderstatus(){
                this.timeout = setTimeout(()=>{
                    if(this.paystatus===0) {
                        console.log('请求取消订单')
                        DefaultOrder({id:this.order._id}).then(res=>{
                            if(res.status){
                                return OverOrder({id:this.order._id,goodsid:this.goods._id}) 
                            }
                        }).then(oks=>{
                            if(oks){
                                if(oks.code===0) {console.log('订单修改成功')}
                                else {console.log('订单修改失败')}
                            }
                            var self = this;
                            this.$vux.alert.show({title:'提示',content:'支付超时',onHide(){
                                self.order = {};
                                self.paycode = false;
                            }})
                        })
                    }
                    else console.log('正常取消定时器')
                    clearInterval(this.orderTimer);
                },50000)
                this.orderTimer = setInterval(() =>{                  
                    OrderStatus({id:this.order._id}).then(res => {
                        if(res.code===0){
                            if(res.result.status!==0){
                                this.paystatus = res.result.status;
                                clearInterval(this.orderTimer);
                                // 跳转支付状态
                                this.paycode = false;
                                this.payStatus = true;
                            } 
                        }
                    })
                }, 1000);
            },
            time(times){
                var end = times * 1000;
                let Timer = setInterval(()=>{
                    var date = new Date();
                    var now = date.getTime();    
                    var leftTime = end - now; //时间差   
                    if(leftTime>=0){
                        let newtime = this.$fn.countTime(leftTime);
                        this.$set(this.stime,'h',newtime.h)
                        this.$set(this.stime,'s',newtime.s)
                        this.$set(this.stime,'m',newtime.m)
                    }else{
                        clearInterval(Timer)
                        if(this.countdownStatus===1){
                            this.countdownStatus=2
                        }else if(this.countdownStatus===2){
                            this.countdownStatus=0
                            let self = this;
                            this.$vux.alert.show({title:'提示',content:'当前活动已截止',onHide (){
                                self.showgoods = false;
                                self.creatorder = false;
                            }})
                        }
                        //this.$vux.alert.show({title:'提示',content:'当前活动已截止'})
                    }
                },50)
                
            },
            closepaycode(){
                this.paycode=false;
                clearInterval(this.orderTimer);
                clearTimeout(this.timeout);
                DefaultOrder({id:this.order._id}).then(res=>{
                    if(res.status){
                        return OverOrder({id:this.order._id,goodsid:this.goods._id}) 
                    }
                }).then(oks=>{
                    if(oks){
                        if(oks.code===0) {console.log('订单修改成功')}
                        else {console.log('订单修改失败')}
                    }
                    var self = this;
                    this.$vux.alert.show({title:'提示',content:'支付失败',onHide(){
                        self.order = {};
                        self.paycode = false;
                    }})
                })
            }
        },
        watch:{
            countdownStatus(val){
                if(val==2){
                    this.time(this.goods.time.finished)
                }
            }
        }
    }
</script>