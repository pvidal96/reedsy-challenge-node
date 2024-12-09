<script setup lang="ts">
import type { Book } from '../types/book'
import BookComponent from './BookComponent.vue'

const props = defineProps<{ books: Book[] }>()
</script>

<template>
  <div class="bookList">
    <div></div>
    <div
      v-for="(book, index) in props.books"
      :key="book.id"
      :style="{ backgroundColor: index % 2 === 0 ? '#faf9f7' : 'white' }"
    >
      <BookComponent :book="book" />
    </div>
  </div>
</template>

<style scoped>
.bookList {
  padding-bottom: 2rem;
}
</style>
