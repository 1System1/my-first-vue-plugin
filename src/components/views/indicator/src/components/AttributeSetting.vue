<template>
  <el-form ref="attributes" :model="attributes" label-position="right" label-width="130px" style="padding: 20px 32px 0 32px;">
    <el-form-item label="指标别名">
      <el-input v-model="attributes.nickname" placeholder="请输入指标别名"></el-input>
    </el-form-item>
    <el-form-item label="指标描述" prop="name">
      <el-input v-model="attributes.Info" type="textarea" :rows="2" placeholder="请输入指标描述"></el-input>
    </el-form-item>
    <el-form-item label="是否支持单位切换">
      <el-radio-group v-model="attributes.changeUnit">
        <el-radio :label="1">是</el-radio>
        <el-radio :label="0">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="正反指标">
      <el-radio-group v-model="attributes.type">
        <el-radio :label="'1'">正向指标</el-radio>
        <el-radio :label="'2'">反向指标</el-radio>
        <el-radio :label="'3'">中性指标</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="默认图形">
      <el-select v-model="attributes.img" placeholder="请选择默认图形">
        <el-option
          v-for="item in imgs"
          :key="item.code"
          :label="item.text"
          :value="item.code">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="默认分析文字">
      <el-input v-model="attributes.analyse" type="textarea" :rows="2" placeholder="请输入默认分析文字"></el-input>
    </el-form-item>
    <el-form-item label="是否私有">
      <el-radio-group v-model="attributes.isPrivate">
        <el-radio :label="1">是</el-radio>
        <el-radio :label="0">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="是否启用">
      <el-radio-group v-model="attributes.isEnable">
        <el-radio :label="1">是</el-radio>
        <el-radio :label="0">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="对标参数">
      <el-select v-model="attributes.param" placeholder="请选择对标参数">
        <el-option
          v-for="item in params"
          :key="item.code"
          :label="item.text"
          :value="item.code">
        </el-option>
      </el-select>
    </el-form-item>
  </el-form>

</template>

<script>
/*属性设置*/
export default {
  name: "AttributeSetting",
  props:{
    indicator:{
      type:Object,
      required:true
    }
  },
  data(){
    return{
      imgs:this.indicator.attributesImgs,// 图形
      params:this.indicator.attributesParams,// 对标参数
      attributes:this.indicator.attributes,
    }
  }
}
</script>

<style scoped>
  /deep/.el-select{
    width: 100%;
  }
</style>
