<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      @click.self="$emit('close')"
    >
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 z-10 text-center">
        <div class="text-6xl mb-4">😔</div>
        <h2 class="text-2xl font-bold text-gray-800 mb-3">Désolé !</h2>
        <p class="text-gray-600 leading-relaxed mb-2">
          L'article que vous avez demandé est <strong>épuisé</strong>.
        </p>
        <p class="text-gray-500 text-sm leading-relaxed mb-7">
          Il sera disponible très prochainement. Nous vous contacterons dès sa disponibilité via WhatsApp !
        </p>
        <button
          @click="$emit('close')"
          class="w-full py-3 text-white font-semibold rounded-xl transition-colors"
          style="background-color: #2D6E2D"
          @mouseover="$event.target.style.backgroundColor = '#1E5A1E'"
          @mouseout="$event.target.style.backgroundColor = '#2D6E2D'"
        >
          D'accord, merci !
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineEmits(['close'])
</script>
