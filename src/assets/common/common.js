export default{
   install(Vue, options) {

// exports.install = function (Vue, options) {
  Vue.prototype.getfixed2 = function (str, isDynamic) {
    var str = str + '';
    if (str == '' || str == 'undefined' || str == 'null') {
      return {
        value: '--',
        unit: ''
      };
    }
    var bool = '';
    if (str[0] == '-') { //说明为负值
      str = str.substring(1);
      bool = '-';
    }
    if ((str.indexOf('E') != -1) || (str.indexOf('e') != -1)) {
      var num = new Number(str);
      str = num.toLocaleString();
    }
    if (str.indexOf('.') == 0) {
      str = '0' + str;
    }
    if (isDynamic == 0) {
      var strNum = Math.round(str * 1);
      return {
        value: bool + strNum,
        unit: ''
      };
    }
    if (isDynamic == "万") {
      var strNum = (str * 1).toFixed(2) * 1;
      return {
        value: bool + strNum,
        unit: '万'
      };
    }
    if (isDynamic == "亿") {
      var strNum = (str / 1e4).toFixed(2) * 1;
      return {
        value: bool + strNum,
        unit: '亿'
      };
    }

    // else if (str / 1e6 >= 1 || lG > 6) {
    //     var strNum = (str / 1e4).toFixed(2) * 1;
    //     return {
    //       value: bool + strNum,
    //       unit: '万'
    //     };
    //   }
    var lG = Math.round(str * 1).toString().length;
    if (isDynamic == 'auto') {
      if (str / 1e8 > 1 || lG > 8) {
        var strNum = (str / 1e8).toFixed(2) * 1;
        return {
          value: bool + strNum,
          unit: '亿'
        };
      } else if (str / 1e4 >= 1 || lG > 4) {
        var strNum = (str / 1e4).toFixed(2) * 1;
        return {
          value: bool + strNum,
          unit: '万'
        };
      } else {
        var strNum = (str * 1).toFixed(2) * 1;
        return {
          value: bool + strNum,
          unit: '元'
        };
      }
    }
    var strNum = (str * 1).toFixed(1) * 1;
    return (strNum).toLocaleString();
  };
  //数据转百分比
  Vue.prototype.getPercent = function (num, bit) {
    var num = num + '';
    if (num == '-' || num == 'undefined' || num == '' || num == 'null' || num == 'NaN') {
      return '--';
    }
    if (num == '0') {
      if (bit == '%') {
        return 0 + bit;
      } else {
        return 0;
      }
    }
    if (bit == '%') {
      return (Math.round(num * 10000) / 100).toFixed(2) + bit;
    } else {
      return (Math.round(num * 10000) / 100).toFixed(2);
    }
    // return (Math.round(num * 10000) / 100).toFixed(bit);
  };
  Vue.prototype.fontSize = function () {
    return $(window).width() * 24 / 750;
  };
  //  保留两位小数
  Vue.prototype.returnFloat = function (value) {
    return Math.round(value * 100) / 100
    // // 如果只有一个小数就不处理
    // var x = value;
    // var y = String(x).indexOf(".") + 1; //获取小数点的位置
    // var count = String(x).length - y; //获取小数点后的个数
    // if (count > 1) {
    //   var value = Math.round(parseFloat(value) * 100) / 100;
    //   var xsd = value.toString().split(".");
    //   if (xsd.length == 1) {
    //     value = value.toString() + ".00";
    //     return value * 1;
    //   }
    //   if (xsd.length > 1) {
    //     if (xsd[1].length < 2) {
    //       value = value.toString() + "0";
    //     }
    //     return value* 1;
    //   }
    // } else {
    //   return value* 1
    // }
  };
  //获取达成率
  Vue.prototype.getReachPercent = function(a,b){
    if(b!=0 && b!=null){
      var reach = a/b
    }else{
      var reach = ''
    }
    return reach
  }
  // 数据处理
    Vue.prototype.dataProcess = function (data,type,typeVal) {
        if(data !== "" && data !== null && data !== undefined && data !== '--') {
            // if (data.indexOf(",") != -1) {
            var reg = /^-?[0-9]+.?[0-9]*/;//是否为数字
            var lG = Math.round(data * 1).toString().length;
            //如果是数字
            if (reg.test(data)) {
                if (type == 'money') {
                  if(typeVal=='tenth'){
                    var num = this.formatCurrency((data / 10000).toFixed(2))
                    var unit = "万"
                  }else{
                    var num = this.formatCurrency((data / 1).toFixed(2))
                    var unit = "元"
                  }
                } else if (type == 'percent') {
                  var num = this.formatCurrency((data * 100).toFixed(2))
                  var unit = '%'
                } else if (type == 'day') {
                    var num = this.formatCurrency((data / 1).toFixed(0))
                    var unit = '天'
                } else if (type == 'stock') {
                  var num = this.formatCurrency((data / 1).toFixed(2))
                  var unit = '件'
                }else if(type=='time'){
                    var num = (data / 1).toFixed(1)
                    var unit = '小时/单'
                }else if(type=='home'){
                    var num = this.formatCurrency((data / 1).toFixed(0))
                }else{
                    var num = (data / 1).toFixed(0)
                    var unit = ''
                }
                return {
                    num, unit
                }
            } else {
                var num = '--'
                var unit = ''
            }
        } else {
            var num = '--'
            var unit = ''
            return {
                num, unit
            }
        }
        // }else{
        //   return data;
        // }
    };
    //URL加密  
    Vue.prototype.Secret_Key  = function(str,pwd,type) {	
      var b = new Base64(); //Base64加密
      if(type=='encryption'){
          str = b.encode(str);//Base64加密
          var prand = "";
          for(var i=0; i<pwd.length; i++) {
            prand += pwd.charCodeAt(i).toString();
          }
          var sPos = Math.floor(prand.length / 5);
          var mult = parseInt(prand.charAt(sPos) + prand.charAt(sPos*2) + prand.charAt(sPos*3) + prand.charAt(sPos*4) + prand.charAt(sPos*5));
          var incr = Math.ceil(pwd.length / 2);
          var modu = Math.pow(2, 31) - 1;
          if(mult < 2) {
            alert("Please choose a more complex or longer password.");
            return null;
          }
          var salt = Math.round(Math.random() * 1000000000) % 100000000;
          prand += salt;
          while(prand.length > 10) {
            prand = (parseInt(prand.substring(0, 10)) + parseInt(prand.substring(10, prand.length))).toString();
          }
          prand = (mult * prand + incr) % modu;
          var enc_chr = "";
          var enc_str = "";
          for(var i=0; i<str.length; i++) {
            enc_chr = parseInt(str.charCodeAt(i) ^ Math.floor((prand / modu) * 255));
            if(enc_chr < 16) {
              enc_str += "0" + enc_chr.toString(16);
            } else enc_str += enc_chr.toString(16);
            prand = (mult * prand + incr) % modu;
          }
          salt = salt.toString(16);
          while(salt.length < 8)salt = "0" + salt;
          enc_str += salt;
          return enc_str;
    }
    if(type=='decryption'){
        var prand = "";
        for(var i=0; i<pwd.length; i++) {
          prand += pwd.charCodeAt(i).toString();
        }
        var sPos = Math.floor(prand.length / 5);
        var mult = parseInt(prand.charAt(sPos) + prand.charAt(sPos*2) + prand.charAt(sPos*3) + prand.charAt(sPos*4) + prand.charAt(sPos*5));
        var incr = Math.round(pwd.length / 2);
        var modu = Math.pow(2, 31) - 1;
        var salt = parseInt(str.substring(str.length - 8, str.length), 16);
        str = str.substring(0, str.length - 8);
        prand += salt;
        while(prand.length > 10) {
          prand = (parseInt(prand.substring(0, 10)) + parseInt(prand.substring(10, prand.length))).toString();
        }
        prand = (mult * prand + incr) % modu;
        var enc_chr = "";
        var enc_str = "";
        for(var i=0; i<str.length; i+=2) {
          enc_chr = parseInt(parseInt(str.substring(i, i+2), 16) ^ Math.floor((prand / modu) * 255));
          enc_str += String.fromCharCode(enc_chr);
          prand = (mult * prand + incr) % modu;
        }
        //return enc_str;
        return b.decode(enc_str);
    }
  }
    //echarts数据处理
    Vue.prototype.chartDataProcess = function (data,type,typeVal) {
      if(data !== "" && data !== null && data !== undefined && data !== '--') {
          // if (data.indexOf(",") != -1) {
          var reg = /^-?[0-9]+.?[0-9]*/;//是否为数字
          var lG = Math.round(data * 1).toString().length;
          //如果是数字
          if (reg.test(data)) {
              if (type == 'money') {
                if(typeVal=='tenth'){
                  var num = this.formatCurrency((data / 10000).toFixed(0))
                  var unit = "万"
                }else{
                  var num = this.formatCurrency((data / 1).toFixed(0))
                  var unit = "元"
                }
              } else if (type == 'percent') {
                var num = (data * 100).toFixed(0)
                var unit = '%'
              } else if (type == 'day') {
                  var num = this.formatCurrency((data / 1).toFixed(0))
                  var unit = '天'
              }else if(type=='time'){
                  var num = (data / 1).toFixed(1)
                  var unit = '小时/单'
              }else if(type=='home'){
                  var num = this.formatCurrency((data / 1).toFixed(0))
              }else{
                  var num = (data / 1).toFixed(0)
                  var unit = ''
              }
              return {
                  num, unit
              }
          } else {
              var num = '--'
              var unit = ''
          }
      } else {
          var num = '--'
          var unit = ''
          return {
              num, unit
          }
      }
    }
    Vue.prototype.monthProcess = function(data){
      let num = Number(data.substring(4,6))
      if(num==1){
        var monthData = '一月'
      }else if(num==2){
        var monthData = '二月'
      }else if(num==3){
        var monthData = '三月'
      }else if(num==4){
        var monthData = '四月'
      }else if(num==5){
        var monthData = '五月'
      }else if(num==6){
        var monthData = '六月'
      }else if(num==7){
        var monthData = '七月'
      }else if(num==8){
        var monthData = '八月'
      }else if(num==9){
        var monthData = '九月'
      }else if(num==10){
        var monthData = '十月'
      }else if(num==11){
        var monthData = '十一月'
      }else{
        var monthData = '十二月'
      }
      return monthData
    }
  //年月处理
  Vue.prototype.getMonthBetween = function(start,end){
      var result = [];
      var s = start.split("-");
      var e = end.split("-");
      var min = new Date();
      var max = new Date();
      min.setFullYear(s[0],s[1]);
      max.setFullYear(e[0],e[1]);
      // console.log(e[0]+"---- "+e[1]);
      var curr = min;
      while(curr <= max){
        var month = curr.getMonth();
        // month=month==0?12:month;

        var str=curr.getFullYear()+""+(month<10?'0'+month:month);
        var s=curr.getFullYear()+"00";
        if(str==s){
          str=curr.getFullYear()+"12";
        }
        result.push(str);
        curr.setMonth(month+1);
      }
      return result;
    },
  // 封装获取数组里面最值的函数
  Vue.prototype.getmax = function (data) {
    // debugger
    var max = data[0] != '--' ? data[0] * 1 : data[0];
    for (var i = 1; i < data.length; i++) {
      if (max == '--') {
        if (data[i] != '--') {
          max = data[i] * 1;
        } else {
          max = max;
        }

      } else {
        if (data[i] != '--') {
          if (max < data[i] * 1) {
            max = data[i] * 1;
          }
        } else {
          max = max;
        }
      }

    }
    return max;
  };
  // 封装获取数组里面最小值的函数
  Vue.prototype.getmin = function (data) {
    var min = data[0];
    for (var i = 1; i < data.length; i++) {
      // if (min > data[i]) {
      //     min = data[i];
      // }
      if (min == '--') {
        if (data[i] != '--') {
          min = data[i];
        } else {
          min = min;
        }

      } else {
        if (data[i] != '--') {
          if (min < data[i]) {
            min = data[i];
          }
        } else {
          min = min;
        }
      }

    }
    return min;
  };

  //数字格式化--千分位
  Vue.prototype.addThousandBit = function (num) {
    var result = '', counter = 0;
    num = (num || 0).toString();
    for (var i = num.length - 1; i >= 0; i--) {
      counter++;
      result = num.charAt(i) + result;
      if (!(counter % 3) && i != 0) {
        result = ',' + result;
      }
    }
    return result;
  };
  // 增加千分位
    Vue.prototype.formatCurrency = function (num) {
        var num1;
        num = num.toString().replace(/\$|\,/g,'');
        if (num) {
            if ('' == num || isNaN(num)) {
                return 'Not a Number ! ';
            }
            var sign = num.indexOf("-") > 0 ? '-' : '';
            var cents = num.indexOf(".") > 0 ? num.substr(num.indexOf(".")) : '';
            cents = cents.length > 1 ? cents : '';
            num = num.indexOf(".") > 0 ? num.substring(0, (num.indexOf("."))) : num;
            if (num.length > 1 && '0' == num.substr(0, 1)) {
                return 'Not a Number ! ';
            }
        }
        else {
            if (num.length > 1 && '0' == num.substr(0, 1)) {
                return 'Not a Number ! ';
            }
        }
        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
            num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
        }
        num1 = sign + num + cents
        if(num1.indexOf("-,") != -1){
            num1 = '-' + num1.substr(2)
        }
        return num1;
    };
    //计算总和
    Vue.prototype.sum =function(arr) {
      return eval(arr.join("+"));
    }
  // 一帮卖评分计算   valArray：本月销量数组  valArray1：年累计销量数组
    Vue.prototype.scoreProcess = function (valArray,valArray1) {
      let list = []
      let list1 = []
      //本月销量
      valArray.map(function(item,index){
        if(item<=60){
          list[index] = 0
        }else
        if(item>60 && item<=95){
          list[index] = (item-60)*2
        }else
        if(item>95 && item<=100){
          list[index] = 70+(item-95)*4
        }else
        if(item>100 && item<=120){
          list[index] = 90+parseInt((item-100)/2)
        }else
        if(item>120){
          list[index] = 100
        }
      })
      //年累计销量
      valArray1.map(function(item,index){
        if(item<=60){
          list1[index] = 0
        }else
        if(item>60 && item<=95){
          list1[index] = (item-60)*2
        }else
        if(item>95 && item<=100){
          list1[index] = 70+(item-95)*4
        }else
        if(item>100 && item<=120){
          list1[index] = 90+parseInt((item-100)/2)
        }else
        if(item>120){
          list1[index] = 100
        }
      })
      let average = (this.sum(list)/valArray.length + this.sum(list1)/valArray1.length)/2
      return average.toFixed(1)
    };
    // 二帮卖订单评分计算  上月环比：oldVal  本月环比：newVal
    Vue.prototype.orderScoreProcess = function (oldVal,newVal) {
      //环比
      if(oldVal == newVal){
          var score = 50
      }else if(oldVal>newVal){
          var score = 50 - parseInt((oldVal-newVal)/3)*5
          score = score<=0 ? 0 : score
      }else{
          var score = 50 + parseInt((newVal-oldVal)/3)*5
          score = score>=100 ? 100 : score
      }
      return score.toFixed(1)
    };
    // 二帮卖业务员评分计算  业务员达成：reach    人均产出：averageProduce  业务下滑人数占比：radio
    Vue.prototype.salesManScoreProcess = function (reach,averageProduce,radio) {
      //业务员达成
      reach = reach>100 ? 100 : reach
      //人均产出
      if(averageProduce<=100000){
        var produceScore = 0
      }else
      if(averageProduce>100000 && averageProduce<=130000){
        var produceScore = parseInt((averageProduce-100000)/1000)*3
      }else
      if(averageProduce>130000 && averageProduce<=150000){
        var produceScore = 60+parseInt((averageProduce-130000)/1000)*1.5
      }else
      if(averageProduce>150000 && averageProduce<=160000){
        var produceScore = 90+parseInt((averageProduce-150000)/1000)*1
      }else
      if(averageProduce>160000){
        var produceScore = 100
      }
      //业务下滑人数占比
      if(radio<=0){
        var salesRadio = 100
      }else{
        var salesRadio = 100-radio
        salesRadio = salesRadio<0 ? 0 : salesRadio
      }
      let score = (reach+produceScore+salesRadio)/3
      return score.toFixed(1)
    };
    // 二帮卖产品评分计算   动销率数组：valArray  动销商品数环比：oldVal,newVal 业务下滑人数占比：radio
    Vue.prototype.productScoreProcess = function (valArray,oldVal,newVal,radio) {
      //动销率
      let list = []
      valArray.map(function(item,index){
        if(item<=30){
          list[index] = 0
        }else if(item>30 && item<=80){
          list[index] = (item-30)*2
        }else{
          list[index] = 100
        }
      })
      let average = this.sum(list)/valArray.length
      //动销商品数环比
      let ChainRatio = this.orderScoreProcess(oldVal,newVal)
      //业务下滑人数占比
      if(radio<=0){
        var salesRadio = 100
      }else{
        var salesRadio = 100-(100-radio)*2
        salesRadio = salesRadio<0 ? 0 : salesRadio
      }
      let score = (Number(average)+Number(ChainRatio)+Number(salesRadio))/3
      return score.toFixed(1)
    }
    // 二帮卖门店评分计算    销量下滑门店占 当月无交易门店占比 3个月无交易门店占比：valArray  门店活跃率：activeRate  活跃门店数环比：oldVal newVal
    Vue.prototype.storeScoreProcess = function (activeRate,oldVal,newVal,valArray) {
      //销量下滑门店占 当月无交易门店占比 3个月无交易门店占比
      let list = []
      valArray.map(function(item,index){
        if(item<=0){
          list[index] = 100
        }else{
          list[index] = 100-parseInt(100-item)*2
          list[index] = list[index]<0 ? 0 : list[index]
        }
      })
      let average = this.sum(list)/valArray.length
      //门店活跃率
      if(activeRate<=10){
        var newActiveRate = 0
      }else{
        var newActiveRate = (activeRate-10)*2
        newActiveRate = newActiveRate>100 ? 100 : newActiveRate
      }
      //活跃门店数环比
      let chainRatio = this.orderScoreProcess(oldVal,newVal)
      let score = (Number(average)+Number(chainRatio)+Number(newActiveRate))/3
      return score.toFixed(1)
    }
    // 库存评分计算   6个月未销售商品金额占比 6个月未销售商品件数占比：valArray  库存可销天数：valArray1  库存周转率：turnoverRate  库存可销天数环比增长：valArray1 oldVal
    Vue.prototype.stockScoreProcess = function (valArray,turnoverRate,valArray1,oldVal,newVal) {
      //6个月未销售商品金额占比 6个月未销售商品件数占比
      let list = []
      valArray.map(function(item,index){
        if(item==0){
          list[index] = 100
        }else{
          list[index] = 100-(100-item)*5
          list[index] = list[index]<0 ? 0 : list[index]
        }
      })
      //库存可销天数
      let list1 = []
      valArray1.map(function(item,index){
        if(item>=360){
          list1[index] = 0
        }else if(item>=60 && item<360){
          list1[index] = parseInt((360-item)/3)
          list1[index] = list1[index]>100 ? 100 : list1[index]
        }else if(item<=5){
          list1[index] = 100-parseInt((5-item)/0.1)*2
          list1[index] = list1[index]<0 ? 0 : list1[index]
        }
      })
      //库存周转率
      if(turnoverRate<=1){
        var stockRate =  0
      }else{
        var stockRate =  ((turnoverRate-1)/0.1)*2
        stockRate = stockRate>100 ? 100 : stockRate
      }
      //库存可销天数环比增长
      if(oldVal == newVal){
        var stockDayRate = 50
      }else if(oldVal<newVal){
        var stockDayRate = 50 - (newVal-oldVal)
      }
      let average = this.sum(list)/valArray.length
      let average1 = this.sum(list1)/valArray1.length
      let score =  (Number(average)+Number(average1)+Number(stockRate))/3
      return score.toFixed(1)
    }
    //一帮卖评价文字
    Vue.prototype.oneHelpSaleEvaluate = function(monthReach,yearReach,monthStrategy,yearStrategy){
      if(monthReach>=1.1 && yearReach>=1.1 && monthStrategy>=1 && yearStrategy>=1){
        var evaluateTxt = '很好'
        var describeTxt = '集团进货目标全面达成，品类进货均衡，表现优秀。'
      }else if(monthReach>=1 && yearReach>=1){
        var evaluateTxt = '较好'
        var describeTxt = '集团进货目标总量达成，部分品类未达成，需留意品类结构发展。'
      }else if(monthReach>=1 || yearReach>=1){
        var evaluateTxt = '一般'
        var describeTxt = '集团进货目标未全部达成，仍需努力。'
      }else if(monthReach>=0.95&&monthReach<1 && yearReach>=0.95&&yearReach<1){
        var evaluateTxt = '较差'
        var describeTxt = '本月、累计两个总量达成率均超过95%，低于100%。'
      }else{
        var evaluateTxt = '很差'
        var describeTxt = '集团进货目标未达成，亟待改善。'
      }
      return{
        evaluateTxt,describeTxt
      }
    }

  /* 获取N天前的日期 不传为当日 */
  Vue.prototype.getDayStr = function (n) {
    let now = new Date()
    let timeStamp = now.getTime()
    let nowYear = now.getFullYear()
    let nowMonth = (now.getMonth() + 1) < 10 ? '0' + (now.getMonth() + 1)
      : (now.getMonth() + 1)
    let nowDate = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()

    if (n === undefined || n === 0 || n === '0') {
      return nowYear + '-' + nowMonth + '-' + nowDate
    } else {
      let before = new Date(timeStamp - 24 * 3600 * 1000 * n)
      let beforeYear = before.getFullYear()
      let beforeNewMonth = (before.getMonth() + 1) < 10 ? '0'
        + (before.getMonth() + 1) : (before.getMonth() + 1)
      let beforeDate = before.getDate() < 10 ? '0' + before.getDate()
        : before.getDate()
      return beforeYear + '-' + beforeNewMonth + '-' + beforeDate
    }
  };
  /* 获取半年日期
   *
   *  return ['YYYYMM', 'YYYYMM'] 开始日期和当前日期
   * */
  Vue.prototype.getHalfYearDate = function () {
    let now = new Date(), arr = []
    // 获取当前的时间
    let nowMonth = now.getFullYear()+ '' + ((now.getMonth() + 1) < 10 ? '0' + (now.getMonth() + 1) : (now.getMonth() + 1))
    // 获取6个月前的时间
    now.setMonth(now.getMonth()-4)
    let thisMonth = now.getMonth() ==0 ? 12:now.getMonth()
    thisMonth = (thisMonth<10) ? "0"+thisMonth:thisMonth
    let thisYear = now.getMonth() == 0 ? now.getFullYear() -1 : now.getFullYear()
    let agoMonth = thisYear + '' + thisMonth
    arr.push(agoMonth)
    arr.push(nowMonth)
    return arr
  };
  //系统数据回滚
  Vue.prototype.getLocalYear = function() {
    let now = new Date(), arr = []
    // 获取当前的时间
    let nowMonth = now.getFullYear()+ '' + ((now.getMonth() ) < 10 ? '0' + (now.getMonth()) : (now.getMonth()))
    // 获取6个月前的时间
    now.setMonth(now.getMonth()-5)
    let thisMonth = now.getMonth() ==0 ? 12:now.getMonth()
    thisMonth = (thisMonth<10) ? "0"+thisMonth:thisMonth
    let thisYear = now.getMonth() == 0 ? now.getFullYear() -1 : now.getFullYear()
    let agoMonth = thisYear + '' + thisMonth
    arr.push(agoMonth)
    arr.push(nowMonth)
    return arr
  }
  // 按照列进行数据分类
    /**
     * handlerArray:返回的数组(json格式)，一般是接口返回的response.data.data，
     * colNumber:对应数组的下表（0,1,2,3...）
     * */
  Vue.prototype.colloctData = function(handlerArray,colNumber){
    var filterIndex = colNumber;
    var keysCollect = dataHandler(handlerArray,filterIndex);
    var resultArray = [];
    keysCollect.map(function(item){
      var objA = [];
      var totalA = [];
      handlerArray.data.map(function(subItem){

        if(item == subItem[filterIndex]){
          objA.push(subItem);
        }
      })
      totalA.push(item);
      totalA.push(objA);
      resultArray.push(totalA);
    });
    return resultArray;
  };
  /*
    * handlerArray 数据源
    * colNumber  排序的列名序号
    * tableTitleColNum 表头名称所属的列
    * colIndexArray 选择列所有号集合
    */
    Vue.prototype.TranslateMulTableData = function (handlerArray, colNumber, tableTitleColNum, colIndexArray) {
    var filterIndex = colNumber;
    var keysCollect = dataHandler(handlerArray,filterIndex);
    var keysCollect1 = dataHandler(handlerArray,tableTitleColNum);
    var resultArray = [];
    keysCollect.map(function(item){
      var objA = [];
      var totalA = [];
      handlerArray.data.map(function(subItem){

        if(item == subItem[filterIndex]){
          objA.push(subItem);
        }
      })
      totalA.push(item);
      totalA.push(objA);
      resultArray.push(totalA);
    });
    //补全数据
     var maxLength = keysCollect1.length;
     resultArray.map(function(item){
         if(item[1].length!=maxLength)
         {
            keysCollect1.map(function(subItem){
                item[1].map(function(thridItem){
                    var keys = dataHandler({data:item[1]},tableTitleColNum);
                    // console.log(subItem,keys);
                    if(keys.indexOf(subItem)==-1){
                       var arrayObj =  new Array(10);
                       arrayObj[tableTitleColNum]  =  subItem;
                       arrayObj[filterIndex] = thridItem[filterIndex];
                       item[1].push(arrayObj);
                       return false;
                    }
                })
            })
         }
     });

    return multiTableData(resultArray,tableTitleColNum,colIndexArray);;
  };
//转换成表格数据
    Vue.prototype.translateTableData =function(handlerArray){

    var length = handlerArray.data[0].length;
    var resultJsonData = [];
    handlerArray.data.map(function(item){
      var jsonObj = {}
      item.map(function(subkeys,index){

        jsonObj["data"+index] = subkeys;
      });
      resultJsonData.push(jsonObj);
    });
    // console.log("tableData--",resultJsonData);
    // this.tableData = resultJsonData;
    return resultJsonData;
  };
  //对数组进行排序
    Vue.prototype.compare = function (property) {
      return (firstobj, secondobj) => {
        const firstValue = firstobj[property];
        const secondValue = secondobj[property];
        return firstValue - secondValue; //升序
      };
    }
   //导出的方法
  //  tableHeaderTxt：表头文字
  //  tableHeaderKey：接口key值，和表头文字对应
  //  tableData：表格数据
  //  tableName：导出excel名称
   Vue.prototype.exportHandleClick =function(tableHeaderTxt,tableHeaderKey,tableData,tableName) {
    require.ensure([], () => {
        const { export_json_to_excel } = require('../../excel/Export2Excel.js');
        const tHeader = tableHeaderTxt
        // 上面设置Excel的表格第一行的标题
        const filterVal = tableHeaderKey
        // 上面的index、nickName、name是tableData里对象的属性
        const list = tableData;  //把data里的tableData存到list
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, tableName);
    })
  }
   Vue.prototype.formatJson = function(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
  }
  //滑动限制
  Vue.prototype.stopScoll = function(){
    var mo=function(e){e.preventDefault();};
    document.body.style.overflow='hidden';
    document.addEventListener("touchmove",mo,false);//禁止页面滑动
  }
  //取消滑动限制
  Vue.prototype.moveScoll = function(){
    var mo=function(e){e.preventDefault();};
    document.body.style.overflow='';//出现滚动条
    document.removeEventListener("touchmove",mo,false);
  }
}};

