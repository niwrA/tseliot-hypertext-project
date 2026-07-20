const __VLS_props = defineProps();
const emit = defineEmits();
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
if (__VLS_ctx.image) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.aside, __VLS_intrinsics.aside)({
        ...{ class: "annotation-drawer image-drawer" },
        'aria-label': "Image details",
    });
    /** @type {__VLS_StyleScopedClasses['annotation-drawer']} */ ;
    /** @type {__VLS_StyleScopedClasses['image-drawer']} */ ;
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
    (__VLS_ctx.image.title);
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.image))
                    throw 0;
                return (__VLS_ctx.emit('close'));
                // @ts-ignore
                [image, image, emit,];
            } },
        ...{ class: "icon-button" },
        type: "button",
        'aria-label': "Close image",
    });
    /** @type {__VLS_StyleScopedClasses['icon-button']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "drawer-body" },
    });
    /** @type {__VLS_StyleScopedClasses['drawer-body']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.image))
                    throw 0;
                return (__VLS_ctx.emit('fullscreen', __VLS_ctx.image));
                // @ts-ignore
                [image, emit,];
            } },
        ...{ class: "drawer-image-stage" },
        type: "button",
        'aria-label': "Open full-screen image",
    });
    /** @type {__VLS_StyleScopedClasses['drawer-image-stage']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.img)({
        src: (__VLS_ctx.image.src),
        alt: (__VLS_ctx.image.alt),
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "image-metadata" },
    });
    /** @type {__VLS_StyleScopedClasses['image-metadata']} */ ;
    if (__VLS_ctx.image.alt && __VLS_ctx.image.alt !== __VLS_ctx.image.title) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
        (__VLS_ctx.image.alt);
    }
    if (__VLS_ctx.sourcePage) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.dl, __VLS_intrinsics.dl)({});
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
        __VLS_asFunctionalElement1(__VLS_intrinsics.dt, __VLS_intrinsics.dt)({});
        __VLS_asFunctionalElement1(__VLS_intrinsics.dd, __VLS_intrinsics.dd)({});
        (__VLS_ctx.sourcePage.title);
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
        __VLS_asFunctionalElement1(__VLS_intrinsics.dt, __VLS_intrinsics.dt)({});
        __VLS_asFunctionalElement1(__VLS_intrinsics.dd, __VLS_intrinsics.dd)({});
        __VLS_asFunctionalElement1(__VLS_intrinsics.code, __VLS_intrinsics.code)({});
        (__VLS_ctx.sourcePage.sourceFile);
    }
    if (__VLS_ctx.relatedPages.length) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
            ...{ class: "backlinks" },
        });
        /** @type {__VLS_StyleScopedClasses['backlinks']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
        for (const [page] of __VLS_vFor((__VLS_ctx.relatedPages))) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
                ...{ onClick: (...[$event]) => {
                        if (!(__VLS_ctx.image))
                            throw 0;
                        if (!(__VLS_ctx.relatedPages.length))
                            throw 0;
                        return (__VLS_ctx.emit('navigate', page.id));
                        // @ts-ignore
                        [image, image, image, image, image, image, emit, sourcePage, sourcePage, sourcePage, relatedPages, relatedPages,];
                    } },
                key: (page.id),
                type: "button",
            });
            (page.title);
            // @ts-ignore
            [];
        }
    }
}
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
