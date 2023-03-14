<template>

  <div class="grid grid-cols-12 gap-6 max-w-screen-2xl px-8">
    <div class="col-span-12">
      <h2 class="text-3xl font-bold">
        {{ title }}
      </h2>
    </div>
    <div class="col-span-4 grid gap-y-4">
      <WorkflowItem v-for="item in items" v-bind="getItem(item)"/>
      <div class="border-b border-black"></div>
      <div>
        <button :class="['border p-2 border-primary', canMoveOn ? ' hover:bg-primary hover:bg-opacity-50':'cursor-ew-resize']"
                :disabled="canMoveOn">Next ->
        </button>
      </div>
    </div>
    <div class="col-span-8">
      <WorkflowTab/>
    </div>
  </div>
</template>

<script setup lang="ts">

import {useWorkflowsStore} from "~/store/workflows";
import {storeToRefs} from "pinia";
import {useAsyncData} from "#app";

const workflowsStore = useWorkflowsStore()
const {getItem} = workflowsStore
const {data} = await useAsyncData('items', workflowsStore.fetchItems)
const {currentStep, canMoveOn} = storeToRefs(workflowsStore)

const {items, title, description} = currentStep.value

</script>

<style scoped>

</style>