var multiTableData = function(handlerArray,tableTitleColNum,colIndexArray){
     var tableTitleCol = [];
     var selectArray = colIndexArray;
     var indexLength = selectArray.length;
     // var _this = this;
     var indexNumber = 0;
     var resultArray = [];
     if(handlerArray.length>0)
     {
       handlerArray.map(function(item,index){
             // _this.tableProps.map()
             indexNumber = 0;
             var jsonObj = {};
             // var jsonTitleName = {};
             jsonObj.colNumber0 = item[0];
             // tableProps.push("colNumber0");

             if(item[1].length>0)
             {
                item[1].map(function(subItem){

                    selectArray.map(function(thirdItem,thirdIndex){
                        indexNumber += 1;
                        jsonObj["colNumber"+indexNumber] = subItem[thirdItem];
                        // tableProps.push("colNumber"+indexNumber)
                    });
                });
             }


             resultArray.push(jsonObj);

       });
       handlerArray[0][1].map(function(tableitem){
             tableTitleCol.push(tableitem[tableTitleColNum]);
        });
       var tableNames = Object.keys(resultArray[0]);
       var TableNameNumber = 0;
       var resultTableName = [];
       tableTitleCol.map(function(item){
           var jsonObj = {}
           var colData = [];
           jsonObj.name = item;
           for(var i = 0 ;i<indexLength;i++)
           {
              TableNameNumber += 1;
              colData.push(tableNames[TableNameNumber]);
           }
           jsonObj.colData = colData;

           resultTableName.push(jsonObj);
       });
       // console.log("表头名称====》",resultTableName);
       // console.log("多表头数据----》",resultArray);
     }
     var jsonObj = {};
     jsonObj.tableNames = resultTableName;
     jsonObj.tableDatas = resultArray;
     return jsonObj;
  };
