<script lang="ts" setup>
import { Input } from '@ui'
import { useTaskStore } from '../../model/store'
import { computed } from 'vue'

const taskStore = useTaskStore()

const searchQuery = computed({
  get: () => taskStore.params.name || '',
  set: (value: string) => {
    // Обновляем оба параметра одним значением
    taskStore.$updateParams({
      name: value,
      description: value,
    })
  },
})
</script>

<template>
  <Input
    type="search"
    v-model="searchQuery"
    placeholder="Поиск по имени и описанию"
    class="w-auto"
  />
</template>
