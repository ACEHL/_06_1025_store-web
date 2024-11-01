<script setup>
import {ref} from "vue";
import http from "@/utils/http";
import { useStore } from "@/store/useStore.js";
import { storeToRefs } from "pinia";
import {ElMessage} from "element-plus";

const { storeList , typeList, goodsList , total } = storeToRefs(useStore());

let formRef = ref();
let form = ref({
  date: '',
  name: '',
});
const props = defineProps(['path'])

let list = ref([])

const changeList = (choose, list) => {
  console.log("改变的列表是 : ", list)
  console.log("choose : " , choose)
  switch (choose){
    case 'stored' : storeList.value = list ;break;
    case'type' : typeList.value = list ; break;
    case'goods' : goodsList.value = list ; break;
  }
}

const submit = async () => {
  let choose = props.path.split('/')[1] ;
  if (choose === 'goods'){
    // 查询goods的库存
    if (form.value.date === ''){
      // 没有查询参数
      console.log("没有查询参数")
      http.post("/"+choose+"/search",
          { page : {total:10 ,pages: 10, size : 10 , current : 1},keyword : form.value.name}
      ).then(res => {
        if (res.code === "200") {
          total.value = res.data.total;
          if(res.data.records !== null){
            list.value = [];
            res.data.records.forEach(item=>{
              item.active = true;
              list.value.push(item)
            })
            console.log("查询的结果是 : " , list.value)
            changeList(choose , list.value);
          }else{
            ElMessage.error("没有找到相关信息");
          }
        }
      });
    }else{
      console.log("查询goods的库存")
    }


  }else{
    if ( form.value.name === ''){
      console.log("没有查询参数")
      getList();
    }else{
      console.log(("查询"+choose))
      http.post("/"+choose+"/search", { keyword : form.value.name}).then(res => {
        if (res.code === "200") {
          if(res.data !== null){
            list.value = [];
            res.data.forEach(item=>{
              item.active = true;
              list.value.push(item)
            })
            console.log("查询的结果是 : " , list.value)
            changeList(choose , list.value);
          }else{
            ElMessage.error("没有找到相关信息");
          }
        }
      });
    }
  }


}

const reset = () => {
  form.value = {
    date: '',
    name: '',
  }
};

const getList = ()=>{
  let choose = props.path.split('/')[1] ;
  http.get("/"+choose+"/list" , ).then(res => {
    list.value = [];
    if (res.code === "200") {
      console.log(res.data)
      res.data.forEach(item=>{
        item.active = true;
        list.value.push(item)
      })
      changeList(choose,list.value);
    }
  });
}
</script>

<template>
  <div class="search">
    <el-form class="form" :model="form" label-width="80px" ref="formRef" status-icon>
      <el-form-item label="" prop="name">
        <el-input class="search-ipt" v-model="form.name" type="text" placeholder="请输入要检索的内容"></el-input>
      </el-form-item>
      <el-button class="search-btn" type="primary" @click="submit">搜索</el-button>
      <el-button class="search-btn" type="warning" @click="reset">重置</el-button>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.search {
  width: 100%;
  height: 50px;
  background-color: #EBEBEB;

  .form {
    display: flex;
    align-items: center;

    .search-ipt {
      width: 250px;
      margin: 9px 10px 0 10px;
    }

    .search-date {
      width: 400px;
      margin: 9px 0 0 10px;

    }

    .search-btn {
      margin: -8px 10px 0 0px;
    }
  }

}
</style>
