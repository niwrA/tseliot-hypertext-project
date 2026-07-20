import { ref } from 'vue';
const manifest = ref(null);
const searchIndex = ref(null);
const cache = new Map();
function improveAnnotationTitle(page) {
    if (page.type !== 'annotation')
        return page;
    const title = page.title.trim();
    const filenameStem = page.sourceFile.split('/').pop()?.replace(/\.html?$/i, '') ?? '';
    const looksGenerated = !title || title.toLowerCase() === filenameStem.toLowerCase() || /_n$/i.test(title);
    if (!looksGenerated)
        return page;
    const document = new DOMParser().parseFromString(page.html, 'text/html');
    const candidates = [
        document.querySelector('strong')?.textContent,
        document.querySelector('b')?.textContent,
        document.querySelector('h1,h2,h3')?.textContent,
        page.text.split(/[.!?\n]/)[0],
    ];
    const derived = candidates
        .map(value => value?.replace(/\s+/g, ' ').trim())
        .find(value => value && value.length >= 2 && value.length <= 100);
    return derived ? { ...page, title: derived } : page;
}
async function fetchJson(url) {
    const response = await fetch(url);
    if (!response.ok)
        throw new Error(`Unable to load ${url}: ${response.status}`);
    return response.json();
}
export function useContent() {
    async function loadManifest() {
        if (!manifest.value)
            manifest.value = await fetchJson('./content/manifest.json');
        return manifest.value;
    }
    async function loadSearchIndex() {
        if (!searchIndex.value)
            searchIndex.value = await fetchJson('./content/search-index.json');
        return searchIndex.value;
    }
    async function loadPage(id) {
        const cached = cache.get(id);
        if (cached)
            return cached;
        const loaded = await fetchJson(`./content/pages/${encodeURIComponent(id)}.json`);
        const page = improveAnnotationTitle(loaded);
        cache.set(id, page);
        return page;
    }
    return { manifest, searchIndex, loadManifest, loadSearchIndex, loadPage };
}
