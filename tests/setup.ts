import { config } from '@vue/test-utils'
import { vi } from 'vitest'
import { ref, reactive, computed, readonly } from 'vue'

// Vue 3 の自動インポート
global.ref = ref
global.reactive = reactive
global.computed = computed
global.readonly = readonly

// useQuizのグローバルモック
global.useQuiz = vi.fn(() => ({
  currentQuestion: ref({}),
  currentQuestionIndex: ref(0),
  totalQuestions: ref(0),
  progress: ref(0),
  selectedAnswers: ref([]),
  score: ref(0),
  showResult: ref(false),
  quizResults: ref([]),
  shuffleQuestions: vi.fn(),
  selectAnswer: vi.fn(),
  nextQuestion: vi.fn(),
  previousQuestion: vi.fn(),
  finishQuiz: vi.fn(),
  resetQuiz: vi.fn(),
  getQuestionsByCategory: vi.fn(),
  getAnswerResult: vi.fn(),
  startCategoryQuiz: vi.fn(),
  getAvailableCategories: vi.fn(() => []),
  getCategoryDisplayName: vi.fn()
}))

// デフォルトのスタブ設定
config.global.stubs = {
  teleport: true,
  transition: false,
  CategorySelector: true
}
