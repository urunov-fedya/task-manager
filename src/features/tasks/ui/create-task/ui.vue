<script lang="ts" setup>
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
  DialogTrigger,
  Textarea,
} from '@ui'
import { useForm } from 'vee-validate'
import { taskSchema, type TTaskSchema } from '../../model'
import { TaskSort } from '../task-sort'
import { useCreateTask } from './services'
import { ref } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import { toast } from 'vue-sonner'

const isOpen = ref(false)

const toggle = () => {
  isOpen.value = !isOpen.value
}

const form = useForm<TTaskSchema>({
  initialValues: {
    name: '',
    description: '',
    status: 'pending',
    deadline: '',
  },
  validationSchema: toTypedSchema(taskSchema),
})

const createTaskApi = useCreateTask()

const onSubmit = form.handleSubmit(values => {
  createTaskApi.mutate(values, {
    onSuccess: () => {
      toggle()
      form.resetForm()
      toast.success('Задача создана')
    },
    onError: err => {
      toast.error('Ошибка создания задачи', {
        description: err.message,
      })
    },
  })
})
</script>
<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger>
      <Button>Создать задачу</Button>
    </DialogTrigger>
    <DialogContent class="p-6 sm:max-w-[425px] grid-rows-[auto_minmax(0,1fr)_auto] max-h-[90dvh]">
      <DialogHeader class="pb-0">
        <DialogTitle>Создание задачи</DialogTitle>
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
        <Button type="button" variant="outline" @click="toggle">Отменить</Button>
        <Button type="submit" form="create-task" :disabled="createTaskApi.isPending.value">
          Сохранить
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
