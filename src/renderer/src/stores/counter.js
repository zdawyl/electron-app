import { ref } from 'vue'
import { defineStore } from 'pinia'
import { openDB } from 'idb'

export const useCounterStore = defineStore('counter', () => {
  const counState = ref({
    typeLoding: 0 // 0: 未加载 1: 加载中
  })
  let db
  openDB('mindshow_dom', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('edit_data')) {
        db.createObjectStore('edit_data')
      }
    }
  }).then((res) => {
    db = res
  })
  const DbPutFn = (one, two, three, four) => {
    console.log(one, two, three, four)
    db.put(one, two, three)
  }
  const DbDeleteFn = (one, two, three) => {
    console.log(one, two, three)
    db.delete(one, two)
  }
  const DbGetFn = async (one, two) => {
    console.log(one, two)
    let IdList = await db.getAllKeys('edit_data')
    let data = await db.getAll('edit_data')
    return new Promise((resolve) => {
      resolve({
        IdList,
        data
      })
    })
  }
  return { counState, DbPutFn, DbDeleteFn, DbGetFn }
})
