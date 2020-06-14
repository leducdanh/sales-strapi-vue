import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    listMenu:[]
  },
  mutations: {
    setListMenu(state, menus){
      state.listMenu = JSON.parse(JSON.stringify(menus))
    }
  },
  actions: {
  },
  modules: {
  },
  getters:{
     listMenu: (state) => {
       return state.listMenu
     }
  }
})
