<template>
    <div class="login">
        <!-- <div class="loginSn" v-if="formDynamic.loginId">
            <div>请忽略</div>
            <Input type="text" style="margin: 20px 0;" prefix="ios-person-outline" v-model="loginSn" placeholder="签名" />
            <Button type="primary" long @click="goLogin">模拟登陆</Button>
        </div> -->
        <div class="form">
            <div class="logo">
                <img src="../assets/images/logo@2x.png" />
                <div>
                    名骏运营管理系统
                </div>
            </div>
            <Form ref="formDynamic" :model="formDynamic" :label-width="0" style="width: 300px" v-if="loginType==1">
                <FormItem>
                    <Input type="text" prefix="ios-person-outline" v-model="formDynamic.loginId" placeholder="工号" />
                </FormItem>
                <!-- <FormItem>
                    <Row>
                        <Col span="15">
                        <Input type="text" prefix="ios-unlock-outline" style="width:95%;margin:0" v-model="formDynamic.sjm" placeholder="验证码" />
                        </Col>
                        <Col span="9">
                        <Button type="primary" style="width:100%" @click="getToken(formDynamic.loginId)">发送随机码</Button>
                        </Col>
                    </Row>
                </FormItem> -->
                <FormItem style="margin-top:20px">
                    <Button type="primary" long @click="LoginRequest_Id(formDynamic.loginId)">{{isLogin?'正在验证...':'验证登录'}}</Button>
                    <div class="changEwm" @click="loginType=2">二维码登录</div>
                </FormItem>
            </Form>
            <div class="login-erm" v-else>
                <div class="img"></div>
                <div class="changEwm" @click="loginType=1">随机码登录</div>
            </div>
        </div>
    </div>
</template>

<script>
import config from '@/pages/multiple/utils/config'
import sessionId from '../utils/sessionid'
import { mapMutations, mapState } from "vuex";
export default {
    data () {
        let loginId;
        if(location.host.indexOf('localhost')>-1){
            loginId = 181233
        }
        return {
            loginType: 1,
            formDynamic: {
                loginId,
                psd: '',
                sjm: ''
            },
            loginSn: '',
            isLogin: false
        }
    },
    mounted () {
        let q = this.$route.query
        if (q.loginId) {
            this.LoginRequest_Id(q.loginId)
        }
    },
    methods: {
        ...mapMutations("common", ["setAppToken", "setUserInfo"]),
        goLogin () {
            this.$model.system.login_define({
                loginId: this.formDynamic.loginId,//【工号】
                loginSn: this.loginSn,//【平台唯一标识固定值】
            }).then(res => {
                res.code == 1 && this.$Message.warning('请输入工号');
            })
        },
        Oauth2 (state = '', url = '') {
            return "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa803cf6490a5d2df" +
                "&redirect_uri=" + url + //【真实业务跳转地址】
                "&str=" + Math.random().toString(36).substr(2) + //【随机字符串防止缓存，可选可不传】
                "&response_type=code" + //【固定参数】
                "&connect_redirect=1" +//【固定参数】
                "&scope=snsapi_base" + //【固定参数】
                "&state=" + state + //【自定义字符串】
                "#wechat_redirect"//【固定参数】
        },
        getToken (loginId) {
            if (loginId) {
                this.$model.system.getToken({
                    loginId,//【工号】
                    sessionId:'', //必传
                    corpId: config.corpId,//【平台唯一标识固定值】
                    isadmin: true//【调式】
                }).then(res => {
                    if (res.code == 1) {
                        setTimeout(() => {
                            this.getToken(loginId)
                        }, 2000)
                    } else if (res.code == 0 && res.data) {
                        let token = res.data
                        this.$local.appToken(token)
                        this.setAppToken(token);
                        this.$model.user.getUserInfo({ appToken: token, parametes: {a:1} }).then(res => {
                            if (res.code == 0) {
                                this.setUserInfo(res.data);
                                this.$router.push('/index')
                            }else{
                                this.$Message.error('登录失败，请联系管理员');
                            }
                        })
                    }
                })
            } else {
                this.$Message.warning('请输入工号');
            }
        },
        changeLogin () {
            // window.WwLogin({
            //     "id": "wx_reg",
            //     "appid": "",
            //     "agentid": "",
            //     "redirect_uri": location.href
            // });
        },
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        LoginRequest_Id (loginId) {
            if (loginId) {
                let param = {
                    loginId,
                    corpId: config.corpId
                }
                this.$model.system.LoginRequest_Id(param).then(res => {
                    if (res.code == 0) {
                        this.isLogin = true
                        this.$Message.success('已发送认证信息，请在手机中确认');
                        this.getToken(loginId)
                    } else {
                        this.$Message.error('认证失败，联系管理员');
                    }
                })
            } else {
                this.$Message.warning('请输入工号');
            }
        }
    }
}
</script>

<style lang="less" scoped>
.login {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    min-width: 1200px;
    min-height: 800px;
    background: #fff url(../assets/images/header-bg.png) no-repeat top center/
        100% 50%;
    .loginSn {
        position: absolute;
        left: 0;
        top: 0;
        background: #fff;
        padding: 20px;
    }
    .form {
        position: absolute;
        top: 50%;
        transform: translate3D(-50%, -50%, 0);
        left: 50%;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.3);
        box-shadow: 0 2px 2px #cecece;
        padding: 20px 30px 0;
        /deep/.ivu-form-item {
            margin-bottom: 10px;
        }
        .login-erm {
            width: 300px;
            padding: 10px 0 20px;
            height: 227px;
            .img {
                width: 140px;
                height: 140px;
                border: 1px solid red;
                margin: 0 auto 10px;
            }
        }
        .logo {
            position: absolute;
            bottom: 100%;
            left: 0;
            right: 0;
            img {
                display: block;
                margin: 0 auto;
            }
            div {
                font-size: 20px;
                padding: 10px 0 20px;
                font-weight: bold;
                color: #fff;
                text-align: center;
            }
        }
        .changEwm {
            color: #999;
            padding: 5px 0 0;
            text-align: center;
            cursor: pointer;
        }
    }
}
</style>