<template>
  <div>
    <a-modal :open="visibleList" @cancel="cancelFn" width="700px">
      <div id="ppt_result" :class="visibleData?.ThemeName">
        <template v-if="visibleData.html_arr">
          <div class="ppt_result_item" v-for="(items, index) in  visibleData.html_arr" :key="index">
            <pptvue :items="items" :index="index"></pptvue>
          </div>
        </template>
      </div>
    </a-modal>
  </div>

</template>

<script setup>
import { onMounted } from 'vue';
import pptvue from '../../components/ppt/ppt.vue'

const props = defineProps({
  visibleData: Object,
  visibleList: Boolean
})
const emit = defineEmits(['cancel_edit'])
const cancelFn = () => {
  emit('cancel_edit')
}
onMounted(() => {
})
</script>

<style scoped lang="less">
#ppt_result {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  background: #edf0f2;
  gap: 20px;

  .ppt_result_item {
    width: 700px;
    height: 324px;
    overflow: hidden;
  }
}
</style>
