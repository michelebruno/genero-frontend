<template>
<div class="absolute -z-10 inset-0">
  <img src="~assets/images/bg.png" />
</div>
</template>

<script>
export default {
  name: "Background"
}
</script>

<style scoped>
img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: fill;
  opacity: .3;

}
</style>