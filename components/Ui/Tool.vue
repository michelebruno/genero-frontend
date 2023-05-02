<template>
  <div class="border-2 border-primary flex flex-col text-left flex-wrap gap-sm p-sm  text-[18px] group">
    <div class="font-mono font-bold">
      <h3 class="text-fix-mono">{{ props.title }}</h3>
    </div>
    <p class="w-full text-left flex-grow">{{ props.shortDescription }}</p>

    <div class="flex w-full justify-between font-mono font-bold ">
      <div class="text-primary">
        ({{ category || 'Web app' }})
      </div>
      <div class="uppercase g">
        <a :href="props.link" class="group-hover:underline">Open ↗</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string,
  shortDescription: string,
  link: string,
  category: string
}>()
</script>

<style scoped>

</style>