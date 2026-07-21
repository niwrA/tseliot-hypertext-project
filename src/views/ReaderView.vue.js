import { computed, onMounted, ref, watch } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
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
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "header-actions" },
});
/** @type {__VLS_StyleScopedClasses['header-actions']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.RouterLink | typeof __VLS_components.RouterLink} */
RouterLink;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ class: "header-link" },
    to: "/about",
}));
const __VLS_2 = __VLS_1({
    ...{ class: "header-link" },
    to: "/about",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['header-link']} */ ;
const { default: __VLS_5 } = __VLS_3.slots;
// @ts-ignore
[];
var __VLS_3;
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
    const __VLS_6 = ProjectSearch;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
        ...{ 'onClose': {} },
    }));
    const __VLS_8 = __VLS_7({
        ...{ 'onClose': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    let __VLS_11;
    const __VLS_12 = {
        /** @type {typeof __VLS_11.close} */
        onClose: (...[$event]) => {
            if (!(__VLS_ctx.searchOpen))
                throw 0;
            return (__VLS_ctx.searchOpen = false);
            // @ts-ignore
            [searchOpen, searchOpen, searchOpen,];
        },
    };
    var __VLS_9;
    var __VLS_10;
}
if (__VLS_ctx.navigationOpen) {
    const __VLS_13 = ProjectNavigation;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
        ...{ 'onClose': {} },
        ...{ 'onNavigate': {} },
        manifest: (__VLS_ctx.manifest),
    }));
    const __VLS_15 = __VLS_14({
        ...{ 'onClose': {} },
        ...{ 'onNavigate': {} },
        manifest: (__VLS_ctx.manifest),
    }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    let __VLS_18;
    const __VLS_19 = {
        /** @type {typeof __VLS_18.close} */
        onClose: (...[$event]) => {
            if (!(__VLS_ctx.navigationOpen))
                throw 0;
            return (__VLS_ctx.navigationOpen = false);
            // @ts-ignore
            [navigationOpen, navigationOpen, manifest,];
        },
    };
    const __VLS_20 = {
        /** @type {typeof __VLS_18.navigate} */
        onNavigate: (__VLS_ctx.navigate),
    };
    var __VLS_16;
    var __VLS_17;
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
    const __VLS_21 = LegacyContent;
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent1(__VLS_21, new __VLS_21({
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
    const __VLS_23 = __VLS_22({
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
    }, ...__VLS_functionalComponentArgsRest(__VLS_22));
    let __VLS_26;
    const __VLS_27 = {
        /** @type {typeof __VLS_26.openAnnotation} */
        onOpenAnnotation: (__VLS_ctx.openAnnotation),
    };
    const __VLS_28 = {
        /** @type {typeof __VLS_26.previewAnnotation} */
        onPreviewAnnotation: (__VLS_ctx.previewAnnotation),
    };
    const __VLS_29 = {
        /** @type {typeof __VLS_26.closeAnnotationPreview} */
        onCloseAnnotationPreview: (__VLS_ctx.closeAnnotationPreview),
    };
    const __VLS_30 = {
        /** @type {typeof __VLS_26.navigate} */
        onNavigate: (__VLS_ctx.navigate),
    };
    const __VLS_31 = {
        /** @type {typeof __VLS_26.openImage} */
        onOpenImage: (__VLS_ctx.openImage),
    };
    const __VLS_32 = {
        /** @type {typeof __VLS_26.previewImage} */
        onPreviewImage: (__VLS_ctx.previewImage),
    };
    const __VLS_33 = {
        /** @type {typeof __VLS_26.closeImagePreview} */
        onCloseImagePreview: (__VLS_ctx.closeImagePreview),
    };
    const __VLS_34 = {
        /** @type {typeof __VLS_26.openImageWrapper} */
        onOpenImageWrapper: (__VLS_ctx.openImageWrapper),
    };
    const __VLS_35 = {
        /** @type {typeof __VLS_26.previewImageWrapper} */
        onPreviewImageWrapper: (__VLS_ctx.previewImageWrapper),
    };
    var __VLS_24;
    var __VLS_25;
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
const __VLS_36 = AnnotationPreview;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({
    ...{ 'onOpen': {} },
    ...{ 'onClose': {} },
    page: (__VLS_ctx.annotationPreview),
    position: (__VLS_ctx.previewPosition),
}));
const __VLS_38 = __VLS_37({
    ...{ 'onOpen': {} },
    ...{ 'onClose': {} },
    page: (__VLS_ctx.annotationPreview),
    position: (__VLS_ctx.previewPosition),
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
let __VLS_41;
const __VLS_42 = {
    /** @type {typeof __VLS_41.open} */
    onOpen: (__VLS_ctx.openAnnotation),
};
const __VLS_43 = {
    /** @type {typeof __VLS_41.close} */
    onClose: (__VLS_ctx.closeAnnotationPreview),
};
var __VLS_39;
var __VLS_40;
const __VLS_44 = ImagePreview;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent1(__VLS_44, new __VLS_44({
    ...{ 'onOpen': {} },
    ...{ 'onClose': {} },
    image: (__VLS_ctx.imagePreview),
    position: (__VLS_ctx.imagePreviewPosition),
}));
const __VLS_46 = __VLS_45({
    ...{ 'onOpen': {} },
    ...{ 'onClose': {} },
    image: (__VLS_ctx.imagePreview),
    position: (__VLS_ctx.imagePreviewPosition),
}, ...__VLS_functionalComponentArgsRest(__VLS_45));
let __VLS_49;
const __VLS_50 = {
    /** @type {typeof __VLS_49.open} */
    onOpen: (__VLS_ctx.openImage),
};
const __VLS_51 = {
    /** @type {typeof __VLS_49.close} */
    onClose: (__VLS_ctx.closeImagePreview),
};
var __VLS_47;
var __VLS_48;
const __VLS_52 = AnnotationDrawer;
// @ts-ignore
const __VLS_53 = __VLS_asFunctionalComponent1(__VLS_52, new __VLS_52({
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
const __VLS_54 = __VLS_53({
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
}, ...__VLS_functionalComponentArgsRest(__VLS_53));
let __VLS_57;
const __VLS_58 = {
    /** @type {typeof __VLS_57.close} */
    onClose: (__VLS_ctx.closeAnnotation),
};
const __VLS_59 = {
    /** @type {typeof __VLS_57.togglePin} */
    onTogglePin: (__VLS_ctx.togglePin),
};
const __VLS_60 = {
    /** @type {typeof __VLS_57.navigate} */
    onNavigate: (__VLS_ctx.navigate),
};
const __VLS_61 = {
    /** @type {typeof __VLS_57.openAnnotation} */
    onOpenAnnotation: (__VLS_ctx.openAnnotation),
};
const __VLS_62 = {
    /** @type {typeof __VLS_57.previewAnnotation} */
    onPreviewAnnotation: (__VLS_ctx.previewAnnotation),
};
const __VLS_63 = {
    /** @type {typeof __VLS_57.closeAnnotationPreview} */
    onCloseAnnotationPreview: (__VLS_ctx.closeAnnotationPreview),
};
const __VLS_64 = {
    /** @type {typeof __VLS_57.openImage} */
    onOpenImage: (__VLS_ctx.openImage),
};
const __VLS_65 = {
    /** @type {typeof __VLS_57.previewImage} */
    onPreviewImage: (__VLS_ctx.previewImage),
};
const __VLS_66 = {
    /** @type {typeof __VLS_57.closeImagePreview} */
    onCloseImagePreview: (__VLS_ctx.closeImagePreview),
};
const __VLS_67 = {
    /** @type {typeof __VLS_57.openImageWrapper} */
    onOpenImageWrapper: (__VLS_ctx.openImageWrapper),
};
const __VLS_68 = {
    /** @type {typeof __VLS_57.previewImageWrapper} */
    onPreviewImageWrapper: (__VLS_ctx.previewImageWrapper),
};
var __VLS_55;
var __VLS_56;
const __VLS_69 = ImageDrawer;
// @ts-ignore
const __VLS_70 = __VLS_asFunctionalComponent1(__VLS_69, new __VLS_69({
    ...{ 'onClose': {} },
    ...{ 'onFullscreen': {} },
    ...{ 'onNavigate': {} },
    image: (__VLS_ctx.activeImage),
    sourcePage: (__VLS_ctx.currentManifestPage),
    relatedPages: (__VLS_ctx.imageRelatedPages),
}));
const __VLS_71 = __VLS_70({
    ...{ 'onClose': {} },
    ...{ 'onFullscreen': {} },
    ...{ 'onNavigate': {} },
    image: (__VLS_ctx.activeImage),
    sourcePage: (__VLS_ctx.currentManifestPage),
    relatedPages: (__VLS_ctx.imageRelatedPages),
}, ...__VLS_functionalComponentArgsRest(__VLS_70));
let __VLS_74;
const __VLS_75 = {
    /** @type {typeof __VLS_74.close} */
    onClose: (...[$event]) => {
        return (__VLS_ctx.activeImage = null);
        // @ts-ignore
        [navigate, navigate, navigate, loading, error, error, page, page, page, page, page, page, pageTypes, pageTypes, openAnnotation, openAnnotation, openAnnotation, previewAnnotation, previewAnnotation, closeAnnotationPreview, closeAnnotationPreview, closeAnnotationPreview, openImage, openImage, openImage, previewImage, previewImage, closeImagePreview, closeImagePreview, closeImagePreview, openImageWrapper, openImageWrapper, previewImageWrapper, previewImageWrapper, annotationPreview, previewPosition, imagePreview, imagePreviewPosition, annotation, backlinkPages, drawerPinned, closeAnnotation, togglePin, activeImage, activeImage, currentManifestPage, imageRelatedPages,];
    },
};
const __VLS_76 = {
    /** @type {typeof __VLS_74.fullscreen} */
    onFullscreen: (...[$event]) => {
        return (__VLS_ctx.fullscreenImage = $event);
        // @ts-ignore
        [fullscreenImage,];
    },
};
const __VLS_77 = {
    /** @type {typeof __VLS_74.navigate} */
    onNavigate: (__VLS_ctx.navigate),
};
var __VLS_72;
var __VLS_73;
const __VLS_78 = ImageLightbox;
// @ts-ignore
const __VLS_79 = __VLS_asFunctionalComponent1(__VLS_78, new __VLS_78({
    ...{ 'onClose': {} },
    ...{ 'onNavigate': {} },
    image: (__VLS_ctx.fullscreenImage),
    sourcePage: (__VLS_ctx.currentManifestPage),
    relatedPages: (__VLS_ctx.imageRelatedPages),
}));
const __VLS_80 = __VLS_79({
    ...{ 'onClose': {} },
    ...{ 'onNavigate': {} },
    image: (__VLS_ctx.fullscreenImage),
    sourcePage: (__VLS_ctx.currentManifestPage),
    relatedPages: (__VLS_ctx.imageRelatedPages),
}, ...__VLS_functionalComponentArgsRest(__VLS_79));
let __VLS_83;
const __VLS_84 = {
    /** @type {typeof __VLS_83.close} */
    onClose: (...[$event]) => {
        return (__VLS_ctx.fullscreenImage = null);
        // @ts-ignore
        [navigate, currentManifestPage, imageRelatedPages, fullscreenImage, fullscreenImage,];
    },
};
const __VLS_85 = {
    /** @type {typeof __VLS_83.navigate} */
    onNavigate: (__VLS_ctx.navigate),
};
var __VLS_81;
var __VLS_82;
// @ts-ignore
[navigate,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
