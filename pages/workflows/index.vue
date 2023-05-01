<template>
  <PageHeading>
    <template #default>
      Generative workflows
    </template>
    <template #description>
      This is an archive of workflows that use AI for visual design. Filter by category, style, medium, and complexity
      level, or search by keywords. Each recipe includes detailed information and step-by-step instructions. Perfect for
      artists and designers, our Generative Recipes page is the ultimate resource for inspiration and guidance.
    </template>
  </PageHeading>

  <div class="grid grid-cols-12 px-outsides ">
    <div class="col-span-12 grid grid-cols-3 !gap-0 border border-black">
      <div v-for="wf in workflowStore.flows" class="border border-black p-md flex flex-wrap gap-md">
        <div class="aspect-video relative w-full bg-primary bg-opacity-10 ">
          <SanityImage v-if="wf?.coverImg?.asset" :asset-id="wf?.coverImg?.asset?._ref" class="absolute inset-0 w-full h-full object-cover"/>
        </div>
        <div class="text-h3">
          <h2 class="font-mono font-bold text-fix-mono">{{ wf.title }}</h2>
        </div>
      </div>
    </div>


  </div>
</template>

<script setup>
import {useWorkflowsStore} from "../../store/workflows";

const workflowStore = useWorkflowsStore()


</script>

<style scoped>


</style>