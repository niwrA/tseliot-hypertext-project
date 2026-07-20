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
