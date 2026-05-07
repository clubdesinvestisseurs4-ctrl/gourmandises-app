<template>
  <div class="bg-white rounded-2xl shadow-md overflow-hidden transform transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
    <!-- Visual -->
    <div
      class="h-44 flex items-center justify-center text-7xl relative"
      :class="item.bgClass"
    >
      <span>{{ item.emoji }}</span>
      <span class="absolute top-3 right-3 bg-white/90 text-gray-800 font-bold text-sm px-3 py-1 rounded-full shadow-sm">
        {{ item.price }}
      </span>
    </div>

    <!-- Content -->
    <div class="p-5">
      <h3 class="text-lg font-bold text-gray-800 mb-1">{{ item.name }}</h3>
      <p class="text-sm text-gray-500 mb-5 leading-relaxed">{{ item.description }}</p>
      <button
        @click="$emit('order', item)"
        class="w-full py-3 bg-africa-green text-white font-semibold rounded-xl hover:bg-africa-green-dark active:scale-95 transition-all duration-150"
      >
        Commander
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({ item: { type: Object, required: true } })
defineEmits(['order'])
</script>
