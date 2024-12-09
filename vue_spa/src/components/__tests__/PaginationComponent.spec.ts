import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import PaginationComponent from '../PaginationComponent.vue'

describe('PaginationComponent.vue Test', () => {
  it('renders pagination when component is created', () => {
    // render the component
    const wrapper = shallowMount(PaginationComponent, {
      propsData: {
        pageCount: 5,
      },
    })

    // check that the title is rendered
    expect(wrapper.text()).toMatch('Page 1 of 5')
  })
})
