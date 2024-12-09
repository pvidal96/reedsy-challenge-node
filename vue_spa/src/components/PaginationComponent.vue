<script setup lang="ts">
import IconChevronLeft from '@/components/icons/IconChevronLeft.vue'
import IconChevronRight from '@/components/icons/IconChevronRight.vue'

const props = defineProps<{
  pageCount: number
}>()
const currentPage = defineModel<number>({ default: 1 })
</script>

<template>
  <div class="pagination">
    <button @click="currentPage--">
      <IconChevronLeft />
    </button>
    <span> Page {{ currentPage }} of {{ props.pageCount }} </span>
    <button @click="currentPage++">
      <IconChevronRight />
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
}
</style>
