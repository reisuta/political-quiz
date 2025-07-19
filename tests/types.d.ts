/// <reference types="vitest/globals" />
import type { Ref, ComputedRef } from 'vue'
import type { MockedFunction } from 'vitest'
import type { QuizQuestion } from '~/types/political'

declare global {
  var ref: typeof import('vue').ref
  var reactive: typeof import('vue').reactive
  var computed: typeof import('vue').computed
  var readonly: typeof import('vue').readonly
  var useQuiz: MockedFunction<() => {
    currentQuestion: ComputedRef<QuizQuestion | undefined>
    currentQuestionIndex: Ref<number>
    totalQuestions: ComputedRef<number>
    progress: ComputedRef<number>
    selectedAnswers: Ref<(string | number)[]>
    score: Ref<number>
    showResult: Ref<boolean>
    quizResults: Ref<any[]>
    selectAnswer: MockedFunction<(answer: string | number) => void>
    nextQuestion: MockedFunction<() => void>
    previousQuestion: MockedFunction<() => void>
    resetQuiz: MockedFunction<() => void>
    shuffleQuestions: MockedFunction<() => void>
    finishQuiz: MockedFunction<() => void>
    getQuestionsByCategory: MockedFunction<(category: string) => any[]>
    getAnswerResult: MockedFunction<(index: number) => any>
    startCategoryQuiz: MockedFunction<(category: string) => void>
    getAvailableCategories: MockedFunction<() => any[]>
    getCategoryDisplayName: MockedFunction<(category: string) => string>
  }>
}

export {}
