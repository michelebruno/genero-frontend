<template>

  <header class="mx-md grid grid-cols-12 gap-x">
    <h1 class="col-span-8 text-display-2 text-primary font-bold">
      <span class="text-fix-mono font-mono">
              <slot></slot>
      </span>
    </h1>
    <div v-if="$slots.description" class="col-span-8">
      <slot name="description"/>
    </div>
  </header>
</template>

<script>

</script>

<style scoped>

</style>