<script setup lang="ts">
import CoverComponent from '@/components/CoverComponent.vue'
import type { Book } from '../types/book'

const props = defineProps<{ book: Book }>()
</script>

<template>
  <div class="book">
    <CoverComponent :book="props.book" />
    <div class="mainInfo">
      <h3>{{ props.book.title }}</h3>
      <h3 class="author">{{ props.book.author }}</h3>
    </div>
    <div class="bookInfo">{{ props.book.upvotes }}</div>
    <div class="bookInfo">{{ props.book.rating }}/10</div>
    <div class="bookInfo"><span class="link">Amazon</span></div>
  </div>
</template>

<style scoped>
.book {
  display: flex;
  flex-direction: row;
  padding: 2rem;
}
.mainInfo {
  display: flex;
  flex-direction: column;
  width: 50%;
  padding-left: 1.5rem;
}
.bookInfo {
  display: flex;
  width: 15%;
  text-align: center;
  align-items: center;
  font-family: Helvetica;
}
.author {
  color: gray;
  font-weight: 200;
  margin-top: 0;
}
.link {
  cursor: pointer;
  color: #bbd182;
  font-weight: 600;
  font-size: 22px;
}
</style>
