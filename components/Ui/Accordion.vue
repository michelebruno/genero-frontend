<template>
  <div class="border-b border-gray-600 pt-8">
    <div class="header flex justify-between text-2xl font-semibold mb-4" @click="handleToggle">
      <h3 class="font-semibold">{{ title }}</h3>
      <button>
        X
      </button>
    </div>
    <div v-show="status" class="mb-4">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const {title} = defineProps({
  title: String,

})

const emit = defineEmits(['toggle', 'open', 'close'])

const status = useState('status' + title)

function handleToggle() {
  const newState = !status.value

  emit('toggle', newState)
  emit(newState ? 'open' : 'close')

  return status.value = newState
}
</script>

<style scoped>

</style>