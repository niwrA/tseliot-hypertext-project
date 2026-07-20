export type PageType =
  | 'annotated-text'
  | 'annotation'
  | 'bibliography'
  | 'bibliography-image'
  | 'frameset'
  | 'image-wrapper'
  | 'main-text'
  | 'reading-page'
  | 'source-page'

export interface ManifestPage {
  id: string
  slug: string
  type: PageType
  title: string
  sourceFile: string
}

export interface Manifest {
  title: string
  generatedFormatVersion: number
  pageCount: number
  assetCount: number
  types: Record<string, number>
  pages: ManifestPage[]
}

export interface ContentLink {
  kind: 'internal' | 'external' | 'fragment' | 'unresolved'
  path?: string
  href?: string
  fragment?: string | null
  label?: string
  resolvedPath?: string
  pageId?: string
}

export interface ContentImage {
  src?: string
  path?: string
  alt?: string
  resolvedPath?: string
}

export interface ContentPage extends ManifestPage {
  encoding: string
  html: string
  text: string
  links: ContentLink[]
  images: ContentImage[]
  backlinks: string[]
  provenance: {
    edition: string
    sourceFile: string
  }
}

export interface SearchEntry {
  id: string
  title: string
  type: PageType
  sourceFile: string
  text: string
}
