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
if (__VLS_ctx.page && __VLS_ctx.position) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.aside, __VLS_intrinsics.aside)({
        ...{ onMouseenter: (undefined) },
        ...{ onMouseleave: (...[$event]) => {
                if (!(__VLS_ctx.page && __VLS_ctx.position))
                    throw 0;
                return (__VLS_ctx.emit('close'));
                // @ts-ignore
                [page, position, emit,];
            } },
        ...{ class: "annotation-preview" },
        ...{ style: ({ left: `${__VLS_ctx.position.left}px`, top: `${__VLS_ctx.position.top}px` }) },
    });
    /** @type {__VLS_StyleScopedClasses['annotation-preview']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "eyebrow" },
    });
    /** @type {__VLS_StyleScopedClasses['eyebrow']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
    (__VLS_ctx.page.title);
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    (__VLS_ctx.page.text.slice(0, 280));
    (__VLS_ctx.page.text.length > 280 ? '…' : '');
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.page && __VLS_ctx.position))
                    throw 0;
                return (__VLS_ctx.emit('open', __VLS_ctx.page.id));
                // @ts-ignore
                [page, page, page, page, position, position, emit,];
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
