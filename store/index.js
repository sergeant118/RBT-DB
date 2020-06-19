import firebase from '~/plugins/firebase'

export const state = () => ({
  user: {
    uid: '',
    login: false,
    twitter_uid: '',
    twitter_name: '',
    twitter_image: ''
  },
})

export const getters = {
  user: state => {
    return state.user
  }
}

export const actions = {
  loginTwitter({
    dispatch
  }) {

    var provider = new firebase.auth.TwitterAuthProvider()
    firebase.auth().signInWithPopup(provider).then(function (result) {

      var token = result.credential.accessToken;
      var secret = result.credential.secret;

      dispatch('checkLogin', {
        token: token,
        secret: secret
      });
    }).catch(function (error) {
      console.log(error)
    })
  },
  loginTwitterToken({
    dispatch
  }, {
    token,
    secret
  }) {

    var credential = firebase.auth.TwitterAuthProvider.credential(
      token,
      secret
    );
    //console.log(credential);

    firebase
      .auth()
      .signInWithCredential(credential)
      .then(function (result) {
        //console.log("Tokenログイン成功");

        dispatch('checkLogin', {
          token: token,
          secret: secret
        });

      })
      .catch(function (error) {
        //console.log("ログインエラー");
        console.log(error);
      });

  },
  logout({
    commit
  }) {
    firebase.auth().signOut().then(() => {
      commit('switchLogout');

      //リダイレクト
      //console.log("ログアウト");
    })
  },
  checkLogin({
    commit
  }, {
    token,
    secret
  }) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {

        commit('getData', {
          uid: user.uid,
          twitter_uid: user.providerData[0].uid,
          twitter_name: user.providerData[0].displayName,
          twitter_image: user.providerData[0].photoURL,
          twitter_token: token,
          twitter_secret: secret
        })

        commit('switchLogin')
      }
    })
  },
}

export const mutations = {
  getData(state, payload) {
    state.user.uid = payload.uid
    state.user.twitter_uid = payload.twitter_uid
    state.user.twitter_name = payload.twitter_name
    state.user.twitter_image = payload.twitter_image

    var cookies = this.$cookies.get("RBR-DB_LoginToken");

    if (cookies) {
      //クッキーに登録されていれば何もしない
      //console.log("クッキー登録済み");
    } else {
      //クッキーに登録されていなければ登録
      const setCached = {
        token: payload.twitter_token,
        secret: payload.twitter_secret
      };
      this.$cookies.set("RBR-DB_LoginToken", setCached, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7
      });
    }
  },
  switchLogin(state) {
    state.user.login = true
  },
  switchLogout(state) {
    state.user.login = false
  },
}
