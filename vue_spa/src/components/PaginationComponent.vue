<script setup lang="ts">
import IconChevronLeft from '@/components/icons/IconChevronLeft.vue'
import IconChevronRight from '@/components/icons/IconChevronRight.vue'

const props = defineProps<{
  pageCount: number
}>()
const currentPage = defineModel<number>({ default: 1 })

function onUpdateCurrentPage(newValue: number): void {
  if (newValue > 0 && newValue <= props.pageCount) {
    currentPage.value = newValue
  }
}
</script>

<template>
  <div class="pagination">
    <button @click="onUpdateCurrentPage(currentPage - 1)">
      <IconChevronLeft :disabled="currentPage === 1" />
    </button>
    <span>Page {{ currentPage }} of {{ props.pageCount }}</span>
    <button @click="onUpdateCurrentPage(currentPage + 1)">
      <IconChevronRight :disabled="currentPage === props.pageCount" />
    </button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  font-size: 20px;
}

button {
  display: flex;
  background: none;
  border: none;
  align-items: center;
  cursor: pointer;
}
</style>
