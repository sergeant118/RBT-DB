<template>
  <div class="login">
    <div v-if="user.login">
      <div>
        <button class="button" type="submit" @click="remove">ログアウト</button>
        <br />
        <img :src="user.twitter_image" width="48px" />
        {{ user.twitter_name }} さんがログイン中
      </div>
    </div>
    <div v-else-if="exist_cookies" class="form" @submit.prevent></div>
    <form v-else class="form" @submit.prevent>
      <button class="button" type="submit" @click="loginTwitter">twiiterでログイン</button>
    </form>
  </div>
</template>

<script>
import firebase from "@/plugins/firebase";

export default {
  data() {
    return {
      exist_cookies: false
    };
  },
  computed: {
    user() {
      return this.$store.getters["user"];
    }
  },
  methods: {
    loginTwitter() {
      this.$store.dispatch("loginTwitter");
    },
    remove() {
      this.$store.dispatch("logout");
      this.$cookies.remove("RBR-DB_LoginToken");
      this.exist_cookies = false;
    }
  },
  created() {
    var user = this.$store.getters["user"];

    if (!user.login) {
      var cookies = this.$cookies.get("RBR-DB_LoginToken");

      if (cookies) {
        let login_data = JSON.parse(this.$cookies.get("RBR-DB_LoginToken"));
        //console.log(login_data);
        //if (login_data) {
        this.$store.dispatch("loginTwitterToken", login_data);

        this.exist_cookies = true;
      } else {
        //console.log("ログイン失敗");
      }
    } else {
      //console.log("ログイン済み");
    }
  }
};
</script>

<style scoped>
/* .button */
.button {
  box-sizing: border-box;
  border-radius: 5px;
  padding: 0.3em 0.5em;
  background-color: #3ba6fd;
  color: #ffffff;
  text-align: center;
  line-height: 1;
  font-size: 16px;
  font-weight: bold;
  box-shadow: 0 3px 0 0 #e9e9e9, 0 1px 1px 0 #e9e9e9;
  transition: background-color 100ms ease-out;
}
.button:hover {
  color: #ffffff;
  background-color: #156db6;
  cursor: pointer;
}
</style>