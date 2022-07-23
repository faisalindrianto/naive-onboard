import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useClientState } from '@/stores/client'

const router = useRouter()

const useClient = () => {
  const { clients } = useClientState()

  const formData = ref({
    businessProfile: {
      companyName: '',
      companyRegistrationNumber: '',
      companyIncorporatedDate: '',
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
      dateOfBirth: '',
      countryOfIssuance: 0,
      gender: '',
      addressLine1: '',
      addressLine2: '',
      addressLine3: '',
      postalCode: '',
      city: '',
      countryOfBusiness: 0
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
      primaryCountry: 0,
      currencyPair: ''
    },
    uuid: ''
  })

  const submitClient = () => {
    clients.push(formData.value)

    router.replace('/')
  }

  return {
    formData,

    submitClient
  }
}

export default useClient
