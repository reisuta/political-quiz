import { describe, it, expect } from 'vitest'
import { quizQuestions } from '~/data/questions'

describe('Quiz Questions', () => {
  it('should have at least 30 questions', () => {
    expect(quizQuestions.length).toBeGreaterThanOrEqual(30)
  })

  it('should have all required properties for each question', () => {
    quizQuestions.forEach((question, _index) => {
      expect(question.id, `Question ${_index + 1} should have an id`).toBeDefined()
      expect(question.type, `Question ${_index + 1} should have a type`).toBeDefined()
      expect(question.question, `Question ${_index + 1} should have a question text`).toBeDefined()
      expect(question.correctAnswer, `Question ${_index + 1} should have a correct answer`).toBeDefined()
      expect(question.explanation, `Question ${_index + 1} should have an explanation`).toBeDefined()
      expect(question.category, `Question ${_index + 1} should have a category`).toBeDefined()
      expect(question.relatedParty, `Question ${_index + 1} should have a related party`).toBeDefined()
    })
  })

  it('should have unique question IDs', () => {
    const ids = quizQuestions.map(q => q.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })

  it('should have valid question types', () => {
    const validTypes = ['multiple-choice', 'true-false']
    quizQuestions.forEach((question, _index) => {
      expect(validTypes, `Question ${_index + 1} should have a valid type`).toContain(question.type)
    })
  })

  it('should have correct answer format for multiple choice questions', () => {
    const multipleChoiceQuestions = quizQuestions.filter(q => q.type === 'multiple-choice')
    multipleChoiceQuestions.forEach((question, _index) => {
      expect(question.options, `Multiple choice question ${question.id} should have options`).toBeDefined()
      expect(Array.isArray(question.options), `Multiple choice question ${question.id} should have options array`).toBe(true)
      expect(question.options!.length, `Multiple choice question ${question.id} should have at least 2 options`).toBeGreaterThanOrEqual(2)
      expect(typeof question.correctAnswer, `Multiple choice question ${question.id} should have numeric correct answer`).toBe('number')
      expect(question.correctAnswer, `Multiple choice question ${question.id} should have valid correct answer index`).toBeGreaterThanOrEqual(0)
      expect(question.correctAnswer, `Multiple choice question ${question.id} should have valid correct answer index`).toBeLessThan(question.options!.length)
    })
  })

  it('should have correct answer format for true-false questions', () => {
    const trueFalseQuestions = quizQuestions.filter(q => q.type === 'true-false')
    trueFalseQuestions.forEach((question) => {
      expect(['true', 'false'], `True-false question ${question.id} should have 'true' or 'false' as correct answer`).toContain(question.correctAnswer)
    })
  })

  it('should have valid categories from the approved list', () => {
    const validCategories = [
      '新自由主義と新保守主義',
      '日本の歴代総理大臣の功績と失敗',
      'グローバリズムと反グローバリズム',
      '東京裁判史観と日本の歴史認識について',
      '右翼と反左翼',
      '在日',
      '選択的夫婦別姓と皇統',
      '参政党と日本保守党',
      '再生の道とチーム未来',
      '国政政党の政策について'
    ]

    quizQuestions.forEach((question) => {
      expect(validCategories, `Question ${question.id} should have a valid category`).toContain(question.category)
    })
  })

  it('should have non-empty explanation for each question', () => {
    quizQuestions.forEach((question) => {
      expect(question.explanation.length, `Question ${question.id} should have non-empty explanation`).toBeGreaterThan(0)
    })
  })

  it('should cover all required categories', () => {
    const requiredCategories = [
      '選択的夫婦別姓と皇統',
      '日本の歴代総理大臣の功績と失敗'
    ]

    const categoriesInQuestions = new Set(quizQuestions.map(q => q.category))

    requiredCategories.forEach(category => {
      expect(categoriesInQuestions, `Should have questions in category: ${category}`).toContain(category)
    })
  })

  it('should have at least 3 questions per major category', () => {
    const categoryCount = quizQuestions.reduce((acc, question) => {
      acc[question.category] = (acc[question.category] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const majorCategories = [
      '選択的夫婦別姓と皇統',
      '日本の歴代総理大臣の功績と失敗',
      '東京裁判史観と日本の歴史認識について'
    ]

    majorCategories.forEach(category => {
      if (categoryCount[category]) {
        expect(categoryCount[category], `Category ${category} should have at least 3 questions`).toBeGreaterThanOrEqual(3)
      }
    })
  })
})
