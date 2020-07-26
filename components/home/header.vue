<template>
    <div class="head-child">
        <div class="l">
            <img src="../../assets/images/logo@2x.png" />
            <span>名骏运营管理系统</span>
        </div>
        <ul class="navs">
            <li v-for="(item,index) in menus" :class="{active:index==curIndex}" @click="curIndex=index" :key="index">
                <span>{{item.name}}</span>
            </li>
        </ul>
        <div class="r">
            <div class="iconfont icon-sousuo"></div>
            <div class="iconfont icon-lingdang-xianxing">
                <span>1</span>
            </div>
            <div class="down">
                <div class="avatar">
                    <img src="../../assets/images/girl@2x.png" />
                </div>
                <div class="iconfont icon-xia1"></div>
                <ul>
                    <li @click="loginOut">退出</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            curIndex: 0,
            menus: [{
                name: '首页'
            }, {
                name: '经营分析'
            }, {
                name: '人员管理'
            }, {
                name: '现场管理'
            }, {
                name: '流程管理'
            }, {
                name: '名骏学院'
            }]
        }
    },
    methods: {
        loginOut () {
            sessionStorage.clear()
            localStorage.clear()
            this.$router.push('/login')
        }
    }
}
</script>
<style lang="less" scoped>
.head-child {
    height: 60px;
    background: #fff;
    min-width: 1300px;
    border-bottom: 1px solid #ececec;
    .l {
        float: left;
        padding: 12px 10px;
        border-right: 3px solid #eff2f7;
        width: 226px;
        img {
            width: 35px;
            height: 35px;
            float: left;
            margin-right: 10px;
        }
        span {
            font-weight: bold;
            font-size: 18px;
            float: left;
            line-height: 35px;
        }
    }
    ul.navs {
        float: left;
        overflow: hidden;
        padding: 0 30px;
        line-height: 50px;
        padding-top: 10px;
        li {
            float: left;
            padding: 0 30px;
            font-size: 18px;
            // font-weight: 510;
            color: #999;
            cursor: pointer;
            span {
                display: inline-block;
            }
            &:hover {
                color: @baseColor;
            }
            &.active {
                color: @baseColor;
                span {
                    position: relative;
                    &::before {
                        content: "";
                        position: absolute;
                        left: 10%;
                        bottom: 0;
                        height: 3px;
                        border-radius: 3px 3px 0 0;
                        width: 80%;
                        background: @baseColor;
                    }
                }
            }
        }
    }
    .r {
        float: right;
        & > div {
            float: left;
        }
        .iconfont {
            font-size: 28px;
            color: #999;
            margin-top: 15px;
            margin-right: 20px;
            cursor: pointer;
            position: relative;
            &:hover {
                color: #666;
                span {
                    color: red;
                    background: #fff;
                    border: 1px solid red;
                }
            }
            &.icon-xia1 {
                font-size: 20px;
                margin-top: 22px;
            }
            span {
                position: absolute;
                background: red;
                font-size: 10px;
                color: #fff;
                height: 14px;
                width: 14px;
                border-radius: 50%;
                text-align: center;
                line-height: 14px;
                border: 1px solid red;
                right: -2px;
                top: -2px;
            }
        }
        img {
            width: 35px;
            height: 35px;
            border-radius: 50%;
        }
        .down{
            height: 60px;
            position: relative;
            &:hover ul{
                display: block;
            }
            ul{
                position: absolute;
                z-index: 100;
                left:0;
                right:0;
                top:100%;
                background: #fff;
                line-height: 30px;
                display: none;
                text-align: center;
                font-size: 14px;
                li{
                    cursor: pointer;
                    margin: 3px 0;
                    &:hover{
                        background: #ececec;
                    }
                }
            }
            .avatar {
                margin-top: 13px;
                margin-right: 15px;
                border-left: 1px solid #ececec;
                padding-left: 20px;
                float: left;
            }
            .iconfont{
                float: left;
            }
        }
    }
}
</style>