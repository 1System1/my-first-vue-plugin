<template>
  <!--基础信息-->
  <el-form ref="basicInfo" :model="basicInfo" label-position="right" label-width="100px" :rules="rules" style="padding: 20px 32px 0 32px;">
    <el-form-item label="指标编号">
      <el-input v-model="basicInfo.code" placeholder="请输入指标编号"></el-input>
    </el-form-item>
    <el-form-item label="指标名称" prop="name">
      <el-input v-model="basicInfo.name" placeholder="请输入指标名称"></el-input>
    </el-form-item>
    <el-form-item label="所属文件夹" prop="pid">
      <el-select v-model="basicInfo.pid" placeholder="请选择所属文件夹">
        <el-option
          v-for="item in pids"
          :key="item.code"
          :label="item.text"
          :value="item.code">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="时点时期">
      <el-radio-group v-model="basicInfo.tableType">
        <el-radio :label="'point'">时点</el-radio>
        <el-radio :label="'period'">时期</el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  /*基础信息*/
  name: "BasicInfo",
  props:{
    indicator:{
      type:Object,
      required:true
    }
  },
  data(){
    return{
      basicInfo:this.indicator.basicInfo,
      rules:this.indicator.basicInfoRules,
      pids:this.indicator.basicInfoPids,

    }
  },
  methods:{
    /**
     * @desc 表单提交验证
     * @author shj
     * @params
     */
      submitBasicInfo(){
        let validate = false
        this.$refs["basicInfo"].validate((valid) => {
          if (valid) {
            validate = true
            this.$emit("submitBasicInfo",this.basicInfo)
          } else {
            return false;
          }
        });
        return validate
      }
  }
}
</script>

<style scoped>
  /deep/.el-select{
    width: 100%;
  }
</style>
