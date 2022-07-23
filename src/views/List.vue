<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useClientState } from '@/stores/client'

const { clients } = useClientState()
const router = useRouter()

const columns = ref(
  [
    {
      title: 'No.',
      key: 'no'
    },
    {
      title: 'User Details',
      key: 'user_details'
    },
    {
      title: 'Business Details',
      key: 'business_details'
    },
    {
      title: 'Application Data',
      key: 'application_data'
    },
    {
      title: 'Activation UUID',
      key: 'uuid'
    },
    {
      title: 'Status',
      key: 'status'
    },
    {
      title: 'Last Updated',
      key: 'last_updated'
    }
  ]
)

const data = computed(() => clients.map((client, index) => ({
  no: index + 1,
  user_details: client.personalProfile.firstName + ' ' + client.personalProfile.firstName,
  business_details: '',
  application_data: '',
  uuid: '',
  status: '',
  last_updated: '',
})))

const pagination = ref({
  pageSize: 10
})

const filter = ref({
  client_email: '',
  company_name: '',
  status: '',
  date: null
})
</script>

<template>
  <div class="container">
    <n-card title="INFT Onboard">
      <div class="flex flex-col sm:flex-row sm:items-center mb-4">
        <n-input
          v-model:value="filter.client_email"
          type="text"
          placeholder="Search by user email"
          class="mr-4"
        />
        <n-button
          class="sm:mt-0 sm:ml-auto"
          type="info"
          secondary
          @click="router.push('/form')"
        >
          Add New
        </n-button>
      </div>
      <n-data-table
        :bordered="false"
        :columns="columns"
        :data="data"
        :pagination="pagination"
      />
    </n-card>
  </div>
</template>