import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CategorySelector from '~/components/CategorySelector.vue'

describe('CategorySelector', () => {
  const mockCategories = [
    { id: 'cat1', name: 'カテゴリー1', questionCount: 5 },
    { id: 'cat2', name: 'カテゴリー2', questionCount: 10 },
    { id: 'cat3', name: 'カテゴリー3', questionCount: 8 }
  ]

  it('renders all categories', () => {
    const wrapper = mount(CategorySelector, {
      props: {
        categories: mockCategories
      }
    })

    const categoryButtons = wrapper.findAll('[data-test="category-button"]')
    expect(categoryButtons).toHaveLength(3)
  })

  it('displays category names and question counts', () => {
    const wrapper = mount(CategorySelector, {
      props: {
        categories: mockCategories
      }
    })

    expect(wrapper.text()).toContain('カテゴリー1')
    expect(wrapper.text()).toContain('5問')
    expect(wrapper.text()).toContain('カテゴリー2')
    expect(wrapper.text()).toContain('10問')
  })

  it('emits select-category event when category button is clicked', async() => {
    const wrapper = mount(CategorySelector, {
      props: {
        categories: mockCategories
      }
    })

    const firstCategoryButton = wrapper.findAll('button')[0]
    if (firstCategoryButton) {
      await firstCategoryButton.trigger('click')

      expect(wrapper.emitted('select-category')).toBeTruthy()
      expect(wrapper.emitted('select-category')![0]).toEqual(['cat1'])
    }
  })

  it('emits select-all event when all questions button is clicked', async() => {
    const wrapper = mount(CategorySelector, {
      props: {
        categories: mockCategories
      }
    })

    const allQuestionsButton = wrapper.find('[data-test="all-questions-button"]')
    if (!allQuestionsButton.exists()) {
      // If data-test attribute is not found, find by text content
      const buttons = wrapper.findAll('button')
      const allButton = buttons.find(button => button.text().includes('全問題に挑戦'))
      expect(allButton).toBeTruthy()
      if (allButton) {
        await allButton.trigger('click')
      }
    } else {
      await allQuestionsButton.trigger('click')
    }

    expect(wrapper.emitted('select-all')).toBeTruthy()
  })

  it('renders title correctly', () => {
    const wrapper = mount(CategorySelector, {
      props: {
        categories: mockCategories
      }
    })

    expect(wrapper.find('h3').text()).toBe('カテゴリーを選択')
  })

  it('handles empty categories array', () => {
    const wrapper = mount(CategorySelector, {
      props: {
        categories: []
      }
    })

    const categoryButtons = wrapper.findAll('button')
    // Should only have the "all questions" button
    expect(categoryButtons.length).toBe(1)
    expect(categoryButtons[0]?.text()).toContain('全問題に挑戦')
  })

  it('applies correct CSS classes for styling', () => {
    const wrapper = mount(CategorySelector, {
      props: {
        categories: mockCategories
      }
    })

    expect(wrapper.find('.bg-white\\/90').exists()).toBe(true)
    expect(wrapper.find('.rounded-2xl').exists()).toBe(true)
    expect(wrapper.find('.shadow-xl').exists()).toBe(true)
  })
})
