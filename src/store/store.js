import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
      currentDate:localStorage.getItem("currentDate") || '',//时间
  },
  mutations: {
      getCurrentDate(state, type) {
          localStorage.setItem('currentDate', type);
          state.currentDate = type;
      },
  }
})
export default store
