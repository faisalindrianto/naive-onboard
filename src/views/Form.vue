<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useClient from '@/composables/useClient'

const router = useRouter()

const { formData } = useClient()

const tabValue = ref('business_profile')

const handleClickNext = () => {
  if (tabValue.value === 'business_profile') {
    return tabValue.value = 'personal_profile'
  }

  if (tabValue.value === 'personal_profile') {
    return tabValue.value = 'account_details'
  }

  if (tabValue.value === 'account_details') {
    return tabValue.value = 'payment_details'
  }

  console.log('submit!')
}
</script>

<template>
  <div class="container">
    <n-card>
      <div class="flex flex-col sm:flex-row sm:items-center mb-4">
        <n-button
          text
          class="text-gray-400"
          @click="router.back()"
        >
          Back to List
        </n-button>
        <n-button
          type="success"
          secondary
          class="sm:mt-0 sm:ml-auto"
          @click="handleClickNext"
        >
          {{ tabValue === 'payment_details' ? 'Submit' : 'Next' }}
        </n-button>
      </div>
      <n-tabs
        v-model:value="tabValue"
        type="segment"
        class="mt-4"
      >
        <n-tab-pane name="business_profile" tab="Business Profile">
          Business Profile
        </n-tab-pane>
        <n-tab-pane name="personal_profile" tab="Personal Profile">
          Personal Profile
        </n-tab-pane>
        <n-tab-pane name="account_details" tab="Account Details">
          Account Details
        </n-tab-pane>
        <n-tab-pane name="payment_details" tab="Payment Details">
          Payment Details
        </n-tab-pane>
      </n-tabs>
      <small class="mb-2 text-slate-400">Company Name</small>
      <n-input
        v-model:value="formData.businessProfile.companyName"
        type="text"
        placeholder="Company Name"
        class="mb-4"
      />
      <small class="mb-2 text-slate-400">Company Registration</small>
      <n-input
        v-model:value="formData.businessProfile.companyRegistrationNumber"
        type="text"
        placeholder="Company Registration"
        class="mb-4"
      />
      <small class="mb-2 text-slate-400">First Name</small>
      <n-input
        v-model:value="formData.personalProfile.firstName"
        type="text"
        placeholder="First Name"
        class="mb-4"
      />
      <small class="mb-2 text-slate-400">Last Name</small>
      <n-input
        v-model:value="formData.personalProfile.lastName"
        type="text"
        placeholder="Last Name"
        class="mb-4"
      />
      <small class="mb-2 text-slate-400">Phone Number</small>
      <n-input
        v-model:value="formData.personalProfile.phone.phoneNumber"
        type="text"
        placeholder="Phone Number"
        class="mb-4"
      />
    </n-card>
  </div>
</template>