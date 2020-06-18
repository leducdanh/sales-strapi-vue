<template>
  <section id="form">
    <!--form-->
    <div class="container">
      <div class="row">
        <div class="col-sm-4 col-sm-offset-1">
          <div class="login-form">
            <!--login form-->
            <h2>Login to your account</h2>
            <form>
              <input type="email" v-model="login.email" placeholder="Email" required />
              <input type="password" v-model="login.password" placeholder="Mật khẩu" required />
              <span>
                <input type="checkbox" v-model="login.checkbox" class="checkbox" />
                Keep me signed in
              </span>
              <button class="btn btn-default" @click="fnLogin()">Login</button>
            </form>
          </div>
          <!--/login form-->
        </div>
        <div class="col-sm-1">
          <h2 class="or">OR</h2>
        </div>
        <div class="col-sm-4">
          <div class="signup-form">
            <!--sign up form-->
            <h2>New User Signup!</h2>
            <form action="#">
              <input type="text" v-model="signup.username" placeholder="Tên đăng nhập" required />
              <input type="email" v-model="signup.email" placeholder="Email" required />
              <input type="text" v-model="signup.fullName" placeholder="Tên đầy đủ" required />
              <input type="text" v-model="signup.address" placeholder="Địa chỉ" required />
              <input
                type="number"
                v-model="signup.phoneNumber"
                placeholder="Số điện thoại"
                required
              />
              <input type="password" v-model="signup.password" placeholder="Mật khẩu" required />
              <input
                type="password"
                v-model="signup.passwordConfirm"
                placeholder="Nhập lại mật khẩu"
                required
              />
              <button class="btn btn-default" @click="Signup()">Signup</button>
            </form>
          </div>
          <!--/sign up form-->
        </div>
      </div>
    </div>
  </section>
  <!--/form-->
</template>

<script>
// @ is an alias to /src
import poco from "../../contact/domain.js";
import axios from "axios";
import base64 from "base-64";
import swal from "sweetalert";

export default {
  name: "Login",
  components: {},
  data() {
    return {
      login: {
        checkbox: false,
        email: "",
        password: ""
      },
      signup: {
        username: "",
        email: "",
        fullName: "",
        address: "",
        phoneNumber: "",
        password: "",
        passwordConfirm: ""
      }
    };
  },
  methods: {
    fnLogin() {
      if (this.login.password.trim() == "" || this.login.email.trim() == "")
        return;
      axios
        .post(`${poco.domain}/auth/local`, {
          identifier: this.login.email,
          password: this.login.password
        })
        .then(res => {
          localStorage.setItem("jwt", res.data.jwt);
          localStorage.setItem("email", base64.encode(res.data.user.email));
          localStorage.setItem("full_name", res.data.user.full_name);
          localStorage.setItem("username", base64.encode(res.data.user.username));
          localStorage.setItem(
            "phone_number",
            base64.encode(res.data.user.phone_number)
          );
          localStorage.setItem("Address", res.data.user.Address);
          this.$router.push("/");
        })
        .catch(err => {
          if (err.response && err.response.status == 400)
            swal("", "Email hoặc mật khẩu không đúng", "error");
        });
    },
    Signup() {
      if (
        this.signup.username.trim() == "" ||
        this.signup.email.trim() == "" ||
        this.signup.fullName.trim() == "" ||
        this.signup.address.trim() == "" ||
        this.signup.phoneNumber.trim() == "" ||
        this.signup.password.trim() == "" ||
        this.signup.passwordConfirm.trim() == ""
      )
        return;

      axios
        .post(`${poco.domain}/auth/local/register`, {
          username: this.signup.username.trim(),
          email: this.signup.email.trim(),
          password: this.signup.password.trim(),
          full_name: this.signup.fullName.trim(),
          Address: this.signup.address.trim(),
          phone_number: this.signup.phoneNumber.trim()
        })
        .then(res => {
          localStorage.setItem("jwt", res.data.jwt);
          localStorage.setItem("email", base64.encode(res.data.user.email));
          localStorage.setItem("username", base64.encode(res.data.user.username));
          localStorage.setItem("full_name", res.data.user.full_name);
          localStorage.setItem(
            "phone_number",
            base64.encode(res.data.user.phone_number)
          );
          localStorage.setItem("Address", res.data.user.Address);
          this.$router.push("/");
        })
        .catch(err => {
          if (err.response &&JSON.stringify(err.response).search('Auth.form.error.email.taken') >= 0)
            swal("", "Email đã tồn tại", "error");
          else if (err.response &&JSON.stringify(err.response).search('Auth.form.error.username.taken') >= 0)
            swal("", "Tên đăng nhập đã tồn tại", "error");
        });
    }
  }
};
</script>

