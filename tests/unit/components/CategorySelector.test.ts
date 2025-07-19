import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CategorySelector from '~/components/CategorySelector.vue'

describe('CategorySelector', () => {
  const mockCategories = [
    { id: 'tokyo-trial', name: '東京裁判史観について', questionCount: 3 },
    { id: 'selective-surname', name: '選択的夫婦別姓のデメリット', questionCount: 3 },
    { id: 'hayek', name: 'ハイエクについて', questionCount: 3 },
    { id: 'abenomics', name: 'アベノミクスについて', questionCount: 3 }
  ]

  describe('レンダリング', () => {
    it('正しくレンダリングされる', () => {
      const wrapper = mount(CategorySelector, {
        props: {
          categories: mockCategories
        }
      })

      expect(wrapper.find('h3').text()).toBe('カテゴリーを選択')
      expect(wrapper.findAll('.grid button')).toHaveLength(4)
    })

    it('カテゴリーボタンが正しい内容で表示される', () => {
      const wrapper = mount(CategorySelector, {
        props: {
          categories: mockCategories
        }
      })

      const categoryButtons = wrapper.findAll('.grid button')

      expect(categoryButtons[0]?.text()).toContain('東京裁判史観について')
      expect(categoryButtons[0]?.text()).toContain('3問')

      expect(categoryButtons[1]?.text()).toContain('選択的夫婦別姓のデメリット')
      expect(categoryButtons[1]?.text()).toContain('3問')

      expect(categoryButtons[2]?.text()).toContain('ハイエクについて')
      expect(categoryButtons[2]?.text()).toContain('3問')

      expect(categoryButtons[3]?.text()).toContain('アベノミクスについて')
      expect(categoryButtons[3]?.text()).toContain('3問')
    })

    it('全問題に挑戦ボタンが表示される', () => {
      const wrapper = mount(CategorySelector, {
        props: {
          categories: mockCategories
        }
      })

      const allQuestionsButton = wrapper.find('.text-center button')
      expect(allQuestionsButton.text()).toContain('全問題に挑戦')
    })
  })

  describe('イベント発火', () => {
    it('カテゴリーボタンクリックでselect-categoryイベントが発火される', async() => {
      const wrapper = mount(CategorySelector, {
        props: {
          categories: mockCategories
        }
      })

      const firstCategoryButton = wrapper.findAll('.grid button')[0]
      await firstCategoryButton!.trigger('click')

      expect(wrapper.emitted('select-category')).toBeTruthy()
      expect(wrapper.emitted('select-category')![0]).toEqual(['tokyo-trial'])
    })

    it('2番目のカテゴリーボタンクリックで正しいIDが送信される', async() => {
      const wrapper = mount(CategorySelector, {
        props: {
          categories: mockCategories
        }
      })

      const secondCategoryButton = wrapper.findAll('.grid button')[1]
      await secondCategoryButton!.trigger('click')

      expect(wrapper.emitted('select-category')).toBeTruthy()
      expect(wrapper.emitted('select-category')![0]).toEqual(['selective-surname'])
    })

    it('全問題に挑戦ボタンクリックでselect-allイベントが発火される', async() => {
      const wrapper = mount(CategorySelector, {
        props: {
          categories: mockCategories
        }
      })

      const allQuestionsButton = wrapper.find('.text-center button')
      await allQuestionsButton.trigger('click')

      expect(wrapper.emitted('select-all')).toBeTruthy()
    })
  })

  describe('スタイリング', () => {
    it('カテゴリーボタンにホバー効果のクラスがある', () => {
      const wrapper = mount(CategorySelector, {
        props: {
          categories: mockCategories
        }
      })

      const categoryButtons = wrapper.findAll('.grid button')
      categoryButtons.forEach(button => {
        expect(button.classes()).toContain('hover:shadow-lg')
        expect(button.classes()).toContain('transform')
        expect(button.classes()).toContain('hover:-translate-y-1')
      })
    })

    it('全問題ボタンにグラデーション効果がある', () => {
      const wrapper = mount(CategorySelector, {
        props: {
          categories: mockCategories
        }
      })

      const allQuestionsButton = wrapper.find('.text-center button')
      expect(allQuestionsButton.classes()).toContain('bg-gradient-to-r')
      expect(allQuestionsButton.classes()).toContain('from-blue-600')
      expect(allQuestionsButton.classes()).toContain('to-red-600')
    })

    it('レスポンシブなグリッドレイアウトが適用されている', () => {
      const wrapper = mount(CategorySelector, {
        props: {
          categories: mockCategories
        }
      })

      const gridContainer = wrapper.find('.grid')
      expect(gridContainer.classes()).toContain('grid-cols-1')
      expect(gridContainer.classes()).toContain('md:grid-cols-2')
      expect(gridContainer.classes()).toContain('lg:grid-cols-3')
    })
  })

  describe('エッジケース', () => {
    it('カテゴリーが空の場合でも正常にレンダリングされる', () => {
      const wrapper = mount(CategorySelector, {
        props: {
          categories: []
        }
      })

      expect(wrapper.find('h3').exists()).toBe(true)
      expect(wrapper.findAll('.grid button')).toHaveLength(0)
      expect(wrapper.find('.text-center button').text()).toContain('全問題に挑戦')
    })

    it('カテゴリー名が長い場合でも適切に表示される', () => {
      const longNameCategories = [
        {
          id: 'long-name',
          name: 'とても長いカテゴリー名のテストケースでレイアウトが崩れないことを確認する',
          questionCount: 5
        }
      ]

      const wrapper = mount(CategorySelector, {
        props: {
          categories: longNameCategories
        }
      })

      const categoryButton = wrapper.find('.grid button')
      expect(categoryButton.text()).toContain('とても長いカテゴリー名のテストケースでレイアウトが崩れないことを確認する')
      expect(categoryButton.text()).toContain('5問')
    })

    it('問題数が0の場合でも表示される', () => {
      const zeroCategoryQuestions = [
        { id: 'empty-category', name: '問題のないカテゴリー', questionCount: 0 }
      ]

      const wrapper = mount(CategorySelector, {
        props: {
          categories: zeroCategoryQuestions
        }
      })

      const categoryButton = wrapper.find('.grid button')
      expect(categoryButton.text()).toContain('問題のないカテゴリー')
      expect(categoryButton.text()).toContain('0問')
    })
  })

  describe('アクセシビリティ', () => {
    it('ボタンが適切にレンダリングされる', () => {
      const wrapper = mount(CategorySelector, {
        props: {
          categories: mockCategories
        }
      })

      const categoryButtons = wrapper.findAll('.grid button')
      const allQuestionsButton = wrapper.find('.text-center button')

      expect(categoryButtons.length).toBeGreaterThan(0)
      expect(allQuestionsButton.exists()).toBe(true)
    })
  })
})
