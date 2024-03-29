<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: loginType}" @click="loginType=true">短信登录</a>
          <a href="javascript:;" :class="{on: !loginType}" @click="loginType=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{on: loginType}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone" />
              <button :disabled="!rightPhone" class="get_verification" :class="{right_phone: rightPhone}" @click.prevent="getCode">
                {{ codeValidSeconds > 0 ? `已发送(${codeValidSeconds}s)` : '获取验证码' }}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code" />
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !loginType}">
            <section>
              <section class="login_message">
                <input
                  type="tel"
                  maxlength="11"
                  placeholder="手机/邮箱/用户名"
                  v-model="name"
                />
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="密码" v-if="showPassword" v-model="password" />
                <input type="password" maxlength="8" placeholder="密码" v-else v-model="password" />
                <div class="switch_button" :class="showPassword ? 'on': 'off'" @click="showPassword=!showPassword">
                  <div class="switch_circle" :class="{right: showPassword}"></div>
                  <span class="switch_text"></span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha" />
                <img
                  class="get_verification"
                  src="http://localhost:4000/captcha"
                  alt="captcha"
                  @click="getCaptcha"
                  ref="captcha"
                />
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
    <AlertTip v-show="showAlert" :alertText="alertText" @closeTip="closeTip" />
  </section>
</template>

<script>
import AlertTip from '@/components/alert-tip/AlertTip'
import { reqPasswordLogin, reqSmsLogin, reqSendCode } from '../../api'

export default {
  data () {
    return {
      // true代表短信登录 false代表密码登录
      loginType: true,
      phone: '',
      codeValidSeconds: 0,
      showPassword: false,
      password: '',
      // 短信验证码
      code: '',
      // 用户名
      name: '',
      // 图形验证码
      captcha: '',
      alertText: '',
      // 是否显示提示框
      showAlert: false,
      intervalId: undefined
    }
  },
  computed: {
    rightPhone () {
      return /^1\d{10}$/.test(this.phone)
    }
  },
  methods: {
    async getCode () {
      // 启动倒计时
      if (this.codeValidSeconds <= 0) {
        this.codeValidSeconds = 30
        this.intervalId = setInterval(() => {
          this.codeValidSeconds--
          if (this.codeValidSeconds <= 0) {
            clearInterval(this.intervalId)
          }
        }, 1000)
        // 发送ajax请求(向指定手机号发送验证码信息)
        const result = await reqSendCode(this.phone)
        if (result.code === 1) {
          this.showAlertModal(result.msg)
          if (this.codeValidSeconds) {
            this.codeValidSeconds = 0
            clearInterval(this.intervalId)
          }
        }
      }
    },
    async login () {
      let result
      // 前台表单验证
      if (this.loginType) {
        // 短信登录
        const { rightPhone, phone, code } = this
        if (!rightPhone) {
          // 手机号不正确
          this.showAlertModal('手机号不正确')
          return
        } else if (!/^\d{6}$/.test(code)) {
          // 验证码不正确
          this.showAlertModal('验证码不正确')
          return
        } else {
          result = await reqSmsLogin(phone, code)
        }
      } else {
        // 用户名登录
        const { name, password, captcha } = this
        if (!name) {
          this.showAlertModal('必须填写用户名')
          return
        } else if (!password) {
          this.showAlertModal('必须填写用密码')
          return
        } else if (!captcha) {
          this.showAlertModal('必须填写验证码')
          return
        } else {
          result = await reqPasswordLogin(name, password, captcha)
        }
      }

      if (this.codeValidSeconds) {
        this.codeValidSeconds = 0
        clearInterval(this.intervalId)
      }

      if (result.code === 0) {
        const user = result.data
        this.$store.dispatch('recordUser', user)
        this.$router.replace('/profile')
      } else {
        this.getCaptcha()
        const msg = result.msg
        this.showAlertModal(msg)
      }
    },
    closeTip () {
      this.alertText = ''
      this.showAlert = false
    },
    showAlertModal (alertText) {
      this.alertText = alertText
      this.showAlert = true
    },
    // 获取一个新的图片验证码
    getCaptcha () {
      this.$refs.captcha.src = 'http://localhost:4000/captcha?time=' + Date.now()
    }
  },
  components: {
    AlertTip
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl';
.loginContainer
  width 100%
  height 100%
  background #fff
  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto
    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center
      .login_header_title
        padding-top 40px
        text-align center
        >a
          color #333
          font-size 14px
          padding-bottom 4px
          &:first-child
            margin-right 40px
          &.on
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774
    .login_content
      >form
        >div
          display none
          &.on
            display block
          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial
            &:focus
              border 1px solid #02a774
          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
              &.right_phone
                color: black
          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color .3s,border-color .3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              &.off
                background #fff
                .switch_text
                  float right
                  color #ddd
              &.on
                background #02a774
              >.switch_circle
                // transform translateX(27px)
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                transition transform .3s
                &.right
                  transform translateX(27px)
          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px
            >a
              color #02a774
        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0
      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999
    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px
      >.iconfont
        font-size 20px
        color #999
</style>
