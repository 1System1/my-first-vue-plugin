<template>
  <div class="indicator">
    <!--搜素-->
      <div class="indicator-head">
        <div class="indicator-head-input">
          <el-input placeholder="名称、编码、别名、描述模糊搜索" v-model="keyWord" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="byKeySearch"></el-button>
          </el-input>
        </div>
       <div>
         <el-button  type="primary" @click="advancedSearchVisible=true">高级搜索</el-button>
       </div>
      </div>
    <!--内容-->
      <div class="indicator-main">
          <div class="main-head">
            <!--面包屑-->
            <div class="breadcrumb">
              <el-breadcrumb separator="/">
                <el-breadcrumb-item @click="clickBreadcrumb" v-for="(item,index) in breadcrumbs " :key="index">{{item.text}}</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <div class="util">
               <div class="btn">
                 <el-button  type="primary" @click="insertIndicator">新增指标</el-button>
                 <el-button  type="primary" @click="insertFolderVisible=true">新增文件夹</el-button>
               </div>
              <div class="icon">
                <i class="el-icon-refresh"/>
                <i class="el-icon-s-tools"/>
              </div>
            </div>
          </div>
          <div class="main-table">

          </div>
      </div>
    <!--新增文件夹-->
    <insert-folder :visible.sync="insertFolderVisible" @insertFolder="insertFolder" v-if="insertFolderVisible"> </insert-folder>
    <!--高级搜索-->
    <advanced-search :visible.sync="advancedSearchVisible" @conditionSearch="conditionSearch" v-if="advancedSearchVisible"></advanced-search>
    <!--指标编辑-->
    <edit-indicator
      :visible.sync="editIndicatorVisible"
      v-if="editIndicatorVisible"
      :status="'insert'"
      :requestThemeTables="requestThemeTables"
      :requestSubjects="requestSubjects"
      :requestFacts="requestFacts"
    ></edit-indicator>
  </div>
</template>

<script>
/*指标管理*/
export default {
  name: "indicator",
  components:{
    InsertFolder:()=>import("./components/InsertFolder"),
    AdvancedSearch:()=>import("./components/AdvancedSearch"),
    EditIndicator:()=>import("./components/EditIndicator")
  },
  data(){
    return{
      keyWord:"", // 关键字
      insertFolderVisible:false, // 添加文件夹
      advancedSearchVisible:false, // 高级搜索
      editIndicatorVisible:false, // 新增指标
      status:"",
      breadcrumbs:[
        {
          text:"首页",
          code:"1"
        },
        {
          text:"活动管理",
          code:"2"
        },
        {
          text:"活动列表",
          code:"3"
        }
      ] // 面包屑
    }
  },
  methods:{
    /**
     * @desc 关键字搜索
     * @author shj
     * @params
     */
    byKeySearch(){
      this.$emit("byKeySearch",this.keyWord)
    },
    /**
     * @desc 高级搜索
     * @author shj
     * @paramsform
     */
    conditionSearch(form){
      console.log("高级搜索参数---------------",form)
      this.$emit("conditionSearch",form)
    },
    clickBreadcrumb(){

    },
    /**
     * @desc 添加文件夹
     * @author shj
     * @params form
     */
    insertFolder(form){
      console.log("添加文件夹参数---------------",form)
      alert("添加文件夹,参数已打印")
    },
    /**
     * @desc  新增指标
     * @author shj
     * @params
     */
    insertIndicator(){
      this.status="insert"
      this.editIndicatorVisible=true

    },
    requestThemeTables(){
      return [
        {
          text:"主题1",
          code:"1001"
        },
        {
          text:"主题2",
          code:"1002"
        }
      ]
    },
    requestSubjects(themeCode){
      return [
        {
          text:"主题"+themeCode+"科目1",
          code:themeCode+"1"
        },
        {
          text:"主题"+themeCode+"科目2",
          code:themeCode+"2"
        }
      ]
    },
    requestFacts(themeCode){
      return [
        {
          text:"主题"+themeCode+"度量1",
          id:'1fact'+themeCode
        },
        {
          text:"主题"+themeCode+"科目2",
          id:'2fact'+themeCode
        }
      ]
    }

  }
}
</script>

<style scoped lang="scss">
.indicator{
  width: 100%;
  background-color: #eee;
  padding: 8px;
  display: flex;
  flex-direction: column;
  .indicator-head{
    display: flex;
    flex-direction: row;
    padding: 8px;
    background-color: #fff;
    .indicator-head-input{
      width: 400px;
      margin-right: 16px;
    }

  }
  .indicator-main{
    margin-top: 20px;
    flex: 1;
    background-color: #fff;
    padding: 8px;
    .main-head{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .util{
        display: flex;
        flex-direction: row;
        align-items: center;
        .icon{
          margin-left: 32px;
        }
      }
    }
  }

}
</style>
<style scoped>
  /deep/.el-input__inner{
    height: 32px;
    line-height: 32px;
  }
  /deep/.el-button{
    padding: 8px 20px;
  }
</style>
