<template>
  <div class='store-info'>
    <Search :path="path"></Search>
    <Operation2></Operation2>
  </div>
</template>

<script setup>
import Search from "@/components/search/Search.vue";
import Operation2 from "@/components/operation/Operation2.vue";

import {ref} from "vue";

let path = ref("/goods/search");



</script>

<style scoped lang="scss">
.store-info{

}
</style>
