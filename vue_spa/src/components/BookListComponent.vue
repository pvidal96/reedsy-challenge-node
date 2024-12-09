<script setup lang="ts">
import { ref, type Ref } from 'vue'
import type { Book } from '../types/book'
import BookComponent from './BookComponent.vue'

const props = defineProps<{ books: Book[] }>()

const expandedBookId: Ref<number | null> = ref(null)

function onClickRow(bookId: Book['id']) {
  expandedBookId.value = bookId === expandedBookId.value ? null : bookId
}
</script>

<template>
  <div class="bookList">
    <div class="tableHeader">
      <div class="title"><h3>TITLE</h3></div>
      <div class="headerItem"><h3>PUBLISHED</h3></div>
      <div class="headerItem"><h3>RATING</h3></div>
      <div class="headerItem"><h3>BUY ON</h3></div>
    </div>
    <div
      v-for="(book, index) in props.books"
      class="bookListItem"
      :key="book.id"
      :style="{ backgroundColor: index % 2 === 0 ? '#faf9f7' : 'white', cursor: 'pointer' }"
      @click="onClickRow(book.id)"
    >
      <BookComponent :book="book" :displaySynopsis="book.id === expandedBookId" />
    </div>
  </div>
</template>

<style scoped>
.bookList {
  padding-bottom: 2rem;
  width: 100%;
}
.tableHeader {
  display: flex;
  flex-direction: row;
  padding-left: 2rem;
  color: #999999;
}
.title {
  width: 55%;
}
.headerItem {
  width: 15%;
  padding-left: 0.5rem;
}
</style>
