import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Task } from '@entities'

export type State = Partial<
  Omit<Task, 'status'> & {
    page: number
    limit: number
    status: Task['status'][]
  }
>

export const useTaskStore = defineStore('task', () => {
  const params = ref<State>({
    page: 1,
    limit: 9,
    name: '',
    status: [],
  })

  function removeEmpty<T>(obj: T): void {
    for (const key in obj) {
      const keyObj = key as keyof T
      if (obj[keyObj] === '') {
        delete obj[keyObj]
      }
    }
  }

  removeEmpty(params.value)

  watch(params.value, newValue => {
    removeEmpty(newValue)
  })

  function $setParams(newParams: Partial<State>) {
    params.value = newParams
    removeEmpty(params.value)
  }

  function $updateParams(newParams: Partial<State>) {
    params.value = { ...params.value, ...newParams }
    removeEmpty(params.value)
  }

  function $reset() {
    params.value.page = 1
    params.value.limit = 9
    params.value.name = ''
  }

  return { params, $setParams, $updateParams, $reset }
})
