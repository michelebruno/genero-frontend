<template>
  <div :class="['relative', isWorkflow && 'workflow-wrapper', store.theme==='dark' && 'bg-primary']">

    <nav v-if="isWorkflow" :class="store.theme === 'dark' && 'text-white'">
      <div id="logo-wrapper">
        <GeneroLogo/>
      </div>
    </nav>
    <nav v-else>
      <div id="logo-wrapper">
        <GeneroLogo/>
      </div>
    </nav>
    <NuxtPage/>

    <div id="noise-wrapper">
      <div id="noise-animation"></div>
    </div>
  </div>
</template>

<script setup>

import {useStore} from "../store/store";

const route = useRoute();
const store = useStore()

const isWorkflow = !!route.params.slug

onBeforeRouteLeave(() => store.setLightTheme())

</script>

<style scoped lang="scss">
#noise-wrapper {
  inset: 0;

  pointer-events: none;
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
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

#logo-wrapper {
  @apply h-6 w-auto;

  svg {
    @apply block h-full w-auto
  }
}

nav {
  @apply py-sm px-md flex w-full justify-between
}


.workflow-wrapper {
  @apply w-full h-screen flex flex-wrap;
  & > * {
    @apply w-full flex-shrink-0 flex-grow;
  }
}
</style>