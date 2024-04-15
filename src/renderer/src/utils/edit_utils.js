import { nextTick } from 'vue'
import { colorPalette } from './colorSeries'
import circularJson from 'circular-json'
const ExportRootCss = () => {
  let brandcolor = getComputedStyle(document.documentElement)
    .getPropertyValue('--brand-color')
    .replace(/(^\s*)|(\s*$)/g, '')
  if (!brandcolor) return []
  let colorseries = colorPalette(brandcolor)
  if (colorseries.length > 0) {
    colorseries.forEach((color, index) => {
      document.documentElement.style.setProperty(`--table-${index}`, color)
    })
  }
}
export const ExportEditCss = (item) => {
  let privateThemeStyleDom = document.getElementById('privateTheme')
  let privateThemeContent = item
  if (privateThemeContent) {
    privateThemeContent = privateThemeContent.replace(/\\●\\/g, '\\x82\\')
  }
  try {
    privateThemeStyleDom.appendChild(document.createTextNode(privateThemeContent))
  } catch (ex) {
    privateThemeStyleDom.styleSheet.cssText = item //for IE
  }
  nextTick(() => {
    ExportRootCss()
  })
}
export const ExportEditCssOne = (item) => {
  try {
    // 如果item是一个josn字符串，就解析成json对象
    if (item && typeof item === 'string') {
      item = circularJson.parse(item)
    }
    if (item && item.length > 0) {
      console.log(10086, item);
      item.forEach((color, index) => {
        document.documentElement.style.setProperty(`--table-${index}`, color);
        if (index === item.length - 1) {
          document.documentElement.style.setProperty(`--edit-${1}`, color);
        } else if (index === item.length - 2) {
          document.documentElement.style.setProperty(`--edit-${1}`, color);
        }
      });
    }
  } catch (e) {
    console.log(e)
  }
}
export const ExportEditCssTwo = (item) => {
  try {
    document.documentElement.className = item;
  } catch (e) {
    console.log(e)
  }
}
