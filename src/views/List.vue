<script setup lang="ts">
import { ref, computed, h } from 'vue'
import { useRouter } from 'vue-router'
import type { DataTableColumns } from 'naive-ui'
import { useClientState } from '@/stores/client'
import type { Client } from '@/types'

const { clients } = useClientState()
const router = useRouter()

const columns = ref<DataTableColumns<Client>>(
  [
    {
      title: 'No.',
      key: 'no',
      minWidth: '80px',
      render: (_, index) => {
        return `${index + 1}`
      }
    },
    {
      type: 'expand',
      expandable: () => true,
      renderExpand: (row) => {
        return `Created at : ${row.createdAt.toLocaleString()}`
      }
    },
    {
      title: 'User Details',
      key: 'user_details',
      minWidth: '240px',
      render(row) {
        return [
          h(
            'div',
            { class: 'block' },
            `Name: ${row.personalProfile.firstName} ${row.personalProfile.lastName}`
          ),
          h(
            'div',
            { class: 'block' },
            `Email: ${row.personalProfile.emailAddress}`
          ),
        ]
      }
    },
    {
      title: 'Business Details',
      key: 'business_details',
      minWidth: '240px',
      render(row) {
        return [
          h(
            'div',
            { class: 'block' },
            `Company Name: ${row.businessProfile.companyName}`
          ),
          h(
            'div',
            { class: 'block' },
            `Registration No: ${row.businessProfile.companyRegistrationNumber}`
          ),
        ]
      }
    },
    {
      title: 'Application Data',
      key: 'application_data',
      minWidth: '240px',
      render(row) {
        return [
          h(
            'div',
            { class: 'block' },
            `Company Name: ${row.businessProfile.companyName}`
          ),
          h(
            'div',
            { class: 'block' },
            `Email: ${row.personalProfile.emailAddress}`
          ),
          h(
            'div',
            { class: 'block' },
            `NRIC: ${row.personalProfile.nric}`
          ),
          h(
            'div',
            { class: 'block' },
            `Phone: ${row.personalProfile.phone.code}${row.personalProfile.phone.phoneNumber}`
          ),
        ]
      }
    },
    {
      title: 'Activation UUID',
      key: 'uuid',
      minWidth: '240px',
    },
    {
      title: 'Status',
      key: 'status',
      minWidth: '120px',
    },
    {
      title: 'Last Updated',
      key: 'updatedAt',
      minWidth: '200px',
      render(row) {
        return [
          h(
            'div',
            { class: 'block' },
            `${row.updatedAt.toLocaleString()}`
          ),
        ]
      }
    }
  ]
)

const pagination = ref({
  pageSize: 10
})

const filter = ref({
  client_email: '',
  company_name: null,
  status: null,
  date: null
})

// filter out client based on filter above
const filteredClients = computed(() => {
  let clientList = clients

  if (filter.value.client_email) {
    clientList = clientList.filter(client => client.personalProfile.emailAddress.toLowerCase().includes(filter.value.client_email.toLowerCase()))
  }

  if (filter.value.company_name) {
    clientList = clientList.filter(client => client.businessProfile.companyName === filter.value.company_name)
  }

  if (filter.value.status) {
    clientList = clientList.filter(client => client.status === filter.value.status)
  }

  return clientList
})

// get available company from list and filter out any duplicate
const companyOptions = computed(() => clients.map(client => ({
  label: client.businessProfile.companyName,
  value: client.businessProfile.companyName,
})).filter((value, index, self) =>
  index === self.findIndex((t) => (
    t.value === value.value
  )) && value.value !== ''
))

// get available status from list and filter out any duplicate
const statusOptions = computed(() => clients.map(client => ({
  label: client.status,
  value: client.status,
})).filter((value, index, self) =>
  index === self.findIndex((t) => (
    t.value === value.value
  )) && value.value !== ''
))
</script>

<template>
  <div class="container">
    <n-card title="INFT Onboard">
      <n-grid
        cols="1 s:1 m:2 l:5"
        x-gap="12" y-gap="12"
        responsive="screen"
        class="mb-4"
      >
        <n-grid-item>
          <n-input
            v-model:value="filter.client_email"
            type="text"
            placeholder="Search by user email"
          />
        </n-grid-item>
        <n-grid-item>
          <n-select
          v-model:value="filter.company_name"
          :options="companyOptions"
          placeholder="Filter by Company"
          clearable
        />
        </n-grid-item>
        <n-grid-item>
          <n-select
            v-model:value="filter.status"
            :options="statusOptions"
            placeholder="Filter by Status"
            clearable
          />
        </n-grid-item>
        <n-grid-item>
          <n-date-picker
            v-model:value="filter.date"
            type="daterange" clearable
          />
        </n-grid-item>
        <n-grid-item>
          <div class="flex justify-end">
            <n-button
              class="sm:mt-0 sm:ml-auto"
              type="info"
              secondary
            >
              Refresh
            </n-button>
            <n-button
              class="sm:mt-0 sm:ml-auto"
              type="success"
              secondary
              @click="router.push('/form')"
            >
              Add New
            </n-button>
          </div>
        </n-grid-item>
      </n-grid>
      <n-data-table
        :bordered="false"
        :columns="columns"
        :data="filteredClients"
        :pagination="pagination"
      />
    </n-card>
  </div>
</template>