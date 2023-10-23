<template>
  <fieldset>
    <label :for="id">{{ label }}</label>
    <div class="options">
      <button
        v-for="{ value, label } in options"
        :key="value"
        type="button"
        :class="isSelected(value) ? 'selected' : ''"
        @click="handleSelect(value)"
      >
        {{ label }}
      </button>
    </div>
  </fieldset>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps(['label', 'id', 'name', 'options', 'modelValue'])
const emit = defineEmits(['update:model-value'])

const selected = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newPropValue) => {
    selected.value = newPropValue
  }
)

const isSelected = (value) => {
  return selected.value.includes(value)
}

const handleSelect = (value) => {
  const clonedSelected = [...selected.value]

  const selectedIndex = selected.value.findIndex((selected) => selected === value)

  if (selectedIndex === -1) {
    clonedSelected.push(value)
  } else {
    clonedSelected.splice(selectedIndex, 1)
  }

  selected.value = clonedSelected

  emit('update:model-value', clonedSelected)
}
</script>

<style scoped lang="scss">
fieldset {
  border: none;
  display: flex;
  align-items: start;
  flex-direction: column;
  gap: 1.6rem;

  width: 100%;
  display: flex;
  justify-content: space-between;

  label {
    font-weight: 500;
  }
}

.options {
  display: flex;
  gap: 0.8rem;

  button {
    width: 4rem;
    height: 4rem;

    border: none;
    border-radius: 0.8rem;

    &.selected {
      /* background-color: black; */
      border: 2px solid black;
    }

    @media (min-width: 375px) {
      width: 6rem;
    }
  }
}
</style>
