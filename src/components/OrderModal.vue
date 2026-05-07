<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
        @click.self="$emit('close')"
      >
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

        <Transition name="slide-up">
          <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 z-10">
            <!-- Header -->
            <div class="flex items-start justify-between mb-5">
              <div>
                <h2 class="text-xl font-bold text-gray-800">Votre commande</h2>
                <p class="text-sm font-medium mt-0.5" style="color: #2D6E2D">
                  {{ item.name }} — {{ item.price }}
                </p>
              </div>
              <button
                @click="$emit('close')"
                class="text-gray-400 hover:text-gray-600 text-3xl leading-none ml-4 mt-[-4px]"
              >
                &times;
              </button>
            </div>

            <p class="text-xs text-gray-400 mb-5">
              Remplissez ce formulaire pour réserver votre plat. Nous vous contacterons par WhatsApp.
            </p>

            <form @submit.prevent="submit">
              <div class="space-y-4">
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
                    <input
                      v-model="form.name"
                      type="text"
                      required
                      minlength="2"
                      placeholder="Aminata"
                      class="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                    <input
                      v-model="form.lastName"
                      type="text"
                      required
                      minlength="2"
                      placeholder="Diallo"
                      class="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Lieu de résidence *</label>
                  <input
                    v-model="form.location"
                    type="text"
                    required
                    placeholder="ex: Abidjan, Cocody"
                    class="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Numéro WhatsApp *</label>
                  <div class="relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-base select-none">📱</span>
                    <input
                      v-model="form.whatsapp"
                      type="tel"
                      required
                      pattern="[+0-9\s\-]{8,20}"
                      placeholder="+225 07 00 00 00 00"
                      class="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <p v-if="error" class="mt-3 text-sm text-red-500">{{ error }}</p>

              <div class="flex gap-3 mt-6">
                <button
                  type="button"
                  @click="$emit('close')"
                  class="flex-1 py-3 border border-gray-300 text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  :disabled="loading"
                  class="flex-1 py-3 text-white font-semibold rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  style="background-color: #2D6E2D"
                  @mouseover="!loading && ($event.target.style.backgroundColor = '#1E5A1E')"
                  @mouseout="!loading && ($event.target.style.backgroundColor = '#2D6E2D')"
                >
                  <span v-if="loading" class="inline-flex items-center justify-center gap-2">
                    <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    Envoi...
                  </span>
                  <span v-else>Valider la commande</span>
                </button>
              </div>
            </form>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { submitOrder } from '../api.js'

const props = defineProps({ item: { type: Object, required: true } })
const emit = defineEmits(['close', 'submitted'])

const loading = ref(false)
const error = ref('')
const form = reactive({ name: '', lastName: '', location: '', whatsapp: '' })

const submit = async () => {
  loading.value = true
  error.value = ''
  try {
    await submitOrder({
      itemId: props.item.id,
      itemName: props.item.name,
      name: form.name,
      lastName: form.lastName,
      location: form.location,
      whatsapp: form.whatsapp,
    })
    emit('submitted')
  } catch (err) {
    error.value = err.response?.data?.error || 'Une erreur est survenue. Veuillez réessayer.'
  } finally {
    loading.value = false
  }
}
</script>
