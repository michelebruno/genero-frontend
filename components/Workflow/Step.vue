<template>

  <div class="border-primary border-2 p-md grid grid-cols-12 h-full " v-if="step.type === 'choose'">
    <div class="col-span-6 col-start-4 text-center">
      <h2 class="text-7xl font-bold mb-sm">{{ step.title }}</h2>
      <div class="prose prose-p:text-xl prose-p:my-0 max-w-full">
        <SanityContent :blocks="step.content"/>
      </div>
    </div>

    <div class="col-span-12">
      <div class="bg-white border-2 border-primary">

        <div class="bg-primary text-white px-md py-sm">

          <h3 class="font-mono text-fix-mono font-bold mb-sm uppercase !mb-0">
            CHOOSE ONE OF THESE METHODS
          </h3>

        </div>
        <div class="flex gap-x-md p-md">
          <WorkflowItem v-for="item in step.items" v-bind="getItem(item)"/>
        </div>
      </div>

    </div>
  </div>
  <div v-else-if="step.type === 'text'" class="border-primary border-2 p-lg grid grid-cols-12 h-full ">
    <div class="col-span-10 col-start-2 self-center">
      <div class="prose prose-p:font-semibold prose-p:text-display-2 text-center max-w-full text-black prose-p:my-0">
        <SanityContent :blocks="step.content" :serializers="serializers"/>
      </div>
    </div>
  </div>
  <div v-else-if="step.type === 'section'" class="h-full flex items-end px-lg bg-primary text-white pb-lg">

    <div class="grid auto-rows-min grid-cols-12">

      <div class="text-xl col-span-2">
        <p class="font-mono text-fix-mono">01</p>
      </div>
      <h2 class="text-display-1 font-semibold col-span-12">
        {{ step.title }}
      </h2>
      <div class="text-lead col-span-6">
        <SanityContent :blocks="step.content"></SanityContent>
      </div>
    </div>

  </div>
  <div v-else-if="step.type === 'know'" class="bg-primary flex w-full items-center justify-center">
    <div class="border-black border-2">
      <div class="bg-black text-white pr-md"><h3 class="font-mono text-fix-mono uppercase">Optional steps you could use</h3></div>
      <div>
        <div v-for="item in step.items">
          <h4>{{item.title}}</h4>
        </div>
      </div>
    </div>


  </div>
  <div v-else> {{ step.type }}</div>
</template>

<script setup lang="ts">
import {Step} from '../../types'
import {useWorkflowsStore} from "~/store/workflows";
import {storeToRefs} from "pinia";
import {resolveComponent} from "#imports";

const workflowsStore = useWorkflowsStore()
const {getItem} = workflowsStore
const {selectedItem, canMoveOn} = storeToRefs(workflowsStore)
const {step} = defineProps<{ step: Step }>()

function unselectItem() {
  workflowsStore.setSelectedItem(null)

}

function prevStep() {
  if (selectedItem.value) {
    unselectItem()
  } else {
    workflowsStore.prevStep()
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

<style scoped>

</style>