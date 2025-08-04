<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { type Task, CardTask } from '@entities'
import { Pagination } from '@widgets'
import { Spinner } from '@ui'
import { useTaskList } from './services'
import { DeleteTask } from '../delete-task'
import { UpdateTask } from '../update-task'
import { useTaskStore } from '../../model/store'

const taskStore = useTaskStore()

const taskApi = useTaskList(() => taskStore.params)
const selectedTask = ref<Task | null>(null)
const modals = reactive({
  deleteTask: false,
  updateTask: false,
})

const handleToggle = (modal: keyof typeof modals, task: Task | null) => {
  selectedTask.value = task
  modals[modal] = !modals[modal]
}
</script>

<template>
  <section class="grid md:grid-cols-3 gap-4 bg-white p-4 rounded-t-2xl">
    <Spinner v-if="taskApi.isLoading.value" />
    <CardTask
      v-else
      v-for="task in taskApi.data.value?.items"
      :key="task.id"
      :task="task"
      @edit="handleToggle('updateTask', task)"
      @delete="handleToggle('deleteTask', task)"
    />
  </section>

  <Pagination v-model="taskStore.params.page" :total="taskApi.data.value?.meta.total_items ?? 0" />
  <DeleteTask v-model:open="modals.deleteTask" v-model:task="selectedTask" />
  <UpdateTask v-model:open="modals.updateTask" v-model:task="selectedTask" />
</template>
