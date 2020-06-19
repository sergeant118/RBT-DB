<template>
  <div>
    <h1 class="subtitle">リピボ級レンタル一覧</h1>
    <Login />
    <div v-if="length != 0">{{ length }}件のレンタルパーティがあります</div>
    <div class="select-bg" v-if="user.login">
      <button class="team-select-border" type="submit" @click="sortTime">ALL</button>
      <button class="team-select-border" type="submit" @click="sortMine">My Teame</button>
    </div>
    <div v-for="team in getsortedRentalTeams(sortType)" :key="team.media_url">
      <RentalTable
        :media_id="team.media_id"
        :image_url="getImage(team)"
        :window_width="width"
        :tweet_url="team.tweet_url"
        :date="team.date"
        :pokemon_name="team.pokemon_name"
        :tweet_button_url="getTweetButtonURL(team)"
        :Available="team.Available"
        :isMyTeam="isMyTeam(team,user)"
      ></RentalTable>
    </div>
  </div>
</template>

<script>
import firebase from "@/plugins/firebase";
import RentalTable from "~/components/rental_table.vue";
import Login from "~/components/Login.vue";

export default {
  components: {
    RentalTable,
    Login
  },
  data() {
    return {
      rental_teams: [],
      width: 0,
      height: 0,
      isLogin: false,
      sortType: 0
    };
  },
  methods: {
    handleResize: function() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    },
    sortTime() {
      this.sortType = 0;
    },
    sortMine() {
      this.sortType = 1;
    }
  },
  computed: {
    user() {
      return this.$store.getters["user"];
    },
    length() {
      return this.rental_teams.length;
    },
    getsortedRentalTeams: function() {
      return function(sortType) {
        var user = this.$store.getters["user"];

        if (!user.login) {
          this.sortType = 0;
        }

        switch (sortType) {
          case 0:
            return this.sortedRentalTeamsByTime;

          case 1:
            return this.sortedRentalTeamsByMine;

          default:
            return this.sortedRentalTeamsByTime;
        }
      };
    },
    sortedRentalTeamsByTime() {
      return this.rental_teams.sort((a, b) => {
        let timeA = a.date_time;
        let timeB = b.date_time;
        return timeA >= timeB ? -1 : timeA < timeB ? 1 : 0;
      });
    },
    sortedRentalTeamsByMine() {
      var my_teams = [];

      var user = this.$store.getters["user"];
      if (user) {
        for (var index in this.rental_teams) {
          var team = this.rental_teams[index];
          //console.log(team);
          if (team.user_id == user.twitter_uid) my_teams.push(team);
        }
      }

      return my_teams;
    },
    getImage: function() {
      return function(team) {
        if (team.storage_media_url === undefined) {
          //未定義だったらDownloadURLを追加しに行く
          var storage = firebase.storage();
          var storageRef = storage.ref();
          var spaceRef = storageRef.child(
            "RentalTeam/" + team.media_id + ".jpg"
          );

          spaceRef
            .getDownloadURL()
            .then(function(url) {
              firebase
                .database()
                .ref("RentalTeams/" + team.media_id)
                .update({
                  storage_media_url: url
                });
            })
            .catch(function(error) {
              // Handle any errors
            });

          //ひとまずmedia_urlを返す
          return team.media_url;
        } else {
          return team.storage_media_url;
        }
      };
    },
    getTweetButtonURL: function() {
      return function(team) {
        var text =
          "@sergeant118 " +
          team.pokemon_name +
          "統一[" +
          team.media_id +
          //"]のレンタルチームを公開終了にしました " +
          "]のレンタルチームが公開終了になっています " +
          team.tweet_url;
        return (
          "https://twitter.com/share?url=https://repeatballtierdb.web.app/&text=" +
          text
        );
      };
    },
    isMyTeam: function() {
      return function(team, user) {
        if (team.user_id == user.twitter_uid) return true;
        else return false;
      };
    }
  },
  created() {
    firebase
      .database()
      .ref("RentalTeams/")
      .once("value")
      .then(result => {
        if (result.val()) {
          var hash = result.val();

          this.rental_teams = [];
          for (var key in hash) {
            hash[key]["media_id"] = key;
            this.rental_teams.push(hash[key]);
          }
        }
      });
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
  font-size: 100px;
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

.team-all-border {
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

.team-all-border:hover {
  background-color: #9ec34b;
  border-color: #cbe585;
  color: #fff;
}

.team-select-border {
  display: inline-block;
  max-width: 180px;
  text-align: left;
  background-color: #4891ff;
  border: 2px solid #4b3bdd;
  font-size: 16px;
  color: #ffffff;
  text-decoration: none;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 4px;
  transition: 0.4s;
}

.team-select-border:hover {
  background-color: #56d645;
  border-color: #158531;
  color: #fff;
}

.select-bg {
  padding: 0.5em 0.75em;
  background-color: #b9d5f5;
}
</style>