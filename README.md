# T. S. Eliot Hypertext Project — Vue Reader v3

A content-driven Vue 3 reader for the recovered T. S. Eliot Hypertext Project.

## Run

```powershell
npm install
npm run dev
```

Production check:

```powershell
npm run build
```

## Reader v3 changes

- Images hover as compact previews on desktop.
- Clicking an image opens details in the side panel.
- Clicking the panel image opens the full-screen viewer.
- Legacy arrow and R/A indicator images are replaced at render time with scalable CSS markers.
- Improved project navigation organized by content type.
- Ranked search results with contextual snippets.
- Refined literary typography and reading measure.
- Annotation preview, route-backed drawer, pinning, backlinks and provenance remain available.

The preserved JSON and asset files live under `public/content`. Original source HTML is not modified.

## v4 interaction changes

- Legacy `T.gif` translation indicators are rendered as scalable text markers, matching the modern `R` and `A` indicators.
- Links to legacy image-wrapper pages are resolved in the reader and open the image drawer directly.
- Hovering an image-wrapper link on desktop shows the same compact image preview used for inline images.
- Full-screen viewing remains available only after opening the image drawer.

## Content quality tooling

Generated metadata can be audited without changing any recovered HTML:

```powershell
npm run content:audit
```

Apply only conservative, high-confidence title improvements to generated page JSON, the manifest, and the search index:

```powershell
npm run content:enrich
```

The tool reads optional, version-controlled decisions from `editorial/content-overrides.json` and writes both human-readable and machine-readable reports to `reports/`. Automatic changes are intentionally limited to filename-like annotation titles and image-wrapper metadata; ambiguous cases remain in the report for editorial review.

## Azure Static Web Apps

The deployment-facing static files live in `public/`, so Vite copies them to the root of `dist/`:

- `staticwebapp.config.json` supplies conservative security headers and the web-manifest MIME type.
- `site.webmanifest` and the favicon set provide browser and installed-app identity.
- `robots.txt` permits indexing of the public reader.
- `social-preview.png` is used by Open Graph and social-card metadata.

The application uses hash routing, so no server-side SPA navigation fallback is required. Once a permanent custom domain is selected, add its absolute URL as the canonical URL and `og:url` in `index.html`, and add a sitemap URL to `robots.txt`.

Before committing deployment changes, verify the production output:

```bash
npm ci
npm run content:audit
npm run build
```

## About page

The public landing page is `#/about`. It identifies Arwin van Arum as the author of the original 1998 T. S. Eliot Hypertext Project and as editor of the modern edition. The reader header and browse panel both link prominently to it.
