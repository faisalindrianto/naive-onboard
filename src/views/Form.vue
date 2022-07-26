<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import useClient from '@/composables/useClient'
import CountryPicker from '@/components/CountryPicker.vue'
import { useClientState } from '@/stores/client'
import type { Country } from '@/types'

const router = useRouter()
const message = useMessage()
const { formData, submitClient } = useClient()
const clientState = useClientState()

// find currency from country list state and filter out duplicate currency
const currencyOptions = computed(() => clientState.countryList.map((country: Country) => ({
  label: country.currency,
  value: country.currency,
})).filter((value, index, self) =>
  index === self.findIndex((t) => (
    t.value === value.value
  )) && value.value !== ''
))

const phoneCodeOptions = computed(() => clientState.countryList.map((country: Country) => ({
  label: country.phoneCode,
  value: country.phoneCode,
})))

const tabValue = ref('business_profile')

const validateStep = step => {
  if (step === 'business_profile') {
    if (!formData.value.businessProfile.companyName) {
      message.warning('Company name is required')

      return false
    }

    if (!formData.value.businessProfile.companyRegistrationNumber) {
      message.warning('Company registration number is required')

      return false
    }

    if (!formData.value.businessProfile.countryOfBusiness) {
      message.warning('Country of business is required')

      return false
    }
  }

  if (step === 'personal_profile') {
    if (!formData.value.personalProfile.firstName || !formData.value.personalProfile.lastName) {
      message.warning('First name and last name is required')

      return false
    }

    if (!formData.value.personalProfile.emailAddress) {
      message.warning('Email is required')

      return false
    }

    if (!formData.value.personalProfile.phone.code || !formData.value.personalProfile.phone.phoneNumber) {
      message.warning('Phone is required')

      return false
    }

    if (!formData.value.personalProfile.countryOfIssuance) {
      message.warning('Nationality is required')

      return false
    }
  }

  return true
}

