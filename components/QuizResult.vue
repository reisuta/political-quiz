<template>
  <div class="text-center">
    <h3 class="text-2xl font-bold text-gray-800 mb-4">
      クイズ完了！
    </h3>

    <div class="mb-6">
      <div class="text-6xl font-bold mb-2" :class="scoreColor">
        {{ score }}%
      </div>
      <p class="text-gray-600">
        {{ scoreMessage }}
      </p>
    </div>

    <div class="bg-gray-50 rounded-lg p-4 mb-6">
      <h4 class="font-semibold text-gray-800 mb-2">評価</h4>
      <p class="text-gray-700">
        {{ getEvaluation() }}
      </p>
    </div>

    <div class="space-y-3">
      <button
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
        @click="$emit('restart')"
      >
        もう一度挑戦
      </button>

      <button
        class="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-3 px-6 rounded-lg transition duration-200"
        @click="showDetailedResults = !showDetailedResults"
      >
        {{ showDetailedResults ? '詳細結果を隠す' : '詳細結果を見る' }}
      </button>
    </div>

    <!-- Detailed Results -->
    <div v-if="showDetailedResults" class="mt-6 text-left">
      <h4 class="font-semibold text-gray-800 mb-4">詳細結果</h4>
      <div class="space-y-4">
        <div
          v-for="(result, index) in detailedResults"
          :key="index"
          class="border rounded-lg p-4"
          :class="result.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'"
        >
          <div class="flex items-center mb-2">
            <span class="text-sm font-medium text-gray-600">問題 {{ index + 1 }}</span>
            <span
              class="ml-2 px-2 py-1 text-xs rounded-full"
              :class="result.isCorrect ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'"
            >
              {{ result.isCorrect ? '正解' : '不正解' }}
            </span>
          </div>
          <p class="text-sm text-gray-700 mb-2">{{ result.question.question }}</p>
          <p class="text-xs text-gray-600">{{ result.explanation }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QuizQuestion } from '~/types/political'

type QuizResultItem = {
  question: QuizQuestion
  userAnswer: string | number
  correctAnswer: string | number
  isCorrect: boolean
  explanation: string
}

type Props = {
  score: number
  quizResults: QuizResultItem[]
}

const props = defineProps<Props>()
defineEmits(['restart'])

const showDetailedResults = ref(false)
const { getAnswerResult, totalQuestions } = useQuiz()

const scoreColor = computed(() => {
  if (props.score >= 80) return 'text-green-600'
  if (props.score >= 60) return 'text-yellow-600'
  return 'text-red-600'
})

const scoreMessage = computed(() => {
  if (props.score >= 90) return '素晴らしい！政治に詳しいですね！'
  if (props.score >= 80) return 'とても良い結果です！'
  if (props.score >= 70) return '良い結果です！'
  if (props.score >= 60) return 'まずまずの結果です。'
  if (props.score >= 50) return 'もう少し頑張りましょう。'
  return '政治について学習しましょう！'
})

const getEvaluation = () => {
  if (props.score >= 90) return '日本の政治について深い理解をお持ちです。'
  if (props.score >= 80) return '日本の政治について良い知識をお持ちです。'
  if (props.score >= 70) return '基本的な政治知識はしっかりしています。'
  if (props.score >= 60) return '基本的な知識はありますが、さらに学習すると良いでしょう。'
  return '政治について基礎から学習することをお勧めします。'
}

const detailedResults = computed(() => {
  // propsから直接取得
  if (props.quizResults && props.quizResults.length > 0) {
    return props.quizResults
  }

  // フォールバック：getAnswerResultを使用
  const results = []
  for (let i = 0; i < totalQuestions.value; i++) {
    results.push(getAnswerResult(i))
  }
  return results
})
</script>
