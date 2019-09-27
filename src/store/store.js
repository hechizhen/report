import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
      currentDate:localStorage.getItem("currentDate") || '',//时间
      requestHttpUrl:localStorage.getItem("requestHttpUrl") || 'https://www.easy-mock.com/mock/5d429dcbd3020d2d3bc58a32/medicalReport',//easyMock接口请求地址
      testRequestHttpUrl:localStorage.getItem("requestHttpUrl") || 'https://dcc.libyuat.com/hanadcc/queryByPage',//测试接口请求地址
    //   testRequestHttpUrl:localStorage.getItem("requestHttpUrl") || 'http://dccuat.liby.com.cn/hanadcc/queryByPage',//测试接口请求地址
      // testRequestHttpUrl:localStorage.getItem("requestHttpUrl") || 'https://dcc.liby.com.cn/hanadcc/queryByPage',//测试接口请求地址
      requestHttpUrl1:'https://dcc.libyuat.com/hanadcc/queryData',//接口请求地址
      // requestHttpUrl1:'https://dcc.liby.com.cn/hanadcc/queryData',//接口请求地址
      isLandUrl:'https://dcc.libyuat.com/hanadcc',
      monitorData:{
          resource_name:'',//资源名称
          log_text:'',//日志说明
          platform_name:'体检报告',//平台名称
          user_id:'',//用户名
          user_dealer_code:'',//经销商名称
          page_name:'首页',//页面名称
          page_text:'',//点击说明
          load_time:'',//加载时间
          status:'1',//访问状态
          is_success:'',//访问是否成功
          data_month:'',//数据月份
      },
      originSource:'',//false-立购星 true-Mop
  },
  mutations: {
      getCurrentDate(state, type) {
          localStorage.setItem('currentDate', type);
          state.currentDate = type;
      },
      getMonitor(state,type){
        state.monitorData = type;
      },
      getOriginSource(state,type){
        state.originSource = type;
      },
  }
})
export default store
