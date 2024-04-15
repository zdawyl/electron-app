import { ref } from 'vue'
import { defineStore } from 'pinia'
import { openDB } from 'idb'

export const useCounterStore = defineStore('counter', () => {
  const counState = ref({
    typeLoding: 0, // 0: 未加载 1: 加载中
    previewData: {} //preview的数据
  })
  const currentNetwork = ref(navigator.onLine)
  window.addEventListener('online', () => {
    currentNetwork.value = true
  })
  window.addEventListener('offline', () => {
    currentNetwork.value = false
  })
  let versionNumber = 3
  let db
  openDB('mindshow_dom', versionNumber, {
    upgrade (db) {
      if (!db.objectStoreNames.contains('edit_data')) {
        db.createObjectStore('edit_data')
      }
      if (!db.objectStoreNames.contains('edit_preview')) {
        db.createObjectStore('edit_preview')
      }
    }
  }).then((res) => {
    db = res
  })
  const initialization = async () => {
    db = await openDB('mindshow_dom', versionNumber, {
      upgrade (db) {
        if (!db.objectStoreNames.contains('edit_data')) {
          db.createObjectStore('edit_data')
        }
        if (!db.objectStoreNames.contains('edit_preview')) {
          db.createObjectStore('edit_preview')
        }
      }
    })
    return new Promise((resolve) => {
      resolve()
    })
  }
  const DbPutFn = (one, two, three, four) => {
    // console.log(one, two, three, four)
    db.put(one, two, three)
  }
  const DbDeleteFn = (one, two, three) => {
    console.log(one, two, three)
    db.delete(one, two)
  }
  const DbGetFn = async (one, two) => {
    if (!db) {
      await initialization()
    }
    // console.log(one, two)
    let IdList = await db.getAllKeys('edit_data')
    let data = await db.getAll('edit_data')
    return new Promise((resolve) => {
      resolve({
        IdList,
        data
      })
    })
  }
  const DbGetPerverFn = async (one, two) => {
    if (!db) {
      await initialization()
    }
    let data = await db.get(one, two)
    return new Promise((resolve) => {
      resolve(data)
    })
  }
  return { counState, currentNetwork, DbPutFn, DbDeleteFn, DbGetFn, DbGetPerverFn }
})
