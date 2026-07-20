import { ref } from 'vue'
import type { ContentPage, Manifest, SearchEntry } from '../types/content'

const manifest = ref<Manifest | null>(null)
const searchIndex = ref<SearchEntry[] | null>(null)
const cache = new Map<string, ContentPage>()

function improveAnnotationTitle(page: ContentPage): ContentPage {
  if (page.type !== 'annotation') return page
  const title = page.title.trim()
  const filenameStem = page.sourceFile.split('/').pop()?.replace(/\.html?$/i, '') ?? ''
  const looksGenerated = !title || title.toLowerCase() === filenameStem.toLowerCase() || /_n$/i.test(title)
  if (!looksGenerated) return page

  const document = new DOMParser().parseFromString(page.html, 'text/html')
  const candidates = [
    document.querySelector('strong')?.textContent,
    document.querySelector('b')?.textContent,
    document.querySelector('h1,h2,h3')?.textContent,
    page.text.split(/[.!?\n]/)[0],
  ]
  const derived = candidates
    .map(value => value?.replace(/\s+/g, ' ').trim())
    .find(value => value && value.length >= 2 && value.length <= 100)

  return derived ? { ...page, title: derived } : page
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Unable to load ${url}: ${response.status}`)
  return response.json() as Promise<T>
}

export function useContent() {
  async function loadManifest(): Promise<Manifest> {
    if (!manifest.value) manifest.value = await fetchJson<Manifest>('./content/manifest.json')
    return manifest.value
  }

  async function loadSearchIndex(): Promise<SearchEntry[]> {
    if (!searchIndex.value) searchIndex.value = await fetchJson<SearchEntry[]>('./content/search-index.json')
    return searchIndex.value
  }

  async function loadPage(id: string): Promise<ContentPage> {
    const cached = cache.get(id)
    if (cached) return cached
    const loaded = await fetchJson<ContentPage>(`./content/pages/${encodeURIComponent(id)}.json`)
    const page = improveAnnotationTitle(loaded)
    cache.set(id, page)
    return page
  }

  return { manifest, searchIndex, loadManifest, loadSearchIndex, loadPage }
}
