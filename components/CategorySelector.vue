<template>
  <div class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
    <h3 class="text-2xl font-bold text-gray-800 mb-6">カテゴリーを選択</h3>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      <button
        v-for="category in categories"
        :key="category.id"
        class="group relative p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 text-left overflow-hidden"
        @click="$emit('select-category', category.id)"
      >
        <div class="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-600/0 group-hover:from-blue-500/5 group-hover:to-blue-600/10 transition-all duration-300"/>
        <div class="relative z-10">
          <div class="font-bold text-gray-800 group-hover:text-blue-700 mb-2 transition-colors duration-300">{{ category.name }}</div>
          <div class="inline-flex items-center gap-2 text-sm text-gray-600 group-hover:text-blue-600 transition-colors duration-300">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>{{ category.questionCount }}問</span>
          </div>
        </div>
      </button>
    </div>

    <div class="text-center pt-4 border-t border-gray-200">
      <button
        class="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-red-600 text-white font-bold rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
        @click="$emit('select-all')"
      >
        <span class="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"/>
        <span class="relative flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          全問題に挑戦
        </span>
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
