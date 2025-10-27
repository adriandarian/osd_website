<template>
  <div class="container py-12">
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Sidebar -->
      <aside class="lg:col-span-1">
        <nav class="sticky top-20 space-y-1">
          <h2 class="font-semibold mb-4">Documentation</h2>
          <NuxtLink 
            to="/docs/getting-started" 
            class="block px-3 py-2 rounded-md text-sm hover:bg-accent"
            active-class="bg-accent text-accent-foreground"
          >
            Getting Started
          </NuxtLink>
        </nav>
      </aside>

      <!-- Content -->
      <article class="lg:col-span-3">
        <ContentDoc>
          <template #default="{ doc }">
            <div class="prose prose-slate dark:prose-invert max-w-none">
              <h1>{{ doc.title }}</h1>
              <p class="lead text-muted-foreground">{{ doc.description }}</p>
              <ContentRenderer :value="doc" />
            </div>
          </template>
          <template #not-found>
            <div class="text-center py-12">
              <Icon name="lucide:file-question" class="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 class="text-2xl font-bold mb-2">Page Not Found</h2>
              <p class="text-muted-foreground mb-4">
                The documentation page you're looking for doesn't exist.
              </p>
              <NuxtLink 
                to="/docs" 
                class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6"
              >
                Back to Documentation
              </NuxtLink>
            </div>
          </template>
        </ContentDoc>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { data: doc } = await useAsyncData(`content-${route.path}`, () => 
  queryContent(route.path).findOne()
)

useSeoMeta({
  title: () => doc.value?.title ? `${doc.value.title} - OpenSeadragon` : 'Documentation - OpenSeadragon',
  description: () => doc.value?.description || 'OpenSeadragon documentation',
})
</script>
