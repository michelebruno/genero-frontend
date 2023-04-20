<template>

  <div class="bg-white">
    <div class="p-sm border-black border-b-2" @click="toggleAccordion">
      <p class="font-mono font-bold text-fix-mono uppercase">
        {{ title }}
      </p>
    </div>
    <div class="p-sm bg-white text-black grid gap-y-4 border-b border-black" v-show="isOpen">
      <h3 class="text-display-2 font-semibold">
        {{ title }}
      </h3>
      <div class=" text-lead">
        <SanityContent :blocks="content"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const isOpen = ref(false)

const props = defineProps<{
  selected?: boolean,
  title: string,
  content: object
}>()

function toggleAccordion() {
  isOpen.value = !isOpen.value
}
</script>

<style scoped>

</style>