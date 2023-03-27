<template>

  <div class="">
    <div class="h-step py-10 flex flex-col justify-between">
      <div v-if="!step.type || step.type === 'choose'">

        <UiCode class="text-xl">Step #{{currentStepIndex+1}}</UiCode>
        <h2 class="text-4xl font-semibold mb-4">
          {{ step.title }}
        </h2>


        <div class="text-lg mb-8">
          <SanityContent :blocks="step.content"></SanityContent>
        </div>

        <div v-if="step.type === 'choose'">
          <Transition name="slide-fade">
            <div v-if="selectedItem">
              <h3 class="font-bold text-3xl mb-3">
                {{ selectedItem.title }}
              </h3>
              <div v-if="selectedItem.content && selectedItem.content.length">
                <SanityContent :blocks="selectedItem?.content" :serializers="serializers"/>

              </div>
              <div v-else>Non c'è nnulla qui</div>

            </div>

            <div class="my-8" v-else>
              <UiCode >
                Select an option
              </UiCode>
              <WorkflowItem v-for="item in step.items" v-bind="getItem(item)" class="mt-4 "/>
            </div>
          </Transition>

        </div>
        <div v-else-if="step.type === 'know'">

        </div>
      </div>

      <template v-else-if="step.type === 'text'">
        <div></div>

        <div class="font-semibold text-3xl">
          <SanityContent :blocks="step.content" />
        </div>
      </template>
      <div class="flex justify-between w-full">
        <div>

          <button v-if="currentStepIndex !== 0 || selectedItem"
              :class="['border p-2 border-primary' ]"
              @click="prevStep">← Prev
          </button>
        </div>
        <button
            :class="['border p-2 border-primary', canMoveOn ? ' hover:bg-primary hover:bg-opacity-50':'opacity-50']"
            :disabled="!canMoveOn" @click="nextStep">Next →
        </button>
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
const {selectedItem} = storeToRefs(workflowsStore)
const {step} = defineProps<{ step: Step }>()

const hasItems = step.items?.length

const canMoveOn = computed(() => !hasItems || !!selectedItem.value)

function prevStep() {
  if (selectedItem.value) {
    workflowsStore.setSelectedItem(null)
  } else {
    workflowsStore.prevStep()
  }
}

const serializers  = {
  marks: {
    code: resolveComponent('UiCode')
  }
}
</script>

<style scoped>

</style>