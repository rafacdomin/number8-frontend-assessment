<template>
  <form @submit.prevent="handleSubmit" class="filters">
    <SliderComponent
      v-model="priceRange"
      id="priceRange"
      label="Price Range"
      :min="0"
      :max="1000000"
    />

    <SelectComponent
      v-model="bedrooms"
      id="bedrooms"
      label="Bedrooms"
      name="bedrooms"
      :options="options"
    />
    <SelectComponent
      v-model="bathrooms"
      label="Bathrooms"
      id="bathrooms"
      name="bathrooms"
      :options="options"
    />
    <SelectComponent
      v-model="parking"
      label="Parking"
      id="parking"
      name="parking"
      :options="options"
    />

    <div class="action">
      <button @click="handleClear">Clear</button>
      <button type="submit">Apply</button>
    </div>
  </form>
</template>

<script setup>
import SelectComponent from '../components/SelectComponent.vue'
import SliderComponent from '../components/SliderComponent.vue'

import { ref, watch } from 'vue'

const props = defineProps(['filters'])
const emit = defineEmits(['update:filters'])

const options = ref([
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 },
  { value: 4, label: '4+' }
])

const priceRange = ref([0, 1000000])
const bedrooms = ref([])
const bathrooms = ref([])
const parking = ref([])

watch(
  () => props.filters,
  (newPropValue) => {
    priceRange.value = newPropValue.priceRange
    bedrooms.value = newPropValue.bedrooms
    bathrooms.value = newPropValue.bathrooms
    parking.value = newPropValue.parking
  }
)

const handleSubmit = () => {
  emit('update:filters', {
    bedrooms: bedrooms.value,
    bathrooms: bathrooms.value,
    parking: parking.value,
    priceRange: priceRange.value
  })
}

const handleClear = () => {
  priceRange.value = [0, 1000000]
  bedrooms.value = []
  bathrooms.value = []
  parking.value = []

  handleSubmit()
}
</script>

<style scoped lang="scss">
.filters {
  height: 100%;
  border: none;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  padding: 2.4rem 2.4rem 0;

  .action {
    margin-top: auto;
    display: flex;
    width: 100%;
    gap: 0.8rem;
    padding: 1.6rem 0;

    button {
      border: none;
      border-radius: 0.8rem;
      width: 100%;
      padding: 0.8rem 0;
    }

    button[type='submit'] {
      background-color: black;
      color: white;
    }

    @media (min-width: 768px) {
      margin-top: 8rem;
    }
  }
}
</style>
