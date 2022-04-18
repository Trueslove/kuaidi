<template>
  <div class="login">
    <div class="loginBox">
      <h2 class="loginH2"><strong>快递小管家</strong> 后台管理系统</h2>
      <div class="loginCon">
        <div class="titleDiv">
          <h3>Sign up now</h3>
          <p>Enter your name and password to log on:</p>
          <i class="el-icon-key"></i>
        </div>
        <el-form ref="loginForm" :rules="rules" :model="ruleForm">
          <el-form-item prop="username">
            <el-input
              style="width:100%"
              placeholder="请输入账号"
              prefix-icon="el-icon-user"
              v-model="ruleForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              style="width:100%"
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
              v-model="ruleForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <div class="code-wap">
            <el-form-item prop="code">
              <el-input
                placeholder="请输入验证码"
                maxlength="6"
                v-model="ruleForm.code"
              ></el-input>
            </el-form-item>
            <img
              style="height: 50px; margin-left: 10px"
              :src="codeImg"
              alt=""
              @click="handleSendCode"
            />
          </div>

          <div class="login-btn-wap">
            <el-button
              type="primary"
              class="loginBtn"
              @click="loginYz('loginForm')"
              >立即登录</el-button
            >
            <!-- <el-button type="danger" class="loginBtn" @click="handleToPage"
              >去注册</el-button
            > -->
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { loginInApi, getValidateCodeApi } from "@s/api";
// import SlideVerify from "@c/SlideVerify";
export default {
  data() {
    return {
      text: "向右滑动",
      codeImg: "",
      ruleForm: {
        username: "",
        password: "",
        code: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.handleSendCode();
  },
  methods: {
    handleSendCode() {
      axios
        .get("/freightsystem/basic/validateCode/getValidateCode", {
          responseType: "blob",
        })
        .then((res) => {
          this.codeImg = window.URL.createObjectURL(res.data);
        })
        .catch((err) => {});
    },
    refresh() {
      this.$refs.slideDiv.reset();
    },
    loginYz(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this._login();
        } else {
          return;
        }
      });
    },
    handleToPage() {
      this.$router
        .push({
          path: "/register",
        })
        .catch((err) => {
          console.log(err);
        });
    },
    _login() {
      loginInApi({ time: Date.parse(new Date()), ...this.ruleForm }).then(
        (res) => {
          // 去除提示信息
          if (res) {
            this.$message({
              offset: "300",
              type: "success",
              message: "登录成功！",
            });
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            this.$store.dispatch("user/setToken", res.data.token);
            this.$store.dispatch("user/setName", this.ruleForm.username);
            this.$router.push({ path: "/home" });
          } else {
            this.$message({
              offset: "300",
              type: "warning",
              message: "账号或密码错误！",
            });
          }
        }
      );
    },
  },
};
</script>
<style scoped lang="scss">
.code-wap {
  width: 400px;
  display: flex;
}
.login-btn-wap {
  display: flex;
}
.auth_text {
  width: 200px;
  text-align: center;
  line-height: 50px;
}
.login {
  height: 100%;
  width: 100%;
  background: url(../../assets/pageBg/loginBg.jpg) no-repeat center center;
  background-size: 100% 100%;
  overflow: hidden;
}
.loginBox {
  height: 455px;
  width: 550px;
  margin: 0 auto;
  position: relative;
  top: 50%;
  margin-top: -287px;
}
.loginH2 {
  font-size: 38px;
  color: #fff;
  text-align: center;
}
.loginCon {
  margin-top: 30px;
  background: #eee;
  border-radius: 4px;
  .titleDiv {
    padding: 0 28px;
    background: #fff;
    position: relative;
    height: 120px;
    border-radius: 4px 4px 0 0;
    h3 {
      font-size: 22px;
      color: #555;
      font-weight: initial;
      padding-top: 23px;
    }
    p {
      font-size: 16px;
      color: #888;
      padding-top: 12px;
    }
    i {
      font-size: 65px;
      color: #ddd;
      position: absolute;
      right: 27px;
      top: 29px;
    }
  }
  .el-form {
    padding: 25px 25px 30px 25px;
    background: #eee;
    border-radius: 0 0 4px 4px;
  }
}
.loginBtn {
  width: 100%;
}
.slideShadow {
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
}
.slideSty {
  position: absolute;
  width: 380px;
  height: 311px;
  background: #e8e8e8;
  border: 1px solid #dcdcdc;
  left: 50%;
  top: 50%;
  margin-left: -188px;
  margin-top: -176px;
  z-index: 99;
  border-radius: 5px;
}
.iconBtn {
  padding: 9px 0 0 19px;
  color: #5f5f5f;
  border-top: 1px solid #d8d8d8;
  margin-top: 17px;
  i {
    font-size: 22px;
    cursor: pointer;
  }
  i:last-child {
    margin-left: 7px;
  }
}
</style>
<style>
.slideSty .slide-verify {
  margin: 13px auto 0 auto;
  width: 350px !important;
}
.slideSty .slide-verify-slider {
  width: 100% !important;
}
.slideSty .slide-verify-refresh-icon {
  display: none;
}
</style>
