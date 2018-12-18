<template>
    <div class="page">
        <div class="addressapge">
            <h2 class="title">我的收货地址</h2>
            <div class="info" v-if="myaddress.city">
                <p>{{myaddress.name + ','+myaddress.phone+','+ myaddress.provice + myaddress.city + myaddress.county + myaddress.info}}</p>
                <!-- 刘小姐，86-18976532189，贵州省 贵阳市 云岩区 天毅大厦12层901室 ，550001 -->
                <p>
                    <span @click="Delete">删除<i class="delete"></i></span>
                    <span @click="creataddress" class="edit btn">修改地址</span>
                </p>
            </div>
            <span v-else class="add" @click="creataddress">+</span>
        </div>
        
        <!-- 创建修改收货地址 -->
        <x-dialog v-model="editaddress" class="dialog">
            <div @click="editaddress=false">
                <span class="vux-close">x</span>
            </div>
            <div class="form">
                <h4>填写收货方式</h4>
                <p><label>姓名</label><input v-model="formData.name" type="text" name="name"></p>
                <p><label>联系电话</label><input v-model="formData.phone" type="tel" name="phone"></p>
                <p><label>收货地址</label>
                    <!-- <x-address title=""   v-model="selectaddress" :list="addressData"  placeholder="点击选择地址"   :show.sync="showAddress"></x-address> -->
                    <area-select id="address" type="text" :level="2" v-model="selectaddress" :data="pcaa"></area-select>
                </p>
                <p><label></label><input v-model="formData.info" type="text" placeholder="详细地址"></p>
                <span @click="push" class="addresspush btn">保存</span>
            </div>
        </x-dialog>
    </div>  
</template>
<script>
    import { XDialog,XAddress,ChinaAddressV4Data,Value2nameFilter as value2name, Name2valueFilter as name2value } from 'vux'
    import { modifyaddress } from '@/api/index'
    import 'vue-area-linkage/dist/index.css';
    import { pca, pcaa } from 'area-data'
    import { AreaSelect  } from 'vue-area-linkage'
    export default{
        name:'addrespage',
        data(){
            return{
                myaddress:this.$store.state.user.address,
                editaddress:false,
                selectaddress:[],
                addressData: ChinaAddressV4Data,
                showAddress: false,
                pcaa:pcaa,
                formData:{
                    name: '',
                    phone:'',
                    info:''
                }
            }
        },
        components:{XDialog,XAddress,AreaSelect},
        created() {
            if(this.$store.state.user.address.provice){
                this.formData = {
                    name: this.$store.state.user.address.name,
                    phone:this.$store.state.user.address.phone,
                    info:this.$store.state.user.address.info
                }
                let str = [this.$store.state.user.address.provice,this.$store.state.user.address.city,this.$store.state.user.address.county]
                // let str1 = name2value(str,ChinaAddressV4Data);
                // let arr = str1.split(' ');
                // this.selectaddress = arr;
                this.selectaddress = str;
            }
        },
        methods:{
            creataddress(){
                this.editaddress = true;
            },
            push(){
                // 效验收货方式输入
                if(!this.formData.name||!this.formData.phone||!this.formData.info||this.selectaddress.length===0){
                    this.$vux.alert.show({title:'提示',content:'请输入完整'})
                }
                // let str = value2name(this.selectaddress,ChinaAddressV4Data);
                // this.formData.provice = str.split(' ')[0];
                // this.formData.city = str.split(' ')[1];
                // this.formData.county = str.split(' ')[2];
                let str =this.selectaddress;
                this.formData.provice = str[0];
                this.formData.city = str[1];
                this.formData.county = str[2];
                this.$vux.loading.show({
                    text: '加载'
                })
                this.formData.id = this.$cookies.get('userid');
                modifyaddress(this.formData).then(res=>{
                    this.$vux.loading.hide()
                    if(res.code===0){
                        this.myaddress = res.result.address;
                        this.editaddress = false
                        this.$vux.alert.show({title:'提示',content:'修改成功'})
                    }else{
                        this.editaddress = false
                        this.$vux.alert.show({title:'提示',content:'修改失败'})
                    }
                })
            },
            Delete(){
                this.$vux.loading.show({text: '加载'})
                modifyaddress({id:this.$cookies.get('userid')}).then(res=>{
                    this.$vux.loading.hide()
                    var self = this;
                    if(res.code===0){
                        this.myaddress = {};
                        this.selectaddress = [];
                        this.formData = {};
                        this.$vux.alert.show({title:'提示',content:'删除成功',onHide (){
                            self.editaddress = false
                        }})
                    }else{
                        this.$vux.alert.show({title:'提示',content:'删除失败',onHide (){
                            self.editaddress = false
                        }})
                    }
                })
            }
        }
    }
</script>
<style scoped>
    #address{display: inline-block;line-height: 1 !important;margin-left: -15px}
    .addressapge{border: 1px solid #D79500;text-align: center;}
    .title{height: 0.6rem;background: rgba(215,149,0,0.10);font-size: 0.3rem;padding: 0.15rem 0.2rem;text-align: left}
    .info{display: flex;justify-content: space-between;font-size: 0.18rem;padding: 0.2rem 0.2rem}
    .info>p:nth-child(2){font-size: 0.14rem}
    .edit{margin-left: 0.2rem;height: 0.34rem;width: 0.86rem;line-height: 0.34rem;font-size: 0.14rem}
    .add{
        width: 1rem;height: 1rem;
        display: inline-block;
        border: 1px solid #ccc;
        font-size: 1rem;line-height: 0.8rem;text-align: center;
        color: #ccc;
        margin: 0.5rem 0;cursor: pointer;
    }
    .form{font-size: 0.18rem}
    .form>p{line-height: 0.6rem;cursor: pointer}
    .form>p>label{width: 15%;display: inline-block;text-align: justify;margin-right:5%;}
    .form>p>input{width: 66%;line-height: 0.4rem;outline: none;}
    .addresspush{height: 0.48rem;line-height: 0.48rem;width: 1.17rem;margin-top: 0.5rem;margin-left: 20%}
</style>