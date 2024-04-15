<template>
  <div class="dom_home">
    <div class="dom_head flex_center">
      离线PPT
    </div>
    <div class="dom_main">
      <DomLi v-for="(item, index) in state.data" :key="index" :item="item" :index="index" @dom_item="dom_item"
        @recover-item="recoverItem">
      </DomLi>
    </div>
    <MaModal :visible-list="state.visibleList" :visible-data="state.visibleData" @cancel_edit="cancelMaModal"></MaModal>
    <a-button type="primary" class="returnToTheMainPage" @click="router_fn"
      v-if="counterStore.currentNetwork">返回主页面</a-button>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import MaModal from '../components/ppt/pptmodal.vue'
import { ExportEditCss, ExportEditCssTwo } from '../utils/edit_utils'
import DomLi from '../components/ppt/DomItem.vue'
import { useCounterStore } from '../stores/index'
import circularJson from 'circular-json'
import { useRouter } from 'vue-router'
const Router = useRouter()
const counterStore = useCounterStore()
let state = reactive({
  IdList: [],
  data: [],
  visibleList: false,
  visibleData: {}
})
// 点击预览
const dom_item = (item) => {
  counterStore.counState.previewData = item
  let obj = circularJson.stringify(item)
  ExportEditCssTwo(item.ThemeName)
  ExportEditCss(item.ThemeNameCss)
  counterStore.DbPutFn('edit_preview', obj, 'previewData')
  Router.push('/preview/1')
  return
  state.visibleList = true
  state.visibleData = item
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
// 返回主页面
const router_fn = () => {
  Router.push('/home')
}
// 获取openDb里面的数据，渲染到页面上
onMounted(async () => {
  let res_data = await counterStore.DbGetFn()
  state.IdList = res_data.IdList
  state.data = res_data.data
})
</script>

<style scoped lang="less">
.dom_home {
  position: relative;

  .returnToTheMainPage {
    position: absolute;
    left: 40px;
    top: 20px;
  }
}

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
