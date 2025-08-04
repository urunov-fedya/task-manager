<script lang="ts" setup>
import { CalendarIcon, Edit2Icon, Trash2Icon } from 'lucide-vue-next'
import type { CardTaskProps } from './type.props'
import { Badge, Button } from '@ui'

const props = defineProps<CardTaskProps>()

const emit = defineEmits<{
  (e: 'edit', task: CardTaskProps['task']): void
  (e: 'delete', task: CardTaskProps['task']): void
}>()
</script>

<template>
  <div class="p-4 bg-white rounded-2xl border flex-col flex hover:shadow">
    <header class="flex justify-between items-center mb-2">
      <h2 class="text-lg font-medium">{{ props.task.name }}</h2>
      <Badge :variant="props.task.status">{{ props.task.status }}</Badge>
    </header>
    <div class="flex-1">
      <p class="text-gray-600 mb-4 line-clamp-2">{{ props.task.description }}</p>
    </div>
    <footer class="flex justify-between items-center">
      <div class="flex items-center gap-2 text-muted-foreground text-sm">
        <CalendarIcon />
        <span>Срок: {{ props.task.deadline }}</span>
      </div>
      <div class="flex items-center">
        <Button variant="ghost" @click="emit('edit', props.task)">
          <Edit2Icon />
        </Button>
        <Button variant="ghost" @click="emit('delete', props.task)">
          <Trash2Icon />
        </Button>
      </div>
    </footer>
  </div>
</template>
