<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useClientState } from '@/stores/client'
import type { Country } from '@/types'

const clientState = useClientState()

const props = defineProps({
  modelValue: {
    type: Number,
    default: null,
  }
})

const emit = defineEmits(['update:modelValue'])

const inputData = computed({
  get() {
    return props.modelValue
  },
  set(data) {
    emit('update:modelValue', data)
  }
})

const options = computed(() => clientState.countryList.map((country: Country) => ({
  label: country.name,
  value: country.id,
})))

onMounted(() => {
  if (!clientState.countryList.length) {
    clientState.getCountryList()
  }
})
</script>

<template>
  <n-select
    v-model:value="inputData"
    filterable
    placeholder="Select a country"
    :options="options"
  />
</template>