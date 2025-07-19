<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50 py-8">
    <div class="max-w-6xl mx-auto px-4">
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent mb-4">
          日本政治クイズ
        </h1>
        <p class="text-lg text-gray-700 max-w-2xl mx-auto">
          日本の政党の基本情報、政治思想、政策立場について学習できるインタラクティブなクイズです。
        </p>
      </div>

    <!-- カテゴリー選択画面 -->
    <CategorySelector
      v-if="!showQuiz"
      :categories="categories"
      @select-category="startCategoryQuiz"
      @select-all="startAllQuiz"
    />

      <QuizComponent v-if="showQuiz" @restart="restartQuiz" />
    </div>
  </div>
</template>

<script setup lang="ts">
const quiz = useQuiz()
const { getAvailableCategories, startCategoryQuiz: initCategoryQuiz, resetQuiz } = quiz

const showQuiz = ref(false)
const categories = ref(getAvailableCategories())

const startAllQuiz = () => {
  // 全問題でクイズを開始（リセットして全問題を復元）
  resetQuiz()
  showQuiz.value = true
}

const startCategoryQuiz = (categoryId: string) => {
  try {
    initCategoryQuiz(categoryId)
    showQuiz.value = true
  } catch (error) {
    console.error('カテゴリークイズの開始エラー:', error)
  }
}

const restartQuiz = () => {
  // 全問題にリセット
  resetQuiz()
  showQuiz.value = false
  categories.value = getAvailableCategories()
}
</script>
