import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import BookListComponent from '../BookListComponent.vue'
import { Book } from '../../types/book'

describe('BookListComponent.vue Test', () => {
  it('renders book list info when component is created', () => {
    const wrapper = shallowMount(BookListComponent, {
      propsData: {
        books,
      },
    })

    // check that the book items are rendered
    expect(wrapper.find('.bookList').findAll('.bookListItem').length).toEqual(3)
  })
})

// Book example
const books: Book[] = [
  {
    id: 21,
    author: 'James Joyce',
    cover: '03.jpg',
    rating: '9.6',
    slug: 'ulysses',
    synopsis:
      'All the action of Ulysses takes place in and immediately around Dublin on a single day (June 16, 1904). The three central characters—Stephen Dedalus (the hero of Joyce’s earlier Portrait of the Artist as a Young Man); Leopold Bloom, a Jewish advertising canvasser; and his wife, Molly—are intended to be modern counterparts of Telemachus, Ulysses (Odysseus), and Penelope, respectively, and the events of the novel loosely parallel the major events in Odysseus’s journey home after the Trojan War.\nAll the action of Ulysses takes place in and immediately around Dublin on a single day (June 16, 1904). The three central characters—Stephen Dedalus (the hero of Joyce’s earlier Portrait of the Artist as a Young Man); Leopold Bloom, a Jewish advertising canvasser; and his wife, Molly—are intended to be modern counterparts of Telemachus, Ulysses (Odysseus), and Penelope, respectively, and the events of the novel loosely parallel the major events in Odysseus’s journey home after the Trojan War.',
    title: 'Ulysses',
    upvoted: false,
    upvotes: 1003,
  },
  {
    id: 22,
    author: 'F. Scott Fitzgerald',
    cover: '04.jpg',
    rating: '9.3',
    slug: 'the-great-gatsby',
    synopsis:
      "The Great Gatsby is a story told by Nick Carraway, who was once Gatsby's neighbor, and he tells the story sometime after 1922, when the incidents that fill the book take place. As the story opens, Nick has just moved from the Midwest to West Egg, Long Island, seeking his fortune as a bond salesman.\nThe Great Gatsby is a story told by Nick Carraway, who was once Gatsby's neighbor, and he tells the story sometime after 1922, when the incidents that fill the book take place. As the story opens, Nick has just moved from the Midwest to West Egg, Long Island, seeking his fortune as a bond salesman.",
    title: 'The Great Gatsby',
    upvoted: false,
    upvotes: 991,
  },
  {
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
  },
]
