<template>
  <ContentDoc>
    <template #default="{ doc }">
      <ContentRenderer :value="doc" />
    </template>
    <template #not-found>
      <div class="py-16 text-center">
        <Icon name="heroicons:document-magnifying-glass" class="mx-auto mb-6 h-20 w-20 text-gray-400" />
        <h1 class="mb-3 text-3xl font-bold text-gray-900 dark:text-white">
          Page Not Found
        </h1>
        <p class="mb-6 text-lg text-gray-600 dark:text-gray-400">
          The documentation page you're looking for doesn't exist.
        </p>
        <NuxtLink
          to="/docs"
          class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
        >
          <Icon name="heroicons:arrow-left" class="h-5 w-5" />
          Back to Documentation
        </NuxtLink>
      </div>
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
