<script lang="ts" setup>
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@ui'

const props = defineProps<{
  total: number
  defaultPage?: number
}>()
const model = defineModel<number>()
</script>
<template>
  <Pagination
    show-edges
    :sibling-count="1"
    :items-per-page="10"
    :total="props.total"
    :default-page="props.defaultPage ?? 1"
    v-slot="{ page }"
    v-model:page="model"
    class="justify-between items-center bg-white p-4 rounded-b-2xl"
  >
    <aside class="text-muted-foreground text-sm">
      Showing {{ (page - 1) * 10 + 1 }} to {{ page * 10 }} of {{ props.total }} tasks
    </aside>
    <PaginationContent v-slot="{ items }">
      <PaginationPrevious />
      <template v-for="(item, index) in items" :key="index">
        <PaginationItem
          v-if="item.type === 'page'"
          :value="item.value"
          :is-active="item.value === page"
        >
          {{ item.value }}
        </PaginationItem>
        <PaginationEllipsis v-else />
      </template>
      <PaginationNext />
    </PaginationContent>
  </Pagination>
</template>
