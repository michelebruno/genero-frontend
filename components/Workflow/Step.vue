<template>
  <div class="border-primary border-2 p-md flex flex-col h-full pt-xl relative gap-y-md auto-rows-min"
       v-if="step.layout === 'choose'">
    <div class="grid grid-cols-12">
      <div class="col-span-6 col-start-4 text-center w-full">
        <h2 class="text-display-2 font-bold mb-sm">{{ step.title }}</h2>
        <div class="prose prose-p:text-lead prose-p:my-sm max-w-full">
          <SanityContent :blocks="step.content"/>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-12 w-full flex-shrink-0 flex-grow">
      <div class="col-span-12 relative flex items-center w-full my-lg">
        <Transition name="modal" mode="out-in">
          <SanityImage v-if="step?.image && !showModal" :asset-id="step?.image?.asset._ref"
                       class="mx-auto absolute inset-0 object-contain w-full h-full" auto="format"/>
          <div v-else-if="showModal"
               class="bg-white border-2 border-primary max-w-screen-lg mx-auto min-h-[30ch] absolute left-0 right-0">

            <div class="bg-primary text-white px-md py-sm">

              <h3 class="font-mono text-fix-mono font-bold mb-sm uppercase !mb-0">
                CHOOSE ONE OF THESE METHODS <span class="text-red-600">*</span>
              </h3>

            </div>
            <div class="flex gap-x-md p-md">
              <WorkflowItem v-for="item in step.items" v-bind="item"/>
            </div>
          </div>
        </Transition>

      </div>

    </div>
  </div>
  <div v-else-if="step.layout === 'know'" class="border-primary border-2 p-lg grid grid-cols-12 h-full">
    <div class="col-span-6 col-start-4 text-center">
      <h2 class="text-7xl font-bold mb-sm">{{ step.title }}</h2>
      <div class="prose prose-p:text-lead prose-p:my-0 max-w-full">
        <SanityContent :blocks="step.content"/>
      </div>
    </div>

  </div>
  <div v-else-if="step.layout === 'text'" class="border-primary border-2 p-lg grid grid-cols-12 h-full relative">
    <div v-if="step.label" class="bg-primary text-white font-mono text-fix-mono">{{ step.label }}</div>
    <div class="col-span-12 2xl:col-span-10 2xl:col-start-2 self-center">
      <div v-if="step?.image && !showModal" class="text-center">
        <SanityImage :asset-id="step?.image?.asset._ref" class="mx-auto" auto="format"/>
      </div>
      <div class="prose prose-p:font-semibold prose-p:text-h2 text-center max-w-full text-black prose-p:my-0">
        <SanityContent :blocks="step.content" :serializers="serializers"/>
      </div>
    </div>
  </div>
  <div v-else-if="step.layout === 'section'" class="h-full flex items-end text-white pb-lg">
    <div class="grid auto-rows-min grid-cols-12">
      <div class="text-xl col-span-2">
        <p class="font-mono text-fix-mono font-bold">0{{ currentSectionNumber }}</p>
      </div>
      <h2 class="text-display-1 font-semibold col-span-12 pb-sm">
        {{ step.title }}
      </h2>
      <div class="text-lead col-span-12 lg:col-span-8 2xl:col-span-6">
        <SanityContent :blocks="step.content"></SanityContent>
      </div>
    </div>

  </div>
  <div v-else-if="step.layout === 'options'" class=" flex w-full h-full items-center justify-center">
    <div class="border-black border-2 max-w-screen-sm w-full mx-auto h-[50vh] bg-white overflow-hidden ">
      <div class="bg-black text-white pl-sm h-8 flex w-full items-center">
        <h3 class="font-mono font-bold text-fix-mono uppercase ">Optional steps you could use</h3>
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

const serializers = {
  marks: {
    // This is how to access a component registered by `@nuxt/components`
    editable: resolveComponent('CommonEditable'),
    code: resolveComponent('CommonCode'),
  },

}
</script>

<style scoped lang="scss">
.modal-enter-active,
.modal-leave-active {
  transition: all 0.5s ease;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

</style>