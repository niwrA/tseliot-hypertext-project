import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AnnotationDrawer from '../components/AnnotationDrawer.vue';
import AnnotationPreview from '../components/AnnotationPreview.vue';
import ImageDrawer from '../components/ImageDrawer.vue';
import ImageLightbox from '../components/ImageLightbox.vue';
import ImagePreview from '../components/ImagePreview.vue';
import LegacyContent from '../components/LegacyContent.vue';
import ProjectNavigation from '../components/ProjectNavigation.vue';
import ProjectSearch from '../components/ProjectSearch.vue';
import { useContent } from '../composables/useContent';
const route = useRoute(), router = useRouter();
const { loadManifest, loadPage } = useContent();
const manifest = ref(null), page = ref(null), annotation = ref(null), annotationPreview = ref(null);
const activeImage = ref(null), fullscreenImage = ref(null), imagePreview = ref(null);
const previewPosition = ref(null), imagePreviewPosition = ref(null);
const loading = ref(true), error = ref(''), searchOpen = ref(false), navigationOpen = ref(false), drawerPinned = ref(localStorage.getItem('eliot.annotationPinned') === 'true');
let previewRequest = 0;
const pageId = computed(() => String(route.params.pageId ?? 'burbank-notes-burbank-a')), annotationId = computed(() => typeof route.query.note === 'string' ? route.query.note : '');
const pageTypes = computed(() => Object.fromEntries((manifest.value?.pages ?? []).map(p => [p.id, p.type])));
const backlinkPages = computed(() => pagesFor(annotation.value?.backlinks ?? [])), currentManifestPage = computed(() => manifest.value?.pages.find(x => x.id === page.value?.id) ?? null);
const imageRelatedPages = computed(() => { if (!activeImage.value || !manifest.value)
    return []; const ids = new Set(); if (activeImage.value.linkedPageId)
    ids.add(activeImage.value.linkedPageId); for (const id of page.value?.backlinks ?? [])
    ids.add(id); return manifest.value.pages.filter(x => ids.has(x.id)).slice(0, 12); });
function pagesFor(ids) { if (!manifest.value)
    return []; const set = new Set(ids); return manifest.value.pages.filter(x => set.has(x.id)); }
