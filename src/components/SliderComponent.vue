<template>
  <fieldset>
    <label :for="id">
      {{ label }}
      <span>{{ formattedPrice(sliderValue[0]) }} - {{ formattedPrice(sliderValue[1]) }}</span>
    </label>
    <Slider
      v-bind="$props"
      class="slider"
      :value="sliderValue"
      @change="handleChange"
      tooltipPosition="bottom"
      :step="max / 100"
      lazy
    />
  </fieldset>
</template>

<script setup>
import '@vueform/slider/themes/default.css'
import Slider from '@vueform/slider'
import { ref } from 'vue'

import { format } from '../utils/currencyFormatter'

const { modelValue } = defineProps(['label', 'min', 'max', 'id', 'modelValue'])
const emit = defineEmits(['update:model-value'])

const sliderValue = ref(modelValue)

const formattedPrice = (price) => {
  return format(price, { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

const handleChange = (value) => {
  sliderValue.value = value
  emit('update:model-value', value)
}
</script>

<style scoped lang="scss">
fieldset {
  border: none;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1.6rem;

  width: 100%;
  justify-content: space-between;

  label {
    width: 100%;
    display: flex;
    font-weight: 500;
  }

  span {
    margin-left: auto;

    @media (max-width: 375px) {
      display: none;
    }
  }

  .slider {
    width: 100%;
  }
}
</style>
