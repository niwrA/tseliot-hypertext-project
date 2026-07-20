import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
const props = defineProps();
const emit = defineEmits();
const root = ref(null);
let previewTimer;
function normalize(value) { return decodeURIComponent(value).replace(/\\/g, '/').replace(/^\.\//, '').split('#')[0].toLocaleLowerCase(); }
function linkForHref(href) {
    const n = normalize(href);
    return props.page.links.find(link => [link.path, link.resolvedPath, link.href].filter((v) => Boolean(v)).some(v => {
        const x = normalize(v);
        return x === n || n.endsWith(`/${x}`) || x.endsWith(`/${n}`);
    }));
}
function assetUrl(src) {
    const clean = decodeURIComponent(src).replace(/\\/g, '/').split(/[?#]/)[0];
    const imageMarker = clean.toLowerCase().lastIndexOf('/images/');
    if (imageMarker >= 0) {
        const imagePath = clean.slice(imageMarker + 1);
        return `./content/assets/${imagePath.split('/').map(encodeURIComponent).join('/')}`;
    }
    if (clean.toLowerCase().startsWith('images/')) {
        return `./content/assets/${clean.split('/').map(encodeURIComponent).join('/')}`;
    }
    const dir = props.page.sourceFile.includes('/') ? props.page.sourceFile.slice(0, props.page.sourceFile.lastIndexOf('/') + 1) : '';
    const out = [];
    for (const part of `${dir}${clean}`.split('/')) {
        if (!part || part === '.')
            continue;
        if (part === '..')
            out.pop();
        else
            out.push(part);
    }
    return `./content/assets/${out.map(encodeURIComponent).join('/')}`;
}
function iconKind(src) {
    const name = src.replace(/\\/g, '/').split('/').pop()?.toLowerCase() || '';
    if (name.startsWith('arrowl'))
        return { text: '←', label: 'Previous' };
    if (name.startsWith('arrow'))
        return { text: '→', label: 'Continue' };
    if (name === 'r.gif')
        return { text: 'R', label: 'Reference' };
    if (name === 'a.gif')
        return { text: 'A', label: 'Annotation' };
    if (name === 't.gif')
        return { text: 'T', label: 'Translation' };
    return null;
}
function imagePayload(image) {
    const parent = image.closest('a');
    return { src: image.currentSrc || image.src, alt: image.alt || 'Project image', title: image.title || image.alt || props.page.title, linkedPageId: image.dataset.linkedPageId || parent?.dataset.pageId };
}
async function enhanceContent() {
    await nextTick();
    if (!root.value)
        return;
    root.value.querySelectorAll('img[src]').forEach(image => {
        const original = image.getAttribute('src') ?? '';
        const icon = iconKind(original);
        if (icon) {
            const span = document.createElement('span');
            span.className = `legacy-marker legacy-marker-${icon.text === 'R' ? 'reference' : icon.text === 'A' ? 'annotation' : icon.text === 'T' ? 'translation' : 'arrow'}`;
            span.textContent = icon.text;
            span.setAttribute('role', 'img');
            span.setAttribute('aria-label', image.alt || icon.label);
            span.title = image.alt || icon.label;
            image.replaceWith(span);
            return;
        }
        if (original && !/^(data:|https?:|\/\/)/i.test(original))
            image.src = assetUrl(original);
        image.loading = 'lazy';
        image.tabIndex = 0;
        image.classList.add('inspectable-image');
        image.dataset.originalSrc = original;
        const parent = image.closest('a[href]');
        const linked = parent ? linkForHref(parent.getAttribute('href') ?? '') : undefined;
        if (linked?.pageId)
            image.dataset.linkedPageId = linked.pageId;
    });
    root.value.querySelectorAll('a[href]').forEach(anchor => {
        const href = anchor.getAttribute('href') ?? '';
        const link = linkForHref(href);
        if (link?.pageId) {
            anchor.dataset.pageId = link.pageId;
            anchor.dataset.pageType = props.pageTypes?.[link.pageId] ?? (link.pageId.includes('-notes-') && link.pageId.endsWith('-n') ? 'annotation' : 'internal');
        }
        else if (/^https?:/i.test(href)) {
            anchor.target = '_blank';
            anchor.rel = 'noopener noreferrer';
        }
    });
}
function handleClick(event) {
    const target = event.target;
    const image = target.closest('img.inspectable-image');
    if (image) {
        event.preventDefault();
        emit('openImage', imagePayload(image));
        return;
    }
    const anchor = target.closest('a');
    if (!anchor?.dataset.pageId)
        return;
    event.preventDefault();
    if (anchor.dataset.pageType === 'annotation')
        emit('openAnnotation', anchor.dataset.pageId);
    else if (anchor.dataset.pageType === 'image-wrapper')
        emit('openImageWrapper', anchor.dataset.pageId);
    else
        emit('navigate', anchor.dataset.pageId);
}
function handleKeydown(event) { if (!['Enter', ' '].includes(event.key))
    return; const image = event.target.closest('img.inspectable-image'); if (image) {
    event.preventDefault();
    emit('openImage', imagePayload(image));
} }
function handlePointerOver(event) {
    if (event.pointerType === 'touch')
        return;
    const target = event.target;
    const image = target.closest('img.inspectable-image');
    clearTimeout(previewTimer);
    if (image) {
        previewTimer = setTimeout(() => emit('previewImage', imagePayload(image), image), 220);
        return;
    }
    const imageLink = target.closest('a[data-page-type="image-wrapper"]');
    if (imageLink?.dataset.pageId) {
        previewTimer = setTimeout(() => emit('previewImageWrapper', imageLink.dataset.pageId, imageLink), 220);
        return;
    }
    const anchor = target.closest('a[data-page-type="annotation"]');
    if (anchor?.dataset.pageId)
        previewTimer = setTimeout(() => emit('previewAnnotation', anchor.dataset.pageId, anchor), 220);
}
function handlePointerOut(event) {
    const target = event.target;
    const related = event.relatedTarget;
    const image = target.closest('img.inspectable-image');
    if (image && (!related || !image.contains(related))) {
        clearTimeout(previewTimer);
        emit('closeImagePreview');
    }
    const imageLink = target.closest('a[data-page-type="image-wrapper"]');
    if (imageLink && (!related || !imageLink.contains(related))) {
        clearTimeout(previewTimer);
        emit('closeImagePreview');
    }
    const anchor = target.closest('a[data-page-type="annotation"]');
    if (anchor && (!related || !anchor.contains(related))) {
        clearTimeout(previewTimer);
        emit('closeAnnotationPreview');
    }
}
onMounted(enhanceContent);
watch(() => props.page.id, enhanceContent);
onBeforeUnmount(() => clearTimeout(previewTimer));
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ onClick: (__VLS_ctx.handleClick) },
    ...{ onKeydown: (__VLS_ctx.handleKeydown) },
    ...{ onPointerover: (__VLS_ctx.handlePointerOver) },
    ...{ onPointerout: (__VLS_ctx.handlePointerOut) },
    ref: "root",
    ...{ class: "legacy-content" },
});
__VLS_asFunctionalDirective(__VLS_directives.vHtml, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.page.html) }, null, null);
/** @type {__VLS_StyleScopedClasses['legacy-content']} */ ;
// @ts-ignore
[handleClick, handleKeydown, handlePointerOver, handlePointerOut, page,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
