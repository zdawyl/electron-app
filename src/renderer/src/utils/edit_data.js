import circularJson from 'circular-json'
import { useCounterStore } from '../stores/index'
// 传入一个url地址，返回一个图片的base64
const counterStore = useCounterStore()

// 传入一个url，看看它是否有用，有就返回true，反之false
export const ExPortCheckUrl = (url) => {
  return new Promise((resolve) => {
    let img = new Image();
    img.onload = function () {
      resolve({
        status: true,
      });
    };
    img.onerror = function () {
      resolve({
        status: false,
      });
    };
    img.src = url;
  });
};
export const ExPortGetBase64Image = (src) => {
  return new Promise((resolve) => {
    try {
      let xhr = new XMLHttpRequest()
      xhr.open('get', src, true)
      xhr.responseType = 'blob'
      xhr.onload = function () {
        if (this.status == 200) {
          let blob = this.response
          let oFileReader = new FileReader()
          oFileReader.onloadend = function (e) {
            const base64 = e.target.result
            resolve(base64)
          }
          oFileReader.onerror = function () {
            resolve(0) // 如果读取blob失败，返回原始src
          }
          oFileReader.readAsDataURL(blob)
        } else {
          resolve(0) // 如果请求失败，返回原始src
        }
      }
      xhr.onerror = function () {
        resolve(0) // 如果请求失败，返回原始src
      }
      xhr.send()
    } catch (error) {
      resolve(0) // 如果发生异常，返回原始src
    }
  })
}
export const ExportEditData = async (data) => {
  try {
    let res_data = data
    counterStore.counState.typeLoding = 1
    let html = res_data
    html = await edit_list_base64_fn(html)
    counterStore.DbPutFn('edit_data', html, 'id' + html.docId)
    counterStore.counState.typeLoding = 0
  } catch (error) {
    console.log(error)
  }
}
const edit_list_base64_fn = async (data) => {
  // 判断data是对象还是数组，还是字符串
  if (typeof data === 'string' && data.includes('http')) {
    let img_urls = extractImageUrls(data)
    for (let i = 0; i < img_urls.length; i++) {
      if (img_urls[i].includes('www.w3.org')) continue
      let res_type = await ExPortCheckUrl(img_urls[i])
      if (!res_type.status) continue
      let base64 = await ExPortGetBase64Image(img_urls[i])
      if (!base64) continue
      data = data.replace(img_urls[i], base64)
    }
  } else if (data instanceof Array) {
    for (let i = 0; i < data.length; i++) {
      data[i] = await edit_list_base64_fn(data[i])
    }
  } else if (data instanceof Object) {
    for (let key in data) {
      data[key] = await edit_list_base64_fn(data[key])
    }
  }
  return new Promise((resolve) => {
    resolve(data)
  })
}
function extractImageUrls (data) {
  let text = data
  let urls = []
  let extensions = ['png', 'jpg', 'jpeg', 'gif', 'svg', 'img']
  let startIndex = text.indexOf('http')
  while (startIndex !== -1) {
    text = text.substring(startIndex)
    let indexArr = []
    extensions.forEach((ext) => {
      let extIndex = text.indexOf(ext)
      if (extIndex !== -1) {
        indexArr.push(extIndex)
      }
    })
    let minIndex = Math.min(...indexArr)
    let url = text.substring(0, minIndex + 3)
    urls.push(url)
    text = text.substring(minIndex + 3)
    startIndex = text.indexOf('http')
  }
  return urls
}
