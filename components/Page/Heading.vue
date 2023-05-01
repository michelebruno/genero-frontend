<template>

  <header class="grid grid-cols-12 gap-x pt-lg pb-xl mt-navbar px-outsides">
    <h1 class="col-span-8 xl:col-start-3 text-display-1 text-primary font-bold text-center uppercase text-center">
      <span class="text-fix-mono font-mono">
              <slot></slot>
      </span>
    </h1>
    <div v-if="$slots.description" class="col-span-8 xl:col-start-3 text-lead text-justify">
      <slot name="description"/>
    </div>
  </header>
</template>

<script>

</script>

<style scoped>

</style>