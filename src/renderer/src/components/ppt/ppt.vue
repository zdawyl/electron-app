<template>
  <div
    :id="`ppt${index === 0 ? -1 : index - 1}`"
    class="pptclass pptconent"
    v-html="items ? items : ''"
    :style="{
      transform: `scale(${previewFlag})`
    }"
  ></div>
</template>

<script setup>
import { onMounted } from 'vue'
const props = defineProps({
  items: String,
  index: Number,
  previewFlag: Number
})

onMounted(() => {})
</script>

<style scoped lang="less">
.pptclass {
  width: 1920px;
  height: 1080px;
  transform: scale(0.3);
  display: flex;
  justify-content: center;
  transform-origin: left top;
  opacity: 1;

  // 从上开始的缩小
  foreignObject {
    overflow: visible;
  }

  .text-container {
    word-wrap: break-word;
  }

  .coverImg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .scaleImg {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
<style>
foreignObject {
  overflow: visible;
}

.text-container {
  word-wrap: break-word;
}

.coverImg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.scaleImg {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
