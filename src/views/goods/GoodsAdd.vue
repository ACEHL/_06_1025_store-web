<template>
  <div class='store-add'>
    <el-form ref="formRef" :model="form" label-width="200px" class="demo-ruleForm" :rules="rules">
      <el-form-item label="请选择仓库" prop="storedId">
        <el-select class="goods-sel" clearable  v-model="form.storedId" placeholder="请选择仓库"  >
          <el-option
              v-for="item in storeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="请选择商品分类" prop="typeId">
        <el-select class="goods-sel" clearable  v-model="form.typeId" placeholder="请选择商品分类"  >
          <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="商品名称" prop="name">
        <el-input class="form-ipt" v-model="form.name" placeholder="请输入商品名称"></el-input>
      </el-form-item>

      <el-form-item label="请选择上架时间" prop="listingTime">
        <el-date-picker style="width: 400px;"
            v-model="form.listingTime"
            type="date"
            placeholder="选择日期"
        />
      </el-form-item>
      <el-form-item label="请选择保质期" prop="bestBeforeTime">
        <el-date-picker style="width: 400px;"
            v-model="form.bestBeforeTime"
            type="date"
            placeholder="选择日期"
        />
      </el-form-item>

      <el-form-item label="商品数量" prop="count">
        <el-input class="form-ipt" v-model="form.count" placeholder="请输入商品数量" @change="jiSuan"></el-input>
      </el-form-item>

      <el-form-item label="商品单价" prop="price">
        <el-input class="form-ipt" v-model="form.price" placeholder="请输入商品单价" @change="jiSuan"></el-input>
      </el-form-item>
      <el-form-item label="商品金额" prop="money">
        <el-input class="form-ipt" v-model="form.money" placeholder="请输入商品金额" disabled></el-input>
      </el-form-item>
      <!--(scope.row.count * scope.row.price).toFixed(2)-->
      <el-form-item>
        <el-button class="form-but" type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import {ref, reactive, onMounted} from "vue";
import {ElForm, ElFormItem, ElInput, ElMessage} from "element-plus";
import http from "@/utils/http";
import router from "@/router/index.js";
import { useStore } from '@/store/useStore.js'
import {storeToRefs} from "pinia";

const { storeList,typeList, goodsList } = storeToRefs(useStore());

const jiSuan = () => {
  form.money = form.count * form.price;
}

onMounted(()=>{
  if (!storeList.value){
    console.log("search stored list ")
    http.get("/stored/list").then(res => {
      console.log(res)
      if (res.code === "200") {
        storeList.value = [] ;
        res.data.forEach(item=>{
          item.active = true;

          storeList.value.push(item)
        })
      }
    });
  }

  if (!typeList.value){
    http.get("/type/list").then(res => {
      if (res.code === "200") {
        typeList.value = [] ;
        res.data.forEach(item=>{
          item.active = true;
          typeList.value.push(item)
        })
      }
    });
  }

  if (!goodsList.value){
    http.get("/goods/list").then(res => {
      if (res.code === "200") {
        goodsList.value = [] ;
        res.data.forEach(item=>{
          item.active = true;
          goodsList.value.push(item)
        })
      }
    });
  }
})


const formRef = ref();

const form = reactive({
  storedId: "",
  typeId: "",
  name: "",
  listingTime: "",
  bestBeforeTime: "",
  count: '',
  price: '',
  money: "",
});

const rules = reactive({
  storedId: [
    {required: true, message: "请选择仓库", trigger: "change"},
  ],
  typeId: [
    {required: true, message: "请选择商品分类", trigger: "change"},
  ],
  name: [
    {required: true, message: "请输入商品名称", trigger: "blur"},
    {min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur"},
  ],
  listingTime: [
    {required: true, message: "请选择上架时间", trigger: "change"},
  ],
  bestBeforeTime: [
    {required: true, message: "请选择保质期", trigger: "change"},
  ],
  count: [
    {required: true, message: "请输入商品数量", trigger: "blur"},
  ],
  price: [
    {required: true, message: "请输入商品单价", trigger: "blur"},
  ]
});

const submitForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      form.money = (form.count * form.price).toFixed(2)

      http.post("/goods/save",form).then(res=>{
        if (res.code === "200"){
          ElMessage.success("添加成功");
          setTimeout(() => {
            router.push({path: "/goods-info"});
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

  .el-date-editor{
    width: 400px !important;
    background-color: red;
  }
  .goods-sel{
    width: 400px !important;
  }
  .form-ipt{
    min-width: 400px;
  }
  .form-but{
    min-width: 200px;
    margin: 0 auto;
  }
}
</style>
