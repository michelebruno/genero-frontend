<template>
  <div :class="['rounded-xl border border-current py-1 px-2',
  props.style === 'default' && 'border border-black',
  props.style === 'next' && 'border-dashed text-grey'
  ]">
    <slot/>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  style?: 'default' | 'next' | 'active'
}>(), {
  style: 'default',
})

</script>

<style scoped>

</style>