<template>
  <div :class="['rounded-xl border border-current text-sm py-1 px-2 cursor-default select-none',
  props.layout === 'default' && 'border-black',
  props.layout === 'prev' && 'bg-gray-100 text-gray-400',
  props.layout === 'active' && 'text-white bg-primary',
  props.layout === 'next' && 'border-dashed text-gray'
  ]">
    <slot/>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  layout?: 'default' | 'next' | 'active' | 'prev',
}>(), {
  layout: 'default',
})

</script>

<style scoped>

</style>