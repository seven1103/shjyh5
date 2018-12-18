<template>
    <div class="main">
        <qrcode value="Hello, World!" :options="{ size: 200 }"></qrcode>
    </div>
</template>
<script>
    import VueQrcode from '@xkeshi/vue-qrcode';
    export default{
        name: 'paycode',
        data(){
            return {
                codeurl:''
            }
        },
        components:{
            VueQrcode
        }
    }
</script>