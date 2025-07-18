<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <div v-if="!showResult" class="quiz-container">
      <!-- Progress Bar -->
      <div class="mb-6">
        <div class="flex justify-between text-sm text-gray-600 mb-2">
          <span>問題 {{ currentQuestionIndex + 1 }} / {{ totalQuestions }}</span>
          <span>{{ Math.round(progress) }}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            class="bg-blue-600 h-2 rounded-full transition-all duration-300"
            :style="{ width: progress + '%' }"
          />
        </div>
      </div>

      <!-- Question -->
      <div class="mb-6">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">
          {{ currentQuestion.question }}
        </h3>

        <!-- Multiple Choice -->
        <div v-if="currentQuestion.type === 'multiple-choice'" class="space-y-3">
          <button
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            :class="[
              'w-full text-left p-4 rounded-lg border transition duration-200',
              selectedAnswers[currentQuestionIndex] === index
                ? 'bg-blue-100 border-blue-500 text-blue-700'
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            ]"
            @click="selectAnswer(index)"
          >
            {{ option }}
          </button>
        </div>

        <!-- True/False -->
        <div v-else-if="currentQuestion.type === 'true-false'" class="space-y-3">
          <button
            :class="[
              'w-full text-left p-4 rounded-lg border transition duration-200',
              selectedAnswers[currentQuestionIndex] === 'true'
                ? 'bg-blue-100 border-blue-500 text-blue-700'
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            ]"
            @click="selectAnswer('true')"
          >
            正しい
          </button>
          <button
            :class="[
              'w-full text-left p-4 rounded-lg border transition duration-200',
              selectedAnswers[currentQuestionIndex] === 'false'
                ? 'bg-blue-100 border-blue-500 text-blue-700'
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            ]"
            @click="selectAnswer('false')"
          >
            間違い
          </button>
        </div>
      </div>

      <!-- Navigation -->
      <div class="flex justify-between">
        <button
          :disabled="currentQuestionIndex === 0"
          class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition duration-200"
          @click="previousQuestion"
        >
          前の問題
        </button>

        <button
          :disabled="selectedAnswers[currentQuestionIndex] === undefined"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition duration-200"
          @click="nextQuestion"
        >
          {{ currentQuestionIndex === totalQuestions - 1 ? '結果を見る' : '次の問題' }}
        </button>
      </div>
    </div>

    <!-- Results -->
    <QuizResult v-else :score="score" :quiz-results="quizResults" @restart="handleRestart" />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['restart'])

const {
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  progress,
  selectedAnswers,
  score,
  showResult,
  quizResults,
  selectAnswer,
  nextQuestion,
  previousQuestion,
  resetQuiz
} = useQuiz()

const handleRestart = () => {
  resetQuiz()
  emit('restart')
}
</script>
