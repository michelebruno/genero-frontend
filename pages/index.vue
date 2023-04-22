<template>

  <div class="h-screen">
    <h1 class="text-display-2 font-semibold">
      Explore design workflows with <span class="text-fix-mono font-mono">
      generative AI
    </span> and share your learnings
    </h1>
    <NuxtLink :to="$genero.getWorkflowLink(featuredFlows[0])">
      <UiButton is="a" primary>Open workflows</UiButton>

    </NuxtLink>
  </div>

  <div class="py-xl">
    <h2 id="featured-workflows" class="font-mono">
      <span>Featured</span>
      <span>Worfklows</span>
    </h2>
  </div>
  <div class="grid grid-cols-12 gap-x-md px-md">
    <div v-for="(flow, index) in featuredFlows" :class="index < 2 ? 'col-span-6' : 'col-span-4'">
      <div class="h-xl border-2 border-black"></div>
      <div class="flex flex-wrap items-center text-4xl font-semibold">
        <p class="font-mono text-primary text-fix-mono font-bold">#{{ index + 1 }}</p>
        <h3>{{ flow.title }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {useWorkflowsStore} from "~/store/workflows";

const workflowStore = useWorkflowsStore()

const featuredFlows = ref(['generate-visual-assets-for-your-brand', 'draw-an-illustration-from-draft'].map(s => workflowStore.getWorkflow(s)))

</script>

<style scoped lang="scss">

#featured-workflows {
  @apply font-bold uppercase text-primary;

  font-size: 20vw;
  line-height: 0.6em;

  span {
    display: block;

    &:nth-child(2) {
      text-align: right;
    }
  }
}

</style>