<template>
  <div class="preloader" :class="{ hide: !visible }">
    <div class="preloader-spinner"></div>
  </div>
</template>

<script setup>
defineProps({
  visible: { type: Boolean, default: true }
})
</script>
