<script lang="ts" setup>
import { Checkbox } from '@ui'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const filters = ref([
  {
    label: 'Все',
    value: 'all',
    checked: false,
  },
  {
    label: 'В ожидании',
    value: 'pending',
    checked: false,
  },
  {
    label: 'В прогрессе',
    value: 'inProgress',
    checked: false,
  },
  {
    label: 'Завершённые',
    value: 'completed',
    checked: false,
  },
])

const selectedFilters = computed(() => filters.value.filter(f => f.checked))

const router = useRouter()

watch(selectedFilters, () => {
  router.replace({
    query: {
      filters: JSON.stringify(selectedFilters.value),
    },
  })
})

watch(filters, () => {
  const isAll = filters.value.find(f => f.checked && f.value === 'all')
  filters.value = filters.value.map(f => ({ ...f, checked: Boolean(isAll) ?? f.checked }))
})
</script>
<template>
  <section>
    <h2>Фильтры</h2>

    <div v-for="filter in filters" :key="filter.value" class="flex items-center gap-2">
      <Checkbox v-model="filter.checked" />
      <span>{{ filter.label }}</span>
    </div>
  </section>
</template>
