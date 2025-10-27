export const useDocsSeo = (doc: any) => {
  const route = useRoute()
  const config = useRuntimeConfig()

  const title = computed(() => {
    return doc.value?.title
      ? `${doc.value.title} | OpenSeadragon Documentation`
      : 'OpenSeadragon Documentation'
  })

  const description = computed(() => {
    return (
      doc.value?.description ||
      'OpenSeadragon is an open-source, web-based viewer for high-resolution zoomable images, implemented in pure JavaScript.'
    )
  })

  const url = computed(() => {
    return `${config.public.siteUrl}${route.path}`
  })

  const imageUrl = computed(() => {
    // Use custom og:image if provided in frontmatter, otherwise use default
    if (doc.value?.image) {
      return doc.value.image
    }
    return `${config.public.siteUrl}/og-image.png`
  })

  useHead({
    title: title.value,
    meta: [
      // Primary Meta Tags
      {
        name: 'title',
        content: title.value,
      },
      {
        name: 'description',
        content: description.value,
      },

      // Open Graph / Facebook
      {
        property: 'og:type',
        content: 'article',
      },
      {
        property: 'og:url',
        content: url.value,
      },
      {
        property: 'og:title',
        content: title.value,
      },
      {
        property: 'og:description',
        content: description.value,
      },
      {
        property: 'og:image',
        content: imageUrl.value,
      },
      {
        property: 'og:site_name',
        content: 'OpenSeadragon',
      },

      // Twitter
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:url',
        content: url.value,
      },
      {
        name: 'twitter:title',
        content: title.value,
      },
      {
        name: 'twitter:description',
        content: description.value,
      },
      {
        name: 'twitter:image',
        content: imageUrl.value,
      },

      // Additional SEO
      {
        name: 'robots',
        content: 'index, follow',
      },
      {
        name: 'author',
        content: 'OpenSeadragon Contributors',
      },
      {
        name: 'keywords',
        content:
          doc.value?.keywords ||
          'openseadragon, deep zoom, image viewer, javascript, zoomable images, IIIF, high resolution',
      },
    ],
    link: [
      {
        rel: 'canonical',
        href: url.value,
      },
    ],
  })

  // JSON-LD structured data (commented out until @vueuse/schema-org is installed)
  // useSchemaOrg([
  //   {
  //     '@type': 'Article',
  //     headline: title.value,
  //     description: description.value,
  //     url: url.value,
  //     image: imageUrl.value,
  //     author: {
  //       '@type': 'Organization',
  //       name: 'OpenSeadragon',
  //       url: config.public.siteUrl,
  //     },
  //     publisher: {
  //       '@type': 'Organization',
  //       name: 'OpenSeadragon',
  //       url: config.public.siteUrl,
  //     },
  //     datePublished: doc.value?.date || new Date().toISOString(),
  //     dateModified: doc.value?.updatedAt || new Date().toISOString(),
  //   },
  // ])
}
