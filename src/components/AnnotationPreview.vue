<script setup lang="ts">
import type { ContentPage } from '../types/content'

defineProps<{ page: ContentPage | null; position: { left: number; top: number } | null }>()
const emit = defineEmits<{ open: [pageId: string]; close: [] }>()
</script>

<template>
  <Transition name="preview">
    <aside
      v-if="page && position"
      class="annotation-preview"
      :style="{ left: `${position.left}px`, top: `${position.top}px` }"
      @mouseenter="undefined"
      @mouseleave="emit('close')"
    >
      <p class="eyebrow">Annotation preview</p>
      <h3>{{ page.title }}</h3>
      <p>{{ page.text.slice(0, 280) }}{{ page.text.length > 280 ? '…' : '' }}</p>
      <button type="button" @click="emit('open', page.id)">Open annotation</button>
    </aside>
  </Transition>
</template>
