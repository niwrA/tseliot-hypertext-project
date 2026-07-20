import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useContent } from '../composables/useContent';
const emit = defineEmits();
const router = useRouter();
const { loadSearchIndex } = useContent();
const query = ref('');
const entries = ref([]);
const loading = ref(true);
loadSearchIndex().then(v => { entries.value = v; loading.value = false; });
function snippet(entry, terms) { const text = entry.text.replace(/\s+/g, ' ').trim(); const lower = text.toLowerCase(); const at = Math.max(0, ...terms.map(t => lower.indexOf(t)).filter(n => n >= 0)); const start = Math.max(0, at - 75); return `${start ? '…' : ''}${text.slice(start, start + 210)}${start + 210 < text.length ? '…' : ''}`; }
const results = computed(() => {
    const terms = query.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!terms.length)
        return [];
    return entries.value.map(entry => { const title = entry.title.toLowerCase(), text = entry.text.toLowerCase(); let score = 0; for (const term of terms) {
        if (title === term)
            score += 12;
        else if (title.includes(term))
            score += 7;
        if (text.includes(term))
            score += 2;
    } return { entry, score, snippet: snippet(entry, terms) }; }).filter(x => x.score >= terms.length * 2).sort((a, b) => b.score - a.score).slice(0, 40);
});
function open(entry) { router.push({ name: 'reader', params: { pageId: entry.id } }); emit('close'); }
watch(query, v => { if (v.length > 200)
    query.value = v.slice(0, 200); });
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
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "search-panel" },
    'aria-label': "Project search",
});
/** @type {__VLS_StyleScopedClasses['search-panel']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "search-inner" },
});
/** @type {__VLS_StyleScopedClasses['search-inner']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    for: "project-search",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    id: "project-search",
    type: "search",
    autofocus: true,
    placeholder: "Poem, person, place, phrase…",
});
(__VLS_ctx.query);
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "muted" },
    });
    /** @type {__VLS_StyleScopedClasses['muted']} */ ;
}
else if (__VLS_ctx.query && !__VLS_ctx.results.length) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "muted" },
    });
    /** @type {__VLS_StyleScopedClasses['muted']} */ ;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
        ...{ class: "search-results" },
    });
    /** @type {__VLS_StyleScopedClasses['search-results']} */ ;
    for (const [result] of __VLS_vFor((__VLS_ctx.results))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
            key: (result.entry.id),
        });
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.loading))
                        throw 0;
                    if (!!(__VLS_ctx.query && !__VLS_ctx.results.length))
                        throw 0;
                    return (__VLS_ctx.open(result.entry));
                    // @ts-ignore
                    [query, query, loading, results, results, open,];
                } },
            type: "button",
        });
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "search-result-heading" },
        });
        /** @type {__VLS_StyleScopedClasses['search-result-heading']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
        (result.entry.title);
        __VLS_asFunctionalElement1(__VLS_intrinsics.small, __VLS_intrinsics.small)({});
        (result.entry.type.replace('-', ' '));
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "search-snippet" },
        });
        /** @type {__VLS_StyleScopedClasses['search-snippet']} */ ;
        (result.snippet);
        // @ts-ignore
        [];
    }
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
});
export default {};
