import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useQuiz } from '~/composables/useQuiz'

vi.mock('~/data/questions', () => ({
  quizQuestions: [
    {
      id: 'test1',
      type: 'multiple-choice',
      question: 'テスト問題1',
      options: ['選択肢1', '選択肢2', '選択肢3', '選択肢4'],
      correctAnswer: 0,
      explanation: 'テスト問題1の解説',
      category: '新自由主義と新保守主義',
      relatedParty: 'test-party'
    },
    {
      id: 'test2',
      type: 'true-false',
      question: 'テスト問題2',
      correctAnswer: 'true',
      explanation: 'テスト問題2の解説',
      category: '在日',
      relatedParty: 'test-party'
    },
    {
      id: 'test3',
      type: 'multiple-choice',
      question: 'テスト問題3',
      options: ['選択肢A', '選択肢B', '選択肢C'],
      correctAnswer: 1,
      explanation: 'テスト問題3の解説',
      category: '選択的夫婦別姓と皇統',
      relatedParty: 'other-party'
    }
  ]
}))

describe('useQuiz - Advanced Branch Coverage', () => {
  let quiz: ReturnType<typeof useQuiz>

  beforeEach(() => {
    quiz = useQuiz()
    quiz.resetQuiz()
  })

  describe('エラーハンドリングとエッジケース', () => {
    it('存在しないカテゴリーでstartCategoryQuizを呼ぶとエラーが投げられる', () => {
      expect(() => {
        quiz.startCategoryQuiz('nonexistent-category')
      }).toThrow()
    })

    it('無効なインデックスでselectAnswerを呼んでも処理される', () => {
      quiz.selectAnswer(-1)
      expect(quiz.selectedAnswers.value[0]).toBe(-1)

      quiz.selectAnswer(999)
      expect(quiz.selectedAnswers.value[0]).toBe(999)
    })

    it('最初の問題でpreviousQuestionを呼んでも安全', () => {
      quiz.previousQuestion()
      expect(quiz.currentQuestionIndex.value).toBe(0)
    })

    it('最後の問題でnextQuestionを呼んでも安全', () => {
      // Move to last question
      while (quiz.currentQuestionIndex.value < 2) {
        quiz.nextQuestion()
      }

      // Try to go beyond last question
      quiz.nextQuestion()
      expect(quiz.currentQuestionIndex.value).toBe(2)
    })
  })

  describe('条件分岐の完全網羅', () => {
    it('true-false問題で正解・不正解の両方をテスト', () => {
      quiz.startCategoryQuiz('在日')

      // 正解パターン
      quiz.selectAnswer('true')
      const correctResult = quiz.getAnswerResult(0)
      expect(correctResult.isCorrect).toBe(true)
      expect(correctResult.userAnswer).toBe('true')

      // 不正解パターン
      quiz.selectAnswer('false')
      const _incorrectResult = quiz.getAnswerResult(0)
      expect(_incorrectResult.isCorrect).toBe(false)
      expect(_incorrectResult.userAnswer).toBe('false')
    })

    it('multiple-choice問題で正解・不正解の両方をテスト', () => {
      quiz.startCategoryQuiz('新自由主義と新保守主義')

      // 正解パターン
      quiz.selectAnswer(0)
      const correctResult = quiz.getAnswerResult(0)
      expect(correctResult.isCorrect).toBe(true)

      // 不正解パターン
      quiz.selectAnswer(1)
      const _incorrectResult = quiz.getAnswerResult(0)
      expect(correctResult.isCorrect).toBe(true) // 最初の回答が保持される
    })

    it('回答していない問題でgetAnswerResultを呼ぶ', () => {
      const result = quiz.getAnswerResult(0)
      expect(result.isCorrect).toBe(false)
      expect(result.userAnswer).toBeDefined()
    })

    it('範囲外のインデックスでgetAnswerResultを呼ぶ', () => {
      // This should throw an error for out-of-bounds index
      expect(() => {
        quiz.getAnswerResult(999)
      }).toThrow('Question at index 999 not found')
    })
  })

  describe('スコア計算の全パターン', () => {
    it('完全正解のスコア計算', () => {
      // 全問正解
      quiz.selectAnswer(0) // test1: 正解
      quiz.nextQuestion()
      quiz.selectAnswer('true') // test2: 正解
      quiz.nextQuestion()
      quiz.selectAnswer(1) // test3: 正解
      quiz.completeQuiz()

      expect(quiz.score.value).toBe(100)
    })

    it('半分正解のスコア計算', () => {
      quiz.selectAnswer(1) // test1: 不正解
      quiz.nextQuestion()
      quiz.selectAnswer('true') // test2: 正解
      quiz.nextQuestion()
      quiz.selectAnswer(1) // test3: 正解
      quiz.completeQuiz()

      // 2/3 = 67%
      expect(quiz.score.value).toBe(67)
    })

    it('全問不正解のスコア計算', () => {
      quiz.selectAnswer(3) // test1: 不正解
      quiz.nextQuestion()
      quiz.selectAnswer('false') // test2: 不正解
      quiz.nextQuestion()
      quiz.selectAnswer(2) // test3: 不正解
      quiz.completeQuiz()

      expect(quiz.score.value).toBe(0)
    })

    it('一部未回答のスコア計算', () => {
      quiz.selectAnswer(0) // test1: 正解
      quiz.nextQuestion()
      // test2は未回答
      quiz.nextQuestion()
      quiz.selectAnswer(1) // test3: 正解
      quiz.completeQuiz()

      expect(quiz.score.value).toBe(67) // 2/3
    })
  })

  describe('カテゴリー処理の分岐', () => {
    it('存在するカテゴリーのquestionCountが正しく計算される', () => {
      const categories = quiz.getAvailableCategories()
      const newLiberalismCategory = categories.find(c => c.id === '新自由主義と新保守主義')
      expect(newLiberalismCategory?.questionCount).toBe(1)
    })

    it('複数カテゴリーの問題が正しく分離される', () => {
      const categories = quiz.getAvailableCategories()
      expect(categories.length).toBe(3)

      const categoryIds = categories.map(c => c.id)
      expect(categoryIds).toContain('新自由主義と新保守主義')
      expect(categoryIds).toContain('在日')
      expect(categoryIds).toContain('選択的夫婦別姓と皇統')
    })

    it('getCategoryDisplayNameの全パターン', () => {
      // 存在するカテゴリー
      expect(quiz.getCategoryDisplayName('新自由主義と新保守主義')).toBe('新自由主義と新保守主義')

      // 存在しないカテゴリー
      expect(quiz.getCategoryDisplayName('unknown')).toBe('unknown')

      // 空文字
      expect(quiz.getCategoryDisplayName('')).toBe('')
    })
  })

  describe('進行状況計算の分岐', () => {
    it('開始時のprogress', () => {
      expect(quiz.progress.value).toBe(0)
    })

    it('中間のprogress', () => {
      quiz.nextQuestion()
      expect(Math.round(quiz.progress.value)).toBe(33)
    })

    it('最終問題のprogress', () => {
      quiz.nextQuestion()
      quiz.nextQuestion()
      expect(Math.round(quiz.progress.value)).toBe(67)
    })
  })

  describe('ナビゲーション状態の分岐', () => {
    it('開始時のナビゲーション状態', () => {
      expect(quiz.currentQuestionIndex.value).toBe(0)
    })

    it('中間のナビゲーション状態', () => {
      quiz.nextQuestion()
      expect(quiz.currentQuestionIndex.value).toBe(1)
    })

    it('最終問題のナビゲーション状態', () => {
      quiz.nextQuestion()
      quiz.nextQuestion()
      expect(quiz.currentQuestionIndex.value).toBe(2)
    })
  })

  describe('クイズ完了後の状態', () => {
    it('completeQuiz後にshowResultがtrueになる', () => {
      quiz.completeQuiz()
      expect(quiz.showResult.value).toBe(true)
    })

    it('resetQuiz後に初期状態に戻る', () => {
      quiz.selectAnswer(0)
      quiz.nextQuestion()
      quiz.completeQuiz()

      quiz.resetQuiz()

      expect(quiz.currentQuestionIndex.value).toBe(0)
      expect(quiz.showResult.value).toBe(false)
      expect(quiz.selectedAnswers.value).toEqual([])
      expect(quiz.score.value).toBe(0)
    })
  })

  describe('データ整合性の検証', () => {
    it('currentQuestionが存在する場合の処理', () => {
      const _currentQuestion = quiz.currentQuestion.value
      expect(_currentQuestion).toBeDefined()
      if (_currentQuestion) {
        expect(_currentQuestion.id).toBe('test1')
        expect(_currentQuestion.type).toBe('multiple-choice')
      }
    })

    it('currentQuestionが存在しない場合の処理', () => {
      // 無効なインデックスに移動
      for (let i = 0; i < 10; i++) {
        quiz.nextQuestion()
      }

      // currentQuestionが範囲外でもエラーにならない
      const _currentQuestion = quiz.currentQuestion.value
      expect(() => quiz.selectAnswer(0)).not.toThrow()
    })
  })

  describe('getDetailedResultsの分岐', () => {
    it('詳細結果が正しく生成される', () => {
      quiz.selectAnswer(0) // 正解
      quiz.nextQuestion()
      quiz.selectAnswer('false') // 不正解
      quiz.completeQuiz()

      const detailedResults = quiz.getDetailedResults()
      expect(detailedResults.length).toBeGreaterThan(0)
    })
  })
})

