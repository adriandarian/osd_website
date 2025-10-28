<template>
  <ContentDoc>
    <template #default="{ doc }">
      <ContentRenderer :value="doc" />
    </template>
    <template #not-found>
      <div v-if="false"></div>
    </template>
  </ContentDoc>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'docs',
})

// Fetch the current document
const { data: doc } = await useAsyncData('current-doc', () =>
  queryContent(useRoute().path).findOne()
)

// Redirect to /docs if page not found
if (!doc.value) {
  navigateTo('/docs', { redirectCode: 301 })
}

// Apply SEO meta tags
useDocsSeo(doc)

const route = useRoute()

const { data: page } = await useAsyncData(`page-${route.path}`, () =>
  queryContent(route.path).findOne()
)

useSeoMeta({
  title: () => page.value?.title ? `${page.value.title} - OpenSeadragon Documentation` : 'OpenSeadragon Documentation',
  description: () => page.value?.description || 'OpenSeadragon documentation',
})
</script>
