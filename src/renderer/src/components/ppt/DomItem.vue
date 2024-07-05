<template>
  <div
    class="dom_item flex_center"
    @mouseenter="item.HoverType = true"
    @mouseleave="item.HoverType = false"
  >
    <div class="dom_item_img flex_center" @click="dom_item(item)">
      <img :src="item.ThemeNameImg" @error="handleError(item)" alt="" />
    </div>
    <div class="dom_item_text">{{ item.doc.topic }}</div>
    <div class="item_more" v-if="item.HoverType || item.HoverTypeTwo">
      <a-dropdown :trigger="['click']" v-model:open="item.HoverTypeTwo">
        <a class="ant-dropdown-link" @click.prevent>
          <img src="../../assets/svg/more.svg" alt="" class="more_img" />
        </a>
        <template #overlay>
          <a-menu style="border-radius: 5px; padding: 10px 0">
            <a-menu-item key="0" @click="recoverItem(item, index)">
              <span class="dropdown_style">{{ $t('DeleteOffline') }}</span>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import img1 from '../../assets/svg/mindshow.svg'
const props = defineProps({
  item: Object,
  index: Number
})
const emit = defineEmits(['dom_item', 'recoverItem'])
const dom_item = (item) => {
  emit('dom_item', item)
}
const removeStatus = (status, item) => {
  console.log('status', status)
  if (status) {
    item.HoverTypeTwo = true
  } else {
    item.HoverTypeTwo = false
  }
}
const recoverItem = (item, index) => {
  item.HoverType = false
  item.HoverTypeTwo = false
  emit('recoverItem', item, index)
}
const handleError = (e) => {
  e.ThemeNameImg = img1
}
</script>

<style scoped lang="less">
.dom_item {
  cursor: pointer;
  flex-direction: column;
  position: relative;

  .dom_item_img {
    background: #e2e2e2;
    border-radius: 5px;
    padding: 16px;

    img {
      width: 192px;
      height: 108px;
    }
  }

  .dom_item_text {
    width: 100%;
    margin: 10px 0 0 0;
    text-align: left;
    font-weight: 450;
  }

  .item_more {
    width: 30px;
    height: 30px;
    background: rgb(255, 255, 255);
    border-radius: 2px;
    position: absolute;
    top: 10px;
    right: 10px;
    // visibility: hidden;
    // transition: background-color 0.1s linear, visibility 0.1s linear, color 0.1s linear;
  }
}
</style>
