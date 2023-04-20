<template>
  <div class="flex gap-x-4 mt-4 h-[90px]">
    <UiButton class="block h-full aspect-square" @click="prevStep">←</UiButton>
    <div class="flex-grow border-2 border-black ">
      <div class="flex gap-x-sm items-center justify-center h-full">
        <div class="flex" v-if="prevStep">
          <WorkflowPill>{{ prevStep.title }}</WorkflowPill>
        </div>
        <div>
          >
        </div>
        <div class="flex">
          <WorkflowPill>{{currentStep.title}}</WorkflowPill>
        </div>
        <div>
          >
        </div>
        <div class="flex">
          <WorkflowPill type="next">Next step</WorkflowPill>
        </div>
      </div>
    </div>
    <div class="flex">
      <UiButton class="block h-full aspect-square" :disabled="!canMoveOn" @click="handleNext">Next</UiButton>
    </div>
  </div>
</template>

<script setup>

import {useWorkflowsStore} from "../../store/workflows";
import {storeToRefs} from "pinia";

const workflowsStore = useWorkflowsStore()
const {getItem, goNext, flows, setCurrentFlow, currentStepIndex} = workflowsStore
const {selectedItem, canMoveOn, prevSteps, nextSteps, showModal} = storeToRefs(workflowsStore)

function handleNext() {
  goNext()

}



const currentStep = computed(() => {
  return workflowsStore.currentStep
})
const nextStep = computed(() => {
  return nextSteps.value[1]
})

const prevStep = computed(() => {
  if (!prevSteps.value?.length) return null;
  return (workflowsStore.currentStep.value.type === 'choose' && showModal.value) ? workflowsStore.currentStep : prevSteps.value[prevSteps.value.length - 1]
})


</script>

<style scoped>

</style>