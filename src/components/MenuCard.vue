<template>
  <div class="bg-white rounded-2xl shadow-md overflow-hidden transform transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
    <!-- Photo du plat -->
    <div class="h-52 relative overflow-hidden">
      <img
        :src="item.image"
        :alt="item.name"
        class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      />
      <!-- Dégradé bas pour lisibilité du badge -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
      <!-- Badge prix -->
      <span class="absolute top-3 right-3 bg-white/95 text-gray-800 font-bold text-sm px-3 py-1 rounded-full shadow-md">
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
