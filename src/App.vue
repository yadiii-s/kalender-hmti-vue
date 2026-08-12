<template>
  <Preloader v-if="loading" />
  <router-view />
  <ScrollToTop />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Preloader from '@/components/shared/Preloader.vue'
import ScrollToTop from '@/components/public/ScrollToTop.vue'

const loading = ref(true)

onMounted(() => {
  setTimeout(() => { loading.value = false }, 400)

  // Initialize AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
      easing: 'ease-out-cubic'
    })
  }
})
</script>
