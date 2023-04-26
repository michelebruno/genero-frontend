<template>
  <div
      :class="['cursor-pointer inline-block bg-white border-2 min-h-full self-stretch text-left w-full', selected && '!border-primary']">
    <div role="button"
         :class="['h-full text-left  p-sm ', selected && ' !bg-primary bg-opacity-10']"
         @click=" workflowStore.setSelectedItem(selected ? null : _id)">

      <div class="flex gap-x-2 text-2xl">
        <input type="radio" class="h-5 aspect-square mt-1.5" :aria-selected="selected" :checked="selected"/>
        <h3 class="font-semibold mb-2 w-full">{{ shortTitle || title }}</h3>
      </div>
      <p v-if="description">{{ description }}</p>
    </div>
  </div>

</template>

<script setup lang="ts">

import {useWorkflowsStore} from "~/store/workflows";
import {computed} from "#imports";

const workflowStore = useWorkflowsStore()

const {title, description, content, _id, shortTitle} = defineProps<{
  title?: string,
  shortTitle?: string,
  description?: string,
  content?: object,
  slug: {
    current: string
  },
  _id: string,
}>()


const selected = computed(() => workflowStore.isItemSelected(_id))
</script>

<style scoped>

</style>