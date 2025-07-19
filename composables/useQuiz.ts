import type { QuizQuestion as _QuizQuestion } from '~/types/political'
import { quizQuestions } from '~/data/questions'

// シングルトンとして状態を管理
const currentQuestionIndex = ref(0)
const selectedAnswers = ref<(string | number)[]>([])
const score = ref(0)
const isCompleted = ref(false)
const showResult = ref(false)
const currentQuestions = ref([...quizQuestions])

type QuizResultItem = {
  question: _QuizQuestion
  userAnswer: string | number
  correctAnswer: string | number
  isCorrect: boolean
  explanation: string
}

const quizResults = ref<QuizResultItem[]>([])

export const useQuiz = () => {

  const currentQuestion = computed(() => currentQuestions.value[currentQuestionIndex.value])
  const totalQuestions = computed(() => currentQuestions.value.length)
  const progress = computed(() => (currentQuestionIndex.value / totalQuestions.value) * 100)

  const shuffleQuestions = () => {
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5)
    currentQuestions.value = shuffled
  }

  const selectAnswer = (answer: string | number) => {
    selectedAnswers.value[currentQuestionIndex.value] = answer
  }

  const nextQuestion = () => {
    if (currentQuestionIndex.value < totalQuestions.value - 1) {
      currentQuestionIndex.value++
    } else {
      finishQuiz()
    }
  }

  const previousQuestion = () => {
    if (currentQuestionIndex.value > 0) {
      currentQuestionIndex.value--
    }
  }

  const finishQuiz = () => {
    calculateScore()
    // 結果を保存
    quizResults.value = currentQuestions.value.map((question, index) => {
      const answer = selectedAnswers.value[index]
      const isCorrect = answer !== undefined && answer === question.correctAnswer
      return {
        question,
        userAnswer: answer ?? '',
        correctAnswer: question.correctAnswer,
        isCorrect,
        explanation: question.explanation
      }
    })
    isCompleted.value = true
    showResult.value = true
  }

  const calculateScore = () => {
    let correctAnswers = 0
    currentQuestions.value.forEach((question, index) => {
      const answer = selectedAnswers.value[index]
      if (answer === question.correctAnswer) {
        correctAnswers++
      }
    })
    score.value = Math.round((correctAnswers / totalQuestions.value) * 100)
  }

  const resetQuiz = () => {
    currentQuestionIndex.value = 0
    selectedAnswers.value = []
    score.value = 0
    isCompleted.value = false
    showResult.value = false
    currentQuestions.value = [...quizQuestions]
    quizResults.value = []
  }

  const getQuestionsByCategory = (category: string) => {
    return quizQuestions.filter(q => q.category === category)
  }

  const startCategoryQuiz = (category: string) => {
    const categoryQuestions = getQuestionsByCategory(category)
    if (categoryQuestions.length === 0) {
      throw new Error(`カテゴリー "${category}" に問題がありません`)
    }
    // 先にリセットしてから、カテゴリーの問題を設定
    currentQuestionIndex.value = 0
    selectedAnswers.value = []
    score.value = 0
    isCompleted.value = false
    showResult.value = false
    quizResults.value = []
    currentQuestions.value = [...categoryQuestions]
  }

  const getAvailableCategories = () => {
    const categories = new Set(quizQuestions.map(q => q.category))
    return Array.from(categories).map(category => ({
      id: category,
      name: getCategoryDisplayName(category),
      questionCount: getQuestionsByCategory(category).length
    }))
  }

  const getCategoryDisplayName = (category: string) => {
    const categoryNames: Record<string, string> = {
      'tokyo-trial': '東京裁判史観について',
      'zainichi-privilege': '在日特権について',
      'anti-japan-education': '在日と反日教育について',
      'historical-recognition': '日本の歴史認識について',
      'ishimaru-politics': '再生の道と石丸伸二の政治的立場について',
      'libertarianism': 'リバタリアニズムとはなにか',
      'neoliberalism-neoconservatism': '新自由主義と新保守主義について',
      'conservative-parties': '日本保守党と新保守主義の関連と参政党との違いについて',
      'selective-surname': '選択的夫婦別姓のデメリット',
      'hayek': 'ハイエクについて',
      'abenomics': 'アベノミクスについて',
      'koizumi': '小泉純一郎総理の功績と失敗',
      'sanseito': '参政党の特徴',
      'neoliberalism': '新自由主義について',
      'multiculturalism': '多文化共生庁のデメリット',
      'anti-left-vs-right': '反左翼と右翼の違いについて'
    }
    return categoryNames[category] || category
  }

  const getAnswerResult = (questionIndex: number) => {
    // 保存された結果があればそれを使用
    if (quizResults.value.length > 0 && quizResults.value[questionIndex]) {
      return quizResults.value[questionIndex]
    }

    // フォールバック（クイズ進行中用）
    const question = currentQuestions.value[questionIndex]
    if (!question) {
      throw new Error(`Question at index ${questionIndex} not found`)
    }

    const userAnswer = selectedAnswers.value[questionIndex]
    const isCorrect = userAnswer !== undefined && userAnswer === question.correctAnswer

    return {
      question,
      userAnswer: userAnswer ?? '',
      correctAnswer: question.correctAnswer,
      isCorrect,
      explanation: question.explanation
    }
  }

  return {
    currentQuestion,
    currentQuestionIndex: readonly(currentQuestionIndex),
    totalQuestions,
    progress,
    selectedAnswers: readonly(selectedAnswers),
    score: readonly(score),
    isCompleted: readonly(isCompleted),
    showResult: readonly(showResult),
    quizResults: readonly(quizResults),
    shuffleQuestions,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    finishQuiz,
    resetQuiz,
    getQuestionsByCategory,
    getAnswerResult,
    startCategoryQuiz,
    getAvailableCategories,
    getCategoryDisplayName
  }
}
