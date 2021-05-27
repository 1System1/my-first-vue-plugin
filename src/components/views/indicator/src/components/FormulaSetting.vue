<template>
  <div class="formula">
    <div class="left" style="padding: 20px;">
      <div style="display: flex;flex-direction: row;align-items: center;margin-bottom: 8px;padding-left: 8px;">
        <span class="mr8">主题表</span>
        <el-select v-model="left.themeCode" placeholder="请选择主题表" clearable filterable @change="changeThemeTable">
          <el-option
            v-for="item in themeTables"
            :key="item.code"
            :label="item.text"
            :value="item.code">
          </el-option>
        </el-select>
      </div>
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="期间" name="1">
         <div >
          <div style="display: flex;flex-direction: row;align-items: center;">
            <span class="mr8">选择变量</span>
            <el-radio-group v-model="left.period">
              <el-radio :label="item.value" v-for="item in periods" :key="item.value">{{item.text}}</el-radio>
            </el-radio-group>
          </div>
           <div style="display: flex;flex-direction: row;height: 40px;align-items: center;" v-if="left.period==='N'">
             <span class="mr8">期数</span>
             <el-input v-model="left.N" placeholder="请输入期数"></el-input>
           </div>
         </div>
        </el-collapse-item>
        <el-collapse-item title="科目" name="2">
          <el-radio-group v-model="left.subject" style="display: flex;flex-direction: column;">
            <el-radio :label="item.code" v-for="item in subjects" :key="item.code">{{item.text}}</el-radio>
          </el-radio-group>
        </el-collapse-item>
        <el-collapse-item title="度量" name="3">
          <el-radio-group v-model="left.fact" style="display: flex;flex-direction: column;">
            <el-radio :label="item.id" v-for="item in facts" :key="item.id">{{item.text}}</el-radio>
          </el-radio-group>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="middle">
      <i class="el-icon-d-arrow-right" style="cursor: pointer" @click="clickRight"/>
    </div>
    <div class="right">
      <div class="right-head">
        <div class="mr8">公式</div>
        <div class="formula-content" v-html="analyticFormual(formulas)" style="padding: 4px;display: flex;flex-wrap: wrap;">





          <!--<div v-for="(item ,index) in formulas" :key="index" style="margin-right: 2px;">-->
           <!--<div style="display: flex;" class="formula-item">-->
             <!--<div class="tag" style="margin: 0 2px;">-->
               <!--<span>{{item.text}}</span>-->
             <!--</div>-->
             <!--&lt;!&ndash;<el-tag :type="item.type|getTagType">&ndash;&gt;-->
               <!--&lt;!&ndash;<span>{{item.text}}</span>&ndash;&gt;-->
             <!--&lt;!&ndash;</el-tag>&ndash;&gt;-->
             <!--&lt;!&ndash;<div class="badge" @click="delFormual(index)">&ndash;&gt;-->
               <!--&lt;!&ndash;<span>X</span>&ndash;&gt;-->
             <!--&lt;!&ndash;</div>&ndash;&gt;-->
           <!--</div>-->
          <!--</div>-->

        </div>
      </div>
      <div class="calculator">
       <div class="btns">
         <div :class="{'calculator-btn':true,'activeFunction':activeFunction===item.value}"
              v-for="(item,index) in calculatorBtns"
              @click="clickCalculator(item)"
              :key="index"
         >
           <span>{{item.text}}</span>
         </div>
       </div>
      </div>
      <div class="footer">

      </div>
    </div>
  </div>
</template>

