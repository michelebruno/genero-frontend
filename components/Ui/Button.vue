<template>
  <component is="button" @mouseenter="handleMouseEnter" @mouseleave="showDisabled = false"
             :class="[
                'border p-2 group border-black font-mono text-fix-mono font-bold relative', primary && 'text-white hover:bg-opacity-90' , primary && (theme ==='dark'?'bg-black':'bg-primary'),
               disabled && '!bg-opacity-30 !text-gray'
             ]" :disabled="disabled"
  >
    <UiTooltip v-if="disabled?.text && showDisabled">
      {{ disabled?.text }}
    </UiTooltip>
    <span class="uppercase">
          <slot/>

    </span>

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

const showDisabled = ref(false)

function handleMouseEnter() {
  showDisabled.value = !!disabled
}
</script>

<style scoped>

</style>