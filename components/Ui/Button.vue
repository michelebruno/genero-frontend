<template>
  <component is="button" @mouseenter="handleMouseEnter" @mouseleave="showDisabled = false"
             :class="[
                'border p-2 group border-black uppercase font-mono text-fix-mono font-bold relative', primary && 'text-white hover:bg-opacity-90' , primary && (theme ==='dark'?'bg-black':'bg-primary'),
               disabled && '!bg-opacity-30 !text-gray'
             ]" :disabled="disabled"
  >
    <div v-if="false && disabled?.text && showDisabled"
         class="absolute -top-4 right-0 w-40 leading-none inline-block break-normal -translate-y-full bg-red-200 bg-opacity-100 group-hover:block hidden p-sm normal-case  text-orange-700 border-current border-2 font-mono font-bold">
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

const showDisabled = ref(false)

function handleMouseEnter() {
  console.log('entered')
  showDisabled.value = !!disabled
}
</script>

<style scoped>

</style>