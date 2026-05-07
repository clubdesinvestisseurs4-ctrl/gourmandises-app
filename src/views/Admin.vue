<template>
  <div class="min-h-screen bg-gray-50">

    <!-- Header -->
    <header class="py-5 px-4 shadow-md" style="background-color: #2D6E2D;">
      <div class="max-w-5xl mx-auto flex items-center justify-between">
        <div>
          <h1 class="text-xl font-bold text-white">Tableau de bord</h1>
          <p class="text-xs mt-0.5" style="color: #a7d7a7;">Gourmandises Africaines — Suivi des demandes</p>
        </div>
        <a href="/" class="text-sm underline" style="color: #a7d7a7;">← Site vitrine</a>
      </div>
    </header>

    <div class="max-w-5xl mx-auto px-4 py-8">

      <!-- Loading -->
      <div v-if="loading" class="text-center py-20 text-gray-400">
        <div class="text-5xl mb-3">⏳</div>
        <p>Chargement des données...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="text-center py-20 text-red-500">
        <div class="text-5xl mb-3">⚠️</div>
        <p>{{ error }}</p>
        <button @click="load" class="mt-4 text-sm underline" style="color: #2D6E2D;">Réessayer</button>
      </div>

      <template v-else>
        <!-- Stats cards -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div class="bg-white rounded-2xl p-6 shadow-sm text-center border border-gray-100">
            <p class="text-4xl font-bold" style="color: #2D6E2D;">{{ data.total }}</p>
            <p class="text-sm text-gray-500 mt-1 font-medium">Total demandes</p>
          </div>
          <div
            v-for="(item, id) in data.byItem"
            :key="id"
            class="bg-white rounded-2xl p-6 shadow-sm text-center border border-gray-100"
          >
            <p class="text-4xl font-bold" style="color: #D4A820;">{{ item.count }}</p>
            <p class="text-sm text-gray-500 mt-1 font-medium">{{ item.itemName }}</p>
          </div>
        </div>

        <!-- Table -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 class="font-semibold text-gray-800">
              Détail des demandes ({{ data.total }})
            </h2>
            <button
              @click="load"
              class="text-sm font-medium underline"
              style="color: #2D6E2D;"
            >
              ↻ Actualiser
            </button>
          </div>

          <div v-if="data.orders.length === 0" class="py-16 text-center text-gray-400">
            <div class="text-4xl mb-2">📭</div>
            Aucune demande enregistrée pour le moment.
          </div>

          <div v-else class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-gray-50 text-gray-400 uppercase text-xs">
                <tr>
                  <th class="px-4 py-3 text-left font-semibold">Article</th>
                  <th class="px-4 py-3 text-left font-semibold">Prénom</th>
                  <th class="px-4 py-3 text-left font-semibold">Nom</th>
                  <th class="px-4 py-3 text-left font-semibold">Localisation</th>
                  <th class="px-4 py-3 text-left font-semibold">WhatsApp</th>
                  <th class="px-4 py-3 text-left font-semibold">Date</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50">
                <tr
                  v-for="order in data.orders"
                  :key="order.id"
                  class="hover:bg-gray-50 transition-colors"
                >
                  <td class="px-4 py-3">
                    <span class="text-xs font-semibold px-2.5 py-1 rounded-full" style="background: #FEF3C7; color: #92400E;">
                      {{ order.itemName }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-gray-700">{{ order.name }}</td>
                  <td class="px-4 py-3 text-gray-700">{{ order.lastName }}</td>
                  <td class="px-4 py-3 text-gray-500">{{ order.location }}</td>
                  <td class="px-4 py-3">
                    <a
                      :href="`https://wa.me/${order.whatsapp.replace(/\D/g, '')}`"
                      target="_blank"
                      rel="noopener"
                      class="font-medium hover:underline"
                      style="color: #25D366;"
                    >
                      {{ order.whatsapp }}
                    </a>
                  </td>
                  <td class="px-4 py-3 text-xs text-gray-400">{{ fmt(order.createdAt) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchStats } from '../api.js'

const loading = ref(true)
const error = ref('')
const data = ref({ total: 0, byItem: {}, orders: [] })

const fmt = (iso) => {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('fr-FR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

const load = async () => {
  loading.value = true
  error.value = ''
  try {
    const { data: res } = await fetchStats()
    data.value = res
  } catch (err) {
    error.value = 'Impossible de charger les données. Vérifiez la connexion au serveur.'
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>
