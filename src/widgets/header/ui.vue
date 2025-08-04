<script lang="ts" setup>
import { Button } from '@ui'
import { useUserStore } from '@entities'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'

const userStore = useUserStore()
const router = useRouter()

const handleLogout = () => {
  userStore.setUser(null)
  router.replace('/auth/login')
  toast.success('Вы успешно вышли из аккаунта')
}
</script>

<template>
  <header class="flex justify-between items-center p-4 bg-access">
    <router-link to="/">Task Manager</router-link>
    <nav class="flex gap-2">
      <Button variant="destructive" @click="handleLogout">Выйти</Button>
    </nav>
  </header>
</template>
