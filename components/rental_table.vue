<template>
  <div :class="select_border(window_width,isMyTeam)">
    <span :class="select_border_title(isMyTeam)">{{pokemon_name}}統一</span>

    <p v-if="check_size(window_width)">
      <img src="~/assets/images/rental_loading.jpg" v-if="isLoading" />
      <img @load="loaded" :src="image_url" />
    </p>

    <p v-else>
      <img src="~/assets/images/rental_loading.jpg" :width="window_width-20-66" v-if="isLoading" />
      <img @load="loaded" :src="image_url" :width="window_width-20-66" />
    </p>

    <p>
      <span v-if="isAvailable" class="Available-true">公開中</span>
      <span v-else class="Available-false">公開終了</span>

      <a :href="tweet_url" class="source-tweet-border" target="_blank">元ツイート</a>

      <span v-if="isAvailable">
        <button
          v-if="isMyTeam"
          class="end-publication-mine-border"
          type="submit"
          @click="end_publication(media_id)"
        >公開を終了する</button>
        <a v-else :href="tweet_button_url" class="end-publication-border" target="_blank">公開の終了を報告する</a>
      </span>

      <span v-else>
        <button
          v-if="isMyTeam"
          class="end-publication-mine-border"
          type="submit"
          @click="re_publication(media_id)"
        >元に戻す</button>
      </span>
    </p>

    <p>投稿日：{{date}}</p>
  </div>
</template>

<script>
import firebase from "@/plugins/firebase";

export default {
  props: [
    "media_id",
    "tweet_url",
    "image_url",
    "window_width",
    "date",
    "pokemon_name",
    "tweet_button_url",
    "Available",
    "isMyTeam"
  ],
  data() {
    return {
      isLoading: true,
      isAvailable: false
    };
  },
  created() {
    if (this.Available) this.isAvailable = true;
    else this.isAvailable = false;
  },
  methods: {
    loaded() {
      this.isLoading = !this.isLoading;
    }
  },
  computed: {
    select_border: function() {
      return function(window_width, isMyTeam) {
        //ログインしてなかったら汎用
        var user = this.$store.getters["user"];
        if (user) {
          if (!user.login) {
            if (window_width > 1286) return "box_big";
            else return "box_small";
          }
        } else {
          if (window_width > 1286) return "box_big";
          else return "box_small";
        }

        if (window_width > 1286) {
          if (isMyTeam) return "box_big_mine";
          else return "box_big";
        } else {
          if (isMyTeam) return "box_small_mine";
          else return "box_small";
        }
      };
    },
    select_border_title: function() {
      return function(isMyTeam) {
        //ログインしてなかったら汎用
        var user = this.$store.getters["user"];
        if (user) {
          if (!user.login) return "box-title";
        } else {
          return "box-title";
        }

        if (isMyTeam) return "box-title_mine";
        else return "box-title";
      };
    },
    check_size: function() {
      return function(window_width) {
        if (window_width > 1286) return true;
        else return false;
      };
    },
    end_publication: function() {
      return function(media_id) {
        //console.log("end_publication: " + media_id);

        firebase
          .database()
          .ref("RentalTeams/" + media_id)
          .update({
            Available: false
          });

        this.isAvailable = false;
      };
    },
    re_publication: function() {
      return function(media_id) {
        //console.log("end_publication: " + media_id);

        firebase
          .database()
          .ref("RentalTeams/" + media_id)
          .update({
            Available: true
          });

        this.isAvailable = true;
      };
    }
  }
};
</script>

<style>
.box_small {
  position: relative;
  margin: 2em 20px;
  padding: 10px 10px;
  border: solid 3px #62c1ce;
}
.box_big {
  width: 1233px;
  position: relative;
  margin: 2em 20px;
  padding: 10px 10px;
  border: solid 3px #62c1ce;
}
.box_small_mine {
  position: relative;
  margin: 2em 20px;
  padding: 10px 10px;
  border: solid 3px #ce7262;
}
.box_big_mine {
  width: 1233px;
  position: relative;
  margin: 2em 20px;
  padding: 10px 10px;
  border: solid 3px #ce7262;
}
.box-title {
  position: absolute;
  display: inline-block;
  top: -27px;
  left: -3px;
  padding: 0 9px;
  height: 25px;
  line-height: 25px;
  font-size: 17px;
  background: #62c1ce;
  color: #ffffff;
  font-weight: bold;
  border-radius: 5px 5px 0 0;
}
.box-title_mine {
  position: absolute;
  display: inline-block;
  top: -27px;
  left: -3px;
  padding: 0 9px;
  height: 25px;
  line-height: 25px;
  font-size: 17px;
  background: #ce7262;
  color: #ffffff;
  font-weight: bold;
  border-radius: 5px 5px 0 0;
}
p {
  margin: 0;
  padding: 0;
}

a {
  color: #3f42f7;
  transition: color 0.3s;
  text-decoration: none;
}

a:hover {
  color: #ff9822;
}

.source-tweet-border {
  display: inline-block;
  max-width: 180px;
  text-align: left;
  border: 2px solid #4d4bc3;
  font-size: 16px;
  color: #4d4bc3;
  text-decoration: none;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 4px;
  transition: 0.4s;
}

.source-tweet-border:hover {
  background-color: #4d4bc3;
  border-color: #706fce;
  color: #fff;
}

.end-publication-border {
  display: inline-block;
  max-width: 180px;
  text-align: left;
  border: 2px solid #9ec34b;
  font-size: 16px;
  color: #9ec34b;
  text-decoration: none;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 4px;
  transition: 0.4s;
}

.end-publication-border:hover {
  background-color: #9ec34b;
  border-color: #cbe585;
  color: #fff;
}

.end-publication-mine-border {
  display: inline-block;
  max-width: 180px;
  text-align: left;
  border: 2px solid #c34b4b;
  font-size: 16px;
  color: #c34b4b;
  text-decoration: none;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 4px;
  transition: 0.4s;
}

.end-publication-mine-border:hover {
  background-color: #c34b4b;
  border-color: #e58585;
  color: #fff;
}

.Available-true {
  display: inline-block;
  max-width: 180px;
  text-align: left;
  border: 2px solid #7eaece;
  font-size: 16px;
  color: #ffffff;
  background-color: #3065d8;
  text-decoration: none;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 4px;
  transition: 0.4s;
}

.Available-false {
  display: inline-block;
  max-width: 180px;
  text-align: left;
  border: 2px solid #8f9599;
  font-size: 16px;
  color: #ffffff;
  background-color: #414147;
  text-decoration: none;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 4px;
  transition: 0.4s;
}
</style>