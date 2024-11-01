<template>
  <div class='store-add'>
    <el-form ref="formRef" :model="form" label-width="100px" class="demo-ruleForm" :rules="rules">
      <el-form-item label="商品类别" prop="name">
        <el-input class="form-ipt" v-model="form.name" placeholder="请输入商品类别"></el-input>
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
import { useStore } from '@/store/useStore.js'
import {storeToRefs} from "pinia";

const { typeList } = storeToRefs(useStore());


const formRef = ref();

const form = reactive({
  type: "",
  name: "",
});

const rules = reactive({
  name: [
    {required: true, message: "请输入仓库名称", trigger: "blur"},
    {min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur"},
  ],
});

const submitForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      form.type = typeList.value.length+1;

      http.post("/type/save",form).then(res=>{
        if (res.code === "200"){
          ElMessage.success("添加成功");
          setTimeout(() => {
            router.push({path: "/type-info"});
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
