<template>
  <div class="border-primary border-2 p-md flex flex-col h-full pt-xl relative gap-y-md auto-rows-min"
       v-if="step.layout === 'choose'">
    <div class="grid grid-cols-12">
      <div class="col-span-12 lg:col-span-8 lg:col-start-3 2xl:col-span-6 2xl:col-start-4 text-center w-full">
        <h2 class="text-display-2 font-bold mb-sm">{{ step.title }}</h2>
        <WorkflowContent :blocks="step.content"/>
      </div>
    </div>
    <div class="grid grid-cols-12 w-full flex-shrink-0 flex-grow">
      <div class="col-span-12 relative flex items-center w-full mb-xl">
        <Transition name="modal" mode="out-in">
          <SanityImage v-if="step?.image && !showModal" :asset-id="step?.image?.asset?._ref"
                       class="mx-auto absolute inset-0 object-contain w-full h-full object-top" auto="format"/>
          <div v-else-if="showModal"
               class="bg-white border-2 border-primary max-w-screen-xl mx-auto min-h-[30ch] absolute left-0 right-0">
            <div class="bg-primary text-white px-md py-sm">
              <h3 class="font-mono text-fix-mono font-bold mb-sm uppercase !mb-0">
                ONE OF THESE METHODS <span class="text-red-600">*</span>
              </h3>
            </div>
            <div class="flex gap-x-md p-md h-full">
              <WorkflowItem v-for="item in step.items" v-bind="item"/>
            </div>
          </div>
        </Transition>

      </div>

    </div>
  </div>
  <div v-else-if="step.layout === 'know'" class="border-primary border-2 p-lg flex flex-col  h-full relative auto-rows-max">
    <div class="grid grid-cols-12">
      <div class="col-span-8 col-start-3 2xl:col-span-6 2xl:col-start-4 text-center">
        <h2 class="text-7xl font-bold mb-sm">{{ step.title }}</h2>
        <WorkflowContent v-if="step.content" :blocks="step.content"/>
        <div v-if="step?.tools?.length" class="pt-md ">
        <span class="inline-block mx-auto text-fix-mono font-mono uppercase font-bold bg-primary text-white p-1 mb-sm">{{
            step.toolsLabel
          }}</span>
          <div class="grid grid-cols-2">
            <UiTool v-for="tool in step?.tools" v-bind="tool"/>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-grow my-xl relative">
      <SanityImage v-if="step?.image" :asset-id="step?.image?.asset?._ref"
                   class="mx-auto absolute inset-0 object-contain w-full h-full object-top" auto="format"/>
    </div>
    <span v-if="step?.label" class="step-label">
      {{ step.label }}
    </span>

  </div>
  <div v-else-if="step.layout === 'text'" class="border-primary border-2 p-lg grid grid-cols-12 h-full relative">
    <div v-if="step.label" class="step-label">{{ step.label }}</div>
    <div class="col-span-12 2xl:col-span-10 2xl:col-start-2 self-center ">
      <div v-if="step?.image && !showModal" class="text-center relative h-[25vh]">
        <SanityImage :asset-id="step?.image?.asset?._ref" class="mx-auto absolute inset-0 w-full h-full object-contain"
                     auto="format"/>
      </div>
      <WorkflowContent :blocks="step?.content" class="" layout="heading"/>

    </div>
  </div>
  <div v-else-if="step.layout === 'section'"
       :class="['h-full flex items-end pb-lg', step.theme === 'green' ? 'text-black' :'text-white'  ]">
    <div class="grid auto-rows-min grid-cols-12">
      <div class="text-xl col-span-10">
        <p class="font-mono text-fix-mono font-bold">0{{ currentSectionNumber }}</p>
        <h2 class="text-display-1 font-semibold col-span-12">
          {{ step.title }}
        </h2>
      </div>

      <div class="text-lead col-span-12 lg:col-span-8 2xl:col-span-6">
        <SanityContent :blocks="step.content"></SanityContent>
      </div>
    </div>

  </div>
  <div v-else-if="step.layout === 'options'" class=" flex w-full h-full items-center justify-center">
    <div class="border-black border-2 max-w-screen-sm w-full mx-auto h-[50vh] bg-white overflow-hidden ">
      <div class="bg-black text-white pl-sm h-8 flex w-full items-center">
        <h3 class="font-mono font-bold text-fix-mono uppercase ">
          <template v-if="step.label">{{ label }}</template>
          <template v-else>Optional steps you could use</template>
        </h3>
      </div>
      <div class="flex-grow flex-shrink max-h-full overflow-scroll scrollbar-none pb-8">
        <WorkflowAccordion v-for="item in step.options" v-bind="item" :open="activeTab === item._key" :key="item._key"
                           @toggle="activeTab = (activeTab === item._key ? null :item._key)"/>
      </div>
    </div>
  </div>
  <div v-else> {{ step.layout }}</div>
</template>

<script setup lang="ts">
import {Step} from '../../types'
import {useWorkflowsStore} from "~/store/workflows";
import {storeToRefs} from "pinia";
import {computed, resolveComponent} from "#imports";

const workflowsStore = useWorkflowsStore()
const {selectedItem, showModal} = storeToRefs(workflowsStore)
const props = defineProps<{ step: Step }>()

const activeTab = ref(props.step.options?.length ? props.step.options[0]._key : null)

function unselectItem() {
  workflowsStore.setSelectedItem(null)
}

const currentSectionNumber = computed(() => {
  return workflowsStore.prevSteps.filter(i => i.layout === 'section').length + 1
})

function prevStep() {
  if (selectedItem.value) {
    unselectItem()
  } else {
    workflowsStore.goBack()
  }
}

</script>

<style scoped lang="scss">
.modal-enter-active,
.modal-leave-active {
  transition: all 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: translateY(100%);
}


.step-label {
  @apply bg-primary text-fix-mono font-mono font-bold absolute p-1 top-0 left-0 uppercase text-white select-none
}
</style>