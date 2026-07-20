<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import type { ManifestPage } from '../types/content'
import type { OpenImagePayload } from './LegacyContent.vue'

const props = defineProps<{
  image: OpenImagePayload | null
  sourcePage: ManifestPage | null
  relatedPages: ManifestPage[]
}>()
const emit = defineEmits<{ close: []; navigate: [pageId: string] }>()

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && props.image) emit('close')
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <Transition name="lightbox">
      <div v-if="image" class="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer" @click.self="emit('close')">
        <button class="lightbox-close" type="button" aria-label="Close image viewer" @click="emit('close')">×</button>
        <figure>
          <div class="lightbox-image-stage">
            <img :src="image.src" :alt="image.alt" />
          </div>
          <figcaption>
            <p class="eyebrow">Image</p>
            <h2>{{ image.title }}</h2>
            <p v-if="image.alt && image.alt !== image.title">{{ image.alt }}</p>
            <dl v-if="sourcePage">
              <div><dt>Appears in</dt><dd>{{ sourcePage.title }}</dd></div>
              <div><dt>Source file</dt><dd><code>{{ sourcePage.sourceFile }}</code></dd></div>
            </dl>
            <section v-if="relatedPages.length" class="image-related">
              <h3>Related pages</h3>
              <button v-for="page in relatedPages" :key="page.id" type="button" @click="emit('navigate', page.id)">
                {{ page.title }}
              </button>
            </section>
          </figcaption>
        </figure>
      </div>
    </Transition>
  </Teleport>
</template>
