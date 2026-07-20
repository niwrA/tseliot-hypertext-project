<script setup lang="ts">
import type { ContentPage, ManifestPage } from '../types/content'
import type { OpenImagePayload } from './LegacyContent.vue'
import LegacyContent from './LegacyContent.vue'

defineProps<{ page: ContentPage | null; backlinkPages: ManifestPage[]; pinned: boolean; pageTypes?: Record<string,string> }>()
const emit = defineEmits<{
  close: []
  togglePin: []
  navigate: [pageId: string]
  openAnnotation: [pageId: string]
  previewAnnotation: [pageId: string, anchor: HTMLElement]
  closeAnnotationPreview: []
  openImage: [image: OpenImagePayload]
  previewImage: [image: OpenImagePayload, anchor: HTMLElement]
  closeImagePreview: []
  openImageWrapper: [pageId: string]
  previewImageWrapper: [pageId: string, anchor: HTMLElement]
}>()

function forwardPreview(pageId: string, anchor: HTMLElement) {
  emit('previewAnnotation', pageId, anchor)
}
</script>

<template>
  <Transition name="drawer">
    <aside v-if="page" class="annotation-drawer" aria-label="Annotation" aria-live="polite">
      <header class="drawer-header">
        <div>
          <p class="eyebrow">Annotation</p>
          <h2>{{ page.title }}</h2>
        </div>
        <div class="drawer-actions">
          <button class="pin-button" type="button" :aria-pressed="pinned" @click="emit('togglePin')">
            {{ pinned ? 'Pinned' : 'Pin' }}
          </button>
          <button class="icon-button" type="button" aria-label="Close annotation" @click="emit('close')">×</button>
        </div>
      </header>

      <div class="drawer-body">
        <LegacyContent
          :page="page"
          :page-types="pageTypes"
          @navigate="emit('navigate', $event)"
          @open-annotation="emit('openAnnotation', $event)"
          @preview-annotation="forwardPreview"
          @close-annotation-preview="emit('closeAnnotationPreview')"
          @open-image="emit('openImage', $event)"
          @preview-image="(image, anchor) => emit('previewImage', image, anchor)"
          @close-image-preview="emit('closeImagePreview')"
          @open-image-wrapper="emit('openImageWrapper', $event)"
          @preview-image-wrapper="(pageId, anchor) => emit('previewImageWrapper', pageId, anchor)"
        />

        <section v-if="backlinkPages.length" class="backlinks">
          <h3>Mentioned from</h3>
          <button v-for="backlink in backlinkPages" :key="backlink.id" type="button" @click="emit('navigate', backlink.id)">
            {{ backlink.title }}
          </button>
        </section>
      </div>

      <footer class="provenance">
        <span>Imported from</span>
        <code>{{ page.sourceFile }}</code>
      </footer>
    </aside>
  </Transition>
</template>
