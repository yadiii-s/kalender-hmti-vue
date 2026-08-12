<template>
  <Teleport to="body">
    <div v-if="show" class="gallery-modal show" @click.self="$emit('close')">
      <div class="gallery-modal-content" style="max-width:560px">
        <div style="padding:28px 32px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between">
          <h5 style="margin:0">{{ title }}</h5>
          <button class="btn btn-sm btn-light" @click="$emit('close')" style="border-radius:50%;width:36px;height:36px;padding:0;display:flex;align-items:center;justify-content:center">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
        <div style="padding:28px 32px">
          <slot />
        </div>
        <div style="padding:16px 32px;border-top:1px solid var(--border);display:flex;gap:12px;justify-content:flex-end">
          <button class="btn btn-light" @click="$emit('close')">Batal</button>
          <button class="btn btn-primary" @click="$emit('submit')">
            <i class="bi bi-check-lg me-1"></i> {{ submitLabel }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineProps({
  show: { type: Boolean, default: false },
  title: { type: String, default: 'Form' },
  submitLabel: { type: String, default: 'Simpan' }
})

defineEmits(['close', 'submit'])
</script>
