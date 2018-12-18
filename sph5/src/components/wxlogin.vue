<template>
  <div class="main">
    <wxlogin :appid="appid" :scope="scope" :redirect_uri="redirect_uri"></wxlogin>
  </div>
    
</template>

<script>
import wxlogin from 'vue-wxlogin';
export default {
  name: 'wxlogin',
  data () {
    return {
      appid:'wx647e6490cf042c52',
      scope:'snsapi_login',
      redirect_uri:'https%3A%2F%2Fpassport.yhd.com%2Fwechat%2Fcallback.do'
    }
  },
  components:{
    wxlogin
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main{background: red;height: 100vh;width: 100%}
</style>
