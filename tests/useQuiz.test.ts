import { describe, it, expect, beforeEach } from 'vitest'
import { useQuiz } from '~/composables/useQuiz'
import { quizQuestions } from '~/data/questions'

describe('useQuiz composable', () => {
  beforeEach(() => {
    // Reset quiz state before each test
    const { resetQuiz } = useQuiz()
    resetQuiz()
  })

  it('should initialize with correct default values', () => {
    const {
      currentQuestionIndex,
      selectedAnswers,
      score,
      isCompleted,
      showResult,
      totalQuestions,
      progress
    } = useQuiz()

    expect(currentQuestionIndex.value).toBe(0)
    expect(selectedAnswers.value).toEqual([])
    expect(score.value).toBe(0)
    expect(isCompleted.value).toBe(false)
    expect(showResult.value).toBe(false)
    expect(totalQuestions.value).toBe(quizQuestions.length)
    expect(progress.value).toBe(0)
  })

  it('should select answer correctly', () => {
    const { selectedAnswers, selectAnswer } = useQuiz()

    selectAnswer(1)
    expect(selectedAnswers.value[0]).toBe(1)

    selectAnswer('true')
    expect(selectedAnswers.value[0]).toBe('true')
  })

  it('should navigate to next question correctly', () => {
    const {
      currentQuestionIndex,
      nextQuestion,
      selectAnswer,
      isCompleted,
      showResult
    } = useQuiz()

    // Select an answer first
    selectAnswer(0)
    nextQuestion()

    expect(currentQuestionIndex.value).toBe(1)

    // Navigate through all questions
    for (let i = 1; i < quizQuestions.length; i++) {
      selectAnswer(0)
      nextQuestion()
    }

    expect(isCompleted.value).toBe(true)
    expect(showResult.value).toBe(true)
  })

  it('should navigate to previous question correctly', () => {
    const {
      currentQuestionIndex,
      nextQuestion,
      previousQuestion,
      selectAnswer
    } = useQuiz()

    selectAnswer(0)
    nextQuestion()
    expect(currentQuestionIndex.value).toBe(1)

    previousQuestion()
    expect(currentQuestionIndex.value).toBe(0)
  })

  it('should calculate score correctly', () => {
    const {
      nextQuestion,
      selectAnswer,
      score,
      completeQuiz
    } = useQuiz()

    let correctAnswers = 0

    // Answer all questions
    for (let i = 0; i < quizQuestions.length; i++) {
      const question = quizQuestions[i]
      if (!question) continue
      const correctAnswer = question.correctAnswer

      selectAnswer(correctAnswer)
      if (i === correctAnswers) correctAnswers++

      if (i < quizQuestions.length - 1) {
        nextQuestion()
      } else {
        completeQuiz()
      }
    }

    expect(score.value).toBeGreaterThan(0)
  })

  it('should reset quiz correctly', () => {
    const {
      currentQuestionIndex,
      selectedAnswers,
      score,
      isCompleted,
      showResult,
      resetQuiz,
      selectAnswer,
      nextQuestion
    } = useQuiz()

    // Make some changes
    selectAnswer(1)
    nextQuestion()

    // Reset
    resetQuiz()

    expect(currentQuestionIndex.value).toBe(0)
    expect(selectedAnswers.value).toEqual([])
    expect(score.value).toBe(0)
    expect(isCompleted.value).toBe(false)
    expect(showResult.value).toBe(false)
  })

  it('should start quiz with specific category', () => {
    const { startQuizWithCategory, currentQuestions } = useQuiz()

    const category = '選択的夫婦別姓と皇統'
    startQuizWithCategory(category)

    expect(currentQuestions.value.length).toBeGreaterThan(0)
    expect(currentQuestions.value.every(q => q.category === category)).toBe(true)
  })

  it('should get available categories', () => {
    const { getAvailableCategories } = useQuiz()
    const categories = getAvailableCategories()

    expect(categories.length).toBeGreaterThan(0)
    expect(categories.every(cat => cat.id && cat.name && typeof cat.questionCount === 'number')).toBe(true)
  })

  it('should get category display names', () => {
    const { getCategoryDisplayName } = useQuiz()

    expect(getCategoryDisplayName('選択的夫婦別姓と皇統')).toBe('選択的夫婦別姓と皇統')
    expect(getCategoryDisplayName('新自由主義と新保守主義')).toBe('新自由主義と新保守主義')
  })

  it('should provide detailed results after completion', () => {
    const {
      nextQuestion,
      selectAnswer,
      completeQuiz,
      getDetailedResults
    } = useQuiz()

    // Answer first few questions
    for (let i = 0; i < Math.min(3, quizQuestions.length); i++) {
      const question = quizQuestions[i]
      if (!question) continue
      selectAnswer(question.correctAnswer)

      if (i < Math.min(2, quizQuestions.length - 1)) {
        nextQuestion()
      }
    }

    // Skip to completion
    completeQuiz()

    const results = getDetailedResults()
    expect(results.length).toBeGreaterThan(0)
    expect(results[0]).toHaveProperty('question')
    expect(results[0]).toHaveProperty('userAnswer')
    expect(results[0]).toHaveProperty('correctAnswer')
    expect(results[0]).toHaveProperty('isCorrect')
    expect(results[0]).toHaveProperty('explanation')
  })

  it('should throw error for invalid category', () => {
    const { startQuizWithCategory } = useQuiz()

    expect(() => {
      startQuizWithCategory('invalid-category')
    }).toThrow()
  })

  it('should handle empty category gracefully', () => {
    const { getCategoryDisplayName } = useQuiz()

    expect(getCategoryDisplayName('')).toBe('')
    expect(getCategoryDisplayName('unknown-category')).toBe('unknown-category')
  })
})
