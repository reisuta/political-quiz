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
      category: 'test-category',
      relatedParty: 'test-party'
    },
    {
      id: 'test2',
      type: 'true-false',
      question: 'テスト問題2',
      correctAnswer: 'true',
      explanation: 'テスト問題2の解説',
      category: 'test-category',
      relatedParty: 'test-party'
    },
    {
      id: 'test3',
      type: 'multiple-choice',
      question: 'テスト問題3',
      options: ['選択肢A', '選択肢B', '選択肢C', '選択肢D'],
      correctAnswer: 2,
      explanation: 'テスト問題3の解説',
      category: 'other-category',
      relatedParty: 'other-party'
    }
  ]
}))

describe('useQuiz', () => {
  let quiz: ReturnType<typeof useQuiz>

  beforeEach(() => {
    quiz = useQuiz()
    quiz.resetQuiz() // シングルトン状態をリセット
  })

  describe('初期状態', () => {
    it('初期状態が正しく設定されている', () => {
      expect(quiz.currentQuestionIndex.value).toBe(0)
      expect(quiz.selectedAnswers.value).toEqual([])
      expect(quiz.score.value).toBe(0)
      expect(quiz.isCompleted.value).toBe(false)
      expect(quiz.showResult.value).toBe(false)
      expect(quiz.totalQuestions.value).toBe(3)
      expect(quiz.progress.value).toBe(0)
    })

    it('最初の問題が正しく取得できる', () => {
      expect(quiz.currentQuestion.value?.id).toBe('test1')
    })
  })

  describe('selectAnswer', () => {
    it('回答を選択できる', () => {
      quiz.selectAnswer(1)
      expect(quiz.selectedAnswers.value[0]).toBe(1)
    })

    it('複数の回答を順番に選択できる', () => {
      quiz.selectAnswer(1)
      quiz.nextQuestion()
      quiz.selectAnswer('true')
      expect(quiz.selectedAnswers.value[0]).toBe(1)
      expect(quiz.selectedAnswers.value[1]).toBe('true')
    })
  })

  describe('nextQuestion', () => {
    it('次の問題に進める', () => {
      expect(quiz.currentQuestionIndex.value).toBe(0)
      quiz.nextQuestion()
      expect(quiz.currentQuestionIndex.value).toBe(1)
      expect(quiz.currentQuestion.value?.id).toBe('test2')
    })

    it('最後の問題でnextQuestionを呼ぶとクイズが終了する', () => {
      quiz.selectAnswer(0)
      quiz.nextQuestion()
      quiz.selectAnswer('true')
      quiz.nextQuestion()
      quiz.selectAnswer(2)
      quiz.nextQuestion()

      expect(quiz.isCompleted.value).toBe(true)
      expect(quiz.showResult.value).toBe(true)
    })

    it('進捗が正しく計算される', () => {
      expect(quiz.progress.value).toBe(0)
      quiz.nextQuestion()
      expect(quiz.progress.value).toBeCloseTo(33.33, 1)
      quiz.nextQuestion()
      expect(quiz.progress.value).toBeCloseTo(66.67, 1)
    })
  })

  describe('previousQuestion', () => {
    it('前の問題に戻れる', () => {
      quiz.nextQuestion()
      expect(quiz.currentQuestionIndex.value).toBe(1)
      quiz.previousQuestion()
      expect(quiz.currentQuestionIndex.value).toBe(0)
    })

    it('最初の問題では前に戻れない', () => {
      expect(quiz.currentQuestionIndex.value).toBe(0)
      quiz.previousQuestion()
      expect(quiz.currentQuestionIndex.value).toBe(0)
    })
  })

  describe('finishQuiz とスコア計算', () => {
    it('全問正解で100点', () => {
      quiz.selectAnswer(0)
      quiz.nextQuestion()
      quiz.selectAnswer('true')
      quiz.nextQuestion()
      quiz.selectAnswer(2)
      quiz.finishQuiz()

      expect(quiz.score.value).toBe(100)
      expect(quiz.isCompleted.value).toBe(true)
    })

    it('2問正解で67点', () => {
      quiz.selectAnswer(0)
      quiz.nextQuestion()
      quiz.selectAnswer('false')
      quiz.nextQuestion()
      quiz.selectAnswer(2)
      quiz.finishQuiz()

      expect(quiz.score.value).toBe(67)
    })

    it('全問不正解で0点', () => {
      quiz.selectAnswer(1)
      quiz.nextQuestion()
      quiz.selectAnswer('false')
      quiz.nextQuestion()
      quiz.selectAnswer(0)
      quiz.finishQuiz()

      expect(quiz.score.value).toBe(0)
    })

    it('クイズ結果が正しく保存される', () => {
      quiz.selectAnswer(0)
      quiz.nextQuestion()
      quiz.selectAnswer('true')
      quiz.nextQuestion()
      quiz.selectAnswer(1)
      quiz.finishQuiz()

      expect(quiz.quizResults.value).toHaveLength(3)
      expect(quiz.quizResults.value[0]?.isCorrect).toBe(true)
      expect(quiz.quizResults.value[1]?.isCorrect).toBe(true)
      expect(quiz.quizResults.value[2]?.isCorrect).toBe(false)
      expect(quiz.quizResults.value[2]?.userAnswer).toBe(1)
      expect(quiz.quizResults.value[2]?.correctAnswer).toBe(2)
    })
  })

  describe('resetQuiz', () => {
    it('クイズをリセットできる', () => {
      quiz.selectAnswer(1)
      quiz.nextQuestion()
      quiz.selectAnswer('true')
      quiz.finishQuiz()

      quiz.resetQuiz()

      expect(quiz.currentQuestionIndex.value).toBe(0)
      expect(quiz.selectedAnswers.value).toEqual([])
      expect(quiz.score.value).toBe(0)
      expect(quiz.isCompleted.value).toBe(false)
      expect(quiz.showResult.value).toBe(false)
      expect(quiz.quizResults.value).toEqual([])
    })
  })

  describe('shuffleQuestions', () => {
    it('問題をシャッフルできる', () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.1)
      quiz.shuffleQuestions()

      expect(quiz.totalQuestions.value).toBe(3)
    })
  })

  describe('getQuestionsByCategory', () => {
    it('カテゴリーで問題をフィルタリングできる', () => {
      const testCategoryQuestions = quiz.getQuestionsByCategory('test-category')
      expect(testCategoryQuestions).toHaveLength(2)
      expect(testCategoryQuestions[0]?.category).toBe('test-category')
      expect(testCategoryQuestions[1]?.category).toBe('test-category')
    })

    it('存在しないカテゴリーは空配列を返す', () => {
      const noQuestions = quiz.getQuestionsByCategory('non-existent')
      expect(noQuestions).toHaveLength(0)
    })
  })

  describe('getAnswerResult', () => {
    it('クイズ完了後に結果を取得できる', () => {
      quiz.selectAnswer(0)
      quiz.nextQuestion()
      quiz.selectAnswer('false')
      quiz.finishQuiz()

      const result = quiz.getAnswerResult(1)
      expect(result.userAnswer).toBe('false')
      expect(result.correctAnswer).toBe('true')
      expect(result.isCorrect).toBe(false)
    })

    it('クイズ進行中でも結果を取得できる', () => {
      quiz.selectAnswer(1)
      const result = quiz.getAnswerResult(0)

      expect(result.userAnswer).toBe(1)
      expect(result.correctAnswer).toBe(0)
      expect(result.isCorrect).toBe(false)
    })
  })

  describe('startCategoryQuiz', () => {
    it('存在しないカテゴリーでエラーを投げる', () => {
      expect(() => {
        quiz.startCategoryQuiz('non-existent-category')
      }).toThrow('カテゴリー "non-existent-category" に問題がありません')
    })
  })

  describe('getAvailableCategories', () => {
    it('利用可能なカテゴリー一覧を取得できる', () => {
      const categories = quiz.getAvailableCategories()

      expect(categories.length).toBeGreaterThan(0)
      // 各カテゴリーが適切な構造を持っていることを確認
      categories.forEach(category => {
        expect(category).toHaveProperty('id')
        expect(category).toHaveProperty('name')
        expect(category).toHaveProperty('questionCount')
        expect(typeof category.id).toBe('string')
        expect(typeof category.name).toBe('string')
        expect(typeof category.questionCount).toBe('number')
        expect(category.questionCount).toBeGreaterThan(0)
      })
    })

    it('各カテゴリーの問題数が正しく計算される', () => {
      const categories = quiz.getAvailableCategories()

      categories.forEach(category => {
        expect(category.questionCount).toBeGreaterThan(0)
        expect(typeof category.questionCount).toBe('number')
      })
    })
  })

  describe('getCategoryDisplayName', () => {
    it('カテゴリーの表示名を取得できる', () => {
      expect(quiz.getCategoryDisplayName('tokyo-trial')).toBe('東京裁判史観について')
      expect(quiz.getCategoryDisplayName('selective-surname')).toBe('選択的夫婦別姓のデメリット')
      expect(quiz.getCategoryDisplayName('hayek')).toBe('ハイエクについて')
      expect(quiz.getCategoryDisplayName('abenomics')).toBe('アベノミクスについて')
      expect(quiz.getCategoryDisplayName('koizumi')).toBe('小泉純一郎総理の功績と失敗')
      expect(quiz.getCategoryDisplayName('sanseito')).toBe('参政党の特徴')
      expect(quiz.getCategoryDisplayName('neoliberalism')).toBe('新自由主義について')
      expect(quiz.getCategoryDisplayName('multiculturalism')).toBe('多文化共生庁のデメリット')
      expect(quiz.getCategoryDisplayName('anti-left-vs-right')).toBe('反左翼と右翼の違いについて')
    })

    it('未定義のカテゴリーは元の文字列を返す', () => {
      expect(quiz.getCategoryDisplayName('unknown-category')).toBe('unknown-category')
    })
  })
})
