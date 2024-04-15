<template>
  <router-view></router-view>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'

onMounted(() => {
  // 时刻监视当前有没有网络
  let online = ref(navigator.onLine)
  window.addEventListener('online', () => {
    online.value = true
  })
  window.addEventListener('offline', () => {
    online.value = false
  })
  watch(
    () => online.value,
    (newVal) => {
      console.log('newVal', newVal)
    },
    {
      immediate: true
    }
  )
})
</script>

<style scoped lang="less"></style>
