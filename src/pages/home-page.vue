<script lang="ts" setup>
import { TaskList, CreateTask, SearchTask } from '@features'
</script>

<template>
  <header class="flex justify-between items-center mb-6">
    <SearchTask />
    <CreateTask />
  </header>
  <TaskList />
</template>
