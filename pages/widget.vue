<template>
  <div class="relative z-10">
    <select @change="handleWorkflowChange" v-model="currentFlowId">
      <optgroup :label="topic.title" v-for="topic in topics">
        <option v-for="flow in flows.filter(t => t.topics?.map( t => t._ref).includes(topic._id))"
                :value="flow._id" :key="flow._id">
          {{ flow.title }}
        </option>
      </optgroup>

    </select>
  </div>

  <div v-if="status==='onboarding'" class="min-h-screen bg-gray-300 p-10 grid grid-cols-12 gap-10">

    <div class="col-span-6">
      <h3 class="font-mono text-primary font-bold uppercase">Discover how to</h3>
      <h1 class="text-4xl font-semibold">{{ currentFlow.title }}</h1>
      <div>
        <UiButton @click="status = 'started'">Start exploring</UiButton>
      </div>
    </div>

  </div>
  <div v-else class="grid grid-cols-12 gap-x-10 p-10 ">

    <div class="col-span-3 h-step -ml-10 bg-gray-500 rounded-r-2xl">

    </div>

    <WorkflowStep v-if="status === 'started'" :step="currentStep" :key="currentStep?._id" class="col-span-9"/>
    <div v-else class="h-step flex items-center col-span-9">
      <h2 class="text-2xl font-semibold">Great! You are now ready to design with AI.
        Here’s your step-by-step guide to {{ currentFlow.title }}</h2>
    </div>
  </div>

</template>

<script setup lang="ts">
import {useWorkflowsStore} from "~/store/workflows";
import {storeToRefs} from "pinia";
import _ from 'lodash'
import {computed} from "#imports";


const workflowsStore = useWorkflowsStore()
const {getItem, flows, setCurrentFlow} = workflowsStore
const {
  canMoveOn,
  currentStep,
  currentFlow,
  currentStepIndex,
  topics,
  status,
  hasItems,
  isLastStep
} = storeToRefs(workflowsStore)

function handleWorkflowChange(e: Event) {
  setCurrentFlow(e.target?.value)
}


const currentFlowId = computed({
  get: () => currentFlow.value?._id,
  setter: (value) => setCurrentFlow(value)
})

</script>

<style scoped>

#widget {

}

</style>