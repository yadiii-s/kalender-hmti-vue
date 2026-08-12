<template>
  <Teleport to="body">
    <div v-if="show" class="gallery-modal show" @click.self="$emit('cancel')">
      <div class="gallery-modal-content" style="max-width:420px">
        <div class="gallery-modal-body" style="padding:32px;text-align:center;">
          <div style="width:64px;height:64px;border-radius:50%;background:var(--danger-light);display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-size:1.8rem;color:var(--danger)">
            <i class="bi bi-exclamation-triangle"></i>
          </div>
          <h5 style="margin-bottom:8px">{{ title }}</h5>
          <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:24px">{{ message }}</p>
          <div class="d-flex gap-3 justify-content-center">
            <button class="btn btn-light" @click="$emit('cancel')">Batal</button>
            <button class="btn" style="background:var(--danger);color:#fff" @click="$emit('confirm')">
              <i class="bi bi-trash me-1"></i> Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineProps({
  show: { type: Boolean, default: false },
  title: { type: String, default: 'Konfirmasi Hapus' },
  message: { type: String, default: 'Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.' }
})

defineEmits(['confirm', 'cancel'])
</script>
