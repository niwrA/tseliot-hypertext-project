import { onBeforeUnmount, onMounted } from 'vue';
const props = defineProps();
const emit = defineEmits();
function onKeydown(event) {
    if (event.key === 'Escape' && props.image)
        emit('close');
}
onMounted(() => window.addEventListener('keydown', onKeydown));
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown));
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
/** @ts-ignore @type { | typeof __VLS_components.Teleport | typeof __VLS_components.Teleport} */
Teleport;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    to: "body",
}));
const __VLS_2 = __VLS_1({
    to: "body",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
let __VLS_6;
/** @ts-ignore @type { | typeof __VLS_components.Transition | typeof __VLS_components.Transition} */
Transition;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
    name: "lightbox",
}));
const __VLS_8 = __VLS_7({
    name: "lightbox",
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
const { default: __VLS_11 } = __VLS_9.slots;
if (__VLS_ctx.image) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.image))
                    throw 0;
                return (__VLS_ctx.emit('close'));
                // @ts-ignore
                [image, emit,];
            } },
        ...{ class: "lightbox" },
        role: "dialog",
        'aria-modal': "true",
        'aria-label': "Image viewer",
    });
    /** @type {__VLS_StyleScopedClasses['lightbox']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.image))
                    throw 0;
                return (__VLS_ctx.emit('close'));
                // @ts-ignore
                [emit,];
            } },
        ...{ class: "lightbox-close" },
        type: "button",
        'aria-label': "Close image viewer",
    });
    /** @type {__VLS_StyleScopedClasses['lightbox-close']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.figure, __VLS_intrinsics.figure)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "lightbox-image-stage" },
    });
    /** @type {__VLS_StyleScopedClasses['lightbox-image-stage']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.img)({
        src: (__VLS_ctx.image.src),
        alt: (__VLS_ctx.image.alt),
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.figcaption, __VLS_intrinsics.figcaption)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "eyebrow" },
    });
    /** @type {__VLS_StyleScopedClasses['eyebrow']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
    (__VLS_ctx.image.title);
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
            ...{ class: "image-related" },
        });
        /** @type {__VLS_StyleScopedClasses['image-related']} */ ;
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
                        [image, image, image, image, image, image, image, emit, sourcePage, sourcePage, sourcePage, relatedPages, relatedPages,];
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
var __VLS_9;
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
