<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="max-w-4xl mx-auto">
    <div class="text-center mb-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">
        政治クイズに挑戦！
      </h2>
      <p class="text-gray-600 mb-6">
        日本の政党の基本情報、政治思想、政策立場について学習できるクイズです。
      </p>
    </div>

    <div v-if="!showQuiz" class="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 class="text-xl font-semibold mb-4">クイズの内容</h3>
      <ul class="list-disc list-inside space-y-2 text-gray-700">
        <li>政党の基本情報（設立年、支持基盤など）</li>
        <li>政治思想（左派・右派・中道、新保守主義、リバタリアニズムなど）</li>
        <li>政策立場（憲法改正、消費税、外国人問題、安全保障など）</li>
      </ul>
      
      <div class="mt-6 text-center">
        <button 
          class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
          @click="startQuiz"
        >
          クイズを開始
        </button>
      </div>
    </div>

    <QuizComponent v-if="showQuiz" @restart="restartQuiz" />
  </div>
</template>

<script setup lang="ts">
const showQuiz = ref(false)

const startQuiz = () => {
  showQuiz.value = true
}

const restartQuiz = () => {
  showQuiz.value = false
}
</script>