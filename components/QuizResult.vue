<template>
  <div class="text-center">
    <div class="mb-8">
      <svg class="w-16 h-16 mx-auto mb-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      <h3 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
        クイズ完了！
      </h3>
    </div>

    <div class="mb-8">
      <div class="relative inline-block">
        <div class="absolute inset-0 bg-gradient-to-r from-blue-400 to-red-400 rounded-full blur-xl opacity-30 animate-pulse"/>
        <div class="relative text-7xl font-black mb-3" :class="scoreColor">
          {{ score }}%
        </div>
      </div>
      <p class="text-lg font-medium text-gray-700">
        {{ scoreMessage }}
      </p>
    </div>

    <div class="bg-gradient-to-br from-blue-50 to-red-50 rounded-xl p-6 mb-8 shadow-inner">
      <h4 class="font-bold text-gray-800 mb-3 flex items-center justify-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        評価
      </h4>
      <p class="text-gray-700 leading-relaxed">
        {{ getEvaluation() }}
      </p>
    </div>

    <div class="space-y-3 max-w-md mx-auto">
      <button
        class="group relative w-full bg-gradient-to-r from-blue-600 to-red-600 text-white font-bold py-4 px-6 rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
        @click="$emit('restart')"
      >
        <span class="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"/>
        <span class="relative flex items-center justify-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          もう一度挑戦
        </span>
      </button>

      <button
        class="group w-full bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-bold py-4 px-6 rounded-xl hover:shadow-lg transition-all duration-300"
        @click="showDetailedResults = !showDetailedResults"
      >
        <span class="flex items-center justify-center gap-2">
          <svg :class="['w-5 h-5 transition-transform duration-300', showDetailedResults ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
          {{ showDetailedResults ? '詳細結果を隠す' : '詳細結果を見る' }}
        </span>
      </button>
    </div>

    <!-- Detailed Results -->
    <transition
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="opacity-0 transform translate-y-4"
      enter-to-class="opacity-100 transform translate-y-0"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 transform translate-y-0"
      leave-to-class="opacity-0 transform translate-y-4"
    >
      <div v-if="showDetailedResults" class="mt-8 text-left">
        <h4 class="font-bold text-gray-800 mb-6 text-xl">詳細結果</h4>
        <div class="space-y-4">
          <div
            v-for="(result, index) in detailedResults"
            :key="index"
            class="relative border-2 rounded-xl p-5 transition-all duration-300 hover:shadow-md"
            :class="result.isCorrect ? 'border-green-300 bg-gradient-to-br from-green-50 to-green-100' : 'border-red-300 bg-gradient-to-br from-red-50 to-red-100'"
          >
            <div class="flex items-center justify-between mb-3">
              <span class="text-sm font-bold text-gray-700">問題 {{ index + 1 }}</span>
              <span
                class="px-3 py-1 text-sm font-medium rounded-full flex items-center gap-1"
                :class="result.isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'"
              >
                <svg v-if="result.isCorrect" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                {{ result.isCorrect ? '正解' : '不正解' }}
              </span>
            </div>
            <p class="text-gray-800 font-medium mb-3">{{ result.question.question }}</p>
            <div class="bg-white/60 rounded-lg p-3">
              <p class="text-sm text-gray-700 leading-relaxed">
                <span class="font-semibold">解説:</span> {{ result.explanation }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </transition>
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
