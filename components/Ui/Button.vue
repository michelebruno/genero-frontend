<template>
  <component is="button"
             :class="[
                'border-2 p-2 border-black uppercase font-mono text-fix-mono font-bold', primary && 'text-white hover:bg-opacity-90' , primary && (theme ==='dark'?'bg-black':'bg-primary'),
               disabled && 'opacity-50 !text-gray'
             ]" :disabled="disabled"
  >
    <slot/>
  </component>
</template>

<script setup lang="ts">
type ButtonProps = {
  primary: Boolean,
  disabled: Boolean,
  theme?: 'black'
}

const {primary, disabled, theme} = defineProps({
  primary: Boolean,
  disabled: Boolean,
  theme: 'black'
})
</script>

<style scoped>

</style>