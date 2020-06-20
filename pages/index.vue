<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">リピボ級レンタルDB</h1>
      <h2 class="subtitle">レンタルパーティで充実したリピボ級ライフを</h2>
      <n-link to="rental" class="button--grey">レンタルパーティを見る</n-link>
      <a href="https://github.com/sergeant118/RBT-DB" class="button--grey" target="_blank">Github</a>
    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";

export default {
  components: {
    Logo
  },
  data() {
    return {
      article01: this.$cookies.get("RBR-DB_LoginToken")
    };
  },
  computed: {
    article() {
      let post;
      if (this.article01) {
        post = JSON.parse(this.article01);
      }
      return post;
    }
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 80px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
