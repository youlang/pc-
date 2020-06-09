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
.home {
    position: relative;
    padding: 65px 0 0 225px;
    overflow: hidden;
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
        top: 65px;
        bottom: 0;
        width: 225px;
        background: #fff;
        z-index: 2;
        overflow: auto;
    }
}
</style>