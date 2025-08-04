<script lang="ts" setup>
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@ui'
import { ref, watch, onMounted } from 'vue'

const props = defineProps<{ label?: string; placeholder?: string }>()
const model = defineModel<string>()

// Only include the valid status options for task status
const sortOptions = [
  {
    label: 'В ожидании',
    value: 'pending',
  },
  {
    label: 'В прогрессе',
    value: 'inProgress',
  },
  {
    label: 'Завершённые',
    value: 'completed',
  },
]

// Initialize selectedSort with model value or first option
const selectedSort = ref(model.value || 'pending')

// Two-way binding between selectedSort and model
watch(selectedSort, newValue => {
  if (model.value !== newValue) {
    model.value = newValue
  }
})

// Update selectedSort when model changes from parent
watch(
  () => model.value,
  newValue => {
    if (newValue && selectedSort.value !== newValue) {
      selectedSort.value = newValue
    }
  }
)

// Ensure initial synchronization
onMounted(() => {
  if (model.value && model.value !== selectedSort.value) {
    selectedSort.value = model.value
  } else if (!model.value) {
    model.value = selectedSort.value
  }
})
</script>

<template>
  <Select v-model="selectedSort" class="w-full">
    <SelectTrigger class="w-full">
      <SelectValue :placeholder="props.placeholder" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel v-if="props.label">{{ props.label }}</SelectLabel>
        <SelectItem v-for="option in sortOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
