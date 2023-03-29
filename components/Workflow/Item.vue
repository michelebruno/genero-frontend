<template>
  <button :class="['block bg-white border-r border border-black px-4 py-2 w-full text-left', selected && '!border-primary']"
       @click="workflowStore.setSelectedItem(_id)">
    <h3 class="font-bold">{{shortTitle || title }}</h3>
    <p v-if="description">{{description}}</p>
  </button>
</template>

<script setup lang="ts">

import {useWorkflowsStore} from "~/store/workflows";
import {computed} from "#imports";

const workflowStore = useWorkflowsStore()

const {title, description, content, _id} = defineProps<{
  title?: string,
  shortTitle?: string,
  description?: string,
  content?: object,
  _id: string,
}>()


const selected = computed(() => workflowStore.isItemSelected(_id))
</script>

<style scoped>

</style>