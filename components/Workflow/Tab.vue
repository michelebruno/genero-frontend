<template>
  <div class="p-md">

    <div v-if="!selectedItem?._id">
      Seleziona un item per vedere
    </div>
    <div v-else>
      <h3 class="font-bold text-3xl mb-3">{{ selectedItem.title }}</h3>
      <div v-if="selectedItem.content && selectedItem.content.length">
        <SanityContent :blocks="selectedItem?.content"/>

      </div>
      <div v-else>Non c'è nnulla qui</div>
      <div class="flex justify-end">
        <button
            :class="['border p-2 border-primary', canMoveOn ? ' hover:bg-primary hover:bg-opacity-50':'opacity-50']"
            :disabled="!canMoveOn" @click="nextStep">Next →
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>

import {useWorkflowsStore} from "~/store/workflows";
import {storeToRefs} from "pinia";

const workflowStore = useWorkflowsStore()
const {nextStep} = workflowStore
const {
  selectedItem,
  currentStep,
  canMoveOn,
} = storeToRefs(workflowStore)

</script>

<style scoped>

</style>