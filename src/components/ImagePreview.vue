<script setup lang="ts">
import type { OpenImagePayload } from './LegacyContent.vue'
defineProps<{ image: OpenImagePayload|null; position:{left:number;top:number}|null }>()
const emit=defineEmits<{open:[image:OpenImagePayload];close:[]}>()
</script>
<template><Transition name="preview"><aside v-if="image&&position" class="image-preview" :style="{left:`${position.left}px`,top:`${position.top}px`}" @mouseleave="emit('close')"><img :src="image.src" :alt="image.alt"><div><p class="eyebrow">Image preview</p><strong>{{ image.title }}</strong><button type="button" @click="emit('open',image)">Open details</button></div></aside></Transition></template>
