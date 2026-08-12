<template>
  <div class="dash-panel">
    <div class="dash-panel-header">
      <h5>{{ title }}</h5>
      <slot name="header-action" />
    </div>
    <div class="table-responsive">
      <table class="table dash-table">
        <thead>
          <tr>
            <th v-for="col in columns" :key="col.key">{{ col.label }}</th>
            <th v-if="showActions" style="width:120px">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!items.length">
            <td :colspan="columns.length + (showActions ? 1 : 0)" class="text-center text-muted py-4">
              <i class="bi bi-inbox fs-3 d-block mb-2"></i> Belum ada data
            </td>
          </tr>
          <tr v-for="item in items" :key="item.id">
            <td v-for="col in columns" :key="col.key">
              <slot :name="`cell-${col.key}`" :item="item" :value="item[col.key]">
                {{ item[col.key] }}
              </slot>
            </td>
            <td v-if="showActions">
              <div class="d-flex gap-2">
                <button class="btn btn-soft btn-sm" @click="$emit('edit', item)" title="Edit">
                  <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm" style="background:var(--danger-light);color:var(--danger)" @click="$emit('delete', item)" title="Hapus">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: 'Data' },
  columns: { type: Array, default: () => [] },
  items: { type: Array, default: () => [] },
  showActions: { type: Boolean, default: true }
})

defineEmits(['edit', 'delete'])
</script>
