<script lang="ts" setup>
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Input,
  Button,
} from '@ui'
import { useForm } from 'vee-validate'
import { formSchema } from './schema'
import { useLogin } from './services'
import { toast } from 'vue-sonner'
import { toTypedSchema } from '@vee-validate/zod'
import { useRouter } from 'vue-router'
import { useUserStore } from '@entities'

const form = useForm({
  initialValues: {
    email: '',
    password: '',
  },
  validationSchema: toTypedSchema(formSchema),
})

const router = useRouter()
const userStore = useUserStore()
const loginApi = useLogin()

const onSubmit = form.handleSubmit(values => {
  loginApi.mutate(values, {
    onSuccess(res) {
      toast.success(`Добро пожаловать, ${res.data.fullName}!`)
      userStore.setUser({ ...res.data, token: res.token })
      router.push('/')
    },
    onError(err) {
      toast.warning('Что-то пошло не так', {
        description: err.message,
      })
    },
  })
})
</script>

<template>
  <form @submit="onSubmit" class="bg-accent p-6 rounded-md shadow w-xl flex flex-col gap-5">
    <FormField v-slot="{ componentField }" name="email" :validate-on-blur="!form.isFieldDirty">
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input placeholder="example@gmail.com" v-bind="componentField" />
        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="password" :validate-on-blur="!form.isFieldDirty">
      <FormItem>
        <FormLabel>Password</FormLabel>
        <FormControl>
          <Input placeholder="********" v-bind="componentField" />
        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    </FormField>
    <footer class="flex flex-col gap-2">
      <Button type="submit" :disabled="loginApi.isPending.value">Отправить</Button>
      <div class="flex justify-center items-center">
        <p class="text-muted-foreground">Нет аккаунта?</p>
        <Button variant="link" as-child>
          <router-link to="/auth/register">Зарегистрироваться</router-link>
        </Button>
      </div>
    </footer>
  </form>
</template>
