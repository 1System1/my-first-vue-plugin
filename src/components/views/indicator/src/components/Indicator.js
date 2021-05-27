export default class Indicator{

  //单列对象
  static instance= null

  constructor(){
    this.indicator={
      // 基础信息
      basicInfo:{
        code:"",
        name:"",
        pid:"",
        tableType:"point"
      },
      basicInfoRules:{
        name: [
          { required: true, message: '请输入指标名称', trigger: 'blur' }
        ],
        pid: [
          { required: true, message: '请选择所属文件夹', trigger: 'blur' }
        ]
      },
      basicInfoPids:[
        {
          text:"文件夹1",
          code:"1"
        },
        {
          text:"文件夹2",
          code:"2"
        },
        {
          text:"文件夹3",
          code:"3"
        }
      ], // 所属文件夹
      // 公式设置

      formulaPeriods:[
        {
          text:"当前期间",
          value:"0_0"
        },
        {
          text:"当前期间N期",
          value:"N"
        },
        {
          text:"环比上期",
          value:"0_-1"
        },
        {
          text:"同比上期",
          value:"-1_0"
        }
      ], // 期间选择
      formulaLeft:{
        themeCode:"",// 主题表code
        subject:"", // 科目
        fact:"", // 度量
        period:"", // 期间
        N:"" // 期间数
      },
      formulaRight:[],
      formulas:[],
      // 计算器按钮
      calculatorBtns:[ // type: 1 点击即显示
        {text:"/", value:"/",type:"symbol"},{text:"+",value:"+",type:"symbol"}, {text:"-",value:"-",type:"symbol"} ,{text:"←",value:"←",type:"oneEmpty"},
        {text:"*", value:"*",type:"symbol"},{text:"(",value:"(",type:"("}, {text:")",value:")",type:")"} ,{text:"绝对值",value:"abs",type:"function"},
        {text:"7", value:"7",type:"number"},{text:"8",value:"8",type:"number"}, {text:"9",value:"9",type:"number"} ,{text:"平均数",value:"avg",type:"2"},
        {text:"4", value:"4",type:"number"},{text:"5",value:"5",type:"number"}, {text:"6",value:"6",type:"number"} ,{text:"乘幂",value:"pow",type:"function"},
        {text:"1", value:"1",type:"number"},{text:"2",value:"2",type:"number"}, {text:"3",value:"3",type:"number"} ,{text:"当前天数",value:"day",type:"1"},
        {text:"fx()", value:"fx",type:"1"},{text:"0",value:"0",type:"number"}, {text:".",value:".",type:"number"} ,{text:"CE",value:"CE",type:"empty"},
      ],
      // 属性设置
      attributes:{
        nickname:"",// 别名
        Info:"", // 描述
        changeUnit:1, // 是否支持单位切换
        type:"1" ,// 正反指标
        img:"",// 默认图形
        analyse:"",// 默认分析文字
        isPrivate:1, // 是否私有
        isEnable:1, // 是否启用
        param:"" // 对标参数
      },
      attributesImgs:[],// 图形
      attributesParams:[],// 对标参数
    }
  }

  static getInstance(){
    if(!Indicator.instance) Indicator.instance = new Indicator()
    return Indicator.instance
  }

  //获取指标对象
  getIndicator(){
    return this.indicator
  }
  // 清空对象
  removeIndicator(){
    Indicator.instance=null
  }



}
