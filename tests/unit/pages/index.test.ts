import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import IndexPage from '~/pages/index.vue'

describe('IndexPage', () => {
  const createWrapper = () => {
    // グローバルuseQuizモックを設定
    ;(global as any).useQuiz = vi.fn(() => ({
      getAvailableCategories: vi.fn(() => [
        { id: 'test1', name: 'テストカテゴリ1', questionCount: 3 },
        { id: 'test2', name: 'テストカテゴリ2', questionCount: 2 }
      ]),
      startCategoryQuiz: vi.fn(),
      currentQuestion: ref({}),
      currentQuestionIndex: ref(0),
      totalQuestions: ref(0),
      progress: ref(0),
      selectedAnswers: ref([]),
      score: ref(0),
      showResult: ref(false),
      quizResults: ref([]),
      selectAnswer: vi.fn(),
      nextQuestion: vi.fn(),
      previousQuestion: vi.fn(),
      resetQuiz: vi.fn(),
      shuffleQuestions: vi.fn(),
      finishQuiz: vi.fn(),
      getQuestionsByCategory: vi.fn(),
      getAnswerResult: vi.fn(),
      getCategoryDisplayName: vi.fn()
    }))

    return mount(IndexPage, {
      global: {
        stubs: {
          QuizComponent: true,
          CategorySelector: true
        }
      }
    })
  }

  describe('初期表示', () => {
    it('タイトルが表示される', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('h1').text()).toBe('日本政治クイズ')
    })

    it('説明文が表示される', () => {
      const wrapper = createWrapper()
      expect(wrapper.text()).toContain('日本の政党の基本情報、政治思想、政策立場について学習できるインタラクティブなクイズです。')
    })

    it('CategorySelectorが表示される', () => {
      const wrapper = createWrapper()
      expect(wrapper.findComponent({ name: 'CategorySelector' }).exists()).toBe(true)
    })

    it('QuizComponentは最初は表示されない', () => {
      const wrapper = createWrapper()
      expect(wrapper.findComponent({ name: 'QuizComponent' }).exists()).toBe(false)
    })
  })
})
