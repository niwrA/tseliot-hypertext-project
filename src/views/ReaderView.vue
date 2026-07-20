<script setup lang="ts">
import { computed,onMounted,ref,watch } from 'vue'
import { useRoute,useRouter } from 'vue-router'
import AnnotationDrawer from '../components/AnnotationDrawer.vue'
import AnnotationPreview from '../components/AnnotationPreview.vue'
import ImageDrawer from '../components/ImageDrawer.vue'
import ImageLightbox from '../components/ImageLightbox.vue'
import ImagePreview from '../components/ImagePreview.vue'
import LegacyContent,{type OpenImagePayload} from '../components/LegacyContent.vue'
import ProjectNavigation from '../components/ProjectNavigation.vue'
import ProjectSearch from '../components/ProjectSearch.vue'
import {useContent} from '../composables/useContent'
import type {ContentPage,Manifest,ManifestPage} from '../types/content'
const route=useRoute(),router=useRouter(); const {loadManifest,loadPage}=useContent()
const manifest=ref<Manifest|null>(null),page=ref<ContentPage|null>(null),annotation=ref<ContentPage|null>(null),annotationPreview=ref<ContentPage|null>(null)
const activeImage=ref<OpenImagePayload|null>(null),fullscreenImage=ref<OpenImagePayload|null>(null),imagePreview=ref<OpenImagePayload|null>(null)
const previewPosition=ref<{left:number;top:number}|null>(null),imagePreviewPosition=ref<{left:number;top:number}|null>(null)
const loading=ref(true),error=ref(''),searchOpen=ref(false),navigationOpen=ref(false),drawerPinned=ref(localStorage.getItem('eliot.annotationPinned')==='true'); let previewRequest=0
const pageId=computed(()=>String(route.params.pageId??'burbank-notes-burbank-a')),annotationId=computed(()=>typeof route.query.note==='string'?route.query.note:'')
const pageTypes=computed<Record<string,string>>(()=>Object.fromEntries((manifest.value?.pages??[]).map(p=>[p.id,p.type])))
const backlinkPages=computed(()=>pagesFor(annotation.value?.backlinks??[])),currentManifestPage=computed(()=>manifest.value?.pages.find(x=>x.id===page.value?.id)??null)
const imageRelatedPages=computed(()=>{if(!activeImage.value||!manifest.value)return[];const ids=new Set<string>();if(activeImage.value.linkedPageId)ids.add(activeImage.value.linkedPageId);for(const id of page.value?.backlinks??[])ids.add(id);return manifest.value.pages.filter(x=>ids.has(x.id)).slice(0,12)})
function pagesFor(ids:string[]){if(!manifest.value)return[];const set=new Set(ids);return manifest.value.pages.filter(x=>set.has(x.id))}
async function loadCurrentPage(){loading.value=true;error.value='';try{page.value=await loadPage(pageId.value);annotation.value=annotationId.value?await loadPage(annotationId.value):null}catch(e){error.value=e instanceof Error?e.message:'Unable to load this page.'}finally{loading.value=false}}
function navigate(id:string){activeImage.value=null;fullscreenImage.value=null;navigationOpen.value=false;annotationPreview.value=null;const query=drawerPinned.value&&annotationId.value?{note:annotationId.value}:undefined;router.push({name:'reader',params:{pageId:id},query})}
function openAnnotation(id:string){activeImage.value=null;annotationPreview.value=null;router.push({query:{...route.query,note:id}})}
function closeAnnotation(){const q={...route.query};delete q.note;router.push({query:q})}
function togglePin(){drawerPinned.value=!drawerPinned.value;localStorage.setItem('eliot.annotationPinned',String(drawerPinned.value))}
function positionFor(anchor:HTMLElement,width:number,height:number){const r=anchor.getBoundingClientRect();return{left:Math.max(12,Math.min(innerWidth-width-12,r.left+r.width/2-width/2)),top:Math.max(12,Math.min(innerHeight-height-12,r.bottom+10))}}
async function previewAnnotation(id:string,anchor:HTMLElement){if(annotationId.value===id)return;const request=++previewRequest;previewPosition.value=positionFor(anchor,340,220);try{const candidate=await loadPage(id);if(request===previewRequest)annotationPreview.value=candidate}catch{if(request===previewRequest)annotationPreview.value=null}}
function closeAnnotationPreview(){previewRequest++;setTimeout(()=>{annotationPreview.value=null;previewPosition.value=null},120)}
function assetUrlFor(sourceFile:string,src:string){const clean=decodeURIComponent(src).replace(/\\/g,'/').split(/[?#]/)[0];const marker=clean.toLowerCase().lastIndexOf('/images/');if(marker>=0){const path=clean.slice(marker+1);return `./content/assets/${path.split('/').map(encodeURIComponent).join('/')}`}if(clean.toLowerCase().startsWith('images/'))return `./content/assets/${clean.split('/').map(encodeURIComponent).join('/')}`;const dir=sourceFile.includes('/')?sourceFile.slice(0,sourceFile.lastIndexOf('/')+1):'';const out:string[]=[];for(const part of `${dir}${clean}`.split('/')){if(!part||part==='.')continue;if(part==='..')out.pop();else out.push(part)}return `./content/assets/${out.map(encodeURIComponent).join('/')}`}
async function imageFromWrapper(id:string):Promise<OpenImagePayload|null>{try{const wrapper=await loadPage(id);const image=wrapper.images?.[0];if(!image)return null;return{src:assetUrlFor(wrapper.sourceFile,image.path??image.src??''),alt:image.alt||wrapper.title||'Project image',title:wrapper.title||image.alt||'Project image',linkedPageId:id}}catch{return null}}
function previewImage(image:OpenImagePayload,anchor:HTMLElement){annotationPreview.value=null;imagePreview.value=image;imagePreviewPosition.value=positionFor(anchor,320,230)}
async function previewImageWrapper(id:string,anchor:HTMLElement){const request=++previewRequest;const image=await imageFromWrapper(id);if(request===previewRequest&&image)previewImage(image,anchor)}
async function openImageWrapper(id:string){const image=await imageFromWrapper(id);if(image)openImage(image)}
function closeImagePreview(){setTimeout(()=>{imagePreview.value=null;imagePreviewPosition.value=null},100)}
function openImage(image:OpenImagePayload){activeImage.value=image;imagePreview.value=null;annotationPreview.value=null;if(annotationId.value)closeAnnotation()}
onMounted(async()=>{manifest.value=await loadManifest();await loadCurrentPage()});watch([pageId,annotationId],loadCurrentPage)
</script>
<template><div class="reader-shell">
<header class="site-header"><button class="menu-button" type="button" @click="navigationOpen=true" aria-label="Browse project">☰</button><div class="brand"><p class="eyebrow">Modern edition · preserved source</p><h1>T. S. Eliot Hypertext Project</h1></div><button type="button" class="search-button" @click="searchOpen=!searchOpen">{{searchOpen?'Close search':'Search'}}</button></header>
<ProjectSearch v-if="searchOpen" @close="searchOpen=false" />
<ProjectNavigation v-if="navigationOpen" :manifest="manifest" @close="navigationOpen=false" @navigate="navigate" />
<main class="reader-main"><section v-if="loading" class="status">Loading…</section><section v-else-if="error" class="status error">{{error}}</section><article v-else-if="page" class="reading-card"><header class="page-header"><p class="eyebrow">{{page.type.replace('-',' ')}}</p><h2>{{page.title}}</h2></header><LegacyContent :page="page" :page-types="pageTypes" @open-annotation="openAnnotation" @preview-annotation="previewAnnotation" @close-annotation-preview="closeAnnotationPreview" @navigate="navigate" @open-image="openImage" @preview-image="previewImage" @close-image-preview="closeImagePreview" @open-image-wrapper="openImageWrapper" @preview-image-wrapper="previewImageWrapper"/><footer class="page-footer"><div><span>Source</span><code>{{page.sourceFile}}</code></div><div><span>Edition</span><strong>{{page.provenance.edition}}</strong></div></footer></article></main>
<AnnotationPreview :page="annotationPreview" :position="previewPosition" @open="openAnnotation" @close="closeAnnotationPreview"/>
<ImagePreview :image="imagePreview" :position="imagePreviewPosition" @open="openImage" @close="closeImagePreview"/>
<AnnotationDrawer :page="annotation" :page-types="pageTypes" :backlink-pages="backlinkPages" :pinned="drawerPinned" @close="closeAnnotation" @toggle-pin="togglePin" @navigate="navigate" @open-annotation="openAnnotation" @preview-annotation="previewAnnotation" @close-annotation-preview="closeAnnotationPreview" @open-image="openImage" @preview-image="previewImage" @close-image-preview="closeImagePreview" @open-image-wrapper="openImageWrapper" @preview-image-wrapper="previewImageWrapper"/>
<ImageDrawer :image="activeImage" :source-page="currentManifestPage" :related-pages="imageRelatedPages" @close="activeImage=null" @fullscreen="fullscreenImage=$event" @navigate="navigate"/>
<ImageLightbox :image="fullscreenImage" :source-page="currentManifestPage" :related-pages="imageRelatedPages" @close="fullscreenImage=null" @navigate="navigate"/>
</div></template>
