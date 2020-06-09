<template>
    <div class="silder">
        <ul>
            <li v-for="(item,index) in menus" :key="index" :class="{active: index==curIndex}" @click="curIndex=index">
                <img :src="require(`../../assets/images/${item.icon||'items@2x.png'}`)" />
                <span>{{item.name}}</span>
            </li>
        </ul>
    </div>
</template>
<script>

export default {
    data () {
        return {
            curIndex: 0,
            menus: [{
                name: '组织框架',
                icon:'items@2x.png'
            }, {
                name: '人事招聘',
                icon:'rszp@2x.png'
            }, {
                name: '人员薪资',
                icon:'items@2x.png'
            }, {
                name: '员工入职',
                icon:'idcard@2x.png'
            }, {
                name: '绩效提成',
                icon:'jxtc@2x.png'
            }, {
                name: '考勤管理',
                icon:'rili@2x.png'
            }, {
                name: '员工关怀',
                icon:'worker@2x.png'
            }, {
                name: '员工肖像',
                icon:'person@2x.png'
            }]
        }
    }
}
</script>
<style lang="less" scoped>
.silder {
    ul {
        padding: 20px 0;
        color: #999;
        li {
            line-height: 46px;
            height: 45px;
            overflow: hidden;
            padding-left: 36px;
            cursor: pointer;
            font-size: 0;
            &.active,
            &:hover {
                background: #f0f3f7;
                color: @baseColor;
            }
            span {
                font-size: 16px;
                float: left;
            }
            img {
                float: left;
                width: 20px;
                height: 20px;
                margin: 11px 10px 0;
            }
        }
    }
}
</style>