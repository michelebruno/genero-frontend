<template>
  <div ref="rootEl"
       :class="['inline-block bg-white border min-h-full self-stretch text-left w-full',
        selected ? '!border-primary cursor-pointer': disabled ? 'bg-opacity-20 bg-black text-grey-50 cursor-default': 'border-black cursor-pointer']">
    <div role="button"
         :class="['h-full flex flex-wrap text-left p-sm', selected && '!bg-primary bg-opacity-20', disabled && 'text-gray-400']"
         @click="!disabled && workflowStore.setSelectedItem(selected ? null : _id)">
      <div>
        <div class="flex gap-x-2 text-2xl">
          <input type="radio" class="h-5 aspect-square mt-1.5" :aria-selected="selected" :checked="selected"/>
          <h3 class="font-semibold mb-2 w-full">{{ shortTitle || title }}</h3>
        </div>
        <WorkflowContent v-if="content" :blocks="content" layout="small" :class="[disabled && 'prose-p:!text-gray-400']"/>
        <p v-else-if="description"  :class="[disabled && 'prose-p:!text-gray-400']">
          {{description}}
        </p>
      </div>
      <div v-if="disabled"
           class="flex items-start gap-x-2 justify-between font-mono font-bold uppercase text-primary  bg-opacity-100 leading-none">
        <p>⚠</p>
        <p>You can't use this
          because you
          chose to
          {{ workflowStore.getItem(item.hiddenIf[0]).title }}</p>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">

import {useWorkflowsStore} from "~/store/workflows";
import {computed, watch} from "#imports";
import {Item} from "~/types";
import {ComputedVariable} from "vue/macros";

const workflowStore = useWorkflowsStore()

const props = defineProps<{
  title?: string,
  shortTitle?: string,
  description?: string,
  content?: object,
  hiddenIf?: object,
  slug: {
    current: string
  },
  _id: string,
}>()

const rootEl = ref<null | Element>(null)

const item: ComputedVariable<Item | null> = computed(() => workflowStore.getItem(props._id))

const disabled = computed(() => {
  return workflowStore.wasItChosen(item.value.hiddenIf)
})

const selected = computed(() => workflowStore.isItemSelected(props._id))

watch(selected, () => selected.value && rootEl.value?.scrollIntoView({behavior: 'smooth', block: 'start'}))

</script>

<style scoped>

</style>