<script lang="ts" setup>
import type { Task } from '@entities'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from '@ui'
import { useDeleteTask } from './services'

const modelOpen = defineModel<boolean>('open')
const modelTask = defineModel<Task | null>('task')

const deleteTaskApi = useDeleteTask()

const handleDelete = () => {
  deleteTaskApi.mutate(modelTask.value?.id ?? 0, {
    onSuccess: () => {
      modelOpen.value = false
      modelTask.value = null
    },
  })
}

const closeDialog = () => {
  if (modelOpen.value) {
    modelOpen.value = false
  }
}
</script>

<template>
  <AlertDialog v-model:open="modelOpen">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Удалить задачу
          <i>{{ modelTask?.name }}</i> ?
        </AlertDialogTitle>
        <AlertDialogDescription>
          Это действие не может быть отменено. Это будет навсегда удалить вашу задачу и удалить ваши
          данные с наших серверов.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel @click="closeDialog">Отменить</AlertDialogCancel>
        <AlertDialogAction
          :disabled="deleteTaskApi.isPending.value"
          @click="handleDelete"
          variant="destructive"
        >
          Удалить
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
