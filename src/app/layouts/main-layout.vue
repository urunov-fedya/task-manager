<script lang="ts" setup>
import { Header, Sidebar } from '@widgets'
</script>

<template>
  <section>
    <Header />
    <div class="flex min-h-dvh gap-5">
      <Sidebar />
      <main class="flex-1 p-5 bg-gray-100 rounded-lg">
        <router-view v-slot="{ Component }">
          <component :is="Component"></component>
        </router-view>
      </main>
    </div>
  </section>
</template>
