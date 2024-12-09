<script setup lang="ts">
import { ref, watch, type Ref } from 'vue'
import { useBookStore } from '@/stores/books.js'
import LoaderComponent from '@/components/LoaderComponent.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'
import type { Book } from '../types/book'
import BookListComponent from '../components/BookListComponent.vue'

const INITIAL_ITEMS_PER_PAGE = 5

const store = useBookStore()
const currentPage = ref(1)
const books: Ref<Book[] | null> = ref(null)
let bookCount: number
let pageCount: number

watch(currentPage, fetchBooks, { immediate: true })

async function fetchBooks() {
  const offset = (currentPage.value - 1) * INITIAL_ITEMS_PER_PAGE
  const limit =
    currentPage.value === pageCount
      ? INITIAL_ITEMS_PER_PAGE - (bookCount % INITIAL_ITEMS_PER_PAGE)
      : INITIAL_ITEMS_PER_PAGE
  books.value = await store.fetchBooks(limit, offset)
}

async function fetchData() {
  bookCount = await store.fetchBookCount()
  pageCount = Math.ceil(bookCount / INITIAL_ITEMS_PER_PAGE)
  await fetchBooks()
}
fetchData()
</script>

<template>
  <div class="container">
    <LoaderComponent v-if="!books" />
    <div v-else class="books">
      <h1 class="header">Most popular Books of All time</h1>
      <BookListComponent :books="books" />
      <PaginationComponent v-model="currentPage" :pageCount="pageCount" />
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 0;
}
.header {
  padding-left: 2rem;
}
</style>
