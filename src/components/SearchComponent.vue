<template>
  <form @submit.prevent="handleSubmit">
    <SideSheetComponent :show="showFilters">
      <template #content>
        <FiltersSection @update:filters="handleUpdateFilters" :filters="filters" />
      </template>
      <template v-slot:trigger="{ clickHandler }">
        <button class="filter" @click="() => handleTrigger(clickHandler)">
          <img src="filter.svg" alt="filter" />
        </button>
      </template>
    </SideSheetComponent>
    <input type="search" placeholder="Location" v-model="inputValue" />
    <button type="submit">
      <img src="search.svg" alt="search" />
    </button>
  </form>
</template>

<script setup>
import SideSheetComponent from './SideSheetComponent.vue'
import FiltersSection from '../sections/FiltersSection.vue'
import { ref } from 'vue'

const { modelValue } = defineProps(['modelValue', 'filters'])
const emit = defineEmits(['update:model-value', 'update:filters'])

const inputValue = ref(modelValue)
const showFilters = ref(false)

const handleSubmit = () => {
  emit('update:model-value', inputValue.value)
}

const handleUpdateFilters = (newValue) => {
  showFilters.value = false
  emit('update:filters', newValue)
}

const handleTrigger = (clickHandler) => {
  showFilters.value = true
  clickHandler()
}
</script>

<style scoped lang="scss">
form {
  display: flex;
  gap: 0.8rem;
  width: 100%;

  input {
    padding: 0.8rem 1.6rem;
    border-radius: 0.8rem;
    border: 1px solid black;
    width: 100%;
  }

  button {
    padding: 0.8rem;
    border-radius: 0.8rem;
    border: none;
    background-color: transparent;
    border: 1px solid black;

    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 1.6rem;
    }
  }

  .filter {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: 1px solid black;

    img {
      width: 1.6rem;
    }

    @media (min-width: 768px) {
      display: none;
    }
  }
}
</style>