async function loadCurrentPage() { loading.value = true; error.value = ''; try {
    page.value = await loadPage(pageId.value);
    annotation.value = annotationId.value ? await loadPage(annotationId.value) : null;
}
catch (e) {
    error.value = e instanceof Error ? e.message : 'Unable to load this page.';
}
finally {
    loading.value = false;
} }
function navigate(id) { activeImage.value = null; fullscreenImage.value = null; navigationOpen.value = false; annotationPreview.value = null; const query = drawerPinned.value && annotationId.value ? { note: annotationId.value } : undefined; router.push({ name: 'reader', params: { pageId: id }, query }); }
function openAnnotation(id) { activeImage.value = null; annotationPreview.value = null; router.push({ query: { ...route.query, note: id } }); }
function closeAnnotation() { const q = { ...route.query }; delete q.note; router.push({ query: q }); }
function togglePin() { drawerPinned.value = !drawerPinned.value; localStorage.setItem('eliot.annotationPinned', String(drawerPinned.value)); }
function positionFor(anchor, width, height) { const r = anchor.getBoundingClientRect(); return { left: Math.max(12, Math.min(innerWidth - width - 12, r.left + r.width / 2 - width / 2)), top: Math.max(12, Math.min(innerHeight - height - 12, r.bottom + 10)) }; }
async function previewAnnotation(id, anchor) { if (annotationId.value === id)
    return; const request = ++previewRequest; previewPosition.value = positionFor(anchor, 340, 220); try {
    const candidate = await loadPage(id);
    if (request === previewRequest)
        annotationPreview.value = candidate;
}
catch {
    if (request === previewRequest)
        annotationPreview.value = null;
} }
function closeAnnotationPreview() { previewRequest++; setTimeout(() => { annotationPreview.value = null; previewPosition.value = null; }, 120); }
function assetUrlFor(sourceFile, src) { const clean = decodeURIComponent(src).replace(/\\/g, '/').split(/[?#]/)[0]; const marker = clean.toLowerCase().lastIndexOf('/images/'); if (marker >= 0) {
    const path = clean.slice(marker + 1);
    return `./content/assets/${path.split('/').map(encodeURIComponent).join('/')}`;
} if (clean.toLowerCase().startsWith('images/'))
    return `./content/assets/${clean.split('/').map(encodeURIComponent).join('/')}`; const dir = sourceFile.includes('/') ? sourceFile.slice(0, sourceFile.lastIndexOf('/') + 1) : ''; const out = []; for (const part of `${dir}${clean}`.split('/')) {
    if (!part || part === '.')
        continue;
    if (part === '..')
        out.pop();
    else
        out.push(part);
} return `./content/assets/${out.map(encodeURIComponent).join('/')}`; }
async function imageFromWrapper(id) { try {
    const wrapper = await loadPage(id);
    const image = wrapper.images?.[0];
    if (!image)
        return null;
    return { src: assetUrlFor(wrapper.sourceFile, image.path ?? image.src ?? ''), alt: image.alt || wrapper.title || 'Project image', title: wrapper.title || image.alt || 'Project image', linkedPageId: id };
}
catch {
    return null;
} }
function previewImage(image, anchor) { annotationPreview.value = null; imagePreview.value = image; imagePreviewPosition.value = positionFor(anchor, 320, 230); }
async function previewImageWrapper(id, anchor) { const request = ++previewRequest; const image = await imageFromWrapper(id); if (request === previewRequest && image)
    previewImage(image, anchor); }
async function openImageWrapper(id) { const image = await imageFromWrapper(id); if (image)
    openImage(image); }
function closeImagePreview() { setTimeout(() => { imagePreview.value = null; imagePreviewPosition.value = null; }, 100); }
function openImage(image) { activeImage.value = image; imagePreview.value = null; annotationPreview.value = null; if (annotationId.value)
    closeAnnotation(); }
onMounted(async () => { manifest.value = await loadManifest(); await loadCurrentPage(); });
watch([pageId, annotationId], loadCurrentPage);
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "reader-shell" },
});
/** @type {__VLS_StyleScopedClasses['reader-shell']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.header, __VLS_intrinsics.header)({
    ...{ class: "site-header" },
});
/** @type {__VLS_StyleScopedClasses['site-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            return (__VLS_ctx.navigationOpen = true);
            // @ts-ignore
            [navigationOpen,];
        } },
    ...{ class: "menu-button" },
    type: "button",
    'aria-label': "Browse project",
});
/** @type {__VLS_StyleScopedClasses['menu-button']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "brand" },
});
/** @type {__VLS_StyleScopedClasses['brand']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "eyebrow" },
});
/** @type {__VLS_StyleScopedClasses['eyebrow']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            return (__VLS_ctx.searchOpen = !__VLS_ctx.searchOpen);
            // @ts-ignore
            [searchOpen, searchOpen,];
        } },
    type: "button",
    ...{ class: "search-button" },
});
/** @type {__VLS_StyleScopedClasses['search-button']} */ ;
(__VLS_ctx.searchOpen ? 'Close search' : 'Search');
if (__VLS_ctx.searchOpen) {
    const __VLS_0 = ProjectSearch;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        ...{ 'onClose': {} },
    }));
    const __VLS_2 = __VLS_1({
        ...{ 'onClose': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_5;
    const __VLS_6 = {
        /** @type {typeof __VLS_5.close} */
        onClose: (...[$event]) => {
            if (!(__VLS_ctx.searchOpen))
                throw 0;
            return (__VLS_ctx.searchOpen = false);
            // @ts-ignore
            [searchOpen, searchOpen, searchOpen,];
        },
    };
    var __VLS_3;
    var __VLS_4;
}
if (__VLS_ctx.navigationOpen) {
    const __VLS_7 = ProjectNavigation;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
        ...{ 'onClose': {} },
        ...{ 'onNavigate': {} },
        manifest: (__VLS_ctx.manifest),
    }));
    const __VLS_9 = __VLS_8({
        ...{ 'onClose': {} },
        ...{ 'onNavigate': {} },
        manifest: (__VLS_ctx.manifest),
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    let __VLS_12;
    const __VLS_13 = {
        /** @type {typeof __VLS_12.close} */
        onClose: (...[$event]) => {
            if (!(__VLS_ctx.navigationOpen))
                throw 0;
            return (__VLS_ctx.navigationOpen = false);
            // @ts-ignore
            [navigationOpen, navigationOpen, manifest,];
        },
    };
    const __VLS_14 = {
        /** @type {typeof __VLS_12.navigate} */
        onNavigate: (__VLS_ctx.navigate),
    };
    var __VLS_10;
    var __VLS_11;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.main, __VLS_intrinsics.main)({
    ...{ class: "reader-main" },
});
/** @type {__VLS_StyleScopedClasses['reader-main']} */ ;
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
        ...{ class: "status" },
    });
    /** @type {__VLS_StyleScopedClasses['status']} */ ;
}
else if (__VLS_ctx.error) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
        ...{ class: "status error" },
    });
    /** @type {__VLS_StyleScopedClasses['status']} */ ;
    /** @type {__VLS_StyleScopedClasses['error']} */ ;
    (__VLS_ctx.error);
}
else if (__VLS_ctx.page) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.article, __VLS_intrinsics.article)({
        ...{ class: "reading-card" },
    });
    /** @type {__VLS_StyleScopedClasses['reading-card']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.header, __VLS_intrinsics.header)({
        ...{ class: "page-header" },
    });
    /** @type {__VLS_StyleScopedClasses['page-header']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "eyebrow" },
    });
    /** @type {__VLS_StyleScopedClasses['eyebrow']} */ ;
    (__VLS_ctx.page.type.replace('-', ' '));
    __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
    (__VLS_ctx.page.title);
    const __VLS_15 = LegacyContent;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent1(__VLS_15, new __VLS_15({
        ...{ 'onOpenAnnotation': {} },
        ...{ 'onPreviewAnnotation': {} },
        ...{ 'onCloseAnnotationPreview': {} },
        ...{ 'onNavigate': {} },
        ...{ 'onOpenImage': {} },
        ...{ 'onPreviewImage': {} },
        ...{ 'onCloseImagePreview': {} },
        ...{ 'onOpenImageWrapper': {} },
        ...{ 'onPreviewImageWrapper': {} },
        page: (__VLS_ctx.page),
        pageTypes: (__VLS_ctx.pageTypes),
    }));
    const __VLS_17 = __VLS_16({
        ...{ 'onOpenAnnotation': {} },
        ...{ 'onPreviewAnnotation': {} },
        ...{ 'onCloseAnnotationPreview': {} },
        ...{ 'onNavigate': {} },
        ...{ 'onOpenImage': {} },
        ...{ 'onPreviewImage': {} },
        ...{ 'onCloseImagePreview': {} },
        ...{ 'onOpenImageWrapper': {} },
        ...{ 'onPreviewImageWrapper': {} },
        page: (__VLS_ctx.page),
        pageTypes: (__VLS_ctx.pageTypes),
    }, ...__VLS_functionalComponentArgsRest(__VLS_16));
    let __VLS_20;
    const __VLS_21 = {
        /** @type {typeof __VLS_20.openAnnotation} */
        onOpenAnnotation: (__VLS_ctx.openAnnotation),
    };
    const __VLS_22 = {
        /** @type {typeof __VLS_20.previewAnnotation} */
        onPreviewAnnotation: (__VLS_ctx.previewAnnotation),
    };
    const __VLS_23 = {
        /** @type {typeof __VLS_20.closeAnnotationPreview} */
        onCloseAnnotationPreview: (__VLS_ctx.closeAnnotationPreview),
    };
    const __VLS_24 = {
        /** @type {typeof __VLS_20.navigate} */
        onNavigate: (__VLS_ctx.navigate),
    };
    const __VLS_25 = {
        /** @type {typeof __VLS_20.openImage} */
        onOpenImage: (__VLS_ctx.openImage),
    };
    const __VLS_26 = {
        /** @type {typeof __VLS_20.previewImage} */
        onPreviewImage: (__VLS_ctx.previewImage),
    };
    const __VLS_27 = {
        /** @type {typeof __VLS_20.closeImagePreview} */
        onCloseImagePreview: (__VLS_ctx.closeImagePreview),
    };
    const __VLS_28 = {
        /** @type {typeof __VLS_20.openImageWrapper} */
        onOpenImageWrapper: (__VLS_ctx.openImageWrapper),
    };
    const __VLS_29 = {
        /** @type {typeof __VLS_20.previewImageWrapper} */
        onPreviewImageWrapper: (__VLS_ctx.previewImageWrapper),
    };
    var __VLS_18;
    var __VLS_19;
    __VLS_asFunctionalElement1(__VLS_intrinsics.footer, __VLS_intrinsics.footer)({
        ...{ class: "page-footer" },
    });
    /** @type {__VLS_StyleScopedClasses['page-footer']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.code, __VLS_intrinsics.code)({});
    (__VLS_ctx.page.sourceFile);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
    (__VLS_ctx.page.provenance.edition);
}
const __VLS_30 = AnnotationPreview;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({
    ...{ 'onOpen': {} },
    ...{ 'onClose': {} },
    page: (__VLS_ctx.annotationPreview),
    position: (__VLS_ctx.previewPosition),
}));
const __VLS_32 = __VLS_31({
    ...{ 'onOpen': {} },
    ...{ 'onClose': {} },
    page: (__VLS_ctx.annotationPreview),
    position: (__VLS_ctx.previewPosition),
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
let __VLS_35;
const __VLS_36 = {
    /** @type {typeof __VLS_35.open} */
    onOpen: (__VLS_ctx.openAnnotation),
};
const __VLS_37 = {
    /** @type {typeof __VLS_35.close} */
    onClose: (__VLS_ctx.closeAnnotationPreview),
};
var __VLS_33;
var __VLS_34;
const __VLS_38 = ImagePreview;
// @ts-ignore
const __VLS_39 = __VLS_asFunctionalComponent1(__VLS_38, new __VLS_38({
    ...{ 'onOpen': {} },
    ...{ 'onClose': {} },
    image: (__VLS_ctx.imagePreview),
    position: (__VLS_ctx.imagePreviewPosition),
}));
const __VLS_40 = __VLS_39({
    ...{ 'onOpen': {} },
    ...{ 'onClose': {} },
    image: (__VLS_ctx.imagePreview),
    position: (__VLS_ctx.imagePreviewPosition),
}, ...__VLS_functionalComponentArgsRest(__VLS_39));
let __VLS_43;
const __VLS_44 = {
    /** @type {typeof __VLS_43.open} */
    onOpen: (__VLS_ctx.openImage),
};
const __VLS_45 = {
    /** @type {typeof __VLS_43.close} */
    onClose: (__VLS_ctx.closeImagePreview),
};
var __VLS_41;
var __VLS_42;
const __VLS_46 = AnnotationDrawer;
// @ts-ignore
const __VLS_47 = __VLS_asFunctionalComponent1(__VLS_46, new __VLS_46({
    ...{ 'onClose': {} },
    ...{ 'onTogglePin': {} },
    ...{ 'onNavigate': {} },
    ...{ 'onOpenAnnotation': {} },
    ...{ 'onPreviewAnnotation': {} },
    ...{ 'onCloseAnnotationPreview': {} },
    ...{ 'onOpenImage': {} },
    ...{ 'onPreviewImage': {} },
    ...{ 'onCloseImagePreview': {} },
    ...{ 'onOpenImageWrapper': {} },
    ...{ 'onPreviewImageWrapper': {} },
    page: (__VLS_ctx.annotation),
    pageTypes: (__VLS_ctx.pageTypes),
    backlinkPages: (__VLS_ctx.backlinkPages),
    pinned: (__VLS_ctx.drawerPinned),
}));
const __VLS_48 = __VLS_47({
    ...{ 'onClose': {} },
    ...{ 'onTogglePin': {} },
    ...{ 'onNavigate': {} },
    ...{ 'onOpenAnnotation': {} },
    ...{ 'onPreviewAnnotation': {} },
    ...{ 'onCloseAnnotationPreview': {} },
    ...{ 'onOpenImage': {} },
    ...{ 'onPreviewImage': {} },
    ...{ 'onCloseImagePreview': {} },
    ...{ 'onOpenImageWrapper': {} },
    ...{ 'onPreviewImageWrapper': {} },
    page: (__VLS_ctx.annotation),
    pageTypes: (__VLS_ctx.pageTypes),
    backlinkPages: (__VLS_ctx.backlinkPages),
    pinned: (__VLS_ctx.drawerPinned),
}, ...__VLS_functionalComponentArgsRest(__VLS_47));
let __VLS_51;
const __VLS_52 = {
    /** @type {typeof __VLS_51.close} */
    onClose: (__VLS_ctx.closeAnnotation),
};
const __VLS_53 = {
    /** @type {typeof __VLS_51.togglePin} */
    onTogglePin: (__VLS_ctx.togglePin),
};
const __VLS_54 = {
    /** @type {typeof __VLS_51.navigate} */
    onNavigate: (__VLS_ctx.navigate),
};
const __VLS_55 = {
    /** @type {typeof __VLS_51.openAnnotation} */
    onOpenAnnotation: (__VLS_ctx.openAnnotation),
};
const __VLS_56 = {
    /** @type {typeof __VLS_51.previewAnnotation} */
    onPreviewAnnotation: (__VLS_ctx.previewAnnotation),
};
const __VLS_57 = {
    /** @type {typeof __VLS_51.closeAnnotationPreview} */
    onCloseAnnotationPreview: (__VLS_ctx.closeAnnotationPreview),
};
const __VLS_58 = {
    /** @type {typeof __VLS_51.openImage} */
    onOpenImage: (__VLS_ctx.openImage),
};
const __VLS_59 = {
    /** @type {typeof __VLS_51.previewImage} */
    onPreviewImage: (__VLS_ctx.previewImage),
};
const __VLS_60 = {
    /** @type {typeof __VLS_51.closeImagePreview} */
    onCloseImagePreview: (__VLS_ctx.closeImagePreview),
};
const __VLS_61 = {
    /** @type {typeof __VLS_51.openImageWrapper} */
    onOpenImageWrapper: (__VLS_ctx.openImageWrapper),
};
const __VLS_62 = {
    /** @type {typeof __VLS_51.previewImageWrapper} */
    onPreviewImageWrapper: (__VLS_ctx.previewImageWrapper),
};
var __VLS_49;
var __VLS_50;
const __VLS_63 = ImageDrawer;
// @ts-ignore
const __VLS_64 = __VLS_asFunctionalComponent1(__VLS_63, new __VLS_63({
    ...{ 'onClose': {} },
    ...{ 'onFullscreen': {} },
    ...{ 'onNavigate': {} },
    image: (__VLS_ctx.activeImage),
    sourcePage: (__VLS_ctx.currentManifestPage),
    relatedPages: (__VLS_ctx.imageRelatedPages),
}));
const __VLS_65 = __VLS_64({
    ...{ 'onClose': {} },
    ...{ 'onFullscreen': {} },
    ...{ 'onNavigate': {} },
    image: (__VLS_ctx.activeImage),
    sourcePage: (__VLS_ctx.currentManifestPage),
    relatedPages: (__VLS_ctx.imageRelatedPages),
}, ...__VLS_functionalComponentArgsRest(__VLS_64));
let __VLS_68;
const __VLS_69 = {
    /** @type {typeof __VLS_68.close} */
    onClose: (...[$event]) => {
        return (__VLS_ctx.activeImage = null);
        // @ts-ignore
        [navigate, navigate, navigate, loading, error, error, page, page, page, page, page, page, pageTypes, pageTypes, openAnnotation, openAnnotation, openAnnotation, previewAnnotation, previewAnnotation, closeAnnotationPreview, closeAnnotationPreview, closeAnnotationPreview, openImage, openImage, openImage, previewImage, previewImage, closeImagePreview, closeImagePreview, closeImagePreview, openImageWrapper, openImageWrapper, previewImageWrapper, previewImageWrapper, annotationPreview, previewPosition, imagePreview, imagePreviewPosition, annotation, backlinkPages, drawerPinned, closeAnnotation, togglePin, activeImage, activeImage, currentManifestPage, imageRelatedPages,];
    },
};
const __VLS_70 = {
    /** @type {typeof __VLS_68.fullscreen} */
    onFullscreen: (...[$event]) => {
        return (__VLS_ctx.fullscreenImage = $event);
        // @ts-ignore
        [fullscreenImage,];
    },
};
const __VLS_71 = {
    /** @type {typeof __VLS_68.navigate} */
    onNavigate: (__VLS_ctx.navigate),
};
var __VLS_66;
var __VLS_67;
const __VLS_72 = ImageLightbox;
// @ts-ignore
const __VLS_73 = __VLS_asFunctionalComponent1(__VLS_72, new __VLS_72({
    ...{ 'onClose': {} },
    ...{ 'onNavigate': {} },
    image: (__VLS_ctx.fullscreenImage),
    sourcePage: (__VLS_ctx.currentManifestPage),
    relatedPages: (__VLS_ctx.imageRelatedPages),
}));
const __VLS_74 = __VLS_73({
    ...{ 'onClose': {} },
    ...{ 'onNavigate': {} },
    image: (__VLS_ctx.fullscreenImage),
    sourcePage: (__VLS_ctx.currentManifestPage),
    relatedPages: (__VLS_ctx.imageRelatedPages),
}, ...__VLS_functionalComponentArgsRest(__VLS_73));
let __VLS_77;
const __VLS_78 = {
    /** @type {typeof __VLS_77.close} */
    onClose: (...[$event]) => {
        return (__VLS_ctx.fullscreenImage = null);
        // @ts-ignore
        [navigate, currentManifestPage, imageRelatedPages, fullscreenImage, fullscreenImage,];
    },
};
const __VLS_79 = {
    /** @type {typeof __VLS_77.navigate} */
    onNavigate: (__VLS_ctx.navigate),
};
var __VLS_75;
var __VLS_76;
// @ts-ignore
[navigate,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