<script>
/*公式设置*/
export default {
  name: "FormulaSetting",
  props:{
    indicator:{
      required:true
    },
    requestThemeTables:{ // 获取主题表
      type:Function,
      default:null
    },
    requestSubjects:{ // 获取科目
      type:Function,
      default:null
    },
    requestFacts:{ // 获取度量
      type:Function,
      default:null
    }
  },
  data(){
    return{
      left:{},
      periods:[], // 期间
      subjects:[], // 科目
      facts:[], // 科目
      activeName: '',
      themeTables:[],
      formulas:[],
      calculatorBtns:[] // 计算器按钮
    }
  },
  created() {
     this.init()
  },
  filters:{
    getTagType(type){
        if(type==="dim")return ""
        else if(type==="symbol")return "info"
    },
    analyticFormual(formuals){
      var st =""
      formuals.forEach(item=>{
       if( item.type==="function"){

          // st = item.value+"("+st+")"
         st =`<span>${item.value}(${st})</span>`
       }else {
         st +=`<span>${item.value}</span>`
       }
      })
      return st
    }
  },
  methods:{
     init() {
       this.left =this.indicator.formulaLeft
       this.periods = this.indicator.formulaPeriods
       this.calculatorBtns = this.indicator.calculatorBtns
       this.formulas = this.indicator.formulas
       this.getThemeTables()
    },
    analyticFormual(formuals){
      var st =""
      formuals.forEach(item=>{
        if( item.type==="function"){

          // st = item.value+"("+st+")"
          st =`<span class="mr4">${item.value}(${st})</span>`
        }else {
          st +=`<span class="mr4">${item.value}</span>`
        }
      })
      return st
    },
    // 获取主题表
    async getThemeTables() {
       if(!this.requestThemeTables)this.themeTables =[]
       else this.themeTables = await this.requestThemeTables()
    },
    // 获取科目
    async getSubjects(themeCode) {
      if(!this.requestThemeTables)this.subjects =[]
      else this.subjects = await this.requestSubjects(themeCode)
    },
    // 获取度量
    async getFacts(themeCode) {
      if(!this.requestThemeTables)this.facts =[]
      else this.facts = await this.requestFacts(themeCode)
    },
    async changeThemeTable() { // 切换主题表
       if(this.left.themeCode){
         this.left.subject=""
         this.left.fact=""
         await this.getSubjects(this.left.themeCode)
         await this.getFacts(this.left.themeCode)
       }

    },
    clickRight(){ // 验证
        let validate=false
        if( this.left.themeCode && this.left.subject && this.left.fact && this.left.period){
          let reg = /^\+?[1-9][0-9]*$/
          if(this.left.period==="N"){
            if(reg.test(this.left.N))validate=true
            else this.$message({message: '期间数请输入正整数！',type: 'warning'});
          }else if(this.left.period!=="N")validate=true
        }else this.$message({ message: '主题表、科目、度量、期间每项选择一个',type: 'warning'});

        if(validate){ // 进入右侧
            // 度量_科目_期间_表编码
          let formula=[]
          formula.push(this.left.fact)
          formula.push(this.left.subject)
          if(this.left.period==="N") formula.push(this.left.N*100)
          else formula.push(this.left.period)
          formula.push(this.left.themeCode)
          formula.join('_')
          let activeSubject =  this.subjects.find(subject=>subject.code===this.left.subject)
          let activeFact =  this.facts.find(fact=>fact.id===this.left.fact)
          // let len = this.formulas.length
    // if( !len || (len && (this.formulas[len-1].type==="symbol" || this.formulas[len-1].type==="("))){
    //
    //   this.formulas.push({value:formula,text:activeSubject.text+"("+activeFact.text+")",type:"dim"})
    // }
          this.clickCalculator({value:formula,text:activeSubject.text+"("+activeFact.text+")",type:"dim"})

        }
    },
    /**
     * @desc 数字：可以出现在第一个，只能有一个小数点；
     *       符号：不能连续出现,不能出现在第一个；
     *       维度：不能连续出现;
     * @author shj
     * @params
     */
    clickCalculator({value,text,type}){
       let formula=null
      let len =this.formulas.length
      let last = null
      let isPush = false
      if(len)last=this.formulas[len-1]
      if(len && type!=="number" && this.formulas[len-1].type==='number' && this.formulas[len-1].value.endsWith(".")  ){ // 去除上一个小数点
        let beforeValue = this.formulas[len-1].value.substring(0,this.formulas[len-1].value.length-1)
        this.formulas.splice(len-1,1,{text:beforeValue,value:beforeValue,type:"number"})
      }
      if(type==="symbol" ){ // 点击即显示: 不能第一个出现，也不能连续出现
        if(last && last.type!=="symbol"){
          isPush = true
          formula={value:text,text:text,type:type}
        }
      }else if(type==="number"){
        if((!len && value!=="." )|| (last && last.type!=="number" && last.type !==")" && last.type !=="dim" ) ){
          isPush = true
          formula={text:text,value:value,type:type}//小数点不能单独出现
        }
        else if(last && last.type==="number"){ //
          if(value!=="." || (value==="." && last.value.indexOf(".")<0)){// 只能出现一次小数点
            formula={text:last.value+value,value:last.value+value,type:type}
            isPush = true
            this.formulas.splice(len-1,1)
          }
        }
      }else if(type==="dim"){
        if( !len || (len && (this.formulas[len-1].type==="symbol" || this.formulas[len-1].type==="("))){
          this.formulas.push({value,text,type})
        }
      }else if(type==="empty"){// 全部清除
        this.formulas.splice(0)
      }else if(type==="oneEmpty" && len){ // 清除最后一个
        this.formulas.splice(len-1,1)
      }else if(type==="function"){
          if(value==="abs"){
            isPush = true
            formula={text:"abs",value:value,type:"function"}
          }
      }

      if(isPush && formula)this.formulas.push(formula)
    },

    delFormual(index){
      this.formulas.splice(index,1)
    }
  }
}
</script>

