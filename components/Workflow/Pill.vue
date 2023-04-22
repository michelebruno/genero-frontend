<template>
  <div :class="['rounded-xl border border-current py-1 px-2',
  props.type === 'default' && 'border-black',
  props.type === 'next' && 'border-dashed text-gray'
  ]">
    <slot/>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  type?: 'default' | 'next' | 'active'
}>(), {
  type: 'default',
})

</script>

<style scoped>

</style>