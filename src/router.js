import { createRouter, createWebHashHistory } from 'vue-router';
import ReaderView from './views/ReaderView.vue';
import AboutView from './views/AboutView.vue';
export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', redirect: '/about' },
        { path: '/about', name: 'about', component: AboutView },
        { path: '/read/:pageId', name: 'reader', component: ReaderView },
    ],
    scrollBehavior(to, from) {
        if (to.params.pageId !== from.params.pageId)
            return { top: 0 };
        return false;
    },
});