//去重字段获取数据集合
var dataHandler  = function(handlerData,filterIndex){
  var tempArray = [];
  handlerData.data.map(function(item){
    if(tempArray.length==0){
      tempArray.push(item[filterIndex]);
    }
    else{
      if(tempArray.indexOf(item[filterIndex])==-1){
        tempArray.push(item[filterIndex]);
      }
    }
  });
  return tempArray;
};
/**
*
*  Base64 encode / decode
*
*  @author haitao.tu
*  @date   2010-04-26
*  @email  tuhaitao@foxmail.com
*
*/
 
function Base64() {
 
	// private property
	var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
 
	// public method for encoding
	this.encode = function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
		input = _utf8_encode(input);
		while (i < input.length) {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
			output = output +
			_keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
			_keyStr.charAt(enc3) + _keyStr.charAt(enc4);
		}
		return output;
	}
 
	// public method for decoding
	this.decode = function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		while (i < input.length) {
			enc1 = _keyStr.indexOf(input.charAt(i++));
			enc2 = _keyStr.indexOf(input.charAt(i++));
			enc3 = _keyStr.indexOf(input.charAt(i++));
			enc4 = _keyStr.indexOf(input.charAt(i++));
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
			output = output + String.fromCharCode(chr1);
			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
		}
		output = _utf8_decode(output);
		return output;
	}
 
	// private method for UTF-8 encoding
	var _utf8_encode = function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				utftext += String.fromCharCode(c);
			} else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
		return utftext;
	}
 
	// private method for UTF-8 decoding
	var _utf8_decode = function (utftext) {
		var string = "";
		var i = 0;
    var c = 0
    var c1 = 0
    var c2 = 0;
    var c3 = 0;
		while ( i < utftext.length ) {
			c = utftext.charCodeAt(i);
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			} else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			} else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}
		return string;
	}
}


