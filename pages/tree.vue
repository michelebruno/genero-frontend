<template>
  <table>
    <tr>
      <td></td>
    </tr>
  </table>

  <div class="p-8">
    <div v-for="topic in [...topics, undefined]" class="py-2 ">
      <h2 class="text-2xl font-bold">{{ topic?.title || "No topic" }}</h2>

      <ul class="px-2">
        <table class="table-auto table ">
          <tbody>
          <tr v-for="[input,fs] in Array.from(getInputMap(getTopicFlows(topic)))" class="table table-auto">
            <td class="p-4 border-black border">
              {{ input }}
            </td>
            <td class="p-4 border-black border">
              <ul>
                <li v-for="f in fs">{{ f.title }}</li>
              </ul>
            </td>
          </tr>
          </tbody>
        </table>
      </ul>
    </div>
  </div>

</template>

<script setup>
import {useWorkflowsStore} from "../store/workflows";
import {storeToRefs} from "pinia";

const workflowStore = useWorkflowsStore()
const {flows, inputs, topics} = storeToRefs(workflowStore)

function getTopicFlows(topic) {
  return flows.value.filter(f => topic ? f?.topics?.map(t => t._ref).includes(topic._id) : !f.topics)
}

function getInputMap(flows) {
  const map = new Map

  for (const flow of flows) {
    if (!flow.inputs?.length) {
      map.set('no-input', [...(map.get('no-input') || []), flow]);
    } else {

      for (const input of flow.inputs) {
        const inputTitle = inputs.value?.find(i => i._id === input._ref)?.title
        map.set(inputTitle, [...(map.get(inputTitle) || []), flow])
      }
    }
  }

  return map
}

</script>

<style scoped>

</style>