<template>
    <div class="home">
        <div class="head">
            <headers></headers>
        </div>
        <div class="silder">
            <silder></silder>
        </div>
        <div class="content">
            <router-view />
        </div>
    </div>
</template>
<script>
import headers from '../components/home/header'
import silder from '../components/home/silder'
export default {
    components: {
        headers,
        silder
    },
    data () {
        return {

        }
    }
}
</script>
<style lang="less" scoped>
@import url('../assets/style/comm.less');
.home {
    position: relative;
    .head {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        height: 60px;
        z-index: 2;
    }
    .silder {
        position: fixed;
        left: 0;
        top: 64px;
        bottom: 0;
        width: 224px;
        background: #fff;
        z-index: 2;
        overflow: auto;
    }
    .content{
        overflow: auto;
        position: fixed;
        left: 226px;
        top: 64px;
        bottom: 0;
        right:0;
        min-width: 1000px;
    }
}
</style>