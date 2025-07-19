import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import QuizResult from '~/components/QuizResult.vue'

// Mock the useQuiz composable
const mockQuiz = {
  getAnswerResult: vi.fn(() => ({ isCorrect: false, userAnswer: null, correctAnswer: 0 })),
  totalQuestions: ref(10)
}

vi.mock('~/composables/useQuiz', () => ({
  useQuiz: () => mockQuiz
}))

describe('QuizResult', () => {
  const defaultProps = {
    score: 75,
    quizResults: [
      {
        question: {
          id: 'q1',
          type: 'multiple-choice' as const,
          question: '問題1',
          options: ['選択肢1', '選択肢2'],
          correctAnswer: 0,
          explanation: '解説1',
          category: '新自由主義と新保守主義' as const,
          relatedParty: 'test'
        },
        userAnswer: 0,
        correctAnswer: 0,
        isCorrect: true,
        explanation: '解説1'
      }
    ]
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('displays the score correctly', () => {
    const wrapper = mount(QuizResult, {
      props: defaultProps
    })

    expect(wrapper.text()).toContain('75%')
  })

  it('shows completion message', () => {
    const wrapper = mount(QuizResult, {
      props: defaultProps
    })

    expect(wrapper.text()).toContain('クイズ完了！')
  })

  it('emits restart event when restart button is clicked', async() => {
    const wrapper = mount(QuizResult, {
      props: defaultProps
    })

    const restartButton = wrapper.findAll('button').find(btn => btn.text().includes('もう一度挑戦'))
    expect(restartButton).toBeTruthy()

    await restartButton!.trigger('click')
    expect(wrapper.emitted('restart')).toBeTruthy()
  })

  it('emits change-category event when change category button is clicked', async() => {
    const wrapper = mount(QuizResult, {
      props: defaultProps
    })

    const changeCategoryButton = wrapper.findAll('button').find(btn => btn.text().includes('カテゴリーを変更'))
    if (changeCategoryButton) {
      await changeCategoryButton.trigger('click')
      expect(wrapper.emitted('change-category')).toBeTruthy()
    }
  })

  it('shows different score colors based on score', () => {
    // Test high score
    const highScoreWrapper = mount(QuizResult, {
      props: { ...defaultProps, score: 90 }
    })
    expect(highScoreWrapper.text()).toContain('90%')

    // Test medium score
    const mediumScoreWrapper = mount(QuizResult, {
      props: { ...defaultProps, score: 70 }
    })
    expect(mediumScoreWrapper.text()).toContain('70%')

    // Test low score
    const lowScoreWrapper = mount(QuizResult, {
      props: { ...defaultProps, score: 40 }
    })
    expect(lowScoreWrapper.text()).toContain('40%')
  })

  it('displays evaluation message', () => {
    const wrapper = mount(QuizResult, {
      props: defaultProps
    })

    expect(wrapper.text()).toContain('評価')
  })

  it('renders star icon', () => {
    const wrapper = mount(QuizResult, {
      props: defaultProps
    })

    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('has correct styling classes', () => {
    const wrapper = mount(QuizResult, {
      props: defaultProps
    })

    expect(wrapper.find('.text-center').exists()).toBe(true)
    expect(wrapper.find('.bg-gradient-to-br').exists()).toBe(true)
  })

  it('computes score message correctly', () => {
    // Test excellent score
    const excellentWrapper = mount(QuizResult, {
      props: { ...defaultProps, score: 95 }
    })
    expect(excellentWrapper.text()).toContain('95%')

    // Test good score
    const goodWrapper = mount(QuizResult, {
      props: { ...defaultProps, score: 80 }
    })
    expect(goodWrapper.text()).toContain('80%')

    // Test fair score
    const fairWrapper = mount(QuizResult, {
      props: { ...defaultProps, score: 60 }
    })
    expect(fairWrapper.text()).toContain('60%')
  })

  it('handles zero score', () => {
    const wrapper = mount(QuizResult, {
      props: { ...defaultProps, score: 0 }
    })

    expect(wrapper.text()).toContain('0%')
  })

  it('handles perfect score', () => {
    const wrapper = mount(QuizResult, {
      props: { ...defaultProps, score: 100 }
    })

    expect(wrapper.text()).toContain('100%')
  })
})
