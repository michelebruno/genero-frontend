<template>

  <div class="">
    <div class="h-step py-10 flex flex-col justify-between">
      <div v-if="!step.type || step.type === 'choose' || step.type === 'know'">

        <CommonCode class="text-xl">Step #{{ currentStepIndex + 1 }}</CommonCode>
        <h2 class="text-4xl font-semibold mb-4">
          {{ step.title }}
        </h2>


        <div class="text-lg mb-8">
          <SanityContent :blocks="step.content" :serializers="serializers"></SanityContent>
        </div>

        <div v-if="step.type === 'choose' || !step.type" class="grid grid-cols-9 gap-10">
          <Transition name="slide-fade">
            <div v-if="selectedItem" class="col-span-6 my-12   bg-primary-light">
              <h3 class="font-bold text-3xl mb-3  whitespace-pre-line">
                {{ selectedItem.title }}
                <button class="font-mono text-gray-500" @click="unselectItem">X</button>
              </h3>
              <div v-if="selectedItem.content && selectedItem.content.length" class="">
                <SanityContent :blocks="selectedItem?.content" :serializers="serializers"/>

              </div>
              <div v-else>
                <CommonCode>Nessuna descrizione per questo item.</CommonCode>
              </div>

            </div>

            <div class="my-12 col-span-6 xl:col-span-3" v-else>
              <CommonCode>
                Select an option
              </CommonCode>
              <WorkflowItem v-for="item in step.items" v-bind="getItem(item)" class="mt-6 "/>
            </div>
          </Transition>

        </div>
        <div v-else-if="step.type === 'know'">

          <template v-for="item in step.items">
            <UiAccordion :title="getItem(item).title">
              <SanityContent :blocks="getItem(item).content" :serializers="serializers"></SanityContent>
            </UiAccordion>

          </template>

        </div>
      </div>

      <template v-else-if="step.type === 'text'">
        <div></div>

        <div class="grid grid-cols-9 gap-10">

          <div class="font-semibold text-3xl col-span-6">
            <SanityContent :blocks="step.content" :serializers="serializers"/>
          </div>
        </div>
      </template>
      <div class="flex justify-between w-full">
        <div>

          <button v-if="currentStepIndex !== 0 || selectedItem"
                  :class="['border p-2 border-primary aspect-square inline-block' ]"
                  @click="prevStep">←
          </button>
        </div>
        <UiButton
            :title='canMoveOn ? "Select an item to go on" : undefined ' primary
            :disabled="!canMoveOn" @click="nextStep">Next →
        </UiButton>
      </div>
    </div>

  </div>

</template>

<script setup lang="ts">
import {Step} from '../../types'
import {useWorkflowsStore} from "~/store/workflows";
import {storeToRefs} from "pinia";
import {PortableTextMarkDefinition} from "@portabletext/types";
import {resolveComponent} from "#imports";

const workflowsStore = useWorkflowsStore()
const {getItem, nextStep, flows, setCurrentFlow, currentStepIndex} = workflowsStore
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