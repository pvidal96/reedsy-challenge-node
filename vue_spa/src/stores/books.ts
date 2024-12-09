import { defineStore } from 'pinia'
import type { Book } from '../types/book'
import { BOOKS } from '../data/books'

export const useBookStore = defineStore('books', () => {
  async function fetchBooks(limit: number, offset: number = 0): Promise<Book[]> {
    //TODO here we should call a real API to obtain books, maybe with pagination in case are thousands/millions
    return Promise.resolve(BOOKS.slice(offset, offset + limit))
  }

  async function fetchBookCount(): Promise<number> {
    //TODO here we should call a real API to obtain books count
    return Promise.resolve(BOOKS.length)
  }

  return { fetchBooks, fetchBookCount }
})
