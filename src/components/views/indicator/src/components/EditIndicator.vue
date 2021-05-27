<template>
  <el-dialog
    :visible.sync="visible"
    width="70%"
    :close-on-click-modal="false"
    :before-close="handleClose">
    <div  slot="title" class="dialog-title">
      <span>新增指标</span>
    </div>
    <div class="body">
        <el-steps :active="defaultActive" simple process-status="process" finish-status="success">
          <el-step v-for="(item ,index) in steps" :title="item" :key="index" icon="null"></el-step>
        </el-steps>
       <div class="body-content">
         <!--基础信息-->
         <basic-info v-if="!defaultActive" ref="basicInfo" :indicator.sync="indicator"></basic-info>
         <!--公式设置-->
         <formula-setting
           v-if="defaultActive===1" ref="formula"
           :indicator.sync="indicator"
           :requestThemeTables="requestThemeTables"
           :requestSubjects="requestSubjects"
           :requestFacts="requestFacts"
         >
         </formula-setting>
         <!--属性设置-->
         <attribute-setting  v-if="defaultActive===2" ref="attribute" :indicator.sync="indicator"></attribute-setting>
       </div>
    </div>
    <div  slot="footer">
      <el-button type="primary" @click="upStep" v-if="defaultActive!==0">上一步</el-button>
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="nextStep" v-if="defaultActive!==2">下一步</el-button>
      <el-button type="primary" @click="saveIndicator" v-if="isShowSaveBtn">保存</el-button>
    </div>

  </el-dialog>
</template>

<script>
import Indicator from "./Indicator"
export default {
  name: "EditIndicator",
  props:{
    visible:{
      type:Boolean,
      default:false
    },
    status:{
      type:String,
      required:true
    },

    requestThemeTables:{
      type:Function,
      default:null
    },
    requestSubjects:{
      type:Function,
      default:null
    },
    requestFacts:{
      type:Function,
      default:null
    }
  },
  components:{
    BasicInfo:()=>import("./BasicInfo"),
    AttributeSetting:()=>import("./AttributeSetting"),
    FormulaSetting:()=>import("./FormulaSetting")
  },
  data(){
    return{
      defaultActive:1, // 默认步骤
      steps:["1.基础信息","2.公式设置","3.属性设置"],
      indicator:null, // 指标信息
    }
  },
  computed:{
    isShowSaveBtn(){ // 保存按钮什么时候显示
      if(this.status==="insert" && this.defaultActive===2)return true
      else if(this.status==="edit") return true
      return false
    }
  },
  created(){
    this.indicator = Indicator.getInstance().getIndicator()
  },
  methods:{
    handleClose(){
      Indicator.getInstance().removeIndicator()
      this.$emit("update:visible",false)
    },
    // 下一步
    nextStep(){
      let validate =true
      if(this.defaultActive===0)validate = this.$refs.basicInfo.submitBasicInfo()

      if(this.defaultActive<2 && validate)this.defaultActive++
    },
    saveIndicator(){

    },
    // 上一步
    upStep(){
      if(this.defaultActive>0)this.defaultActive--
    }
  }
}
</script>

<style lang="scss">
  .body{
    height: 100%;
    display: flex;
    flex-direction: column;
    .body-content{
      overflow-y: auto;
      flex: 1;
    }
  }

</style>
<style scoped>
  /deep/.el-dialog{
    height: 70%;
    display: flex;
    flex-direction: column;
  }
  /deep/.el-dialog__body {
    padding: 20px 24px ;
    height: 100%;
    overflow: hidden;
  }
  /deep/.el-dialog__header {
    padding: 15px 24px;
    border-bottom: 1px solid #E4E4E4;
  }
  /deep/.el-dialog__footer{
    border-top: 1px solid #E4E4E4;
    padding: 12px 24px;
  }
</style>
