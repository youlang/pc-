<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>

export default {
    name: 'app',
    components: {
    },
    methods:{
        gohref () {
            location.href = '/transfer/#/home'
        }
    }
}
</script>

<style>
@import url('./assets/style/comm.css');
</style>
