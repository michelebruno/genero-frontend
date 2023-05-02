<template>
  <div
      :class="['prose prose-p:my-0 max-w-full',
      !props.layout && 'prose-p:text-lead ',
      props.layout === 'heading' && 'prose-p:font-semibold prose-p:text-h2 text-center max-w-full text-black prose-p:my-0',
      props.layout === 'small' && ' prose-p:text-sm prose-p:leading-normal  max-w-full text-black prose-p:my-0',
      props.layout === 'normal' && ' prose-p:text-[20px] prose-p:leading-tight max-w-full text-black prose-p:my-0'
      ]">
    <SanityContent :blocks="props.blocks" :serializers="serializers"/>
  </div>
</template>

<script setup lang="ts">
import {resolveComponent} from "#imports";

const props = defineProps(['blocks', 'serializers', 'layout'])

const fullSerializers = ref(props.serializers || undefined)

const serializers = {
  marks: {
    // This is how to access a component registered by `@nuxt/components`
    editable: resolveComponent('CommonEditable'),
    code: resolveComponent('CommonCode'),
  },
}

</script>

<style scoped>

</style>