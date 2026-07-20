<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useContent } from '../composables/useContent'
import type { SearchEntry } from '../types/content'
const emit=defineEmits<{close:[]}>(); const router=useRouter(); const {loadSearchIndex}=useContent()
const query=ref(''); const entries=ref<SearchEntry[]>([]); const loading=ref(true)
loadSearchIndex().then(v=>{entries.value=v;loading.value=false})
function snippet(entry:SearchEntry,terms:string[]){ const text=entry.text.replace(/\s+/g,' ').trim(); const lower=text.toLowerCase(); const at=Math.max(0,...terms.map(t=>lower.indexOf(t)).filter(n=>n>=0)); const start=Math.max(0,at-75); return `${start?'…':''}${text.slice(start,start+210)}${start+210<text.length?'…':''}` }
const results=computed(()=>{
 const terms=query.value.toLowerCase().trim().split(/\s+/).filter(Boolean); if(!terms.length)return []
 return entries.value.map(entry=>{const title=entry.title.toLowerCase(),text=entry.text.toLowerCase(); let score=0; for(const term of terms){if(title===term)score+=12;else if(title.includes(term))score+=7;if(text.includes(term))score+=2} return {entry,score,snippet:snippet(entry,terms)}}).filter(x=>x.score>=terms.length*2).sort((a,b)=>b.score-a.score).slice(0,40)
})
function open(entry:SearchEntry){router.push({name:'reader',params:{pageId:entry.id}});emit('close')}
watch(query,v=>{if(v.length>200)query.value=v.slice(0,200)})
</script>
<template><section class="search-panel" aria-label="Project search"><div class="search-inner"><label for="project-search">Search the project</label><input id="project-search" v-model="query" type="search" autofocus placeholder="Poem, person, place, phrase…"><p v-if="loading" class="muted">Loading search index…</p><p v-else-if="query&&!results.length" class="muted">No matching pages.</p><ul v-else class="search-results"><li v-for="result in results" :key="result.entry.id"><button type="button" @click="open(result.entry)"><span class="search-result-heading"><strong>{{ result.entry.title }}</strong><small>{{ result.entry.type.replace('-', ' ') }}</small></span><span class="search-snippet">{{ result.snippet }}</span></button></li></ul></div></section></template>
