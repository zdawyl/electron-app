<template>
  <div class="iframe_box">
    <template v-if="state.loadingObj.typeLoding">

      <iframe id="iframe_dom" src="" style="border: none"></iframe>
      <!-- <iframe id="iframe_dom" src="http://localhost:3000/#/edit/32130" frameborder="0"></iframe> -->
      <div v-if="counterStore.counState.typeLoding" class="iframe_spin flex_center">
        <a-spin tip="Loading..."> </a-spin>
      </div>
    </template>
    <template v-else>
      <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
        <template #extra>
          <a-button type="primary" @click="goToOfflinePage(1)">去离线页面</a-button>
          <a-button type="primary" @click="goToOfflinePage(2)">刷新当前页面</a-button>
        </template>
      </a-result>
    </template>
  </div>
</template>

<script setup>
import { onMounted, reactive, watch, createVNode } from 'vue'
import { ExportEditData } from '../utils/edit_data'
import { useCounterStore } from '../stores/index'
import { useRouter } from 'vue-router'
import circularJson from 'circular-json'
import { Modal } from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
const Router = useRouter()
const counterStore = useCounterStore()
const state = reactive({
  iframe_src: 'http://localhost:3000/#/home?showDom=10086',
  loadingObj: {
    typeLoding: true,
    type: false
  }
})
const handleMessage = (e) => {
  let data = e.data
  if (data === undefined) return
  if (typeof data !== 'string') return
  let res_data = circularJson.parse(data)
  if (res_data) {
    if (res_data.type === 'mindshow_edit_list') {
      ExportEditData(res_data)
    } else if (res_data.type === 'navigate_router') {
      if (res_data.data === 'ppt') {
        Router.push('/dom_home')
      }
    }

  }
}
const goToOfflinePage = (e) => {
  if (e === 1) {
    Router.push('/dom_home')
  } else {
    location.reload()
  }
}
onMounted(() => {
  window.addEventListener('message', handleMessage, false)
  // 获取id为iframe_dom的dom元素
  let iframe_dom = document.getElementById('iframe_dom')
  // iframe_dom的src为state.iframe，如果这个url没有加载成功，会触发onerror事件
  iframe_dom.onerror = function () {
    console.log('iframe_dom error')
    state.loadingObj.typeLoding = false
  }
  iframe_dom.onload = function () {
    console.log('iframe_dom load')
    state.loadingObj.typeLoding = true
  }
  if (iframe_dom) {
    iframe_dom
      .setAttribute('src', state.iframe_src)
  }
  watch(
    () => counterStore.currentNetwork,
    (newVal) => {
      if (!newVal) {
        Modal.confirm({
          title: '目前没有网络，是否去离线页面',
          icon: createVNode(ExclamationCircleOutlined),
          content: createVNode('div', { style: 'color:red;' }, 'Some descriptions'),
          onOk () {
            Router.push('/dom_home')
          },
          onCancel () {
            // Router.push('/home')
          },
          class: 'test'
        })
      }
    },
    {
      immediate: true,
      deep: true
    }
  )
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
