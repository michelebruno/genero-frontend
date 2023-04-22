<template>
  <div class="flex gap-x-4 mt-4 h-[90px]">
    <UiButton class="block h-full aspect-square bg-white" @click="handlePrev">←</UiButton>
    <div class="flex-grow border-2 border-black bg-white">
      <Transition appear name="stepper">
        <div class="flex gap-x-sm items-center justify-center h-full" v-show="!['section'].includes(currentStep.type)">
          <div class="flex" v-if="prevStep">
            <WorkflowPill>{{ prevStep.title }}</WorkflowPill>
          </div>
          <div>
            >
          </div>
          <div class="flex" v-if="prevStep">
            <WorkflowPill>{{ currentStep.title }}</WorkflowPill>
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
const {getItem, goNext, goBack, flows, setCurrentFlow, currentStepIndex} = workflowsStore
const {selectedItem, status, canMoveOn, prevSteps, nextSteps, showModal} = storeToRefs(workflowsStore)

function handleNext() {
  goNext()
}

function handlePrev() {
  goBack()
}


const isNextDisabled = computed(() => {
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