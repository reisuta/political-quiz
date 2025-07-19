import { config } from '@vue/test-utils'
import { vi } from 'vitest'
import { ref, reactive, computed, readonly } from 'vue'

// Vue 3 の自動インポート
;(global as any).ref = ref
;(global as any).reactive = reactive
;(global as any).computed = computed
;(global as any).readonly = readonly

// useQuizのグローバルモック
;(global as any).useQuiz = vi.fn(() => ({
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
