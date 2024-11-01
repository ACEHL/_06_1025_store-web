<template>
  <div class='operation'>
    <el-table :data="typeList" border>
      <el-table-column label="序号">
        <template #default="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品类型" prop="name">
        <template #default="scope">
          <span v-if="scope.row.active">{{ scope.row.type }}</span>
          <el-input v-else v-model="scope.row.type" size="small" style="width: 100px"
                    @change="update(scope.row)"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="商品类型名称" prop="name">
        <template #default="scope">
          <span v-if="scope.row.active">{{ scope.row.name }}</span>
          <el-input v-else v-model="scope.row.name" size="small" style="width: 100px"
                    @change="update(scope.row)"></el-input>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>

import {getCurrentInstance, onMounted, ref,} from "vue";
import http from "@/utils/http";
import axios from "axios";
import {ElMessage} from "element-plus";
import { useStore } from '@/store/useStore.js'
import {storeToRefs} from "pinia";

const { typeList } = storeToRefs(useStore());

const instance = getCurrentInstance();


const edit = (row) => {
  row.active = !row.active;
}
const update = (row) => {
  http.post("/type/update", row).then(res => {
    if (res.code === "200") {
      ElMessage.success("修改成功");
    }else{
      ElMessage.error("修改失败");
    }
  });
}

const remove = (row) => {
  http.post("/type/remove", row).then(res => {
    if (res.code === "200") {
      ElMessage.success("删除成功");
      getList();
    }else{
      ElMessage.error("删除失败");
    }
  });
}

onMounted(() => {
  getList();
});

const getList = ()=>{
  http.get("/type/list").then(res => {
    typeList.value = [];
    if (res.code === "200") {
      res.data.forEach(item=>{
        item.active = true;
        typeList.value.push(item)
      })
    }
  });
}

</script>

<style scoped lang="scss">

.operation{

  .el-input{
    width: 200px !important;
    height: 30px;
    font-size: 14px;
  }
}
</style>
