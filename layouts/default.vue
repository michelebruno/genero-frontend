<template>
  <div class="relative">

    <nav v-if="isWorkflow" class="px-md">

    </nav>
    <NuxtPage/>

    <div id="noise-wrapper">
      <div id="noise-animation"></div>
    </div>
  </div>
</template>

<script setup>
const isWorkflow = ref(true)

</script>

<style scoped>
#noise-wrapper {
  inset: 0;

  pointer-events: none;
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  pointer-events: none;
  z-index: 1000000;
}

#noise-animation {
  animation: 3s steps(6) 0s infinite normal none running noise;

  width: calc(100% + 20rem);
  height: calc(100% + 20rem);
  background-position: 50% center;
  position: absolute;
  z-index: 10;
  pointer-events: none;
  left: -10rem;
  top: -10rem;
  background-image: url(~/assets/images/noise.webp);
  background-size: 10% 10%;
}

@keyframes noise {

  0%, 100% {
    transform: translate(0px, 0px);
  }

  10% {
    transform: translate(-5rem, -5rem);
  }
  30% {
  }
  50% {
    transform: translate(10rem, 10rem);
  }
  70% {
    transform: translate(9rem, 3rem);
  }
  90% {
    transform: translate(-1rem, 7rem);
  }
}
</style>