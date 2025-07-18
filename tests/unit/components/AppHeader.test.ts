import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppHeader from '~/components/AppHeader.vue'

describe('AppHeader', () => {
  it('タイトルが正しく表示される', () => {
    const wrapper = mount(AppHeader)
    expect(wrapper.find('h1').text()).toBe('政治クイズアプリ')
  })

  it('サブタイトルが正しく表示される', () => {
    const wrapper = mount(AppHeader)
    expect(wrapper.find('p').text()).toBe('日本の政党について学ぼう')
  })

  it('正しいスタイルクラスが適用されている', () => {
    const wrapper = mount(AppHeader)
    const header = wrapper.find('header')
    expect(header.classes()).toContain('bg-blue-600')
    expect(header.classes()).toContain('text-white')
    expect(header.classes()).toContain('shadow-lg')
  })
})
