import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import BookComponent from '../BookComponent.vue'
import { Book } from '../../types/book'

describe('BookComponent.vue Test', () => {
  it('renders book info when component is created', () => {
    const wrapper = shallowMount(BookComponent, {
      propsData: {
        book,
      },
    })

    // check that the book items are rendered
    expect(wrapper.find('div.mainInfo').findAll('h3').at(0)?.text()).toMatch(book.title)
    expect(wrapper.find('div.mainInfo').findAll('h3').at(1)?.text()).toMatch(book.author)
    expect(wrapper.findAll('div.bookInfo').at(0)?.text()).toMatch(book.upvotes.toString())
    expect(wrapper.findAll('div.bookInfo').at(0)?.text()).toMatch(book.upvotes.toString())
    expect(wrapper.findAll('div.bookInfo').at(1)?.text()).toMatch(book.rating + '/10')
  })
})

// Book example
const book: Book = {
  id: 23,
  author: 'Herman Melville',
  cover: '05.jpg',
  rating: '9.1',
  slug: 'moby-dick',
  synopsis:
    "The sole survivor of a lost whaling ship relates the tale of his captain's self-destructive obsession to hunt the white whale, Moby Dick. This classic story by Herman Melville revolves around Captain Ahab and his obsession with a huge whale, Moby Dick.\nThe sole survivor of a lost whaling ship relates the tale of his captain's self-destructive obsession to hunt the white whale, Moby Dick. This classic story by Herman Melville revolves around Captain Ahab and his obsession with a huge whale, Moby Dick.",
  title: 'Moby Dick',
  upvoted: true,
  upvotes: 940,
}
