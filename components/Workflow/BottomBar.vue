<template>
  <div class="flex gap-x-4 mt-4 h-[90px]">
    <UiButton class="block h-full aspect-square bg-white" @click="handlePrev">←</UiButton>
    <div class="flex-grow border-2 border-black bg-white">
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
          <WorkflowPill style="next">Next step</WorkflowPill>
        </div>
      </div>
    </div>
    <div class="flex bg-white">
      <UiButton class="block h-full aspect-square" @click="handleNext" :disabled="isNextDisabled">Next</UiButton>
    </div>
  </div>
</template>

<script setup>

import {useWorkflowsStore} from "../../store/workflows";
import {storeToRefs} from "pinia";

const workflowsStore = useWorkflowsStore()
const {getItem, goNext, goBack, flows, setCurrentFlow, currentStepIndex} = workflowsStore
const {selectedItem, canMoveOn, prevSteps, nextSteps, showModal} = storeToRefs(workflowsStore)

function handleNext() {
  goNext()
}
function handlePrev() {
  goBack()
}


const isNextDisabled = computed(()=>{
  if (currentStep.type === 'choose' && !showModal) {
    return false
  }
  return !canMoveOn
})


const currentStep = computed(() => {
  return workflowsStore.currentStep
})
const nextStep = computed(() => {
  return nextSteps.value[1]
})

const prevStep = computed(() => {
  if (!prevSteps.value?.length) return null;
  return (workflowsStore.currentStep?.type === 'choose' && showModal.value) ? workflowsStore.currentStep : prevSteps.value[prevSteps.value.length - 1]
})


</script>

<style scoped>

</style>