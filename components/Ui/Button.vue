<template>
  <component is="button"
             :class="['border p-2 border-black', primary && 'bg-primary text-white hover:bg-opacity-50',
             disabled && 'opacity-50 !text-gray']" :disabled="disabled"
  >
    <slot/>
  </component>
</template>

<script setup lang="ts">
type ButtonProps = {
  primary?: Boolean,
  disabled?: Boolean,
}

const {primary, disabled} = defineProps<ButtonProps>()
</script>

<style scoped>

</style>