<template>
  <div class="previewOperate" id="previewOperate">
    <!-- 向左边点击 -->
    <div class="previewOperateItem" @click.stop="ToDirection(1)"
      :style="pageIndex == 1 ? { opacity: '0.5' } : { opacity: '1' }">
      <svg class="previewOperateIcon" width="24" height="24" viewBox="0 0 48 48" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M24 5L6 24L24 43L24 31L42 31V17H24V5Z" fill="#575757" stroke="#fdfdfd" stroke-width="3"
          stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
    <!-- 页面数据 -->
    <div class="previewOperatePageNum" :innerHTML="HtmlLength.toString().length > 1 && pageIndex < 9
      ? '0' + pageIndex + '/' + HtmlLength
      : pageIndex + '/' + HtmlLength
      "></div>
    <!-- 向右边点击 -->
    <div class="previewOperateItem" @click.stop="ToDirection(2)"
      :style="pageIndex == HtmlLength ? { opacity: '0.5' } : { opacity: '1' }">
      <svg class="previewOperateIcon" width="24" height="24" viewBox="0 0 48 48" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M24 43L42 24L24 5L24 17L6 17V31H24V43Z" fill="#575757" stroke="#fdfdfd" stroke-width="3"
          stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
    <!-- 动画播放的设置 -->
    <div class="previewOperateItem_last" @click.stop="ToDirection(5, 1)"
      :style="hiddenPageElements.MoreShow === 1 ? { background: '#ffffff' } : {}">
      <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="11" y="7" width="26" height="34" fill="none" stroke="#333" stroke-width="4" stroke-linecap="round"
          stroke-linejoin="round" />
        <rect x="4" y="11" width="7" height="26" stroke="#333" stroke-width="4" stroke-linecap="round"
          stroke-linejoin="round" />
        <rect x="37" y="11" width="7" height="26" stroke="#333" stroke-width="4" stroke-linecap="round"
          stroke-linejoin="round" />
        <path d="M22 20L28 24L22 28V20Z" fill="none" stroke="#333" stroke-width="4" stroke-linecap="round"
          stroke-linejoin="round" />
      </svg>
    </div>
    <!-- 结束播放的设置 -->
    <div class="previewOperateItem_last" @click.stop="ToDirection(5, 2)"
      :style="hiddenPageElements.MoreShow === 2 ? { background: '#ffffff' } : {}">
      <svg class="previewOperateIcon" width="24" height="24" viewBox="0 0 48 48" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="12" r="3" fill="#575757" />
        <circle cx="24" cy="24" r="3" fill="#575757" />
        <circle cx="24" cy="35" r="3" fill="#575757" />
      </svg>
    </div>
    <!-- 是否退出的 -->
    <a-menu selectable="false" :getPopupContainer="getPopupContainer" id="previewMoreShow" class="previewMoreShow"
      v-show="hiddenPageElements.MoreShow" style="
        background-color: #fff;
        color: #575757;
        border-radius: 5px;
        z-index: 10;
        opacity: 0.9;
        position: absolute;
        bottom: 55px;
        left: 160px;
        box-shadow: rgb(0 0 0 / 10%) 0px 4px 8px;
      ">
      <template v-if="hiddenPageElements.MoreShow === 2">
        <a-menu-item class="previewOperateMeunItem" @click.stop="ToDirection(7)"
          style=" display: flex;align-items: center;background-color: #fff;color: #575757;width: 100%;">
          <div v-if="!hiddenPageElements.isFullScreen" style=" display: flex;align-items: center;">
            <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 6L16 15.8995" stroke="#575757" stroke-width="3" stroke-linecap="round"
                stroke-linejoin="round" />
              <path d="M6 41.8995L16 32" stroke="#575757" stroke-width="3" stroke-linecap="round"
                stroke-linejoin="round" />
              <path d="M42.0001 41.8995L32.1006 32" stroke="#575757" stroke-width="3" stroke-linecap="round"
                stroke-linejoin="round" />
              <path d="M41.8995 6L32 15.8995" stroke="#575757" stroke-width="3" stroke-linecap="round"
                stroke-linejoin="round" />
              <path d="M33 6H42V15" stroke="#575757" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M42 33V42H33" stroke="#575757" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M15 42H6V33" stroke="#575757" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M6 15V6H15" stroke="#575757" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            </svg><span>{{ $t('OpenFull') }}</span>
          </div>
          <div v-else style=" display: flex;align-items: center;">
            <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 6L16 15.8995" stroke="#575757" stroke-width="3" stroke-linecap="round"
                stroke-linejoin="round" />
              <path d="M6 41.8995L16 32" stroke="#575757" stroke-width="3" stroke-linecap="round"
                stroke-linejoin="round" />
              <path d="M42.0001 41.8995L32.1006 32" stroke="#575757" stroke-width="3" stroke-linecap="round"
                stroke-linejoin="round" />
              <path d="M41.8995 6L32 15.8995" stroke="#575757" stroke-width="3" stroke-linecap="round"
                stroke-linejoin="round" />
              <path d="M32 7V16H41" stroke="#575757" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M16 7V16H7" stroke="#575757" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M16 41V32H7" stroke="#575757" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M32 41V32H40.8995" stroke="#575757" stroke-width="3" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg><span>{{ $t('ExitFull') }}</span>
          </div>
        </a-menu-item>
        <a-menu-item class="previewOperateMeunItem" @click.prevent="ToDirection(3)" style="
          display: flex;
          align-items: center;
          background-color: #fff;
          color: #575757;
          width: 100%;
          border-radius: 5px;
        ">
          <div style="display: flex; align-items: center">
            <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.9917 6H6V42H24" stroke="#575757" stroke-width="2" stroke-linecap="square"
                stroke-linejoin="round" />
              <path d="M33 33L42 24L33 15" stroke="#575757" stroke-width="2" stroke-linecap="square"
                stroke-linejoin="round" />
              <path d="M16 23.9917H42" stroke="#575757" stroke-width="2" stroke-linecap="square"
                stroke-linejoin="round" />
            </svg>
            <span>{{ $t('EndShow') }}</span>
          </div>
        </a-menu-item>

      </template>
      <!-- 动画的选择框 -->
      <template v-else>
        <a-sub-menu popupClassName="a_sub_menu_h5_pay"
          style=" display: flex;align-items: center;background-color: #fff;color: #575757;width: 100%;z-index: 10; border-radius:5px;">
          <template #title>
            <div
              style=" display: flex;align-items: center;width: 100%;z-index: 10;background-color: #fff;color: #575757;">
              <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="6" width="36" height="20" rx="2" fill="none" stroke="#575757" stroke-width="2"
                  stroke-linejoin="round" />
                <path d="M14 13L22 13" stroke="#575757" stroke-width="2" stroke-linecap="square"
                  stroke-linejoin="round" />
                <path d="M14 19L34 19" stroke="#575757" stroke-width="2" stroke-linecap="square"
                  stroke-linejoin="round" />
                <path d="M8 44L12.8889 38H34.6667L40 44" stroke="#575757" stroke-width="2" stroke-linecap="square"
                  stroke-linejoin="round" />
                <path d="M24 26L24 44" stroke="#575757" stroke-width="2" stroke-linecap="square"
                  stroke-linejoin="round" />
              </svg>
              <span style="margin-left: 10px;">{{ $t('ContentDis') }}</span>
            </div>
          </template>
          <a-menu-item class="previewOperateMeunItem" @click.stop="ToDirection(4, 'no')"
            style=" display: flex;align-items: center;width: 100%;z-index: 10;background-color: #fff;color: #575757;">
            <div
              style=" display: flex;align-items: center;width: 100%;z-index: 10;background-color: #fff;color: #575757;">
              <svg v-show="!hiddenPageElements.isShowOneByOne" width="20" height="20" viewBox="0 0 48 48" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M43 11L16.875 37L5 25.1818" stroke="#575757" stroke-width="2" stroke-linecap="square"
                  stroke-linejoin="round" />
              </svg>
              <div style="width:20px;height:20px;" v-show="hiddenPageElements.isShowOneByOne"></div>
              <span>{{ $t('ShowThem') }}</span>
            </div>
          </a-menu-item>
          <a-menu-item class="previewOperateMeunItem" @click.stop="ToDirection(4, 'yes')"
            style=" display: flex;align-items: center;width: 100%;z-index: 10;background-color: #fff;color: #575757;">
            <div
              style=" display: flex;align-items: center;width: 100%;z-index: 10;background-color: #fff;color: #575757;">
              <svg v-show="hiddenPageElements.isShowOneByOne" width="20" height="20" viewBox="0 0 48 48" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M43 11L16.875 37L5 25.1818" stroke="#575757" stroke-width="2" stroke-linecap="square"
                  stroke-linejoin="round" />
              </svg>
              <div style="width:20px;height:20px;" v-show="!hiddenPageElements.isShowOneByOne"></div>
              <span>{{ $t('ElementsAreDis') }}</span>
            </div>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu popupClassName="a_sub_menu_h5_pay"
          style=" display: flex;align-items: center;background-color: #fff;color: #575757;width: 100%;z-index: 10; border-radius:5px;">
          <template #title>
            <div
              style=" display: flex;align-items: center;width: 100%;z-index: 10;background-color: #fff;color: #575757;">
              <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M39 6H9C7.34315 6 6 7.34315 6 9V39C6 40.6569 7.34315 42 9 42H39C40.6569 42 42 40.6569 42 39V9C42 7.34315 40.6569 6 39 6Z"
                  stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M20.5 28V21.9378L25.75 24.9689L31 28L25.75 31.0311L20.5 34.0622V28Z" fill="none" stroke="#333"
                  stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M6 15H42" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M33 6L27 15" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M21 6L15 15" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <span style="margin-left: 10px;">{{ $t('Animation') }}</span>
            </div>
          </template>
          <a-menu-item class="previewOperateMeunItem" @click.stop="ToDirection(6, 'Effect', '0')"
            style=" display: flex;align-items: center;width: 100%;z-index: 10;background-color: #fff;color: #575757;">
            <div
              style=" display: flex;align-items: center;width: 100%;z-index: 10;background-color: #fff;color: #575757;">
              <svg v-show="hiddenPageElements.animationEffect === '0'" width="20" height="20" viewBox="0 0 48 48"
                fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M43 11L16.875 37L5 25.1818" stroke="#575757" stroke-width="2" stroke-linecap="square"
                  stroke-linejoin="round" />
              </svg>
              <div style="width:20px;height:20px;" v-show="hiddenPageElements.animationEffect !== '0'"></div>
              <span>无动画</span>
            </div>
          </a-menu-item>
          <a-menu-item class="previewOperateMeunItem" @click.stop="ToDirection(6, 'Effect', '1')"
            style=" display: flex;align-items: center;width: 100%;z-index: 10;background-color: #fff;color: #575757;">
            <div
              style=" display: flex;align-items: center;width: 100%;z-index: 10;background-color: #fff;color: #575757;">
              <svg v-show="hiddenPageElements.animationEffect === '1'" width="20" height="20" viewBox="0 0 48 48"
                fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M43 11L16.875 37L5 25.1818" stroke="#575757" stroke-width="2" stroke-linecap="square"
                  stroke-linejoin="round" />
              </svg>
              <div style="width:20px;height:20px;" v-show="hiddenPageElements.animationEffect !== '1'"></div>
              <span>{{ $t('Gentle') }}</span>
            </div>
          </a-menu-item>
          <a-menu-item class="previewOperateMeunItem" @click.stop="ToDirection(6, 'Effect', '2')"
            style=" display: flex;align-items: center;width: 100%;z-index: 10;background-color: #fff;color: #575757;">
            <div
              style=" display: flex;align-items: center;width: 100%;z-index: 10;background-color: #fff;color: #575757;">
              <svg v-show="hiddenPageElements.animationEffect === '2'" width="20" height="20" viewBox="0 0 48 48"
                fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M43 11L16.875 37L5 25.1818" stroke="#575757" stroke-width="2" stroke-linecap="square"
                  stroke-linejoin="round" />
              </svg>
              <div style="width:20px;height:20px;" v-show="hiddenPageElements.animationEffect !== '2'"></div>
              <span>{{ $t('Gentle') }}2</span>
            </div>
          </a-menu-item>
          <a-menu-item class="previewOperateMeunItem" @click.stop="ToDirection(6, 'Effect', '3')"
            style=" display: flex;align-items: center;width: 100%;z-index: 10;background-color: #fff;color: #575757;">
            <div
              style=" display: flex;align-items: center;width: 100%;z-index: 10;background-color: #fff;color: #575757;">
              <svg v-show="hiddenPageElements.animationEffect === '3'" width="20" height="20" viewBox="0 0 48 48"
                fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M43 11L16.875 37L5 25.1818" stroke="#575757" stroke-width="2" stroke-linecap="square"
                  stroke-linejoin="round" />
              </svg>
              <div style="width:20px;height:20px;" v-show="hiddenPageElements.animationEffect !== '3'"></div>
              <span>{{ $t('Lively') }}</span>
            </div>
          </a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script setup>
const props = defineProps({
  HtmlLength: Number,
  pageIndex: Number,
  hiddenPageElements: Object
})
const emit = defineEmits(['ToDirection'])
const ToDirection = (one, two, three, four) => {
  emit('ToDirection', one, two, three, four)
}
const getPopupContainer = () => {
  return document.getElementById('p_r_ppts_result_c')
}
</script>

<style scoped lang="less">
.previewOperatePageNum {
  padding: 0 10px;
  height: 30px;
  display: flex;
  align-items: center;
  border-radius: 25px;
  margin-right: 10px;
  background-color: #ffffff;
}

.previewOperateItem {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  margin-right: 10px;
  cursor: pointer;
}

.previewOperateItem_last {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  cursor: pointer;
  margin-right: 0;
}

.previewOperateItem_last:hover,
.previewOperateItem:hover {
  background-color: #ffffff;
}

.previewOperateMeunItem {
  display: flex;
  align-items: center;
  color: #575757;
  width: 100%;

  span {
    margin-left: 10px;
  }
}

.previewOperateMeunItem:hover {
  background-color: #fff !important;
}
</style>
