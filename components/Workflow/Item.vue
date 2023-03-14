<template>
  <div :class="['box bg-white', selected && '!border-primary']"
       @click="workflowStore.setSelectedItem(_id)">
    <h3 class="font-bold">{{ title }}</h3>
    <p>{{ description }}</p>
  </div>
</template>

<script setup lang="ts">

import {Item} from "~/types";
import {useWorkflowsStore} from "~/store/workflows";
import {computed} from "#imports";


const workflowStore = useWorkflowsStore()

const {title, description, content, _id} = defineProps<{
  title?: string,
  description?: string,
  content?: object,
  _id: string,
}>()


const selected = computed(() => workflowStore.isItemSelected(_id))
</script>

<style scoped>

</style>