<style scoped lang="scss">
.formula{
  display: flex;
  flex-direction: row;
  height:100%;
  .left{
    display: flex;
    width: 40%;
    flex-direction: column;
    border: 1px solid #E4E4E4;
    margin-top: 20px;
    overflow-y: auto;
    .el-collapse{
      border: transparent;
      .el-collapse-item{
        margin-bottom:4px;
        ::v-deep.el-collapse-item__content{
          padding-top: 8px;
        }
        ::v-deep .el-collapse-item__header{
          height: 38px;
          line-height: 38px;
          background-color: #E4E4E4;
          padding-left: 8px;
        }
      }
    }


  }
  .right{
    width: 56%;
    border: 1px solid #E4E4E4;
    margin-top: 20px;
    padding: 20px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    .right-head{

      flex:1;
      display: flex;
      flex-direction: row;
      .formula-content{
        width: 100%;
        min-height: 100px;
        border: 1px solid #E4E4E4;
        height: fit-content;
        .formula-item{
          display: flex;
          position: relative;

          &:hover{
            border: 1px dashed #f56c6c;
            border-radius:4px ;
          }
          &:hover .badge{
            display: flex;
          }
          .badge{
            cursor: pointer;
            display: none;
            justify-content: center;
            align-items: center;
            width: 20px;
            height: 20px;
            color: #fff;
            background-color: #f56c6c;
            border-radius: 50%;
            position: absolute;
            top: -8px;
            left: -10px;
          }
        }

      }
    }
    .calculator{
      width: 100%;
      display: flex;
      justify-content: center;
      .btns{
        width: 260px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-top: 8px;
        .calculator-btn{
          width: 60px;
          height: 48px;
          background-color: #eee;
          margin: 4px 0 0 4px;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          &:active{
            opacity: .7;
            margin-top:-1px;
          }
        }
        .activeFunction{
          background-color: #409EFF;
          color: #fff;
        }
      }

    }
  }
  .middle{
    width: 40px;
    min-width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

}
</style>
<style scoped>
  .mr8{
    margin-right: 8px;
    flex-shrink: 0;
  }
  .mr4{
    margin-right: 4px;
  }
  /deep/.el-select{
    width: 100%;
  }
  /deep/.el-radio{
    margin-top: 4px;
    margin-right: 10px;
  }
</style>
