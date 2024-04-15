import { nextTick } from 'vue'
import { colorPalette } from './colorSeries'
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
  const privateThemeStyleDom = document.getElementById('privateTheme')
  const privateThemeContent = item.replace(/"/g, '')
  privateThemeStyleDom.innerHTML = ''
  try {
    privateThemeStyleDom.appendChild(document.createTextNode(privateThemeContent))
  } catch (ex) {
    privateThemeStyleDom.styleSheet.cssText = item //for IE
  }
  nextTick(() => {
    ExportRootCss()
  })
}