const handleClickNext = () => {
  if (tabValue.value === 'business_profile') {
    if (!validateStep('business_profile')) return

    return tabValue.value = 'personal_profile'
  }

  if (tabValue.value === 'personal_profile') {
    if (!validateStep('personal_profile')) return

    return tabValue.value = 'account_details'
  }

  if (tabValue.value === 'account_details') {
    if (!validateStep('account_details')) return

    return tabValue.value = 'payment_details'
  }

  submitClient()
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
        :on-before-leave="() => validateStep(tabValue)"
      >
        <n-tab-pane name="business_profile" tab="Business Profile">
          <n-grid cols="1 s:1 m:2" x-gap="24" y-gap="12" responsive="screen">
            <n-grid-item>
              <small class="mb-2 text-slate-400">Company Name</small>
              <n-input
                v-model:value="formData.businessProfile.companyName"
                type="text"
                placeholder="Company Name"
              />
            </n-grid-item>
            <n-grid-item>
              <small class="mb-2 text-slate-400">Registration Number</small>
              <n-input
                v-model:value="formData.businessProfile.companyRegistrationNumber"
                type="number"
                placeholder="Registration Number"
              />
            </n-grid-item>
            <n-grid-item>
              <small class="mb-2 text-slate-400">Company Incorporated Date</small>
              <n-date-picker
                v-model:value="formData.businessProfile.companyIncorporatedDate"
                type="date"
              />
            </n-grid-item>
            <n-grid-item>
              <small class="mb-2 text-slate-400">Nature of Business</small>
              <n-input
                v-model:value="formData.businessProfile.natureOfBusiness"
                type="text"
                placeholder="Nature of Business"
              />
            </n-grid-item>
            <n-grid-item>
              <small class="mb-2 text-slate-400">Designation Of Applicant</small>
              <n-input
                v-model:value="formData.businessProfile.designationOfApplicant"
                type="text"
                placeholder="Designation Of Applicant"
              />
            </n-grid-item>
            <n-grid-item>
              <small class="mb-2 text-slate-400">Address Line 1</small>
              <n-input
                v-model:value="formData.businessProfile.addressLine1"
                type="text"
                placeholder="Address Line 1"
              />
            </n-grid-item>
            <n-grid-item>
              <small class="mb-2 text-slate-400">Address Line 2</small>
              <n-input
                v-model:value="formData.businessProfile.addressLine2"
                type="text"
                placeholder="Address Line 2"
              />
            </n-grid-item>
            <n-grid-item>
              <small class="mb-2 text-slate-400">Address Line 3</small>
              <n-input
                v-model:value="formData.businessProfile.addressLine3"
                type="text"
                placeholder="Address Line 3"
              />
            </n-grid-item>
            <n-grid-item>
              <small class="mb-2 text-slate-400">Postal Code</small>
              <n-input
                v-model:value="formData.businessProfile.postalCode"
                type="text"
                placeholder="Postal Code"
              />
            </n-grid-item>
            <n-grid-item>
              <small class="mb-2 text-slate-400">City</small>
              <n-input
                v-model:value="formData.businessProfile.city"
                type="text"
                placeholder="City"
              />
            </n-grid-item>
            <n-grid-item>
              <small class="mb-2 text-slate-400">Country of Business</small>
              <CountryPicker v-model="formData.businessProfile.countryOfBusiness" />
            </n-grid-item>
          </n-grid>
        </n-tab-pane>
        <n-tab-pane name="personal_profile" tab="Personal Profile">
          <n-grid cols="1 s:1 m:2" x-gap="24" y-gap="12" responsive="screen">
            <n-grid-item>
              <small class="mb-2 text-slate-400">First Name</small>
              <n-input
                v-model:value="formData.personalProfile.firstName"
                type="text"
                placeholder="First Name"
              />
            </n-grid-item>
            <n-grid-item>
              <small class="mb-2 text-slate-400">Last Name</small>
              <n-input
                v-model:value="formData.personalProfile.lastName"
                type="text"
                placeholder="Last Name"
              />
            </n-grid-item>
            <n-grid-item>
              <small class="mb-2 text-slate-400">Email Address</small>
              <n-input
                v-model:value="formData.personalProfile.emailAddress"
                type="email"
                placeholder="Email Address"
              />
            </n-grid-item>
            <n-grid-item>
              <small class="mb-2 text-slate-400">Phone Number</small>
              <n-grid cols="4" x-gap="12" item-responsive>
                <n-grid-item span="1">
                  <n-select
                    v-model:value="formData.personalProfile.phone.code"
                    :options="phoneCodeOptions"
                  />
                </n-grid-item>
                <n-grid-item span="3">
                  <n-input
                    v-model:value="formData.personalProfile.phone.phoneNumber"
                    type="number"
                    placeholder="Phone Number"
                    class="flex-grow"
                  />
                </n-grid-item>
              </n-grid>
            </n-grid-item>
            <n-grid-item>
              <small class="mb-2 text-slate-400">NRIC</small>
              <n-input
                v-model:value="formData.personalProfile.nric"
                type="text"
                placeholder="NRIC"
              />
            </n-grid-item>
            <n-grid-item>
              <small class="mb-2 text-slate-400">Date of Birth</small>
              <n-date-picker
                v-model:value="formData.personalProfile.dateOfBirth"
                type="date"
              />
            </n-grid-item>
            <n-grid-item>
              <small class="mb-2 text-slate-400">Country of Issuance</small>
              <CountryPicker v-model="formData.personalProfile.countryOfIssuance" />
            </n-grid-item>
            <n-grid-item>
              <small class="mb-2 text-slate-400">Gender</small>
              <n-select
                v-model:value="formData.personalProfile.gender"
                placeholder="Choose gender"
                :options="[
                  { label: 'Male', value: 'Male' },
                  { label: 'Female', value: 'Female' }
                ]"
              />
            </n-grid-item>
            <n-grid-item>
              <small class="mb-2 text-slate-400">Address Line 1</small>
              <n-input
                v-model:value="formData.personalProfile.addressLine1"
                type="text"
                placeholder="Address Line 1"
              />
            </n-grid-item>
            <n-grid-item>
              <small class="mb-2 text-slate-400">Address Line 2</small>
              <n-input
                v-model:value="formData.personalProfile.addressLine2"
                type="text"
                placeholder="Address Line 2"
              />
            </n-grid-item>
            <n-grid-item>
              <small class="mb-2 text-slate-400">Address Line 3</small>
              <n-input
                v-model:value="formData.personalProfile.addressLine3"
                type="text"
                placeholder="Address Line 3"
              />
            </n-grid-item>
            <n-grid-item>
              <small class="mb-2 text-slate-400">Postal Code</small>
              <n-input
                v-model:value="formData.personalProfile.postalCode"
                type="text"
                placeholder="Postal Code"
              />
            </n-grid-item>
            <n-grid-item>
              <small class="mb-2 text-slate-400">City</small>
              <n-input
                v-model:value="formData.personalProfile.city"
                type="text"
                placeholder="City"
              />
            </n-grid-item>
            <n-grid-item>
              <small class="mb-2 text-slate-400">Country of Business</small>
              <CountryPicker v-model="formData.personalProfile.countryOfBusiness" />
            </n-grid-item>
          </n-grid>
        </n-tab-pane>
        <n-tab-pane name="account_details" tab="Account Details">
          <n-grid cols="1 s:1 m:2" x-gap="24" y-gap="12" responsive="screen">
            <n-grid-item>
              <small class="mb-2 text-slate-400">Annual Turnovers</small>
              <n-input
                v-model:value="formData.accountDetails.annualTurnovers"
                type="number"
                placeholder="Annual Turnovers"
              />
            </n-grid-item>
            <n-grid-item>
              <small class="mb-2 text-slate-400">Employees</small>
              <n-input
                v-model:value="formData.accountDetails.employees"
                type="number"
                placeholder="Employees"
              />
            </n-grid-item>
            <n-grid-item>
              <small class="mb-2 text-slate-400">Business Description</small>
              <n-input
                v-model:value="formData.accountDetails.businessDescription"
                type="text"
                placeholder="Business Description"
              />
            </n-grid-item>
          </n-grid>
        </n-tab-pane>
        <n-tab-pane name="payment_details" tab="Payment Details">
          <n-grid cols="1 s:1 m:2" x-gap="24" y-gap="12" responsive="screen">
            <n-grid-item>
              <small class="mb-2 text-slate-400">Monthly Payment Count</small>
              <n-input
                v-model:value="formData.paymentDetails.monthlyPaymentsCount"
                type="number"
                placeholder="Monthly Payment Count"
              />
            </n-grid-item>
            <n-grid-item>
              <small class="mb-2 text-slate-400">Monthly Payment Amount</small>
              <n-input
                v-model:value="formData.paymentDetails.monthlyPaymentsAmount"
                type="number"
                placeholder="Monthly Payment Amount"
              />
            </n-grid-item>
            <n-grid-item>
              <small class="mb-2 text-slate-400">Payments To Individuals</small>
              <n-input
                v-model:value="formData.paymentDetails.paymentsToIndividuals"
                type="text"
                placeholder="Payments To Individuals"
              />
            </n-grid-item>
            <n-grid-item>
              <small class="mb-2 text-slate-400">Intended Use</small>
              <n-input
                v-model:value="formData.paymentDetails.intendedUse"
                type="text"
                placeholder="Intended Use"
              />
            </n-grid-item>
            <n-grid-item>
              <small class="mb-2 text-slate-400">Payment Purposes</small>
              <n-input
                v-model:value="formData.paymentDetails.paymentPurposes"
                type="text"
                placeholder="Payment Purposes"
              />
            </n-grid-item>
            <n-grid-item>
              <small class="mb-2 text-slate-400">Sectors</small>
              <n-input
                v-model:value="formData.paymentDetails.sectors"
                type="text"
                placeholder="Sectors"
              />
            </n-grid-item>
            <n-grid-item>
              <small class="mb-2 text-slate-400">Primary Country</small>
              <CountryPicker v-model="formData.paymentDetails.primaryCountry" />
            </n-grid-item>
            <n-grid-item>
              <small class="mb-2 text-slate-400">Currency Pair</small>
              <n-select
                v-model:value="formData.paymentDetails.currencyPair"
                placeholder="Choose currency"
                :options="currencyOptions"
              />
            </n-grid-item>
          </n-grid>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </div>
</template>