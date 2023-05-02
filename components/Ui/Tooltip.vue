<template>
  <div class="pb-sm absolute top-0 -translate-y-full">

    <div class="tooltip">
      <slot/>
      <i></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tooltip"
}
</script>

<style scoped lang="scss">

.tooltip {
  @apply bg-white relative text-red-500 border-2 border-current py-2 -translate-x-full;
  min-width: 200px;
}

.tooltip:before {
  @apply absolute  left-1/2 bg-white h-4 w-4 rotate-45 -translate-y-1/2 ;
  content: "";
  top: -webkit-calc(); /*may require prefix for old browser support*/
  top: calc(100%); /*i.e. half the height*/

  border-bottom: inherit;
  border-right: inherit;
  box-shadow: inherit;
}
</style>