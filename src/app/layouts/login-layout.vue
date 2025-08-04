<script lang="ts" setup></script>
<template>
  <main class="min-h-dvh bg-gray-100 flex justify-center items-center">
    <router-view v-slot="{ Component }">
      <component :is="Component"></component>
    </router-view>
  </main>
</template>
