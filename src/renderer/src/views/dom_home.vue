<template>
  <div class="dom_home">
    <div class="dom_head flex_center">离线PPT</div>
    <div class="dom_main">
      <DomLi
        v-for="(item, index) in state.data"
        :key="index"
        :item="item"
        :index="index"
        @dom_item="dom_item"
        @recover-item="recoverItem"
      >
      </DomLi>
    </div>
    <MaModal
      :visible-list="state.visibleList"
      :visible-data="state.visibleData"
      @cancel_edit="cancelMaModal"
    ></MaModal>
  </div>
</template>

<script setup>
import { openDB } from 'idb'
import { onMounted, reactive } from 'vue'
import MaModal from '../components/ppt/pptmodal.vue'
import { ExportEditCss } from '../utils/edit_utils'
import DomLi from '../components/ppt/DomItem.vue'
import { useCounterStore } from '../stores/index'
const counterStore = useCounterStore()
let state = reactive({
  IdList: [],
  data: [],
  visibleList: false,
  visibleData: {}
})
// 点击预览
const dom_item = (item) => {
  console.log('item', item)
  state.visibleList = true
  state.visibleData = item
  ExportEditCss(item.ThemeNameCss)
}
// 删除离线
const recoverItem = (item, index) => {
  let res_id = state.IdList[index]
  state.data.splice(index, 1)
  state.IdList.splice(index, 1)
  counterStore.DbDeleteFn('edit_data', res_id)
}
const cancelMaModal = () => {
  state.visibleList = false
}
// 获取openDb里面的数据，渲染到页面上
onMounted(async () => {
  const db = await openDB('mindshow_dom', 1, {
    upgrade(db) {
      db.createObjectStore('edit_data')
    }
  })
  state.IdList = await db.getAllKeys('edit_data')
  state.data = await db.getAll('edit_data')
})
</script>

<style scoped lang="less">
.dom_main {
  margin: 0 40px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.dom_head {
  margin: 40px 0;
  font-size: 40px;
  font-weight: bold;
}
</style>
