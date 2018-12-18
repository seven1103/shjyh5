<template>
    <div>
        <div class="layout">
            <mynavbar></mynavbar>
            <section class="app-main">
                <transition name="fade-transform" mode="out-in">
                    <!-- <keep-alive :include="cachedViews"> -->
                    <router-view />
                    <!-- </keep-alive> -->
                </transition>
            </section>
        </div>
        <footers></footers>
    </div>
    
    
</template>
<script>
    import Mynavbar from '@/components/Mynavbar'
    import Footers from '@/components/footer'
    export default {
        name: 'MyMain',
        components:{Mynavbar,Footers}
    }
</script>
<style>
    .layout{display: flex}
    .app-main{height: 100vh;width: calc(100% - 1.86rem);padding:1rem 0.3rem;box-sizing: border-box }
</style>