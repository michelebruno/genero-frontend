<template>
  <PageHeading>
    <template #default>
      Generative workflows
    </template>
    <template #description>
      This is an archive of workflows that use AI for visual design. Filter by category, medium and complexity
      level, or search by keywords. Each workflow includes detailed information and step-by-step instructions. Perfect
      for
      artists and designers, you will learn how to use AI to enhance you capabilities.
    </template>
  </PageHeading>

  <div class="grid grid-cols-12 px-outsides ">
    <div class="col-span-12 grid grid-cols-3 gap-y-lg">
      <div v-for="wf in workflowStore.flows" class="relative flex flex-wrap gap-sm overflow-hidden group  cursor-pointer"
           @click="handleWfClick($genero.getWorkflowLink(wf))">
        <div class="aspect-video relative w-full bg-primary bg-opacity-10 flex-shrink-0 flex-grow-0 ">
          <SanityImage v-if="wf?.coverImg?.asset" :asset-id="wf?.coverImg?.asset?._ref"
                       class="absolute inset-0 w-full h-full object-cover" auto="format"/>
        </div>
        <div class="text-h3 ">
          <h2 class="font-semibold flex-shrink-0">{{ wf.title }}</h2>
        </div>
        <div class="flex w-full justify-between mt-sm">
          <div></div>
          <div>
            <NuxtLink :to="$genero.getWorkflowLink(wf)"
                      class="font-mono font-bold uppercase text-fix-mono group-hover:underline group-hover:text-primary">
              Start now ↗
            </NuxtLink>
          </div>
        </div>

        <div class="w-full h-full absolute inset-0 translate-y-full grid auto-rows-min  bg-black text-white p-md">
          <h2 class="text-h3 ">
            <span class="font-mono font-bold text-fix-mono leading-none flex-shrink-0">{{ wf.title }}</span>
          </h2>
          <div>
            <SanityContent :blocks="wf.description"/>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
import {useWorkflowsStore} from "../../store/workflows";
import {Flow} from "~/types";
import {navigateTo} from "#app";

const workflowStore = useWorkflowsStore()

function handleWfClick(path) {

  navigateTo(path)
}

</script>

<style scoped>


</style>