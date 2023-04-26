<template>

  <div class="bg-white">
    <div class="p-sm gap-sm border-black border-b-2 flex items-center w-full" @click="$emit('toggle')">
      <div :class="[open && 'rotate-180', '']">
        <svg viewBox="0 0 16 16" fill="none" class="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M1.33073 3.99505L1.33073 1.33203L3.32799 1.33203L3.32799 3.99505L4.6595 3.99505L4.6595 6.66719L6.00013 6.66719L6.00013 9.33021L7.33164 9.33021L7.33164 12.0023L8.66315 12.0023L8.66315 9.33021L9.99466 9.33021L9.99466 6.66719L11.3353 6.66719L11.3353 3.99505L12.6668 3.99505L12.6668 1.33203L14.6641 1.33203L14.6641 3.99505L13.3326 3.99505L13.3326 6.66719L12.001 6.66719L12.001 9.33021L10.6695 9.33021L10.6695 12.0023L9.32891 12.0023L9.3289 14.6654L6.66589 14.6654L6.66589 12.0023L5.32526 12.0023L5.32526 9.33021L3.99375 9.33021L3.99375 6.66719L2.66224 6.66719L2.66224 3.99505L1.33073 3.99505Z"
              fill="black"/>
        </svg>
      </div>
      <p class="font-mono font-bold text-xl text-fix-mono uppercase">
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
  } else {
    const addThisItem = workflowStore.getStep(props.step?._ref);
    console.log(addThisItem)
    workflowStore.nextSteps.splice(1, 0, addThisItem)
  }
}
</script>

<style scoped>

</style>