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
    name: "preview",
}));
const __VLS_2 = __VLS_1({
    name: "preview",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
if (__VLS_ctx.image && __VLS_ctx.position) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.aside, __VLS_intrinsics.aside)({
        ...{ onMouseleave: (...[$event]) => {
                if (!(__VLS_ctx.image && __VLS_ctx.position))
                    throw 0;
                return (__VLS_ctx.emit('close'));
                // @ts-ignore
                [image, position, emit,];
            } },
        ...{ class: "image-preview" },
        ...{ style: ({ left: `${__VLS_ctx.position.left}px`, top: `${__VLS_ctx.position.top}px` }) },
    });
    /** @type {__VLS_StyleScopedClasses['image-preview']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.img)({
        src: (__VLS_ctx.image.src),
        alt: (__VLS_ctx.image.alt),
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "eyebrow" },
    });
    /** @type {__VLS_StyleScopedClasses['eyebrow']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
    (__VLS_ctx.image.title);
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.image && __VLS_ctx.position))
                    throw 0;
                return (__VLS_ctx.emit('open', __VLS_ctx.image));
                // @ts-ignore
                [image, image, image, image, position, position, emit,];
            } },
        type: "button",
    });
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
