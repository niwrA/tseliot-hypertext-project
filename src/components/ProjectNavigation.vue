<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { Manifest, ManifestPage } from '../types/content'
const props=defineProps<{manifest:Manifest|null}>(); const emit=defineEmits<{close:[];navigate:[id:string]}>()
const groups=computed(()=>{
 const pages=props.manifest?.pages??[]
 const selected:Record<string,ManifestPage[]>={
  'Works':pages.filter(p=>p.type==='annotated-text'),
  'Other poems and reading pages':pages.filter(p=>p.type==='reading-page'||p.type==='main-text'),
  'Essays and sources':pages.filter(p=>p.type==='source-page'&&!p.sourceFile.toLowerCase().includes('_notes/')),
  'Project':pages.filter(p=>['eliot-introduction','eliot-life','eliot-works','eliot-books','eliot-credits'].includes(p.id)),
 }
 return Object.entries(selected).map(([title,items])=>[title,items.slice(0,title==='Essays and sources'?40:80)] as const).filter(([,items])=>items.length)
})
</script>
<template><aside class="navigation-panel"><header><div><p class="eyebrow">Browse</p><h2>Project contents</h2></div><button class="icon-button" @click="emit('close')">×</button></header><div class="navigation-groups"><section class="navigation-about"><h3>About</h3><RouterLink to="/about" @click="emit('close')">About this project</RouterLink></section><section v-for="[title,items] in groups" :key="title"><h3>{{ title }}</h3><button v-for="item in items" :key="item.id" @click="emit('navigate',item.id)">{{ item.title }}</button></section></div></aside></template>
