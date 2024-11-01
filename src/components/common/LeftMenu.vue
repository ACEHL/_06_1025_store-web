<script setup>
import {ref, watch} from "vue";
import router from "@/router";

let collapse = ref(false)
const emit = defineEmits(["getC"]);

watch(collapse, () => {
  console.log("向父组件发送消息",collapse.value);
  emit('getC', {val:collapse.value});
});

const chooseList = ref([
  [{path : '/store-info'},{path:'/store-add'}],
  [{path : '/type-info'},{path:'/type-add'}],
  [{path : '/goods-info'},{path:'/goods-add'}],
])


const handleOpen = (e)=>{
  console.log(e)
}

const handleClose = (e)=>{
  console.log(e)
}

const handleSelect = (e)=>{
  let i1 = e[0];
  let i2 = e[2];
  router.push({path : chooseList.value[i1][i2].path})
}
</script>

<template>
  <div class="left-menu">
    <el-menu
        default-active="0-0"
        class="el-menu-vertical-demo"
        :collapse="collapse"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect"
        :unique-opened=true
    >
      <div class="collapse" @click="collapse = !collapse" :style="{textAlign:!collapse?'end':''}">
        {{ !collapse ? '仓库管理系统' : '' }}
        <el-icon v-if="!collapse" style=" position : absolute ; margin : 0 0 0 230px"><ArrowLeftBold /></el-icon>
        <el-icon v-else><ArrowRightBold /></el-icon>
      </div>
      <el-sub-menu index="0">
        <template #title>
          <el-icon>
            <location/>
          </el-icon>
          <span>仓库管理</span>
        </template>
        <el-menu-item index="0-0">仓库信息管理</el-menu-item>
        <el-menu-item index="0-1">仓库信息添加</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="1">
        <template #title>
          <el-icon><Memo /></el-icon>
          <span>商品分类管理</span>
        </template>
        <el-menu-item index="1-0">商品分类管理</el-menu-item>
        <el-menu-item index="1-1">商品分类添加</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <el-icon><Files /></el-icon>
          <span>商品管理</span>
        </template>
        <el-menu-item index="2-0">商品管理</el-menu-item>
        <el-menu-item index="2-1">商品添加</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<style scoped lang="scss">
.left-menu{
  height: 100%;
  .el-menu{
    height: 100%;
  }
  .collapse {
    position: relative;
    height: 40px;
    line-height: 40px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 17px;

  }
}
</style>
