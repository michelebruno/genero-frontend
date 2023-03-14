<template>
  <div class="box-lg">

    <div v-if="!selectedItem?._id">
      Seleziona un item per vedere
    </div>
    <div v-else>
      <h3 class="font-bold">{{ selectedItem.title }}</h3>
      <div v-if="selectedItem.content && selectedItem.content.length">
        <SanityContent :blocks="selectedItem?.content"/>
      </div>
      <div v-else>Non c'è nnulla qui</div>
    </div>
  </div>
</template>

<script setup>

import {useWorkflowsStore} from "~/store/workflows";
import {storeToRefs} from "pinia";

const workflowStore = useWorkflowsStore()

const {
  selectedItem,
  currentStep
} = storeToRefs(workflowStore)

</script>

<style scoped>

</style>