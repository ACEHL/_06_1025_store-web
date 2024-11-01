<template>
  <div class='store-info'>
    <Search :path="path"></Search>
    <Operation1></Operation1>
  </div>
</template>

<script setup>
import Search from "@/components/search/Search.vue";
import Operation1 from "@/components/operation/Operation1.vue";

import {ref} from "vue";

let path = ref("/type/search");



</script>

<style scoped lang="scss">
.store-info{

}
</style>
