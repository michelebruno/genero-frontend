<template>
  <div class="flex gap-x-4 h-[90px]">
    <UiButton class="block h-full aspect-square bg-white" @click="handlePrev">←</UiButton>
    <div class="flex-grow border-2 border-black bg-white">
      <Transition appear name="stepper">
        <div class="flex gap-x-sm items-center justify-center h-full"
             v-show="!['section', 'options'].includes(currentStep.type)">
          <div class="flex" v-if="prevStep">
            <WorkflowPill type="prev">{{ prevStep?.shortTitle || prevStep.title }}</WorkflowPill>
          </div>
          <div>
            >
          </div>
          <div v-if="Array.isArray(currentStep)" class="flex max-w-[30ch] gap-1 justify-center flex-wrap">
            <WorkflowPill v-for="choice in currentStep" :type="selectedItem?._id === choice._id && 'active'">
              {{ choice?.shortTitle || choice.title }}
            </WorkflowPill>
          </div>
          <div v-else class="flex">
            <WorkflowPill>{{ currentStep?.shortTitle || currentStep.title }}</WorkflowPill>
          </div>
          <div>
            >
          </div>
          <div class="flex">
            <WorkflowPill type="next">Next step</WorkflowPill>
          </div>
        </div>
      </Transition>
    </div>
    <div class="flex bg-white">
      <UiButton class="block h-full aspect-square" @click="handleNext" primary :disabled="isNextDisabled"
                :theme="status === 'started' && 'dark'  ">

        {{
          status === 'onboarding' ?
              "Start"
              : "Next"
        }}

      </UiButton>
    </div>
  </div>
</template>

<script setup>

import {useWorkflowsStore} from "../../store/workflows";
import {storeToRefs} from "pinia";

const workflowsStore = useWorkflowsStore()
const {getItem, goNext, goBack} = workflowsStore
const {selectedItem, status, prevSteps, nextSteps, showModal} = storeToRefs(workflowsStore)

function handleNext() {
  goNext()
}

function handlePrev() {
  goBack()
}


const isNextDisabled = computed(() => {
  if (workflowsStore.currentStep.type === 'choose' && !showModal.value) {
    return false
  }
  return !workflowsStore.canMoveOn
})


const currentStep = computed(() => {
  return showModal.value ? workflowsStore.currentStep.items : workflowsStore.currentStep
})

const nextStep = computed(() => {
  return nextSteps.value[1]
})

const prevStep = computed(() => {
  if (workflowsStore.currentStep.type === 'choose' && showModal.value) return workflowsStore.currentStep

  return prevSteps.value.filter(n => !['options'].includes(n.type)).slice(-1)[0]
})


</script>

<style scoped lang="scss">

.stepper-enter-active,
.stepper-leave-active {
  transition: opacity 0.5s ease;
}

.stepper-enter-from,
.stepper-leave-to {
  opacity: 0;
}

</style>