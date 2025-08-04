<script lang="ts" setup>
import type { Task } from '@entities'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
  Textarea,
} from '@ui'
import { useForm } from 'vee-validate'
import { taskSchema, type TTaskSchema } from '../../model'
import { TaskSort } from '../task-sort'
import { useUpdateTask } from './services'
import { toast } from 'vue-sonner'
import { toTypedSchema } from '@vee-validate/zod'
import { watch } from 'vue'
const modelOpen = defineModel<boolean>('open')
const modelTask = defineModel<Task | null>('task')

const handleCloseModal = () => {
  modelOpen.value = false
  modelTask.value = null
}

const form = useForm<TTaskSchema>({
  initialValues: {
    name: modelTask.value?.name || '',
    description: modelTask.value?.description || '',
    status: modelTask.value?.status || 'pending',
    deadline: modelTask.value?.deadline || '',
  },
  validationSchema: toTypedSchema(taskSchema),
})

watch(
  () => modelTask.value,
  () => {
    form.resetForm({
      values: {
        name: modelTask.value?.name ?? '',
        description: modelTask.value?.description ?? '',
        status: modelTask.value?.status ?? 'pending',
        deadline: modelTask.value?.deadline ?? '',
      },
    })
  }
)

const updateTaskApi = useUpdateTask()

const onSubmit = form.handleSubmit(values => {
  updateTaskApi.mutate(
    { id: modelTask.value?.id ?? 0, ...values },
    {
      onSuccess: () => {
        handleCloseModal()
        toast.success('Задача обновлена')
      },
      onError: () => {
        toast.error('Ошибка обновления задачи')
      },
    }
  )
})
</script>
<template>
  <Dialog v-model:open="modelOpen">
    <DialogContent class="p-6 sm:max-w-[425px] grid-rows-[auto_minmax(0,1fr)_auto] max-h-[90dvh]">
      <DialogHeader class="pb-0">
        <DialogTitle>Обновление задачи</DialogTitle>
      </DialogHeader>
      <form class="flex flex-col gap-4" id="create-task" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="name" :validate-on-blur="!form.isFieldDirty">
          <FormItem>
            <FormLabel>Название</FormLabel>
            <FormControl>
              <Input placeholder="Название" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField }"
          name="description"
          :validate-on-blur="!form.isFieldDirty"
        >
          <FormItem>
            <FormLabel>Описание</FormLabel>
            <FormControl>
              <Textarea placeholder="Описание" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <div class="flex items-center gap-4">
          <FormField
            v-slot="{ componentField }"
            name="status"
            :validate-on-blur="!form.isFieldDirty"
          >
            <FormItem class="flex-1">
              <FormLabel>Статус</FormLabel>
              <FormControl>
                <TaskSort v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField
            v-slot="{ componentField }"
            name="deadline"
            :validate-on-blur="!form.isFieldDirty"
          >
            <FormItem class="flex-1">
              <FormLabel>Срок</FormLabel>
              <FormControl>
                <Input type="date" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
      </form>
      <DialogFooter class="pt-0">
        <Button type="button" variant="outline" @click="handleCloseModal">Отменить</Button>
        <Button type="submit" form="create-task" :disabled="updateTaskApi.isPending.value">
          Сохранить
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
