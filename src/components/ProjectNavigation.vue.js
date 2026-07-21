import { computed } from 'vue';
import { RouterLink } from 'vue-router';
const props = defineProps();
const emit = defineEmits();
const groups = computed(() => {
    const pages = props.manifest?.pages ?? [];
    const selected = {
        'Works': pages.filter(p => p.type === 'annotated-text'),
        'Other poems and reading pages': pages.filter(p => p.type === 'reading-page' || p.type === 'main-text'),
        'Essays and sources': pages.filter(p => p.type === 'source-page' && !p.sourceFile.toLowerCase().includes('_notes/')),
        'Project': pages.filter(p => ['eliot-introduction', 'eliot-life', 'eliot-works', 'eliot-books', 'eliot-credits'].includes(p.id)),
    };
    return Object.entries(selected).map(([title, items]) => [title, items.slice(0, title === 'Essays and sources' ? 40 : 80)]).filter(([, items]) => items.length);
});
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
__VLS_asFunctionalElement1(__VLS_intrinsics.aside, __VLS_intrinsics.aside)({
    ...{ class: "navigation-panel" },
});
/** @type {__VLS_StyleScopedClasses['navigation-panel']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.header, __VLS_intrinsics.header)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "eyebrow" },
});
/** @type {__VLS_StyleScopedClasses['eyebrow']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            return (__VLS_ctx.emit('close'));
            // @ts-ignore
            [emit,];
        } },
    ...{ class: "icon-button" },
});
/** @type {__VLS_StyleScopedClasses['icon-button']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "navigation-groups" },
});
/** @type {__VLS_StyleScopedClasses['navigation-groups']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "navigation-about" },
});
/** @type {__VLS_StyleScopedClasses['navigation-about']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.RouterLink | typeof __VLS_components.RouterLink} */
RouterLink;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    to: "/about",
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    to: "/about",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = {
    /** @type {typeof __VLS_5.click} */
    onClick: (...[$event]) => {
        return (__VLS_ctx.emit('close'));
        // @ts-ignore
        [emit,];
    },
};
const { default: __VLS_7 } = __VLS_3.slots;
// @ts-ignore
[];
var __VLS_3;
var __VLS_4;
for (const [[title, items]] of __VLS_vFor((__VLS_ctx.groups))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
        key: (title),
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
    (title);
    for (const [item] of __VLS_vFor((items))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    return (__VLS_ctx.emit('navigate', item.id));
                    // @ts-ignore
                    [emit, groups,];
                } },
            key: (item.id),
        });
        (item.title);
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
