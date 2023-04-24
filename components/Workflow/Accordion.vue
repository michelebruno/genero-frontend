<template>

  <div class="bg-white">
    <div class="p-sm border-black border-b-2 flex justify-between w-full" @click="$emit('toggle')">
      <p class="font-mono font-bold text-fix-mono uppercase">
        {{ title }}
      </p>
    </div>
    <div class="p-sm bg-white text-black grid gap-y-4 border-b border-black" v-show="props.open">
      <h3 class="text-display-2 font-semibold">
        {{ title }}
      </h3>
      <div class=" text-lead">
        <SanityContent :blocks="content"/>
      </div>
      <div class="text-right">
        <UiButton @click="handleClick" :primary="isAdded">
          <template v-if="!isAdded">
            Add to the flow >
          </template>
          <template v-else>
            Added
          </template>
        </UiButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">


import {useWorkflowsStore} from "~/store/workflows";
import {SanityReference} from "@sanity/client";

const workflowStore = useWorkflowsStore()

const emit = defineEmits(['toggle']);

const props: {
  step: SanityReference
} = defineProps<{
  selected?: boolean,
  title: string,
  content: object
  step: object,
  open: boolean
}>()


const isAdded = computed(() => {
  return workflowStore.nextSteps.find(n => n._id === props.step?._ref)
})

function handleClick() {
  if (isAdded.value) {
    workflowStore.nextSteps.splice(
        workflowStore.nextSteps.findIndex(n => n._id === props.step?._ref),
        1
    )
  } else workflowStore.nextSteps.splice(1, 0, workflowStore.getItem(props.step?._ref))
}
</script>

<style scoped>

</style>