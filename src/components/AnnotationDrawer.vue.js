import LegacyContent from './LegacyContent.vue';
const __VLS_props = defineProps();
const emit = defineEmits();
function forwardPreview(pageId, anchor) {
    emit('previewAnnotation', pageId, anchor);
}
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
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.Transition | typeof __VLS_components.Transition} */
Transition;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    name: "drawer",
}));
const __VLS_2 = __VLS_1({
    name: "drawer",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
if (__VLS_ctx.page) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.aside, __VLS_intrinsics.aside)({
        ...{ class: "annotation-drawer" },
        'aria-label': "Annotation",
        'aria-live': "polite",
    });
    /** @type {__VLS_StyleScopedClasses['annotation-drawer']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.header, __VLS_intrinsics.header)({
        ...{ class: "drawer-header" },
    });
    /** @type {__VLS_StyleScopedClasses['drawer-header']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "eyebrow" },
    });
    /** @type {__VLS_StyleScopedClasses['eyebrow']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
    (__VLS_ctx.page.title);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "drawer-actions" },
    });
    /** @type {__VLS_StyleScopedClasses['drawer-actions']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.page))
                    throw 0;
                return (__VLS_ctx.emit('togglePin'));
                // @ts-ignore
                [page, page, emit,];
            } },
        ...{ class: "pin-button" },
        type: "button",
        'aria-pressed': (__VLS_ctx.pinned),
    });
    /** @type {__VLS_StyleScopedClasses['pin-button']} */ ;
    (__VLS_ctx.pinned ? 'Pinned' : 'Pin');
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.page))
                    throw 0;
                return (__VLS_ctx.emit('close'));
                // @ts-ignore
                [emit, pinned, pinned,];
            } },
        ...{ class: "icon-button" },
        type: "button",
        'aria-label': "Close annotation",
    });
    /** @type {__VLS_StyleScopedClasses['icon-button']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "drawer-body" },
    });
    /** @type {__VLS_StyleScopedClasses['drawer-body']} */ ;
    const __VLS_6 = LegacyContent;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
        ...{ 'onNavigate': {} },
        ...{ 'onOpenAnnotation': {} },
        ...{ 'onPreviewAnnotation': {} },
        ...{ 'onCloseAnnotationPreview': {} },
        ...{ 'onOpenImage': {} },
        ...{ 'onPreviewImage': {} },
        ...{ 'onCloseImagePreview': {} },
        ...{ 'onOpenImageWrapper': {} },
        ...{ 'onPreviewImageWrapper': {} },
        page: (__VLS_ctx.page),
        pageTypes: (__VLS_ctx.pageTypes),
    }));
    const __VLS_8 = __VLS_7({
        ...{ 'onNavigate': {} },
        ...{ 'onOpenAnnotation': {} },
        ...{ 'onPreviewAnnotation': {} },
        ...{ 'onCloseAnnotationPreview': {} },
        ...{ 'onOpenImage': {} },
        ...{ 'onPreviewImage': {} },
        ...{ 'onCloseImagePreview': {} },
        ...{ 'onOpenImageWrapper': {} },
        ...{ 'onPreviewImageWrapper': {} },
        page: (__VLS_ctx.page),
        pageTypes: (__VLS_ctx.pageTypes),
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    let __VLS_11;
    const __VLS_12 = {
        /** @type {typeof __VLS_11.navigate} */
        onNavigate: (...[$event]) => {
            if (!(__VLS_ctx.page))
                throw 0;
            return (__VLS_ctx.emit('navigate', $event));
            // @ts-ignore
            [page, emit, pageTypes,];
        },
    };
    const __VLS_13 = {
        /** @type {typeof __VLS_11.openAnnotation} */
        onOpenAnnotation: (...[$event]) => {
            if (!(__VLS_ctx.page))
                throw 0;
            return (__VLS_ctx.emit('openAnnotation', $event));
            // @ts-ignore
            [emit,];
        },
    };
    const __VLS_14 = {
        /** @type {typeof __VLS_11.previewAnnotation} */
        onPreviewAnnotation: (__VLS_ctx.forwardPreview),
    };
    const __VLS_15 = {
        /** @type {typeof __VLS_11.closeAnnotationPreview} */
        onCloseAnnotationPreview: (...[$event]) => {
            if (!(__VLS_ctx.page))
                throw 0;
            return (__VLS_ctx.emit('closeAnnotationPreview'));
            // @ts-ignore
            [emit, forwardPreview,];
        },
    };
    const __VLS_16 = {
        /** @type {typeof __VLS_11.openImage} */
        onOpenImage: (...[$event]) => {
            if (!(__VLS_ctx.page))
                throw 0;
            return (__VLS_ctx.emit('openImage', $event));
            // @ts-ignore
            [emit,];
        },
    };
    const __VLS_17 = {
        /** @type {typeof __VLS_11.previewImage} */
        onPreviewImage: ((image, anchor) => __VLS_ctx.emit('previewImage', image, anchor)),
    };
    const __VLS_18 = {
        /** @type {typeof __VLS_11.closeImagePreview} */
        onCloseImagePreview: (...[$event]) => {
            if (!(__VLS_ctx.page))
                throw 0;
            return (__VLS_ctx.emit('closeImagePreview'));
            // @ts-ignore
            [emit, emit,];
        },
    };
    const __VLS_19 = {
        /** @type {typeof __VLS_11.openImageWrapper} */
        onOpenImageWrapper: (...[$event]) => {
            if (!(__VLS_ctx.page))
                throw 0;
            return (__VLS_ctx.emit('openImageWrapper', $event));
            // @ts-ignore
            [emit,];
        },
    };
    const __VLS_20 = {
        /** @type {typeof __VLS_11.previewImageWrapper} */
        onPreviewImageWrapper: ((pageId, anchor) => __VLS_ctx.emit('previewImageWrapper', pageId, anchor)),
    };
    var __VLS_9;
    var __VLS_10;
    if (__VLS_ctx.backlinkPages.length) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
            ...{ class: "backlinks" },
        });
        /** @type {__VLS_StyleScopedClasses['backlinks']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
        for (const [backlink] of __VLS_vFor((__VLS_ctx.backlinkPages))) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
                ...{ onClick: (...[$event]) => {
                        if (!(__VLS_ctx.page))
                            throw 0;
                        if (!(__VLS_ctx.backlinkPages.length))
                            throw 0;
                        return (__VLS_ctx.emit('navigate', backlink.id));
                        // @ts-ignore
                        [emit, emit, backlinkPages, backlinkPages,];
                    } },
                key: (backlink.id),
                type: "button",
            });
            (backlink.title);
            // @ts-ignore
            [];
        }
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.footer, __VLS_intrinsics.footer)({
        ...{ class: "provenance" },
    });
    /** @type {__VLS_StyleScopedClasses['provenance']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.code, __VLS_intrinsics.code)({});
    (__VLS_ctx.page.sourceFile);
}
// @ts-ignore
[page,];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
