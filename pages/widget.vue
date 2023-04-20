<template>
  <div class="relative z-10">
    <select @change="handleWorkflowChange" v-model="currentFlowId">
      <optgroup :label="topic?.title" v-for="topic in topics">
        <option v-for="flow in flows.filter(t => t.topics?.map( t => t._ref).includes(topic._id))"
                :value="flow._id" :key="flow._id">
          {{ flow?.title }}
        </option>
      </optgroup>

    </select>
  </div>

  <div class="flex-col flex-wrap p-8 min-h-0 ">

    <div id="slide-wrapper" class="h-step relative">
      <Transition name="slide">
        <div v-if="status==='onboarding'" class=" border border-primary bg-primary-light p-10 grid grid-cols-12 gap-10">

          <div class="col-span-6">
            <h1 class="text-5xl font-bold font-mono "><span class="text-fix-mono ">{{ currentFlow?.title }}</span></h1>
            <div>
              <UiButton @click="status = 'started'">Start exploring</UiButton>
            </div>

            <SanityImage v-if="currentFlow?.networkImg" :asset-id="currentFlow?.networkImg?.asset?._ref" class="my-8"/>
          </div>

        </div>

        <WorkflowStep v-else :step="workflowsStore.currentStep" :key="workflowsStore.currentStep?._id" class="col-span-12 flex-1"/>
      </Transition>

    </div>
    <div class="w-full flex-shrink">
      <WorkflowBottomBar/>
    </div>
  </div>

</template>

<script setup lang="ts">
import {useWorkflowsStore} from "~/store/workflows";
import {storeToRefs} from "pinia";
import _ from 'lodash'


const workflowsStore = useWorkflowsStore()
const {getItem, flows, setCurrentFlow} = workflowsStore
const {
  canMoveOn,
    currentFlow,
  topics,
  status,
} = storeToRefs(workflowsStore)



function handleWorkflowChange(e: Event) {
  setCurrentFlow(e.target?.value)
}

const currentFlowId = computed({
  get: () => {
    console.log("getting id")
    return currentFlow.value?._id
  },
  setter: (value) => setCurrentFlow(value)
})

</script>

<style scoped>
/* we will explain what these classes do next! */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease;
}

.slide-enter-from {
  transform: translateX(100vw);
}

.slide-leave-to {
  transform: translateX(-100vw);
}

#slide-wrapper > div {
  position: absolute;
  inset: 0;
}

</style>