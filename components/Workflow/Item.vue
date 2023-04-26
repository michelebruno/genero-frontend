<template>
  <div ref="rootEl"
       :class="['cursor-pointer inline-block bg-white border-2 min-h-full self-stretch text-left w-full', selected && '!border-primary']">
    <div role="button"
         :class="['h-full text-left  p-sm ', selected && ' !bg-primary bg-opacity-10']"
         @click=" workflowStore.setSelectedItem(selected ? null : _id)">

      <div class="flex gap-x-2 text-2xl">
        <input type="radio" class="h-5 aspect-square mt-1.5" :aria-selected="selected" :checked="selected"/>
        <h3 class="font-semibold mb-2 w-full">{{ shortTitle || title }}</h3>
      </div>
      <p v-if="description">{{ description }}</p>
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
  slug: {
    current: string
  },
  _id: string,
}>()

const rootEl = ref<null | Element>(null)

const item: ComputedVariable<Item> = computed(() => workflowStore.getItem(props.value._id))

const disabled = computed(() => workflowStore.wasItChosen(item.hiddenIf))

const selected = computed(() => workflowStore.isItemSelected(props._id))

watch(selected, () => selected.value && rootEl.value?.scrollIntoView({behavior: 'smooth', block:'start'}))
</script>

<style scoped>

</style>