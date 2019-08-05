import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
      currentDate:localStorage.getItem("currentDate") || '',//时间
      pathUrl: 'https://www.easy-mock.com/mock/5d429dcbd3020d2d3bc58a32/medicalReport'
  },
  mutations: {
      getCurrentDate(state, type) {
          localStorage.setItem('currentDate', type);
          state.currentDate = type;
      },
  }
})
export default store
