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

  <div class="grid grid-cols-12 gap-x-10 p-10 ">

    <div class="col-span-3 h-step -ml-10 bg-gray-500 rounded-r-2xl">

    </div>
    <WorkflowStep :step="currentStep" :key="currentStep?._id" class="col-span-9"/>
  </div>

</template>

<script setup lang="ts">
import {useWorkflowsStore} from "~/store/workflows";
import {storeToRefs} from "pinia";
import _ from 'lodash'
import {computed} from "#imports";


const workflowsStore = useWorkflowsStore()
const {getItem, nextStep, prevStep, flows, setCurrentFlow} = workflowsStore
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