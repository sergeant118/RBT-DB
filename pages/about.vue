<template>
  <div>
    <h2>リピボ級レンタルDBとは？</h2>
    <p>リピボ級レンタルDBはリピートボール級用のレンタルパーティを収集＆表示するサイトです</p>
    <p>公開されるレンタルパーティを効率よく使用しリピートボール級参入の手助けをする目的で運用されています。</p>
    <h2>リピートボール級とは</h2>
    <p>種族統一パーティ（図鑑No統一）を使用してノーマルルールで対戦するルールです。</p>
    <p>
      毎週
      <b>火曜日、木曜日、土曜日、日曜日</b>の
      <b>22:00～24:00</b>に開催されています
    </p>
    <p>
      パスワード
      <b>「01080108」</b>でマッチングを行うことで参加することができます。
    </p>
    <p>対戦ルールは以下の画像を参照してください。</p>
    <img src="~/assets/images/rbt.jpg" :width="width-20" />
    <p>
      最新情報は「
      <a href="https://twitter.com/re_ball_tier">リピートボール級公式アカウント</a>」を参照してください。
    </p>
    <h2>収集対象</h2>
    <p>
      Twitterのハッシュタグ
      <a
        href="https://twitter.com/search?q=%23%E3%83%AA%E3%83%94%E3%83%9C%E7%B4%9A%E3%83%AC%E3%83%B3%E3%82%BF%E3%83%AB&src=typed_query"
        target="_blank"
      >#リピボ級レンタル</a>を含むツイート（引用RTも含む）に付けられたレンタルパーティの画像です。
    </p>
    <p>約30分毎にハッシュタグの付けられたツイートからレンタルパーティを自動収集します。</p>
    <h2>レンタルパーティの使い方</h2>ポケットモンスター ソード・シールド公式の「
    <a
      href="https://www.pokemon.co.jp/ex/sword_shield/howtoplay/191108_rental.html"
      target="_blank"
    >レンタルチームの使い方</a>」を参照してください。
    <h2>ご意見ご要望</h2>
    <p>
      <a href="https://twitter.com/sergeant118" target="_blank">こちら</a>まで。善処します
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      width: 0,
      height: 0
    };
  },
  methods: {
    handleResize: function() {
      if (window.innerWidth < 1280) {
        this.width = window.innerWidth;
      } else {
        this.width = 1280;
      }
      this.height = window.innerHeight;
    }
  },
  mounted: function() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy: function() {
    window.removeEventListener("resize", this.handleResize);
  }
};
</script>

<style scoped>
h2 {
  color: #6594e0;
  border-bottom: dashed 2px #6594e0;
  margin: 16px 0px 0px 0px;
}
</style>