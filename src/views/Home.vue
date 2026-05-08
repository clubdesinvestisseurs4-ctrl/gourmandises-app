<template>
  <div class="min-h-screen africa-pattern">

    <!-- Header / Branding -->
    <header class="pt-12 pb-6 text-center px-4">
      <div class="inline-block">
        <div class="font-script text-7xl md:text-8xl leading-tight drop-shadow-sm" style="color: #F2C94C; font-family: 'Dancing Script', cursive;">
          Gourmandises
        </div>
        <div class="font-bold text-2xl md:text-3xl tracking-[0.3em] -mt-2" style="color: #2D6E2D; font-family: 'Montserrat', sans-serif;">
          AFRICAINES
        </div>
      </div>
      <p class="mt-4 text-gray-500 text-sm md:text-base">
        Saveurs authentiques d'Afrique de l'Ouest • Livraison à domicile
      </p>
    </header>

    <!-- Ornament -->
    <div class="flex items-center justify-center gap-4 px-8 mb-10">
      <div class="flex-1 h-px max-w-xs" style="background: #F2C94C; opacity: 0.4;"></div>
      <span class="text-xl" style="color: #F2C94C;">✦</span>
      <div class="flex-1 h-px max-w-xs" style="background: #F2C94C; opacity: 0.4;"></div>
    </div>

    <!-- Menu -->
    <main class="container mx-auto px-4 pb-16 max-w-2xl">
      <h2 class="text-center text-xs font-bold text-gray-400 mb-8 uppercase tracking-widest">
        Menu du Jour
      </h2>

      <div class="grid sm:grid-cols-2 gap-6">
        <MenuCard
          v-for="item in menuItems"
          :key="item.id"
          :item="item"
          @order="openOrderModal"
        />
      </div>
    </main>

    <!-- Footer -->
    <footer class="text-center py-6 text-xs text-gray-400 border-t border-gray-200">
      © 2024 Gourmandises Africaines — Fait avec amour pour les saveurs africaines
    </footer>

    <OrderModal
      v-if="showOrderModal"
      :item="selectedItem"
      @close="showOrderModal = false"
      @submitted="handleSubmitted"
    />

    <SoldOutModal
      v-if="showSoldOut"
      @close="showSoldOut = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MenuCard from '../components/MenuCard.vue'
import OrderModal from '../components/OrderModal.vue'
import SoldOutModal from '../components/SoldOutModal.vue'

const menuItems = [
  {
    id: 'tchep',
    name: 'Plat de Tchep',
    description: 'Riz au poisson façon thiéboudienne, avec légumes mijotés et sauce tomate. Le classique sénégalais.',
    price: '2 500 F CFA',
    image: '/images/tchep.jpg',
  },
  {
    id: 'riz-sauce-graines',
    name: 'Riz Sauce Graines',
    description: 'Riz accompagné de sauce huile de palme avec viande tendre et épices. Saveur 100% authentique.',
    price: '2 500 F CFA',
    image: '/images/riz-sauce-graines.jpg',
  },
]

const showOrderModal = ref(false)
const showSoldOut = ref(false)
const selectedItem = ref(null)

const openOrderModal = (item) => {
  selectedItem.value = item
  showOrderModal.value = true
}

const handleSubmitted = () => {
  showOrderModal.value = false
  showSoldOut.value = true
}
</script>
