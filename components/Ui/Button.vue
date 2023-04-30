<template>
  <component is="button"
             :class="[
                'border p-2 group border-black uppercase font-mono text-fix-mono font-bold relative', primary && 'text-white hover:bg-opacity-90' , primary && (theme ==='dark'?'bg-black':'bg-primary'),
               disabled && 'opacity-50 !text-gray'
             ]" :disabled="disabled"
  >
    <div v-if="disabled?.text" class="absolute top-0 right-0 w-auto -translate-y-full bg-red-200 group-hover:block hidden p-sm normal-case  text-orange-700 border-current border-2 font-mono font-bold">
      {{ disabled?.text }}
    </div>
    <slot/>
  </component>
</template>

<script setup lang="ts">
type ButtonProps = {
  primary: Boolean,
  disabled: Boolean | {
    text: string
  },
  theme?: 'black',
}

const {primary, disabled, theme} = defineProps({
  primary: Boolean,
  disabled: Boolean,
  theme: 'black'
})
</script>

<style scoped>

</style>