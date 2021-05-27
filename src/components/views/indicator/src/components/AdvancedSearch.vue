<template>
  <el-dialog
    :visible.sync="visible"
    width="30%"
    :before-close="handleClose">
    <div  slot="title" class="dialog-title">
      <span>高级搜索</span>
    </div>
    <div class="body">
      <el-form ref="form" :model="form" label-width="80px">
        <div style="display: flex;">
          <el-form-item label="正反指标:">
            <el-select v-model="form.type" placeholder="请选择" clearable >
              <el-option
                v-for="item in indicators"
                :key="item.value"
                :label="item.text"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时点时期:">
            <el-select v-model="form.tableType" placeholder="请选择" clearable>
              <el-option
                v-for="item in isHas"
                :key="item.value"
                :label="item.text"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div style="display: flex;">
          <el-form-item label="是否私有:">
            <el-select v-model="form.isPrivate" placeholder="请选择" clearable>
              <el-option
                v-for="item in isHas"
                :key="item.value"
                :label="item.text"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否启用:">
            <el-select v-model="form.isEnable" placeholder="请选择" clearable>
              <el-option
                v-for="item in isHas"
                :key="item.value"
                :label="item.text"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div  slot="footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>

  </el-dialog>
</template>

<script>
/*高级搜索*/
export default {
  name: "AdvancedSearch",
  props:{
    visible:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return{
      form:{
        type:"", // 正反指标
        tableType:"",// 时点时期
        isPrivate:"" ,// 是否私有
        isEnable:"" // 是否启用
      },
      isHas:[
        {
          text:"是",
          value:1
        },
        {
          text:"否",
          value:0
        }
      ],
      indicators:[
        {
          text:"正向指标",
          value:"1",
        },
        {
          text:"反向指标",
          value:"2",
        },
        {
          text:"中向指标",
          value:"3",
        },
        {
          text:"未知",
          value:"4",
        }
      ],
    }
  },
  methods:{
    handleClose(){
      this.$emit("update:visible",false)
    },
    submitForm(){
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.$emit("insertFolder",this.form)
          this.handleClose()
        } else {

          return false;
        }
      });
    }
  }
}
</script>

<style scoped>
  /deep/.el-dialog__body {
    padding: 30px 24px;
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
