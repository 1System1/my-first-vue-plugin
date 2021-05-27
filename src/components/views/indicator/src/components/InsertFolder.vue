<template>
  <el-dialog
    :visible.sync="visible"
    width="30%"
    :before-close="handleClose">
    <div  slot="title" class="dialog-title">
      <span>新增文件夹</span>
    </div>
    <div class="body">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="编号">
          <el-input v-model="form.code" placeholder="请输入编号"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入文件夹名称"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.info" type="textarea" placeholder="请输入描述"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div  slot="footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>

  </el-dialog>
</template>

<script>
/*新增文件夹*/
export default {
  name: "InsertFolder",
  props:{
    visible:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return{
      form:{
        code:"",
        name:"",
        info:""
      },
      rules:{
        name: [
          { required: true, message: '请输入文件夹名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    handleClose(){
        this.$emit("update:visible",false)
    },
    submitForm(){
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.$emit("conditionSearch",this.form)
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
