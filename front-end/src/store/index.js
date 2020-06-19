import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    listMenu: [],
    // user
  },
  mutations: {
    setListMenu(state, menus) {
      state.listMenu = JSON.parse(JSON.stringify(menus))
    },
    // setUserInfo(state, infoUser) {
    //   state.user = JSON.parse(JSON.stringify(infoUser))
    // }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    listMenu: (state) => {
      return state.listMenu
    },
    // user: (state) => {
    //   return state.user
    // }
  }
})
