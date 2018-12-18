<template>
    <div class="sbutton">
        {{Stitle}}
    </div>
</template>
<script>
    export default{
        name:"SButton",
        props:["Stitle"]
    }
</script>
<style scoped>
    .sbutton{
        width: 100%;
        background: #6BB114;
        height: 0.5rem;
        border-top-left-radius: 0.3rem;
        border-top-right-radius: 0.3rem;
        position: fixed;
        bottom: 0;
        font-size: 0.18rem;
        text-align: center;
        color: #ffffff;
        line-height: 0.5rem;
    }
</style>