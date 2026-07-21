<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="reader-shell about-shell">
    <header class="site-header about-site-header">
      <RouterLink class="menu-button home-button" to="/read/burbank-notes-burbank-a" aria-label="Return to the reader">←</RouterLink>
      <div class="brand">
        <p class="eyebrow">Modern edition · preserved source</p>
        <h1>T. S. Eliot Hypertext Project</h1>
      </div>
      <RouterLink class="header-link" to="/read/burbank-notes-burbank-a">Enter the reader</RouterLink>
    </header>

    <main class="about-main">
      <article class="about-card">
        <header class="about-hero">
          <p class="eyebrow">About the project</p>
          <h2>A scholarly hypertext, recovered and renewed</h2>
          <p class="about-deck">
            The T. S. Eliot Hypertext Project was created by Arwin van Arum in 1998.
            This modern edition preserves that early web project while making its texts,
            annotations, sources, and images easier to read and explore today.
          </p>
          <RouterLink class="primary-link" to="/read/burbank-notes-burbank-a">Explore the project</RouterLink>
        </header>

        <section>
          <h3>The original project</h3>
          <p>
            The project began in 1998 as a collection of interlinked HTML pages devoted
            to the close reading of works by T. S. Eliot. Its structure reflects an early
            vision of the web as a scholarly medium: literary texts, annotations, images,
            contextual sources, and references connected through ordinary hyperlinks.
          </p>
          <p>
            Arwin van Arum is both the author of the original project and the editor of
            this renewed edition.
          </p>
        </section>

        <section>
          <h3>Preservation and the modern edition</h3>
          <p>
            The recovered 1998 HTML is treated as a historical source. It is not manually
            rewritten to suit the present interface. Instead, an import process creates a
            structured edition from the preserved files, and the reader enhances that
            material at display time.
          </p>
          <p>
            This separation is intentional. It keeps the recovered source intact while
            allowing the modern edition to improve navigation, typography, annotation
            handling, image viewing, search, accessibility, and content metadata.
          </p>
        </section>

        <section>
          <h3>What you are reading</h3>
          <p>
            The site contains annotated literary texts alongside notes, essays, sources,
            references, and visual material. Some pages retain the compact language and
            conventions of the original hypertext. Titles and classifications may be
            clarified in the modern edition when the surviving source is ambiguous, but
            the underlying scholarly content remains derived from the preserved project.
          </p>
        </section>

        <section>
          <h3>An edition in progress</h3>
          <p>
            Recovery does not automatically resolve every missing image, broken external
            link, unclear title, or incomplete attribution. The project is therefore both
            an archive and an ongoing editorial edition. Corrections and improvements are
            made in the import and presentation layers so they remain reproducible and do
            not overwrite the historical source.
          </p>
        </section>

        <section class="about-note">
          <p class="eyebrow">Next chapter</p>
          <h3>Returning the project to static documents</h3>
          <p>
            A future version is planned as a statically generated edition in which each
            work, annotation, and source once again has its own durable HTML page. That
            direction is both technically useful and closely aligned with the document-based
            character of the original 1998 project.
          </p>
        </section>

        <footer class="about-footer">
          <p><strong>Original project and modern edition:</strong> Arwin van Arum</p>
          <RouterLink to="/read/burbank-notes-burbank-a">Continue to the reader →</RouterLink>
        </footer>
      </article>
    </main>
  </div>
</template>
