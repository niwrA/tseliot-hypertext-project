import { createRouter, createWebHashHistory } from 'vue-router'
import ReaderView from './views/ReaderView.vue'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/read/burbank-notes-burbank-a' },
    { path: '/read/:pageId', name: 'reader', component: ReaderView },
  ],
  scrollBehavior(to, from) {
    if (to.params.pageId !== from.params.pageId) return { top: 0 }
    return false
  },
})
