<script lang="ts" setup>
import { useTaskStore } from '@features'
import { Checkbox } from '@ui'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Task } from '@entities'

const filters = ref([
  {
    label: 'В ожидании',
    value: 'pending' as const,
    checked: false,
  },
  {
    label: 'В прогрессе',
    value: 'inProgress' as const,
    checked: false,
  },
  {
    label: 'Завершённые',
    value: 'completed' as const,
    checked: false,
  },
])
const router = useRouter()
const route = useRoute()
const taskStore = useTaskStore()

const selectedFilters = computed<Array<Task['status']>>(() =>
  filters.value.filter(f => f.checked).map(f => f.value)
)

onMounted(() => {
  filters.value = filters.value.map(f => ({
    ...f,
    checked: Boolean(route.query.status?.includes(f.value)),
  }))
})

watch(selectedFilters, () => {
  router.replace({
    query: {
      status: selectedFilters.value,
    },
  })
  taskStore.$updateParams({
    status: selectedFilters.value,
  })
})
</script>

<template>
  <aside class="sticky top-0 z-10 px-4">
    <h2>Фильтры</h2>

    <div v-for="filter in filters" :key="filter.value" class="flex items-center gap-2">
      <Checkbox v-model="filter.checked" :id="filter.value" />
      <label :for="filter.value">{{ filter.label }}</label>
    </div>
  </aside>
</template>
