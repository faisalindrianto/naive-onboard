/* eslint-disable no-use-before-define */

export interface Client {
  businessProfile: BusinessProfile
  personalProfile: PersonalProfile
  accountDetails: AccountDetails
  paymentDetails: PaymentDetails
  uuid: string
  updatedAt: Date
  createdAt: Date
  status: string
}

export interface AccountDetails {
  annualTurnovers: string
  employees: string
  businessDescription: string
}

export interface BusinessProfile {
  companyName: string
  companyRegistrationNumber: string
  companyIncorporatedDate: Date
  natureOfBusiness: string
  designationOfApplicant: string
  addressLine1: string
  addressLine2: string
  addressLine3: string
  postalCode: string
  city: string
  countryOfBusiness: number
}

export interface PaymentDetails {
  monthlyPaymentsCount: string
  monthlyPaymentsAmount: string
  paymentsToIndividuals: string
  intendedUse: string
  paymentPurposes: string
  sectors: string
  primaryCountry: number
  currencyPair: string
}

export interface PersonalProfile {
  firstName: string
  lastName: string
  emailAddress: string
  phone: Phone
  nric: string
  nationality: number
  dateOfBirth: Date
  countryOfIssuance: number
  gender: string
  addressLine1: string
  addressLine2: string
  addressLine3: string
  postalCode: string
  city: string
  countryOfBusiness: number
}

export interface Phone {
  code: string
  phoneNumber: string
}

export interface Country {
  createdAt: Date
  updatedAt: Date
  id: number
  isDelete: boolean
  countryId: string
  countryCode: string
  name: string
  phoneCode: string
  flag: string
  currency: string
}


/* eslint-enable no-use-before-define */
