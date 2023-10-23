<template>
  <div v-if="showContent" class="background" @click="handleHide"></div>
  <div :class="`container ${showContent ? 'show' : ''}`">
    <slot name="content"></slot>
  </div>
  <slot name="trigger" :clickHandler="handleShow"></slot>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps(['show'])

const showContent = ref(false)

watch(
  () => props.show,
  (newValue) => {
    showContent.value = newValue
  }
)

const handleShow = () => {
  showContent.value = true
}

const handleHide = () => {
  showContent.value = false
}
</script>

<style scoped lang="scss">
.container {
  z-index: 10;
  position: fixed;
  background-color: white;
  height: 100%;
  max-width: fit-content;
  width: 85%;
  top: 0;
  left: 0;

  opacity: 0;
  transform: translateX(-100%);
  transition: all 0.75s ease;

  &.show {
    transform: translateX(0);
    opacity: 1;
  }

  @media (min-width: 768px) {
    display: none;
  }
}

.background {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.2;
  top: 0;
  left: 0;

  @media (min-width: 768px) {
    display: none;
  }
}
</style>
