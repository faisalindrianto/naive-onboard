import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useMessage } from 'naive-ui'
import { useClientState } from '@/stores/client'
import { v4 as uuidv4 } from 'uuid'


const useClient = () => {
  const { clients } = useClientState()
  const router = useRouter()
  const message = useMessage()

  const formData = ref({
    businessProfile: {
      companyName: '',
      companyRegistrationNumber: '',
      companyIncorporatedDate: null,
      natureOfBusiness: '',
      designationOfApplicant: '',
      addressLine1: '',
      addressLine2: '',
      addressLine3: '',
      postalCode: '',
      city: '',
      countryOfBusiness: 203
    },
    personalProfile: {
      firstName: '',
      lastName: '',
      emailAddress: '',
      phone: {
        code: '',
        phoneNumber: ''
      },
      nric: '',
      nationality: 0,
      dateOfBirth: null,
      countryOfIssuance: 203,
      gender: '',
      addressLine1: '',
      addressLine2: '',
      addressLine3: '',
      postalCode: '',
      city: '',
      countryOfBusiness: 203
    },
    accountDetails: {
      annualTurnovers: '',
      employees: '',
      businessDescription: ''
    },
    paymentDetails: {
      monthlyPaymentsCount: '',
      monthlyPaymentsAmount: '',
      paymentsToIndividuals: '',
      intendedUse: '',
      paymentPurposes: '',
      sectors: '',
      primaryCountry: 203,
      currencyPair: ''
    },
    uuid: ''
  })

  const submitClient = () => {
    clients.push({
      ...formData.value,
      businessProfile: {
        ...formData.value.businessProfile,
        companyIncorporatedDate: formData.value.businessProfile.companyIncorporatedDate
          ? new Date(Date.parse(formData.value.businessProfile.companyIncorporatedDate)).toDateString()
          : ''
      },
      personalProfile: {
        ...formData.value.personalProfile,
        dateOfBirth: formData.value.personalProfile.dateOfBirth
          ? new Date(Date.parse(formData.value.personalProfile.dateOfBirth)).toDateString()
          : ''
      },
      uuid: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'PENDING',
    })

    message.success('New client added!')
    router.replace('/')
  }

  return {
    formData,

    submitClient
  }
}

export default useClient
