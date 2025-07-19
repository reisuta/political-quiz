<template>
  <div class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
    <div v-if="!showResult" class="quiz-container">
      <!-- Progress Bar -->
      <div class="mb-8">
        <div class="flex justify-between text-sm font-medium text-gray-700 mb-3">
          <span class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            問題 {{ currentQuestionIndex + 1 }} / {{ totalQuestions }}
          </span>
          <span class="text-blue-600 font-bold">{{ Math.round(progress) }}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            class="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
            :style="{ width: progress + '%' }"
          />
        </div>
      </div>

      <!-- Question -->
      <div v-if="currentQuestion" class="mb-8">
        <h3 class="text-2xl font-bold text-gray-800 mb-6 leading-relaxed">
          {{ currentQuestion.question }}
        </h3>

        <!-- Multiple Choice -->
        <div v-if="currentQuestion.type === 'multiple-choice'" class="space-y-3">
          <button
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            :class="[
              'group relative w-full text-left p-5 rounded-xl border-2 transition-all duration-300 overflow-hidden',
              selectedAnswers[currentQuestionIndex] === index
                ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-500 text-blue-700 shadow-md transform scale-[1.02]'
                : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md hover:transform hover:scale-[1.01]'
            ]"
            @click="selectAnswer(index)"
          >
            <span class="relative z-10 flex items-center gap-3">
              <span
:class="[
                'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300',
                selectedAnswers[currentQuestionIndex] === index
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-600 group-hover:bg-gray-300'
              ]">
                {{ String.fromCharCode(65 + index) }}
              </span>
              <span class="font-medium">{{ option }}</span>
            </span>
          </button>
        </div>

        <!-- True/False -->
        <div v-else-if="currentQuestion.type === 'true-false'" class="grid grid-cols-2 gap-4">
          <button
            :class="[
              'group relative p-6 rounded-xl border-2 transition-all duration-300 overflow-hidden',
              selectedAnswers[currentQuestionIndex] === 'true'
                ? 'bg-gradient-to-r from-green-50 to-green-100 border-green-500 text-green-700 shadow-md transform scale-[1.02]'
                : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md hover:transform hover:scale-[1.01]'
            ]"
            @click="selectAnswer('true')"
          >
            <div class="flex flex-col items-center gap-2">
              <svg
:class="[
                'w-12 h-12 transition-colors duration-300',
                selectedAnswers[currentQuestionIndex] === 'true' ? 'text-green-600' : 'text-gray-400'
              ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="font-bold text-lg">正しい</span>
            </div>
          </button>
          <button
            :class="[
              'group relative p-6 rounded-xl border-2 transition-all duration-300 overflow-hidden',
              selectedAnswers[currentQuestionIndex] === 'false'
                ? 'bg-gradient-to-r from-red-50 to-red-100 border-red-500 text-red-700 shadow-md transform scale-[1.02]'
                : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md hover:transform hover:scale-[1.01]'
            ]"
            @click="selectAnswer('false')"
          >
            <div class="flex flex-col items-center gap-2">
              <svg
:class="[
                'w-12 h-12 transition-colors duration-300',
                selectedAnswers[currentQuestionIndex] === 'false' ? 'text-red-600' : 'text-gray-400'
              ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="font-bold text-lg">間違い</span>
            </div>
          </button>
        </div>
      </div>

      <!-- Navigation -->
      <div class="flex justify-between items-center mt-8">
        <button
          :disabled="currentQuestionIndex === 0"
          class="group flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-all duration-300"
          @click="previousQuestion"
        >
          <svg class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          前の問題
        </button>

        <button
          :disabled="selectedAnswers[currentQuestionIndex] === undefined"
          class="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          @click="nextQuestion"
        >
          {{ currentQuestionIndex === totalQuestions - 1 ? '結果を見る' : '次の問題' }}
          <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Results -->
    <QuizResult v-else :score="score" :quiz-results="quizResults as any" @restart="handleRestart" />
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
