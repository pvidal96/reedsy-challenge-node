import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import LoaderComponent from '../LoaderComponent.vue'

describe('LoaderComponent.vue Test', () => {
  it('renders message when component is created', () => {
    // render the component
    const wrapper = shallowMount(LoaderComponent)

    // check that the title is rendered
    expect(wrapper.text()).toMatch('Loading...')
  })
})
