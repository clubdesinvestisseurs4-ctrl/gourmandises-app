<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      @click.self="$emit('close')"
    >
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 z-10 text-center">
        <!-- Icône animée -->
        <div class="flex items-center justify-center w-16 h-16 rounded-full mx-auto mb-5" style="background-color: #edf7ed;">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="#2D6E2D" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 class="text-xl font-bold text-gray-800 mb-3">Félicitations !</h2>
        <p class="text-gray-700 leading-relaxed mb-2 font-medium">
          Votre commande a bien été prise en compte.
        </p>
        <p class="text-gray-500 text-sm leading-relaxed mb-7">
          Notre équipe vous contactera pour la livraison via <strong>WhatsApp</strong> pour confirmer votre commande.
        </p>
        <button
          @click="$emit('close')"
          class="w-full py-3 text-white font-semibold rounded-xl transition-colors"
          style="background-color: #2D6E2D"
          @mouseover="$event.target.style.backgroundColor = '#1E5A1E'"
          @mouseout="$event.target.style.backgroundColor = '#2D6E2D'"
        >
          Parfait, merci !
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineEmits(['close'])
</script>
