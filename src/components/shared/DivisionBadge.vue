<template>
  <span class="division-badge" :class="`div-${division}`">{{ division }}</span>
</template>

<script setup>
defineProps({
  division: { type: String, default: '' }
})
</script>
