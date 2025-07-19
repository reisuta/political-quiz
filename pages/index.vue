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

    <!-- カテゴリー選択画面 -->
    <CategorySelector
      v-if="!showQuiz && !showCategoryInfo"
      :categories="categories"
      @select-category="startCategoryQuiz"
      @select-all="startAllQuiz"
    />

    <!-- 従来のクイズ概要画面 -->
    <div v-if="!showQuiz && showCategoryInfo" class="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 class="text-xl font-semibold mb-4">クイズの内容</h3>
      <ul class="list-disc list-inside space-y-2 text-gray-700">
        <li>東京裁判史観について</li>
        <li>在日特権について</li>
        <li>在日と反日教育について</li>
        <li>日本の歴史認識について</li>
        <li>再生の道と石丸伸二の政治的立場について</li>
        <li>リバタリアニズムとはなにか</li>
        <li>新自由主義と新保守主義について</li>
        <li>日本保守党と新保守主義の関連と参政党との違いについて</li>
      </ul>

      <div class="mt-6 text-center space-x-4">
        <button
          class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
          @click="startAllQuiz"
        >
          全問に挑戦
        </button>
        <button
          class="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-3 px-6 rounded-lg transition duration-200"
          @click="showCategoryInfo = false"
        >
          カテゴリー選択に戻る
        </button>
      </div>
    </div>

    <QuizComponent v-if="showQuiz" @restart="restartQuiz" />
  </div>
</template>

<script setup lang="ts">
const { getAvailableCategories, startCategoryQuiz: initCategoryQuiz } = useQuiz()

const showQuiz = ref(false)
const showCategoryInfo = ref(false)
const categories = ref(getAvailableCategories())

const startAllQuiz = () => {
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
  showQuiz.value = false
  showCategoryInfo.value = false
  categories.value = getAvailableCategories()
}
</script>
