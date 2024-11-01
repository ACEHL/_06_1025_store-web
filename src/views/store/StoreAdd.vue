<template>
  <div class='store-add'>
    <el-form ref="formRef" :model="form" label-width="100px" class="demo-ruleForm" :rules="rules">
      <el-form-item label="仓库名称" prop="name">
        <el-input class="form-ipt" v-model="form.name" placeholder="请输入仓库名称"></el-input>
      </el-form-item>
      <el-form-item label="仓库地址" prop="address">
        <el-input v-model="form.address" placeholder="请输入仓库地址"></el-input>
      </el-form-item>
      <el-form-item label="管理员姓名" prop="manager">
        <el-input v-model="form.manager" placeholder="请输入管理员姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="form-but" type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import {ref, reactive} from "vue";
import {ElForm, ElFormItem, ElInput, ElMessage} from "element-plus";
import http from "@/utils/http";
import router from "@/router/index.js";


const formRef = ref();

const form = reactive({
  name: "",
  address: "",
  manager: "",
});

const rules = reactive({
  name: [
    {required: true, message: "请输入仓库名称", trigger: "blur"},
    {min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur"},
  ],
  address: [
    {required: true, message: "请输入仓库地址", trigger: "blur"},
    {min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur"},
  ],
  manager: [
    {required: true, message: "请输入管理员姓名", trigger: "blur"},
  ],
});

const submitForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      http.post("/stored/save",form).then(res=>{
        if (res.code === "200"){
          ElMessage.success("添加成功");
          setTimeout(() => {
            router.push({path: "/home"});
          },1500);
        }else{
          ElMessage.error("添加失败");
        }
      })
    } else {
      console.log("error submit!!");
      return false;
    }
  });
};
</script>

<style scoped lang="scss">
.store-add {
  width: 50%;
  height: 100%;
  margin: 30px auto 0 auto;
  min-width: 500px;
  display: flex;
  justify-content: center;

  .form-ipt{
    min-width: 400px;
  }
  .form-but{
    min-width: 200px;
    margin: 0 auto;
  }
}
</style>
