import { describe, it, expect, vi } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import QuizResult from '~/components/QuizResult.vue'

const mockQuizResults = [
  {
    question: {
      id: 'q1',
      question: '問題1',
      type: 'multiple-choice' as const,
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 0,
      explanation: '問題1の解説',
      category: 'basic-info' as const,
      relatedParty: 'test'
    },
    userAnswer: 0,
    correctAnswer: 0,
    isCorrect: true,
    explanation: '問題1の解説'
  },
  {
    question: {
      id: 'q2',
      question: '問題2',
      type: 'true-false' as const,
      correctAnswer: 'true',
      explanation: '問題2の解説',
      category: 'basic-info' as const,
      relatedParty: 'test'
    },
    userAnswer: 'false',
    correctAnswer: 'true',
    isCorrect: false,
    explanation: '問題2の解説'
  }
] as any

const mockUseQuiz = {
  getAnswerResult: vi.fn((index) => mockQuizResults[index]),
  totalQuestions: ref(2),
  currentQuestion: ref({}),
  currentQuestionIndex: ref(0),
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
  startCategoryQuiz: vi.fn(),
  getAvailableCategories: vi.fn(() => []),
  getCategoryDisplayName: vi.fn()
}

describe('QuizResult', () => {
  let wrapper: VueWrapper

  const createWrapper = (props = {}) => {
    // グローバルuseQuizモックを上書き
    ;(global as any).useQuiz = vi.fn(() => mockUseQuiz)

    return mount(QuizResult, {
      props: {
        score: 80,
        quizResults: mockQuizResults,
        ...props
      }
    })
  }

  describe('スコア表示', () => {
    it('スコアが正しく表示される', () => {
      wrapper = createWrapper({ score: 85 })
      expect(wrapper.find('.text-7xl').text()).toBe('85%')
    })

    it('スコアに応じて適切な色が適用される', () => {
      wrapper = createWrapper({ score: 85 })
      expect(wrapper.find('.text-7xl').classes()).toContain('text-green-600')

      wrapper = createWrapper({ score: 65 })
      expect(wrapper.find('.text-7xl').classes()).toContain('text-yellow-600')

      wrapper = createWrapper({ score: 45 })
      expect(wrapper.find('.text-7xl').classes()).toContain('text-red-600')
    })

    it('スコアに応じて適切なメッセージが表示される', () => {
      wrapper = createWrapper({ score: 95 })
      expect(wrapper.text()).toContain('素晴らしい！政治に詳しいですね！')

      wrapper = createWrapper({ score: 85 })
      expect(wrapper.text()).toContain('とても良い結果です！')

      wrapper = createWrapper({ score: 75 })
      expect(wrapper.text()).toContain('良い結果です！')

      wrapper = createWrapper({ score: 65 })
      expect(wrapper.text()).toContain('まずまずの結果です。')

      wrapper = createWrapper({ score: 55 })
      expect(wrapper.text()).toContain('もう少し頑張りましょう。')

      wrapper = createWrapper({ score: 45 })
      expect(wrapper.text()).toContain('政治について学習しましょう！')
    })
  })

  describe('評価表示', () => {
    it('スコアに応じて適切な評価が表示される', () => {
      wrapper = createWrapper({ score: 95 })
      expect(wrapper.text()).toContain('日本の政治について深い理解をお持ちです。')

      wrapper = createWrapper({ score: 85 })
      expect(wrapper.text()).toContain('日本の政治について良い知識をお持ちです。')

      wrapper = createWrapper({ score: 75 })
      expect(wrapper.text()).toContain('基本的な政治知識はしっかりしています。')

      wrapper = createWrapper({ score: 65 })
      expect(wrapper.text()).toContain('基本的な知識はありますが、さらに学習すると良いでしょう。')

      wrapper = createWrapper({ score: 45 })
      expect(wrapper.text()).toContain('政治について基礎から学習することをお勧めします。')
    })
  })

  describe('ボタン機能', () => {
    it('「もう一度挑戦」ボタンがrestartイベントを発行する', async() => {
      wrapper = createWrapper()
      const buttons = wrapper.findAll('button')
      const restartButton = buttons.find(btn => btn.text() === 'もう一度挑戦')

      await restartButton!.trigger('click')
      expect(wrapper.emitted('restart')).toBeTruthy()
    })

    it('「詳細結果を見る」ボタンで詳細が表示される', async() => {
      wrapper = createWrapper()
      const buttons = wrapper.findAll('button')
      const detailButton = buttons.find(btn => btn.text().includes('詳細結果を見る'))

      expect(wrapper.find('.mt-8').exists()).toBe(false)

      await detailButton!.trigger('click')
      expect(wrapper.find('.mt-8').exists()).toBe(true)

      const updatedButtons = wrapper.findAll('button')
      const hideButton = updatedButtons.find(btn => btn.text().includes('詳細結果を隠す'))
      expect(hideButton).toBeDefined()
    })
  })

  describe('詳細結果表示', () => {
    beforeEach(async() => {
      wrapper = createWrapper()
      const buttons = wrapper.findAll('button')
      const detailButton = buttons.find(btn => btn.text().includes('詳細結果を見る'))
      await detailButton!.trigger('click')
    })

    it('詳細結果セクションが表示される', () => {
      expect(wrapper.find('.mt-8').exists()).toBe(true)
    })

    it('詳細結果に問題の情報が含まれる', () => {
      const detailSection = wrapper.find('.mt-8')
      expect(detailSection.text()).toContain('詳細結果')
      expect(detailSection.text()).toContain('問題')
      expect(detailSection.text()).toContain('解説')
    })

    it('正解・不正解の表示がある', () => {
      const detailSection = wrapper.find('.mt-8')
      expect(detailSection.text()).toContain('正解')
      expect(detailSection.text()).toContain('不正解')
    })

    it('問題と解説が表示される', () => {
      const detailSection = wrapper.find('.mt-8')
      expect(detailSection.text()).toContain('問題1')
      expect(detailSection.text()).toContain('問題2')
      expect(detailSection.text()).toContain('問題1の解説')
      expect(detailSection.text()).toContain('問題2の解説')
    })
  })
})
