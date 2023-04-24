<template>
  <button :class="[' bg-white border-r border border-black p-sm w-full text-left', selected && '!border-primary']"
          @click=" workflowStore.setSelectedItem(selected ? null : _id)">
    <h3 class="font-bold text-2xl mb-2 w-full">{{ shortTitle || title }}</h3>
    <p v-if="description">{{ description }}</p>
  </button>
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