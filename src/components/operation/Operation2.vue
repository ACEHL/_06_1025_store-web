<template>
  <div class='operation'>
    <el-table :data="goodsList" border>
      <el-table-column label="序号">
        <template #default="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="name">
        <template #default="scope">
          <span v-if="scope.row.active">{{ scope.row.name }}</span>
          <el-input v-else v-model="scope.row.name" size="small" style="width: 100px"
                    @change="update(scope.row)"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="上架时间" prop="listingTime">
        <template #default="scope">
          <span v-if="scope.row.active">{{ scope.row.listingTime }}</span>
          <el-input v-else v-model="scope.row.listingTime" size="small" style="width: 100px"
                    @change="update(scope.row)"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="保质期" prop="bestBeforeTime">
        <template #default="scope">
          <span v-if="scope.row.active">{{ scope.row.bestBeforeTime }}</span>
          <el-input v-else v-model="scope.row.bestBeforeTime" size="small" style="width: 100px"
                    @change="update(scope.row)"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="商品数量" prop="count">
        <template #default="scope">
          <span v-if="scope.row.active">{{ scope.row.count }}</span>
          <el-input v-else v-model="scope.row.count" size="small" style="width: 100px"
                    @change="update(scope.row)"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="商品单价" prop="price">
        <template #default="scope">
          <span v-if="scope.row.active">{{ scope.row.price }}</span>
          <el-input v-else v-model="scope.row.price" size="small" style="width: 100px"
                    @change="update(scope.row)"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="商品总价" prop="money">
        <template #default="scope">
          <span >{{ (scope.row.count * scope.row.price).toFixed(2) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination background layout="prev, pager, next"  :total="total"
      @change="hanldChange"
    />
  </div>
</template>

<script setup>

import {getCurrentInstance, onMounted, ref,} from "vue";
import http from "@/utils/http";
import axios from "axios";
import {ElMessage} from "element-plus";
import { useStore } from '@/store/useStore.js'
import {storeToRefs} from "pinia";

const { goodsList ,storeList , typeList , total} = storeToRefs(useStore());


let isChange = false ;
const edit = (row) => {
  row.active = !row.active;
  if (row.active && isChange){
    // 执行更新
    row.money = (row.count * row.price).toFixed(2)
    change(row)
  }
}

const change = (row) => {
  http.post("/goods/update", row).then(res => {
    if (res.code === "200") {
      ElMessage.success("修改成功");
    }else{
      ElMessage.error("修改失败");
    }
  });
}

const update = (row) => {
  isChange = true ;
}

const remove = (row) => {
  http.post("/goods/remove", row).then(res => {
    if (res.code === "200") {
      ElMessage.success("删除成功");
      getList();
    }else{
      ElMessage.error("删除失败");
    }
  });
}

const hanldChange = (val) => {
  getList(val)
}

onMounted(() => {
  getList(1);
});

const getList = (current)=>{
  http.post("/goods/page", {total:10 ,pages: 10, size : 10 , current}).then(res => {
    goodsList.value = [];
    if (res.code === "200") {
      console.log(res.data.total)
      total.value = res.data.total;
      res.data.records.forEach(item=>{
        item.active = true;
        goodsList.value.push(item)
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

  .el-pagination{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
}
</style>
