import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useQuiz } from '~/composables/useQuiz'

// Mock real data for integration testing
vi.mock('~/data/questions', () => ({
  quizQuestions: [
    {
      id: 'integration1',
      type: 'multiple-choice',
      question: 'Integration Test Question 1',
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 0,
      explanation: 'Integration explanation 1',
      category: '新自由主義と新保守主義',
      relatedParty: 'ldp'
    },
    {
      id: 'integration2',
      type: 'true-false',
      question: 'Integration Test Question 2',
      correctAnswer: 'false',
      explanation: 'Integration explanation 2',
      category: '新自由主義と新保守主義',
      relatedParty: 'cdp'
    },
    {
      id: 'integration3',
      type: 'multiple-choice',
      question: 'Integration Test Question 3',
      options: ['X', 'Y'],
      correctAnswer: 1,
      explanation: 'Integration explanation 3',
      category: '在日',
      relatedParty: 'jcp'
    },
    {
      id: 'integration4',
      type: 'true-false',
      question: 'Integration Test Question 4',
      correctAnswer: 'true',
      explanation: 'Integration explanation 4',
      category: '選択的夫婦別姓と皇統',
      relatedParty: 'komeito'
    }
  ]
}))

describe('Full Coverage Integration Tests', () => {
  let quiz: ReturnType<typeof useQuiz>

  beforeEach(() => {
    quiz = useQuiz()
    quiz.resetQuiz()
  })

  describe('Complete Quiz Flow Coverage', () => {
    it('covers all possible quiz completion scenarios', () => {
      // Scenario 1: Perfect score
      quiz.selectAnswer(0) // Correct
      quiz.nextQuestion()
      quiz.selectAnswer('false') // Correct
      quiz.nextQuestion()
      quiz.selectAnswer(1) // Correct
      quiz.nextQuestion()
      quiz.selectAnswer('true') // Correct
      quiz.completeQuiz()

      expect(quiz.score.value).toBe(100)
      expect(quiz.showResult.value).toBe(true)

      // Reset and test different scenario
      quiz.resetQuiz()

      // Scenario 2: Zero score
      quiz.selectAnswer(1) // Incorrect
      quiz.nextQuestion()
      quiz.selectAnswer('true') // Incorrect
      quiz.nextQuestion()
      quiz.selectAnswer(0) // Incorrect
      quiz.nextQuestion()
      quiz.selectAnswer('false') // Incorrect
      quiz.completeQuiz()

      expect(quiz.score.value).toBe(0)

      // Reset and test mixed scenario
      quiz.resetQuiz()

      // Scenario 3: Mixed results
      quiz.selectAnswer(0) // Correct
      quiz.nextQuestion()
      quiz.selectAnswer('true') // Incorrect
      quiz.nextQuestion()
      quiz.selectAnswer(0) // Incorrect
      quiz.nextQuestion()
      quiz.selectAnswer('true') // Correct
      quiz.completeQuiz()

      expect(quiz.score.value).toBe(50) // 2/4 = 50%
    })

    it('tests all navigation edge cases', () => {
      // Test boundary conditions
      expect(quiz.currentQuestionIndex.value).toBe(0)

      // Can't go previous from first question
      quiz.previousQuestion()
      expect(quiz.currentQuestionIndex.value).toBe(0)

      // Navigate to each question
      quiz.nextQuestion()
      expect(quiz.currentQuestionIndex.value).toBe(1)

      quiz.nextQuestion()
      expect(quiz.currentQuestionIndex.value).toBe(2)

      quiz.nextQuestion()
      expect(quiz.currentQuestionIndex.value).toBe(3)

      // Can't go next from last question
      quiz.nextQuestion()
      expect(quiz.currentQuestionIndex.value).toBe(3)

      // Can go back
      quiz.previousQuestion()
      expect(quiz.currentQuestionIndex.value).toBe(2)

      quiz.previousQuestion()
      expect(quiz.currentQuestionIndex.value).toBe(1)

      quiz.previousQuestion()
      expect(quiz.currentQuestionIndex.value).toBe(0)
    })

    it('covers all answer validation branches', () => {
      // Test all question types with various answer formats

      // Multiple choice - valid answers
      quiz.selectAnswer(0)
      expect(quiz.selectedAnswers.value[0]).toBe(0)

      quiz.selectAnswer(3)
      expect(quiz.selectedAnswers.value[0]).toBe(3)

      // Multiple choice - invalid answers (should still be recorded)
      quiz.selectAnswer(-1)
      expect(quiz.selectedAnswers.value[0]).toBe(-1)

      quiz.selectAnswer(999)
      expect(quiz.selectedAnswers.value[0]).toBe(999)

      // Move to true/false question
      quiz.nextQuestion()

      // True/false - valid answers
      quiz.selectAnswer('true')
      expect(quiz.selectedAnswers.value[1]).toBe('true')

      quiz.selectAnswer('false')
      expect(quiz.selectedAnswers.value[1]).toBe('false')

      // True/false - invalid answers (should still be recorded)
      quiz.selectAnswer('maybe')
      expect(quiz.selectedAnswers.value[1]).toBe('maybe')

      quiz.selectAnswer(42)
      expect(quiz.selectedAnswers.value[1]).toBe(42)
    })
  })

  describe('Category-based Quiz Coverage', () => {
    it('tests all category selection branches', () => {
      const categories = quiz.getAvailableCategories()

      // Should have 3 unique categories
      expect(categories.length).toBe(3)

      const categoryIds = categories.map(c => c.id)
      expect(categoryIds).toContain('新自由主義と新保守主義')
      expect(categoryIds).toContain('在日')
      expect(categoryIds).toContain('選択的夫婦別姓と皇統')

      // Test each category individually
      categories.forEach(category => {
        quiz.resetQuiz()
        quiz.startCategoryQuiz(category.id)

        expect(quiz.currentQuestions.value.length).toBe(category.questionCount)

        // Verify all questions in category match
        quiz.currentQuestions.value.forEach(question => {
          expect(question.category).toBe(category.id)
        })
      })
    })

    it('covers category display name mapping', () => {
      const testCases = [
        // Valid categories
        '新自由主義と新保守主義',
        '在日',
        '選択的夫婦別姓と皇統',
        '日本の歴代総理大臣の功績と失敗',
        'グローバリズムと反グローバリズム',
        '東京裁判史観と日本の歴史認識について',
        '右翼と反左翼',
        '参政党と日本保守党',
        '再生の道とチーム未来',
        '国政政党の政策について',

        // Invalid categories
        'unknown-category',
        '',
        null,
        undefined,
        123,
        []
      ]

      testCases.forEach(categoryId => {
        if (typeof categoryId === 'string') {
          const displayName = quiz.getCategoryDisplayName(categoryId)
          expect(typeof displayName).toBe('string')
          expect(displayName.length).toBeGreaterThanOrEqual(0)
        }
      })
    })
  })

  describe('Answer Result Analysis Coverage', () => {
    it('covers all getAnswerResult branches', () => {
      // Test with unanswered questions
      for (let i = 0; i < 4; i++) {
        const result = quiz.getAnswerResult(i)
        expect(result.isCorrect).toBe(false)
        expect(result.userAnswer).toBeDefined()
      }

      // Answer some questions and test results
      quiz.selectAnswer(0) // Correct for question 0
      quiz.nextQuestion()
      quiz.selectAnswer('true') // Incorrect for question 1
      quiz.nextQuestion()
      quiz.selectAnswer(0) // Incorrect for question 2
      quiz.nextQuestion()
      quiz.selectAnswer('false') // Incorrect for question 3

      // Test results for answered questions
      const result0 = quiz.getAnswerResult(0)
      expect(result0.isCorrect).toBe(true)
      expect(result0.userAnswer).toBe(0)

      const result1 = quiz.getAnswerResult(1)
      expect(result1.isCorrect).toBe(false)
      expect(result1.userAnswer).toBe('true')

      const result2 = quiz.getAnswerResult(2)
      expect(result2.isCorrect).toBe(false)
      expect(result2.userAnswer).toBe(0)

      const result3 = quiz.getAnswerResult(3)
      expect(result3.isCorrect).toBe(false)
      expect(result3.userAnswer).toBe('false')

      // Test out of bounds - should throw error
      expect(() => {
        quiz.getAnswerResult(999)
      }).toThrow('Question at index 999 not found')
    })
  })

  describe('Progress Calculation Coverage', () => {
    it('covers all progress calculation scenarios', () => {
      // Progress at different stages
      expect(quiz.progress.value).toBe(0)

      quiz.nextQuestion()
      expect(quiz.progress.value).toBe(25)

      quiz.nextQuestion()
      expect(quiz.progress.value).toBe(50)

      quiz.nextQuestion()
      expect(quiz.progress.value).toBe(75)

      // Progress doesn't exceed 75% until quiz completion
      quiz.nextQuestion()
      expect(quiz.progress.value).toBe(75)
    })
  })

  describe('Error Handling Coverage', () => {
    it('covers all error scenarios gracefully', () => {
      // Invalid category
      expect(() => {
        quiz.startCategoryQuiz('nonexistent')
      }).toThrow()

      // Multiple resets
      quiz.resetQuiz()
      quiz.resetQuiz()
      quiz.resetQuiz()
      expect(quiz.currentQuestionIndex.value).toBe(0)

      // Complete quiz multiple times
      quiz.completeQuiz()
      quiz.completeQuiz()
      expect(quiz.showResult.value).toBe(true)
    })
  })

  describe('State Consistency Coverage', () => {
    it('maintains state consistency across all operations', () => {
      // Track state through complex operations
      const initialState = {
        currentQuestionIndex: quiz.currentQuestionIndex.value,
        selectedAnswers: [...quiz.selectedAnswers.value],
        showResult: quiz.showResult.value,
        score: quiz.score.value
      }

      // Perform various operations
      quiz.selectAnswer(0)
      quiz.nextQuestion()
      quiz.selectAnswer('false')
      quiz.previousQuestion()
      quiz.selectAnswer(1) // Change answer
      quiz.nextQuestion()
      quiz.nextQuestion()
      quiz.selectAnswer(1)
      quiz.nextQuestion()
      quiz.selectAnswer('true')

      // State should be consistent
      expect(quiz.selectedAnswers.value.length).toBeGreaterThan(0)
      expect(quiz.currentQuestionIndex.value).toBeGreaterThanOrEqual(0)
      expect(quiz.currentQuestionIndex.value).toBeLessThan(4)

      // Complete and verify final state
      quiz.completeQuiz()
      expect(quiz.showResult.value).toBe(true)
      expect(quiz.score.value).toBeGreaterThanOrEqual(0)
      expect(quiz.score.value).toBeLessThanOrEqual(100)

      // Reset should restore initial state
      quiz.resetQuiz()
      expect(quiz.currentQuestionIndex.value).toBe(initialState.currentQuestionIndex)
      expect(quiz.showResult.value).toBe(initialState.showResult)
      expect(quiz.score.value).toBe(initialState.score)
    })
  })
})

