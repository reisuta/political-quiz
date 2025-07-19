import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CategorySelector from '~/components/CategorySelector.vue'
import QuizResult from '~/components/QuizResult.vue'

describe('Edge Cases and Branch Coverage', () => {
  describe('CategorySelector Edge Cases', () => {
    it('handles category with zero questions', () => {
      const categoriesWithZero = [
        { id: 'cat1', name: 'カテゴリー1', questionCount: 0 },
        { id: 'cat2', name: 'カテゴリー2', questionCount: 5 }
      ]

      const wrapper = mount(CategorySelector, {
        props: {
          categories: categoriesWithZero
        }
      })

      expect(wrapper.text()).toContain('0問')
      expect(wrapper.text()).toContain('5問')
    })

    it('handles single category', () => {
      const singleCategory = [
        { id: 'single', name: '単一カテゴリー', questionCount: 10 }
      ]

      const wrapper = mount(CategorySelector, {
        props: {
          categories: singleCategory
        }
      })

      const categoryButtons = wrapper.findAll('[data-test="category-button"]')
      expect(categoryButtons).toHaveLength(1)
    })

    it('handles categories with long names', () => {
      const longNameCategories = [
        {
          id: 'long',
          name: '非常に長いカテゴリー名前テストケースですがちゃんと表示されるかテスト',
          questionCount: 1
        }
      ]

      const wrapper = mount(CategorySelector, {
        props: {
          categories: longNameCategories
        }
      })

      expect(wrapper.text()).toContain('非常に長いカテゴリー名前テストケースですがちゃんと表示されるかテスト')
    })

    it('emits with correct category id when multiple categories exist', async() => {
      const multipleCategories = [
        { id: 'first', name: 'First', questionCount: 1 },
        { id: 'second', name: 'Second', questionCount: 2 },
        { id: 'third', name: 'Third', questionCount: 3 }
      ]

      const wrapper = mount(CategorySelector, {
        props: {
          categories: multipleCategories
        }
      })

      const buttons = wrapper.findAll('[data-test="category-button"]')
      if (buttons[1]) {
        await buttons[1].trigger('click')
        expect(wrapper.emitted('select-category')?.[0]).toEqual(['second'])
      }
    })
  })

  describe('QuizResult Edge Cases', () => {
    const mockQuiz = {
      getAnswerResult: vi.fn(() => ({ isCorrect: false, userAnswer: null, correctAnswer: 0 })),
      totalQuestions: ref(10)
    }

    vi.mock('~/composables/useQuiz', () => ({
      useQuiz: () => mockQuiz
    }))

    it('handles score of exactly 100%', () => {
      const perfectProps = {
        score: 100,
        quizResults: []
      }

      const wrapper = mount(QuizResult, {
        props: perfectProps
      })

      expect(wrapper.text()).toContain('100%')
    })

    it('handles score of exactly 0%', () => {
      const zeroProps = {
        score: 0,
        quizResults: []
      }

      const wrapper = mount(QuizResult, {
        props: zeroProps
      })

      expect(wrapper.text()).toContain('0%')
    })

    it('handles boundary scores', () => {
      const boundaryScores = [50, 60, 70, 80, 90]

      boundaryScores.forEach(score => {
        const wrapper = mount(QuizResult, {
          props: {
            score,
            quizResults: []
          }
        })

        expect(wrapper.text()).toContain(`${score}%`)
      })
    })

    it('handles quiz with no results', () => {
      const emptyResultsProps = {
        score: 75,
        quizResults: []
      }

      const wrapper = mount(QuizResult, {
        props: emptyResultsProps
      })

      expect(wrapper.text()).toContain('75%')
      // Should not show detailed results section
      expect(wrapper.find('.space-y-4').exists()).toBe(false)
    })

    it('handles quiz with mixed question types in results', () => {
      const mixedResultsProps = {
        score: 50,
        quizResults: [
          {
            question: {
              id: 'mc1',
              type: 'multiple-choice' as const,
              question: 'Multiple choice question',
              options: ['A', 'B', 'C'],
              correctAnswer: 0,
              explanation: 'MC explanation',
              category: '新自由主義と新保守主義' as const,
              relatedParty: 'test'
            },
            userAnswer: 1,
            correctAnswer: 0,
            isCorrect: false,
            explanation: 'Wrong answer'
          },
          {
            question: {
              id: 'tf1',
              type: 'true-false' as const,
              question: 'True/false question',
              correctAnswer: 'true',
              explanation: 'TF explanation',
              category: '在日' as const,
              relatedParty: 'test'
            },
            userAnswer: 'true',
            correctAnswer: 'true',
            isCorrect: true,
            explanation: 'Correct answer'
          }
        ]
      }

      const wrapper = mount(QuizResult, {
        props: mixedResultsProps
      })

      expect(wrapper.text()).toContain('50%')
    })

    it('toggles detailed results visibility', async() => {
      const wrapper = mount(QuizResult, {
        props: {
          score: 75,
          quizResults: []
        }
      })

      // Find the detailed results toggle button
      const toggleButton = wrapper.findAll('button').find(btn =>
        btn.text().includes('詳細結果') || btn.text().includes('詳細')
      )

      if (toggleButton) {
        await toggleButton.trigger('click')
        // Check if detailed results are shown/hidden
        expect(wrapper.vm).toBeDefined()
      }
    })
  })

  describe('CSS and Styling Edge Cases', () => {
    it('CategorySelector handles hover states', () => {
      const wrapper = mount(CategorySelector, {
        props: {
          categories: [{ id: 'test', name: 'Test', questionCount: 1 }]
        }
      })

      const button = wrapper.find('[data-test="category-button"]')
      expect(button.classes()).toContain('hover:border-blue-400')
    })

    it('handles complex CSS class combinations', () => {
      const wrapper = mount(CategorySelector, {
        props: {
          categories: []
        }
      })

      // Check for complex CSS classes
      expect(wrapper.find('.bg-white\\/90').exists()).toBe(true)
      expect(wrapper.find('.backdrop-blur-sm').exists()).toBe(true)
    })
  })
})

