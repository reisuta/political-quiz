<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h3 class="text-xl font-semibold mb-4">カテゴリーを選択してください</h3>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <button
        v-for="category in categories"
        :key="category.id"
        class="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition duration-200 text-left"
        @click="$emit('select-category', category.id)"
      >
        <div class="font-medium text-gray-800 mb-1">{{ category.name }}</div>
        <div class="text-sm text-gray-600">{{ category.questionCount }}問</div>
      </button>
    </div>

    <div class="text-center">
      <button
        class="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-200"
        @click="$emit('select-all')"
      >
        全問題に挑戦
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
type Category = {
  id: string
  name: string
  questionCount: number
}

type Props = {
  categories: Category[]
}

defineProps<Props>()
defineEmits(['select-category', 'select-all'])
</script>
