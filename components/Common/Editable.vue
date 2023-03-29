<template>
  <span class="text-gray-500" contenteditable @change=" value = $event.target.value">{{ value }}</span>
</template>

<script setup>

import {useWorkflowsStore} from "../../store/workflows";
import {storeToRefs} from "pinia";




const workflowsStore = useWorkflowsStore()
const {editableFields} = storeToRefs(workflowsStore)
const {id} = defineProps(['id'])

const slots = useSlots()


function sostituisciVariabili(testo, obj) {
  return testo.replace(/\{\{(\w+)\}\}/g, function(match, nomeVariabile) {
    return editableFields.value.has(nomeVariabile) ? editableFields.value.get(nomeVariabile) : match;
  });
}

const defaultValue = sostituisciVariabili(slots.default()[0].children)

if (!editableFields.value.has(id)) {
  editableFields.value.set(id, defaultValue)
}

const value = computed({
  get: () => editableFields.value.get(id),
  set: v => editableFields.value.set(id, v)
})


</script>

<style scoped>
@keyframes cursor-blink {
  0% {
    opacity: 0;
  }
}

span::after {
  @apply bg-primary;

  /*code commented for brevity*/
  animation: cursor-blink 1.5s steps(2) infinite;

  content: "";
  width: 5px;
  height: 20px;
  display: inline-block;
}
</style>