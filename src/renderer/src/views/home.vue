<template>
  <div class="iframe_box">
    <iframe
      id="iframe_dom"
      src="http://localhost:3000/#/home?showDom=10086"
      style="border: none"
    ></iframe>
    <!-- <iframe id="iframe_dom" src="http://localhost:3000/#/edit/32130" frameborder="0"></iframe> -->
    <div v-if="counterStore.counState.typeLoding" class="iframe_spin flex_center">
      <a-spin tip="Loading..."> </a-spin>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { ExportEditData } from '../utils/edit_data'
import { useCounterStore } from '../stores/index'
const counterStore = useCounterStore()
const handleMessage = (e) => {
  ExportEditData(e.data)
}
onMounted(() => {
  window.addEventListener('message', handleMessage, false)
})
</script>

<style scoped lang="less">
.iframe_box {
  position: relative;

  #iframe_dom {
    width: 100%;
    height: 100vh;
  }

  .iframe_spin {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(255, 255, 255, 0.6);
  }
}
</style>
