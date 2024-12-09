<script setup lang="ts">
import type { Book } from '../types/book'

const props = defineProps<{ book: Book }>()

const imgUrl = new URL('../assets/images/' + props.book.cover, import.meta.url).href
// const imgUrl = '@/assets/images/' + props.book.cover
</script>

<template>
  <div>
    <img class="cover" :src="imgUrl" v-bind:alt="props.book.title" />
  </div>
</template>

<style scoped>
.cover {
  display: block;
  aspect-ratio: 1 / 1.6;
  width: 100%;
  height: 160px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 0.5rem;
  cursor: pointer;
}
</style>
