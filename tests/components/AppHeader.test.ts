import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppHeader from '~/components/AppHeader.vue'

describe('AppHeader', () => {
  it('renders the header with correct title', () => {
    const wrapper = mount(AppHeader)

    expect(wrapper.find('h1').text()).toBe('政治クイズアプリ')
    expect(wrapper.find('p').text()).toBe('日本の政党について学ぼう')
  })

  it('has correct CSS classes', () => {
    const wrapper = mount(AppHeader)

    expect(wrapper.find('header').classes()).toContain('bg-blue-600')
    expect(wrapper.find('header').classes()).toContain('text-white')
    expect(wrapper.find('header').classes()).toContain('shadow-lg')
  })

  it('renders header structure correctly', () => {
    const wrapper = mount(AppHeader)

    expect(wrapper.find('header').exists()).toBe(true)
    expect(wrapper.find('.container').exists()).toBe(true)
    expect(wrapper.find('h1').exists()).toBe(true)
    expect(wrapper.find('p').exists()).toBe(true)
  })
})
