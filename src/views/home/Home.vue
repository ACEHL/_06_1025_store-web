<template>
  <div class='home'>
    <el-row>
      <el-col :span="collapse?1:4" >
        <LeftMenu @getC="getCollapse" :style="{width:collapse?'64px':''}"></LeftMenu>
      </el-col>
      <el-col :span="collapse?23:20">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import LeftMenu from "@/components/common/LeftMenu.vue";
import {ref, watch} from "vue";

let collapse = ref();

const getCollapse = (e)=>{
  collapse.value = e.val;
}

</script>

<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;
  //background-color: rgb(240, 242, 245);

  .el-row {
    height: 100vh;
    .el-col {
      height: 100vh;
    }
  }
}
</style>
