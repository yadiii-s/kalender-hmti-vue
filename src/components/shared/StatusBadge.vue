<template>
  <span class="status-badge" :class="badgeClass">{{ status }}</span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: { type: String, default: '' }
})

const badgeClass = computed(() => {
  const s = props.status.toLowerCase()
  if (['mendatang', 'upcoming'].includes(s)) return 'status-upcoming'
  if (['berlangsung', 'ongoing'].includes(s)) return 'status-ongoing'
  if (['selesai', 'done', 'completed'].includes(s)) return 'status-done'
  if (['persiapan', 'preparation'].includes(s)) return 'status-upcoming'
  if (['standby'].includes(s)) return 'status-upcoming'
  return 'status-done'
})
</script>
