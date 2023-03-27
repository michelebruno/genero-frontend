<template>
  <component is="button"
             :class="['border p-2 border-primary', primary && ' hover:bg-primary hover:bg-opacity-50',
             disabled && 'opacity-50']" :disabled="disabled"
  >
    <slot/>
  </component>
</template>

<script setup lang="ts">
interface ButtonProps {
  primary?: Boolean,
  disabled?: Boolean,
}

const {primary,disabled} = defineProps<ButtonProps>()
</script>

<style scoped>

</style>