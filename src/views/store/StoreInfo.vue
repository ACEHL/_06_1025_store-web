<template>
  <div class='store-info'>
    <Search :path="path"></Search>
    <Operation></Operation>
  </div>
</template>

<script setup>
import Search from "@/components/search/Search.vue";
import Operation from "@/components/operation/Operation.vue";

import {ref} from "vue";

let path = ref("/stored/search");



</script>

<style scoped lang="scss">
.store-info{

}
</style>
