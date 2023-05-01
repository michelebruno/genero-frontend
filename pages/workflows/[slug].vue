<template>

  <div class="w-full flex flex-col flex-wrap p-8 px-outsides pt-0 min-h-0 w-full flex-shrink-0 flex-grow ">

    <div id="slide-wrapper" class="flex-grow relative">
      <Transition :name="`slide-${direction}`">
        <div v-if="status === 'onboarding'"
             class="relative border border-primary bg-primary-light p-10 grid grid-cols-12 gap-10 text-white my-md pt-xl">


          <div class="col-span-12 grid grid-cols-10 relative z-10 auto-rows-min ">
            <h1 class="text-display-1 leading-none font-semibold col-span-10 pb-sm">
              <span>{{ currentFlow?.title }}</span>
            </h1>
            <WorkflowContent :blocks="currentFlow.description"
                             class="col-span-5 text-white"/>
          </div>

          <div class="col-span-6" v-if="currentFlow?.description">
            <SanityContent :blocks="currentFlow?.description"/>
          </div>
          <div class="absolute z-0 inset-0 w-full h-full bg-primary"></div>

          <SanityImage :asset-id="currentFlow.coverImg?.asset?._ref"
                       class="absolute z-0 inset-0 w-full h-full object-center object-cover opacity-50 mix-blend-luminosity"
                       auto="format"/>
        </div>

        <div v-else class="py-md overflow-hidden" :key="workflowsStore.currentStep?._id">

          <WorkflowStep :step="workflowsStore.currentStep"
                        class="col-span-12 flex-1 overflow-hidden"/>
        </div>
      </Transition>

    </div>
    <div class="w-full flex-shrink relative">
      <WorkflowBottomBar/>
    </div>
  </div>

</template>

<script setup lang="ts">
import {useWorkflowsStore} from "~/store/workflows";
import {storeToRefs} from "pinia";
import {definePageMeta} from "#imports";

const workflowsStore = useWorkflowsStore()
const {getItem, flows, setCurrentFlow} = workflowsStore
const {
  currentFlow,
  direction,
  status,
} = storeToRefs(workflowsStore)

const route = useRoute()

workflowsStore.setCurrentFlow(route?.params?.slug)

function handleWorkflowChange(e: Event) {
  setCurrentFlow(e.target?.value)
}

const currentFlowId = computed({
  get: () => {
    return currentFlow.value?._id
  },
  setter: (value) => setCurrentFlow(value)
})


definePageMeta({

  validate({params}) {

    const wfStore = useWorkflowsStore()

    const {slug} = params;

    const wf = wfStore.getWorkflow(slug)

    return !!wf
  }
})
</script>

<style scoped>
/* we will explain what these classes do next! */

.slide-forward-enter-active,
.slide-forward-leave-active,
.slide-backward-enter-active,
.slide-backward-leave-active {
  @apply transition duration-1000;
  transition-property: transform;
}

.slide-forward-enter-from, .slide-backward-leave-to {
  transform: translateY(calc(100% + 200px));
}

.slide-forward-leave-to, .slide-backward-enter-from {
  transform: translateY(calc(-100% - 200px));
}


#slide-wrapper > div {
  position: absolute;
  inset: 0;
}


.dark-bg {
  @apply bg-primary text-white;
}

</style>