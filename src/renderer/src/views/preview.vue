<template>
  <div id="preview_box">
    <div id="p_r_ppts_result_c">
      <div id="ppts_result_c" class="ppts_result_c" :class="counterStore.counState.previewData?.ThemeName" :style="{
        width: `${counterStore.counState.previewData.html_arr.length}` * 1920 + 'px',

        position: 'relative',
        left: state.slidePosition.left + 'px',
        top: state.slidePosition.top + 'px',
        display: 'flex',
        'flex-direction': 'row'
      }">
        <template v-if="counterStore.counState.previewData.html_arr">
          <pptvue :items="items" :index="index" :routerIndex="state.routerIndex" :previewFlag="state.previewFlag"
            v-for="(items, index) in counterStore.counState.previewData.html_arr" :key="index"></pptvue>
        </template>
      </div>
      <operatevue :HtmlLength="counterStore.counState.previewData.html_arr.length"
        :hiddenPageElements="state.hiddenPageElements" :pageIndex="state.pageIndex" @ToDirection="ToDirectionFn">
      </operatevue>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { ExPortFullScreen, ExPortExitScreen, isDocumentInFullScreen } from '../utils/utilsUp'
import { useCounterStore } from '../stores/index'
import pptvue from '../components/ppt/ppt.vue'
import operatevue from '../components/preview/Operate.vue'
import { setArrAnimationData } from '../utils/setupdata.js'
import { useRouter } from 'vue-router'
let allowedTags = ['g', 'circle', 'line', 'path', 'rect']
let CancelAnimation = () => { };
let CancelAnimationHtml = ''
const Router = useRouter()
const state = reactive({
  screenHeight: 0,
  screenWidth: 0,
  previewFlag: 0,
  pageIndex: 1,
  slidePosition: {
    left: 0,
    top: 0,
    height: 0
  },
  hiddenPageElements: {
    isFullScreen: false, // 是否全屏
    isShowOneByOne: false, // 是否一次全部展示
    arr: [], // 一次全部展示的数组
    hideType: 0, // 当前页面属于哪种类型
    animationEffect: '0', // 当前动画是什么
    MoreShow: 0, // 是否展示更多操作
  },
})
const counterStore = useCounterStore()
const resize = () => {
  state.screenWidth = document.documentElement.clientWidth
  let screenHeight = document.documentElement.clientHeight
  if (state.screenWidth / screenHeight > 16 / 9) {
    state.previewFlag = screenHeight / 1080
  } else {
    state.previewFlag = state.screenWidth / 1920
  }
  let pptheight = 1080 * state.previewFlag
  let pptwidth = 1920 * state.previewFlag

  nextTick(() => {
    state.slidePosition = {
      left: (state.screenWidth - pptwidth) / 2,
      top: (screenHeight - pptheight) / 2,
      height: screenHeight
    }
  })

  let m2p_r_ppts_result_c = document.querySelector('#p_r_ppts_result_c')
  m2p_r_ppts_result_c.style.height = screenHeight + 'px'
  if (state.isInElectron) {
    m2p_r_ppts_result_c.style.height = screenHeight - 40 + 'px'
  }
}
const ToDirectionFn = (one, two, three) => {
  if (one == 3) {
    Router.push('/dom_home')
  } else if (one == 1) {
    toLeft()
    showOperateMore(0)
  } else if (one == 2) {
    toRight()
    showOperateMore(0)
  } else if (one == 4) {
    ShowOneByOne(two)
    showOperateMore(0)
  } else if (one == 5) {
    showOperateMore(two)
  } else if (one == 6) {
    ShowAnimatinByFn(two, three)
    showOperateMore(0)
  } else if (one == 7) {
    toChangeFullScreen()
    showOperateMore(0)
  }
}
// 切换全屏
const toChangeFullScreen = () => {
  if (state.hiddenPageElements.isFullScreen) {
    ExPortExitScreen()
    state.hiddenPageElements.isFullScreen = false
  } else {
    ExPortFullScreen('preview_box')
    state.hiddenPageElements.isFullScreen = true
  }
}
// 选择某种动画效果
const ShowAnimatinByFn = (one, two) => {
  if (one === 'Method') {
    state.hiddenPageElements.animDisplayMethod = two
  } else {
    state.hiddenPageElements.animationEffect = two
  }
}
// 是否展示更多操作
const showOperateMore = (type) => {
  if (type === state.hiddenPageElements.MoreShow) {
    state.hiddenPageElements.MoreShow = 0
  } else {
    state.hiddenPageElements.MoreShow = type
  }
}
// 是否一次全部展示
const ShowOneByOne = (type) => {
  if (type === 'yes') {
    state.hiddenPageElements.isShowOneByOne = true
    hidePageItemsNew()
  } else {
    state.hiddenPageElements.isShowOneByOne = false
    if (state.hiddenPageElements.arr.length > 0) {
      chage_animatin_fn(state.hiddenPageElements.arr)
      state.hiddenPageElements.arr = []
    }
  }
  state.previewOperateMoreShow = false
}
// 点击向右箭头
const toLeft = () => {
  if (state.pageIndex == 1) {
    return
  }
  state.pageIndex--
  Router.push({
    path: '/preview/' + state.pageIndex
  })
  hidePageDataFn()
}
// 点击向左箭头
const toRight = () => {
  if (state.pageIndex == counterStore.counState.previewData.html_arr.length) {
    return
  }
  if (state.hiddenPageElements.isShowOneByOne && state.hiddenPageElements.arr.length > 0) {
    chage_animatin_fn([state.hiddenPageElements.arr[0]])
    state.hiddenPageElements.arr.shift()
    return
  }
  state.pageIndex++
  Router.push({
    path: '/preview/' + state.pageIndex
  })
  hidePageDataFn()
}
const hidePageDataFn = () => {
  hidePageItemsNew()
  nextTick(() => {
    if (state.hiddenPageElements.isShowOneByOne) {
    } else {
      chage_animatin_fn(state.hiddenPageElements.arr)
      state.hiddenPageElements.arr = []
    }
    let ppts_result_c = document.querySelector('#ppts_result_c')
    ppts_result_c.style.transform = 'translateX(' + (state.pageIndex - 1) * -1920 + 'px)'
  })
}
// 获取当前页码的所有元素
const hidePageItemsNew = () => {
  clearAnimation_fn()
  state.hiddenPageElements.arr = []
  state.hiddenPageElements.hideType = 0
  let arr = []
  let truePageIndex = state.pageIndex - 2
  let elnum = {}
  if (truePageIndex < 0) {
    truePageIndex = '-1'
    elnum = {
      hideType: 0
    }
  } else {
    elnum = counterStore.counState.previewData.resultHtml[truePageIndex]
    if (elnum.lever == 0) {
      elnum.hideType = 1
    } else if (elnum.lever == 1 && elnum.id != 999) {
      elnum.hideType = 2
    } else if (elnum.lever > 1 && elnum.lever < 30) {
      elnum.hideType = 3
    } else if (elnum.id == 999) {
      elnum.hideType = 4
    }
  }
  let html = document.getElementById('ppt' + truePageIndex)
  let one_1 = ''
  let one__1 = ''
  let one_2 = ''
  let one_3 = ''
  let one_4 = ''
  if (elnum.hideType === 1) {
    one_1 = html.getElementsByClassName('mulu')
    one_2 = html.getElementsByClassName('contents-list')[0]
    one_2 = one_2.getElementsByTagName('li')
  } else if (elnum.hideType === 2) {
    one_1 = html.getElementsByClassName('partitem')
    one_2 = html.getElementsByClassName('sessiontitle')
  } else if (elnum.hideType === 3) {
    one_1 = html.getElementsByClassName('header_con')[0].getElementsByClassName('title_con')
    if (!one_1[0].offsetHeight) {
      one_1 = html.getElementsByClassName('items_container')[0].getElementsByClassName('layout-title')
    }
    let res_html = html.getElementsByClassName('items_container')[0]
    one_2 = []
    one__1 = []
    if (elnum.graphics && res_html && res_html.getElementsByClassName('item_-1')) {
      let res_index = 1
      let false_type = true
      while (false_type) {
        let res_arr = []
        let res_white_html = res_html.getElementsByClassName('item_-' + res_index)
        if (res_white_html && res_white_html.length) {
          for (let i = 0; i < res_white_html.length; i++) {
            let res_i = res_white_html[i]
            if (res_i.offsetHeight || (res_i.tagName === 'foreignObject' && res_i.clientHeight) || allowedTags.includes(res_i.tagName)) {
              res_arr.push(res_white_html[i])
            }
          }
          one__1.push(res_arr)
        } else {
          if (res_index > 8) {
            false_type = false
          }
        }
        res_index++
      }
    }
    if (elnum.graphics && res_html && res_html.getElementsByClassName('item_0')) {
      let res_index = 0
      let false_type = true
      while (false_type) {
        let res_arr = []
        let res_white_html = res_html.getElementsByClassName('item_' + res_index)
        if (res_white_html && res_white_html.length) {
          for (let i = 0; i < res_white_html.length; i++) {
            let res_i = res_white_html[i]
            if (res_i.offsetHeight || (res_i.tagName === 'foreignObject' && res_i.clientHeight) || allowedTags.includes(res_i.tagName)) {
              res_arr.push(res_white_html[i])
            }
          }
          one_2.push(res_arr)
        } else {
          if (res_index > 8) {
            false_type = false
          }
        }
        res_index++
      }
    } else {
      let res_arr = res_html.getElementsByClassName('contentitem')
      for (let i = 0; i < res_arr.length; i++) {
        let res_i = res_arr[i]
        if (res_i.offsetHeight || (res_i.tagName === 'foreignObject' && res_i.clientHeight) || allowedTags.includes(res_i.tagName)) {
          one_2.push([res_arr[i]])
        }
      }
    }
  } else if (elnum.hideType === 4) {
    html = html.getElementsByClassName('slidev-layout')[0]
    one_1 = html.getElementsByClassName('end')
    one_2 = html.getElementsByClassName('thanks')
  } else if (elnum.hideType === 0) {
    one_1 = html.getElementsByClassName('topic_text')
    one_2 = html.getElementsByClassName('subtitle_text')
    one_3 = html.getElementsByClassName('speaker_con')
    one_4 = html.getElementsByClassName('speakerTime_con')
  }
  if (one__1 && one__1.length && elnum.hideType === 3) {
    // let elnum_arr = []
    // for (let i = 0; i < one__1.length; i++) {
    //   for (let j = 0; j < one__1[i].length; j++) {
    //     elnum_arr.push(one__1[i][j])
    //   }
    // }
    // arr.push({
    //   type: 1,
    //   el: elnum_arr
    // })
  }
  if (one_1 && one_1.length) {
    if (one_1[0].offsetHeight) {
      arr.push({
        type: 0,
        el: [one_1[0]]
      })
    }
  }
  if (one_2 && one_2.length) {
    let arr2 = [one_2[0]]
    if (elnum.hideType === 3 || elnum.hideType === 1) {
      arr2 = [...one_2]
    }
    if (state.isShowOneByOne) {
      for (let i = 0; i < arr2.length; i++) {
        if (elnum.hideType === 3) {
          arr.push({
            type: 1,
            el: arr2[i]
          })
        } else {
          arr.push({
            type: 1,
            el: [arr2[i]]
          })
        }

      }
    } else {
      let elnum_arr = []
      if (elnum.hideType === 3) {
        for (let i = 0; i < arr2.length; i++) {
          elnum_arr = []
          for (let j = 0; j < arr2[i].length; j++) {
            elnum_arr.push(arr2[i][j])
          }
          arr.push({
            type: 1,
            el: elnum_arr
          })
        }
      } else {
        arr.push({
          type: 1,
          el: arr2
        })
      }

    }
  }
  if (one_3 && one_3.length) {
    arr.push({
      type: 2,
      el: [one_3[0]]
    })
  }
  if (one_4 && one_4.length) {
    arr.push({
      type: 3,
      el: [one_4[0]]
    })
  }
  console.log('当前页码所有元素', arr);
  state.hiddenPageElements.hideType = elnum.hideType
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i].el
    for (let j = 0; j < item.length; j++) {
      let el = item[j]
      el.style.visibility = 'hidden'
    }
    state.hiddenPageElements.arr.push(arr[i])
  }
}
// 清空当前的动画
const clearAnimation_fn = () => {
  try {
    if (CancelAnimation) {
      CancelAnimation()
    }
    if (CancelAnimationHtml) {
      for (let i = 0; i < CancelAnimationHtml.length; i++) {
        let res_html = CancelAnimationHtml[i].el
        for (let j = 0; j < res_html.length; j++) {
          res_html[j].style.visibility = 'visible'
        }
      }
    }
  } catch (error) {
    console.log('清空动画失败', error);
  }
}
// 开启动画 效果
const chage_animatin_fn = (html) => {
  CancelAnimationHtml = html
  if (state.hiddenPageElements.animationEffect === '0') {
    for (let i = 0; i < html.length; i++) {
      let res_html = html[i].el
      for (let j = 0; j < res_html.length; j++) {
        res_html[j].style.visibility = 'visible'
      }
    }
    return
  }
  let valueArr = setArrAnimationData[0]
  if (state.hiddenPageElements.animationEffect === '2') {
    valueArr = setArrAnimationData[1]
  } else if (state.hiddenPageElements.animationEffect === '3') {
    valueArr = setArrAnimationData[2]
  }
  valueArr = valueArr[state.hiddenPageElements.hideType]
  animationNameCss(html, valueArr)
}
// 看看是怎么样的动画
const animationNameCss = async (html, valueArr) => {
  for (let i = 0; i < html.length; i++) {
    let res_html = html[i].el
    let res_type = valueArr.dataArr.length > [html[i].type] ? valueArr.dataArr[html[i].type] : valueArr.dataArr[valueArr.dataArr.length - 1]
    if (valueArr.triggerCondition === '1') {
      await animationCompleted(res_html, res_type)
    } else {
      animationCompleted(res_html, res_type)
    }
  }
}
// 动画执行的函数
const animationCompleted = (html, matin) => {
  return new Promise((resolve, reject) => {
    let obj = {
      class: "animate__",
      name: matin.name,
      times: matin.time,
      value: matin.value,
      // type: matin.triggerCondition,
      type: '0'
    }
    const animationName = `${obj.class}${obj.value}`
    document.documentElement.style.setProperty('--animate-duration', `${obj.times}ms`)
    let res_index = html.length - 1
    if (obj.type === '1') {
      let res_i = 0
      let res_html = html[res_i]
      res_html.style.visibility = 'visible'
      res_html.classList.add(`${obj.class}animated`, animationName)
      const handleAnimationEnd = () => {
        res_html.classList.remove(`${obj.class}animated`, animationName)
        if (res_i === res_index) {
          document.documentElement.style.removeProperty('--animate-duration')
          resolve(1)
          return
        }
        res_i++
        res_html = html[res_i]
        res_html.style.visibility = 'visible'
        res_html.classList.add(`${obj.class}animated`, animationName)
        res_html.addEventListener('animationend', handleAnimationEnd, { once: true })
        CancelAnimation = () => {
          for (let i = res_i; i < html.length; i++) {
            html[i].style.visibility = 'visible'
          }
          res_html.classList.remove(`${obj.class}animated`, animationName)
          res_html.removeEventListener("animationend", handleAnimationEnd);
          document.documentElement.style.removeProperty("--animate-duration");
        };
      }
      res_html.addEventListener('animationend', handleAnimationEnd, { once: true })
      CancelAnimation = () => {
        for (let i = res_i; i < html.length; i++) {
          html[i].style.visibility = 'visible'
        }
        res_html.classList.remove(`${obj.class}animated`, animationName)
        res_html.removeEventListener("animationend", handleAnimationEnd);
        document.documentElement.style.removeProperty("--animate-duration");
      };
    } else {
      for (let i = 0; i < html.length; i++) {
        let res_html = html[i]
        res_html.style.visibility = 'visible'
        res_html.classList.add(`${obj.class}animated`, animationName)
        const handleAnimationEnd = () => {
          res_html.classList.remove(`${obj.class}animated`, animationName)
          if (res_index === 0) {
            document.documentElement.style.removeProperty('--animate-duration')
            resolve(1)
            return
          }
          res_index--
        }
        res_html.addEventListener('animationend', handleAnimationEnd, { once: true })
        CancelAnimation = () => {
          for (let i = res_i; i < html.length; i++) {
            html[i].style.visibility = 'visible'
          }
          res_html.classList.remove(`${obj.class}animated`, animationName)
          res_html.removeEventListener("animationend", handleAnimationEnd);
          document.documentElement.style.removeProperty("--animate-duration");
        };
      }
    }
  })
}
// 监视键盘事件
const keylistener = (e) => {
  e.preventDefault()
  e.stopPropagation()
  switch (e.keyCode) {
    case 37: //左
      toLeft()
      break
    case 39: //右
      toRight()
      break
    case 38: //上
      toLeft()
      break
    case 40:  //下
      toRight()
      break
    case 27: //esc
      toChangeFullScreen()
      break
    default:
      break
  }
}
onMounted(() => {
  console.log(10086, counterStore.counState);
  window.addEventListener('keydown', keylistener)
  setTimeout(() => {
    toChangeFullScreen()
    resize()
    window.addEventListener('resize', resize)
  }, 500)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
  window.removeEventListener('keydown', keylistener)
})
</script>

<style scoped lang="less">
* {
  -webkit-touch-callout: none;
  /*系统默认菜单被禁用*/
  -webkit-user-select: none;
  /*webkit浏览器*/
  -khtml-user-select: none;
  /*早期浏览器*/
  -moz-user-select: none;
  /*火狐*/
  -ms-user-select: none;
  /*IE10*/
  user-select: none;
}
</style>
