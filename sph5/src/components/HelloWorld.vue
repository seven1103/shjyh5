<template>
  <div class="main">
    qw2qwe1231231
    <wxlogin :appid="appid" :scope="scope" :redirect_uri="redirect_uri"></wxlogin>
  </div>
    
</template>

<script>
import wxlogin from 'vue-wxlogin';
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      appid:'wxbdc5610cc59c1631',
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
