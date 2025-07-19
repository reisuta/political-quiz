import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import QuizComponent from '~/components/QuizComponent.vue'

const mockQuizData = {
  currentQuestion: ref({
    id: 'test1',
    type: 'multiple-choice',
    question: 'テスト問題',
    options: ['選択肢1', '選択肢2', '選択肢3', '選択肢4'],
    correctAnswer: 0,
    explanation: 'テスト解説',
    category: 'test',
    relatedParty: 'test'
  }),
  currentQuestionIndex: ref(0),
  totalQuestions: ref(3),
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
  startCategoryQuiz: vi.fn(),
  getAvailableCategories: vi.fn(() => []),
  getCategoryDisplayName: vi.fn()
}

describe('QuizComponent', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    vi.clearAllMocks()
    mockQuizData.currentQuestionIndex.value = 0
    mockQuizData.showResult.value = false
    mockQuizData.selectedAnswers.value = []
    mockQuizData.progress.value = 0

    // グローバルuseQuizモックを上書き
    ;(global as any).useQuiz = vi.fn(() => mockQuizData)

    wrapper = mount(QuizComponent, {
      global: {
        stubs: {
          QuizResult: true
        }
      }
    })
  })

  describe('基本表示', () => {
    it('コンポーネントがレンダリングされる', () => {
      expect(wrapper.exists()).toBe(true)
    })

    it('進捗情報が表示される', () => {
      expect(wrapper.text()).toContain('問題')
      expect(wrapper.text()).toContain('%')
    })
  })

  describe('ナビゲーション', () => {
    it('前の問題ボタンが存在する', () => {
      const buttons = wrapper.findAll('button')
      const prevButton = buttons.find(btn => btn.text().includes('前の問題'))
      expect(prevButton).toBeDefined()
    })

    it('次の問題ボタンが存在する', () => {
      const buttons = wrapper.findAll('button')
      const nextButton = buttons.find(btn => btn.text().includes('次の問題'))
      expect(nextButton).toBeDefined()
    })
  })
})
