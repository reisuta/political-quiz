import { describe, it, expect } from 'vitest'
import { quizQuestions } from '~/data/questions'

describe('questions data', () => {
  describe('問題データの構造検証', () => {
    it('全ての問題が必要なプロパティを持っている', () => {
      quizQuestions.forEach((question) => {
        expect(question).toHaveProperty('id')
        expect(question).toHaveProperty('type')
        expect(question).toHaveProperty('question')
        expect(question).toHaveProperty('correctAnswer')
        expect(question).toHaveProperty('explanation')
        expect(question).toHaveProperty('category')

        expect(typeof question.id).toBe('string')
        expect(['multiple-choice', 'true-false', 'policy-stance']).toContain(question.type)
        expect(typeof question.question).toBe('string')
        expect(typeof question.explanation).toBe('string')
        expect(typeof question.category).toBe('string')

        // multiple-choiceの場合はoptionsが必要
        if (question.type === 'multiple-choice') {
          expect(question).toHaveProperty('options')
          expect(Array.isArray(question.options)).toBe(true)
          expect(question.options!.length).toBeGreaterThan(0)
          expect(typeof question.correctAnswer).toBe('number')
          expect(question.correctAnswer).toBeGreaterThanOrEqual(0)
          expect(question.correctAnswer).toBeLessThan(question.options!.length)
        }

        // true-falseの場合はcorrectAnswerが'true'または'false'
        if (question.type === 'true-false') {
          expect(['true', 'false']).toContain(question.correctAnswer)
        }
      })
    })

    it('問題IDがユニークである', () => {
      const ids = quizQuestions.map(q => q.id)
      const uniqueIds = [...new Set(ids)]
      expect(ids.length).toBe(uniqueIds.length)
    })

    it('問題文が空でない', () => {
      quizQuestions.forEach(question => {
        expect(question.question.trim()).not.toBe('')
      })
    })

    it('解説が空でない', () => {
      quizQuestions.forEach(question => {
        expect(question.explanation.trim()).not.toBe('')
      })
    })
  })

  describe('新しく追加されたカテゴリーの検証', () => {
    const newCategories = [
      'selective-surname',
      'hayek',
      'abenomics',
      'koizumi',
      'sanseito',
      'neoliberalism',
      'multiculturalism',
      'anti-left-vs-right'
    ]

    newCategories.forEach(category => {
      it(`${category}カテゴリーの問題が存在する`, () => {
        const categoryQuestions = quizQuestions.filter(q => q.category === category)
        expect(categoryQuestions.length).toBeGreaterThan(0)
      })

      it(`${category}カテゴリーの問題が最低2問以上ある`, () => {
        const categoryQuestions = quizQuestions.filter(q => q.category === category)
        expect(categoryQuestions.length).toBeGreaterThanOrEqual(2)
      })
    })
  })

  describe('各カテゴリーの問題数', () => {
    it('選択的夫婦別姓のデメリットが3問ある', () => {
      const questions = quizQuestions.filter(q => q.category === 'selective-surname')
      expect(questions.length).toBe(3)
    })

    it('ハイエクについてが3問ある', () => {
      const questions = quizQuestions.filter(q => q.category === 'hayek')
      expect(questions.length).toBe(3)
    })

    it('アベノミクスについてが3問ある', () => {
      const questions = quizQuestions.filter(q => q.category === 'abenomics')
      expect(questions.length).toBe(3)
    })

    it('小泉純一郎総理の功績と失敗が3問ある', () => {
      const questions = quizQuestions.filter(q => q.category === 'koizumi')
      expect(questions.length).toBe(3)
    })

    it('参政党の特徴が3問ある', () => {
      const questions = quizQuestions.filter(q => q.category === 'sanseito')
      expect(questions.length).toBe(3)
    })

    it('新自由主義についてが3問ある', () => {
      const questions = quizQuestions.filter(q => q.category === 'neoliberalism')
      expect(questions.length).toBe(3)
    })

    it('多文化共生庁のデメリットが3問ある', () => {
      const questions = quizQuestions.filter(q => q.category === 'multiculturalism')
      expect(questions.length).toBe(3)
    })

    it('反左翼と右翼の違いについてが3問ある', () => {
      const questions = quizQuestions.filter(q => q.category === 'anti-left-vs-right')
      expect(questions.length).toBe(3)
    })
  })

  describe('問題の品質検証', () => {
    it('複数選択問題の選択肢が適切な数ある', () => {
      const multipleChoiceQuestions = quizQuestions.filter(q => q.type === 'multiple-choice')
      multipleChoiceQuestions.forEach(question => {
        expect(question.options!.length).toBeGreaterThanOrEqual(2)
        expect(question.options!.length).toBeLessThanOrEqual(6)
      })
    })

    it('問題文が適切な長さである', () => {
      quizQuestions.forEach(question => {
        expect(question.question.length).toBeGreaterThan(10)
        expect(question.question.length).toBeLessThan(200)
      })
    })

    it('解説が適切な長さである', () => {
      quizQuestions.forEach(question => {
        expect(question.explanation.length).toBeGreaterThan(10)
        expect(question.explanation.length).toBeLessThan(500)
      })
    })

    it('新しく追加された問題のIDが正しい形式である', () => {
      const newQuestionIds = quizQuestions
        .filter(q => ['selective-surname', 'hayek', 'abenomics', 'koizumi', 'sanseito', 'neoliberalism', 'multiculturalism', 'anti-left-vs-right'].includes(q.category))
        .map(q => q.id)

      newQuestionIds.forEach(id => {
        expect(id).toMatch(/^q\d+$/)
        const questionNumber = parseInt(id.substring(1))
        expect(questionNumber).toBeGreaterThanOrEqual(21)
        expect(questionNumber).toBeLessThanOrEqual(44)
      })
    })
  })

  describe('総問題数の確認', () => {
    it('全体で44問の問題がある', () => {
      expect(quizQuestions.length).toBe(44)
    })

    it('新しく追加された問題が24問ある', () => {
      const newQuestions = quizQuestions.filter(q =>
        ['selective-surname', 'hayek', 'abenomics', 'koizumi', 'sanseito', 'neoliberalism', 'multiculturalism', 'anti-left-vs-right'].includes(q.category)
      )
      expect(newQuestions.length).toBe(24)
    })
  })
})
