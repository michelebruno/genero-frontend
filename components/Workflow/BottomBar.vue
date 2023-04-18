<template>
<div class="flex gap-x-4 mt-4 h-[90px]">
  <UiButton class="block h-full aspect-square" @click="prevStep">←</UiButton>
  <div class="flex-grow border-2 border-black ">
    <div class="flex gap-x-sm items-center justify-center h-full">
      <div class="flex">
        <WorkflowPill>Ciao</WorkflowPill>
      </div>
      <div>
        >
      </div>
      <div class="flex">
        <WorkflowPill>Ciao</WorkflowPill>
      </div>
    </div>
  </div>
  <div class="flex">
    <UiButton class="block h-full aspect-square" :disabled="!canMoveOn" @click="nextStep">Next</UiButton>
  </div>
</div>
</template>

<script setup>

import {useWorkflowsStore} from "../../store/workflows";
import {storeToRefs} from "pinia";

const workflowsStore = useWorkflowsStore()
const {getItem, nextStep, prevStep, flows, setCurrentFlow, currentStepIndex} = workflowsStore
const {selectedItem, canMoveOn} = storeToRefs(workflowsStore)
</script>

<style scoped>

</style>