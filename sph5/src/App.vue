<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}

 let clientWidth = document.documentElement.clientWidth;
    if(clientWidth>800){
      document.documentElement.style.fontSize = document.documentElement.clientWidth / 19.2 + 'px';
    }else{
      document.documentElement.style.fontSize = document.documentElement.clientWidth / 3.75 + 'px';
    }
    window.onresize = function(){
      let clientWidth = document.documentElement.clientWidth;
      if(clientWidth>800){
        document.documentElement.style.fontSize = document.documentElement.clientWidth / 19.2 + 'px';
      }else{
        document.documentElement.style.fontSize = document.documentElement.clientWidth / 3.75 + 'px';
      }
    }
</script>

<style>
#app {
  font-size: 0.24rem;
  min-width: 800px;
   -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
  /* overflow: auto;  */
}
::-webkit-scrollbar { width: 0 !important }
.vux-alert .weui-dialog,.vux-confirm .weui-dialog{
  width: 30% !important;
  text-align: center !important;
}
.vux-alert .weui-dialog__hd,.vux-confirm .weui-dialog__hd{padding: 0 !important;}
.dialog .weui-dialog{
  padding:0.45rem 0.35rem; max-width: 80vw !important;
  width: 60% !important;
}
.vux-close{display: block;text-align: right;font-size: 0.24rem;position: absolute;top:0;right: 0.35rem;cursor: pointer}
.weui-dialog {
    text-align: left !important;
    z-index: 1001 !important;
}
.vux-popup-dialog{z-index: 1002 !important}
.vux-cell-box{display: inline-block}

.btn{
  display: inline-block;background: #E74D3D;border-radius: 0.08rem;width: 1.73rem;height: 0.58rem;line-height: 0.58rem;text-align: center;color: #fff;
}
i.delete{
    content: url('../static/image/shanchu.png');
    height: 0.12rem;
    width: 0.12rem;
    margin-left: 0.05rem;
}
.weui-toast{font-size: 0.2rem}
.weui-mask_transparent{background: rgba(0, 0, 0, 0.5)}
*{cursor: pointer}
</style>
