<template>
  <div class="login">
    <div class="login-left">
      <img src="./img/imgs_register.png" alt="免费注册">
    </div>
    <div class="login-right">
      <div class="login-right-top">
        <div class="login-right-top-left"></div>
        <div class="login-right-top-min" style="z-index: 12;" @click="minWindow"><i class="el-icon-minus" style="font-size:18px;font-weight:600;"></i></div>
        <div class="login-right-top-close" style="z-index: 12;" @click="closewindow"><i class="el-icon-close" style="font-size:18px;font-weight:600;"></i></div>
      </div>
      <div class="login-right-down" :style="{'margin-top': this.$i18n.locale === 'zh' ? '75px': '45px'}" v-if="pageMark == 'login'">
        <p class="title">{{ $t('login.loginTitle') }}</p>
        <p class="intro">{{ $t('login.loginIntroduce') }}</p>
        <div class="login-form">
          <el-input :placeholder="$t('login.userNameWord')" class="user-code" v-model="userCode"></el-input>
          <el-input :placeholder="$t('login.userPasswordWord')" class="user-password" type="password" v-model="userPassword" autocomplete="off"></el-input>
          <p class="tips">{{ $t('login.noUser') }}<span id="look-help" @click="registerPage">{{ $t('login.nowRegister') }}</span><span :style="{'margin-left': this.$i18n.locale === 'zh' ? '183px': '59px'}">{{ $t('login.forgetPassword') }}</span> </p>
          <el-button class="user-login-button" type="primary" @click="login" :loading="loadingStatus">{{ $t('login.loginword') }}</el-button>
        </div>
      </div>
      <div class="login-right-down" :style="{'margin-top': this.$i18n.locale === 'zh' ? '75px': '45px'}" v-else-if="pageMark == 'register'">
        <p class="title" style="text-align: center;">{{ $t('register.title') }}</p>
        <p class="intro" style="width: 100%;text-align: center;">{{ $t('register.haveAccount') }}<span id="look-help" @click="loginPage">{{ $t('register.loginword') }}</span></p>
        <div class="login-form">
          <el-input :placeholder="$t('register.userNameWord')" ref="userNameRegRef" class="user-code-register" v-model="userNameReg" @blur="showUserNameTips = false" @focus="showUserNameTips = true"></el-input>
          <p class="tips" :style="{'margin-bottom': '0px', 'line-height': this.$i18n.locale === 'zh' ? '3px': '18px'}" v-show="showUserNameTips">{{ $t('register.userNameTip') }}</p>
          <el-input :placeholder="$t('register.registerWord')" ref="userCodeRegRef" class="user-code-register" v-model="userCodeReg" style="margin-top: 15px;" @blur="showUserCodeTips = false" @focus="showUserCodeTips = true" @input="restrictInput"></el-input>
          <p class="tips" :style="{'margin-bottom': '0px', 'line-height': this.$i18n.locale === 'zh' ? '3px': '18px'}" v-show="showUserCodeTips">{{ $t('register.userCodeTip') }}</p>
          <el-input :placeholder="$t('register.passwordWord')" class="user-password-register" type="password" v-model="userPasswordReg" autocomplete="off" style="margin-top: 15px;"></el-input>
          <el-input :placeholder="$t('register.confirmPasswordWord')" ref="userPasswordAgainRef" class="user-password-register" type="password" v-model="userPasswordAgain" autocomplete="off" style="margin-top: 15px;"></el-input>
          <el-button class="user-login-button" type="primary" @click="registerUser" :loading="registerStatus" style="margin-top: 15px;">{{ $t('register.register') }}</el-button>
        </div>
      </div>
      <div class="login-right-down" v-else>
      </div>
    </div>
    <transition name="fade">
      <div class="zz-spin" v-show="!javaAppStarted">
        <div id="loader" class="loadloding">
          <div></div>
        </div>
        <div id="lodtext">
          {{ $t('login.xitongqidong') }}...&nbsp;{{ $t('login.qingshaohou') }}...
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import HttpUtil from '@/utils/HttpUtil'
import axios from 'axios';
const remote = require('electron').remote
export default {
  name: "Login",
  components: {},
  props: {},
  data() {
    return {
      userCode: '',
      userPassword: '',
      loadingStatus: false,
      pageMark: 'login',
      showUserNameTips: false,
      showUserCodeTips: false,
      userNameReg: '',
      userCodeReg: '',
      userPasswordReg: '',
      userPasswordAgain: '',
      registerStatus: false,
      regex: /^[a-zA-Z0-9_]*$/,
      javaAppStarted: false,
      javaAppUrl: process.env.VUE_APP_BASE_URL + '/status/check',
      maxRetries: 30,
      retryInterval: 1000
    };
  },
  watch: {},
  computed: {},
  methods: {
    registerUser() {
      this.registerStatus = true;
      // 判断非空项
      if(this.userNameReg == '') {
        this.$refs.userNameRegRef.focus();
        this.$message.error(this.$i18n.locale === 'zh' ?'姓名不可为空，请输入！':'Name cannot be empty. Please enter!')
        this.registerStatus = false;
        return false;
      }
      if(this.userCodeReg == '') {
        this.$refs.userCodeRegRef.focus();
        this.$message.error(this.$i18n.locale === 'zh' ?'注册账号不可为空，请输入！':'Registration account cannot be empty. Please enter!')
        this.registerStatus = false;
        return false;
      }
      if(this.userPasswordReg == '') {
        this.$refs.userPasswordAgainRef.focus();
        this.$message.error(this.$i18n.locale === 'zh' ?'密码不可为空，请输入！':'Password cannot be empty. Please enter!')
        this.registerStatus = false;
        return false;
      }
      if(this.userPasswordReg !== this.userPasswordAgain) {
        this.$refs.userPasswordAgainRef.focus();
        this.$message.error(this.$i18n.locale === 'zh' ?'密码输入不一致，请重新输入！':'Password input is inconsistent. Please enter again!')
        this.registerStatus = false;
        return false;
      }
      const param = {
        userName: this.userNameReg,
        userCode: this.userCodeReg,
        userPassword: this.userPasswordReg
      }
      HttpUtil.post('/userInfo/save', param).then((res)=> {
        if(res.data == 1) {
          // 注册成功，跳转登录页面进行登录
          this.$notify({
            title: this.$i18n.locale === 'zh' ?'注册成功！':'Registration successful!',
            message: this.$i18n.locale === 'zh' ?'请输入账号密码进行登录！':'Please enter your account and password to log in!',
            type: 'success',
            duration: 2000
          });
          this.pageMark = 'login';
        } else {
          console.log(res)
          // 注册失败，请重试
          if(res.code  == '0001') {
            this.$refs.userCodeRegRef.focus();
            this.$message.error(this.$i18n.locale === 'zh' ?'注册失败！':'Registration failed!' + this.userCodeReg + res.message)
          } else {
            this.$message.error(this.$i18n.locale === 'zh' ?'注册失败！':'Registration failed!'+ res.message)
          }
        }
        this.registerStatus = false;
      }).catch((err)=> {
        // 注册失败，请重试
        this.$message.error(this.$i18n.locale === 'zh' ?'注册失败！':'Registration failed!' + err)
        this.registerStatus = false;
      });
    },
    loginPage() {
      this.pageMark = 'login';
    },
    registerPage() {
      this.userNameReg = '';
      this.userCodeReg = '';
      this.userPasswordReg = '';
      this.userPasswordAgain = '';
      this.pageMark = 'register';
    },
    login() {
      this.loadingStatus = true;
      // 将账号密码传递后台，判断密码是否正确
      const param = {
        userCode: this.userCode,
        userPassword: this.userPassword
      }
      HttpUtil.post('/login/login', param).then((res)=> {
        if(res.data) {
          remote.getGlobal('sharedObject').userInfo = res.data;
          setTimeout(() => {
            this.loadingStatus = false;
            // 跳转主页
            this.$nextTick(() => {
              this.$router.replace({
                path: '/homePage/welcomPage'
              });
            });
          }, 2000);
        } else {
          this.$message.error(this.$i18n.locale === 'zh'?res.message:res.message.indexOf('未查询到账户信息')>-1? 'No account information found!': 'Incorrect password!')
          this.loadingStatus = false;
        }
      }).catch((err)=> {
        this.$message.error(err)
        this.loadingStatus = false;
      });
    },
    closewindow() {
      ipcRenderer.send('close-window')
    },
    minWindow() {
      ipcRenderer.send('min-window')
    },
    restrictInput() {
      // 匹配只包含数字、字母和下划线的正则表达式
      if (!this.regex.test(this.userCodeReg)) {
        // 如果输入的值不符合要求，移除非法字符
        this.userCodeReg = this.userCodeReg.replace(/[^a-zA-Z0-9_]/g, '');
        this.$message.error(this.$i18n.locale === 'zh'?'登录账户只能设置为数字，字母及下划线！':'Login account can only be set as numbers, letters, and underscores!')
      }
    },
    setLocate() {
      // 查询配置
      HttpUtil.get('/cssConfig/getConfig').then((res)=> {
        this.$i18n.locale = res.data.languageSet&&res.data.languageSet==='1'?'en': 'zh'
      })
    },
    checkJavaAppStatus(retries = 0) {
      axios.get(this.javaAppUrl).then((response) => {
        console.log(response)
        if (response.data === 'OK') {
          this.setLocate()
          this.javaAppStarted = true;
          this.$message.success(this.$i18n.locale === 'zh'?'已启动！':'Started!')
          // 给主进程发消息，启动PLC连接
          ipcRenderer.send('conPLC');
        } else {
          if (retries < this.maxRetries) {
            setTimeout(() => this.checkJavaAppStatus(retries + 1), this.retryInterval);
          } else {
            console.error(this.$i18n.locale === 'zh'?'Java应用程序启动超时':'Java application startup timeout');
          }
        }
      }).catch((error) => {
        if (retries < this.maxRetries) {
          setTimeout(() => this.checkJavaAppStatus(retries + 1), this.retryInterval);
        } else {
          console.error(this.$i18n.locale === 'zh'?'检查Java应用程序状态时发生错误':'Error occurred while checking Java application status', error);
        }
      });
    }
  },
  created() {
    // ipcRenderer.send('logStatus','logout');
  },
  mounted() {
    if(!this.javaAppStarted) {
      this.checkJavaAppStatus();
    }
  }
};
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  &-left {
    pointer-events: none;
    -webkit-app-region: drag;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FBFCFD;
    img {
      width: 690px;
      height: 546px;
    }
  }
  &-right {
    width: calc(100% - 690px);
    height: 100%;
    padding-left: 28px;
    &-top {
      height:45px;
      width:100%;
      display:flex;
      &-left {
        flex:1;
        height: 100%;
        -webkit-app-region: drag;
        line-height: 45px;
        text-align: left;
        padding-left: 10px;
        font-size: 13px;
        font-weight: 600;
      }
      &-min,&-close,&-max {
        height:100%;
        width:50px;
        display: flex;
        justify-content: center;
        align-items: center;
        -webkit-app-region: no-drag;
      }
      &-min:hover,&-max:hover {
        background-color: #EEEEEE;
      }
      &-close:hover {
        background-color: #F8635F;
        color: #fff;
      }
    }
    &-down {
      width: 100%;
      margin-top: 75px;
      .title {
        font-weight: 400;
        font-size: 32px;
        line-height: 30px;
        color: #262626;
      }
      .intro {
        width: 332px;
        font-weight: 400;
        font-size: 12px;
        line-height: 18px;
        color: #8c8c8c;
        margin-top: -15px;
        span {
          color: #4385ff;
          cursor: pointer;
        }
      }
      .login-form {
        padding: 20px 30px 20px 0px;
        ::v-deep .user-code{
          .el-input__inner {
            height:45px;
            margin-bottom:30px;
            font-size:14px !important;
            color: #000;
          }
        }
        ::v-deep .user-password{
          .el-input__inner {
            height:45px;
            font-size:14px !important;
            color: #000;
            margin-bottom: 2px;
          }
        }
        .user-login-button {
          height: 43px;
          border-radius: 2px;
          font-size: 16px;
          width: 100%;
        }
        .tips {
          font-weight: 400;
          font-size: 12px;
          line-height: 18px;
          color: #8c8c8c;
          margin-bottom: 36px;
          span {
            color: #4385ff;
            cursor: pointer;
          }
        }
      }
    }
  }
  .loadloding {
    position: fixed;
    top: 45%;
    left: 50%;
    margin-top: -25px;
    margin-left: -25px;
    width: 50px;
    height: 50px;
    display: block;
    color: #1890ff;
    z-index: 11;
  }
  .loadloding > div {
    display: inline-block;
    float: none;
    background-color: currentColor;
    border: 0 solid currentColor;
  }
  #lodtext {
    font-size: 18px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: 40px;
    margin-left: -100px;
    width: 220px;
    height: 30px;
    z-index: 11;
    font-weight: 600;
  }
  .loadloding > div {
    width: 100%;
    height: 100%;
    border-radius: 0;
    animation: square-spin 3s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
  }
  @keyframes square-spin {
    0% {
      transform: perspective(100px) rotateX(0) rotateY(0);
    }
    25% {
      transform: perspective(100px) rotateX(180deg) rotateY(0);
    }
    50% {
      transform: perspective(100px) rotateX(180deg) rotateY(180deg);
    }
    75% {
      transform: perspective(100px) rotateX(0) rotateY(180deg);
    }
    100% {
      transform: perspective(100px) rotateX(0) rotateY(360deg);
    }
  }
  .zz-spin {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 4;
    width: 100%;
    height: 100%;
    opacity: 1;
    pointer-events: auto;
    background: #fff;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
}
</style>