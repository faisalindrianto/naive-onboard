import { defineStore } from 'pinia'
import axios from 'axios'

export const useClientState = defineStore('user', {
  state: () => {
    return {
      countryList: [],
      clients: [
        {
          businessProfile: {
            companyName: 'Company 001',
            companyRegistrationNumber: '001',
            companyIncorporatedDate: '2022-06-19',
            natureOfBusiness: 'Agricultural',
            designationOfApplicant: 'Director(Company)',
            addressLine1: 'Address line 1',
            addressLine2: 'Address line 2',
            addressLine3: 'Address line 3',
            postalCode: '12345',
            city: 'City',
            countryOfBusiness: 203
          },
          personalProfile: {
            firstName: 'First name',
            lastName: 'Last name',
            emailAddress: 'john@suzuran.co',
            phone: {
              code: '+65',
              phoneNumber: '1234567890'
            },
            nric: '1234567890',
            nationality: 1,
            dateOfBirth: '2022-06-01',
            countryOfIssuance: 1,
            gender: 'Male',
            addressLine1: 'Address line 1',
            addressLine2: 'Address line 2',
            addressLine3: 'Address line 3',
            postalCode: '12345',
            city: 'City',
            countryOfBusiness: 1
          },
          accountDetails: {
            annualTurnovers: '1',
            employees: '1',
            businessDescription: 'Brief description of the business'
          },
          paymentDetails: {
            monthlyPaymentsCount: '1',
            monthlyPaymentsAmount: '1',
            paymentsToIndividuals: 'Yes',
            intendedUse: 'Payment to Suppliers',
            paymentPurposes: 'Please specify payment purposes',
            sectors: 'Suppliers',
            primaryCountry: 1,
            currencyPair: 'AED'
          },
          uuid: '7729ea59-e60c-408a-83c1',
          status: 'PENDING',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          businessProfile: {
            companyName: 'Company 001',
            companyRegistrationNumber: '001',
            companyIncorporatedDate: '2022-06-19',
            natureOfBusiness: 'Agricultural',
            designationOfApplicant: 'Director(Company)',
            addressLine1: 'Address line 1',
            addressLine2: 'Address line 2',
            addressLine3: 'Address line 3',
            postalCode: '12345',
            city: 'City',
            countryOfBusiness: 203
          },
          personalProfile: {
            firstName: 'First name',
            lastName: 'Last name',
            emailAddress: 'john@suzuran.co',
            phone: {
              code: '+65',
              phoneNumber: '1234567890'
            },
            nric: '1234567890',
            nationality: 1,
            dateOfBirth: '2022-06-01',
            countryOfIssuance: 1,
            gender: 'Male',
            addressLine1: 'Address line 1',
            addressLine2: 'Address line 2',
            addressLine3: 'Address line 3',
            postalCode: '12345',
            city: 'City',
            countryOfBusiness: 1
          },
          accountDetails: {
            annualTurnovers: '1',
            employees: '1',
            businessDescription: 'Brief description of the business'
          },
          paymentDetails: {
            monthlyPaymentsCount: '1',
            monthlyPaymentsAmount: '1',
            paymentsToIndividuals: 'Yes',
            intendedUse: 'Payment to Suppliers',
            paymentPurposes: 'Please specify payment purposes',
            sectors: 'Suppliers',
            primaryCountry: 1,
            currencyPair: 'AED'
          },
          uuid: '7729ea59-e60c-408a-83c1',
          status: 'PENDING',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
    }
  },
  actions: {
    getCountryList() {
      axios.get('https://apiuat.inft.co/api/v1/countries?sort=name+ASC').then(result => {
        this.countryList = result.data.countries
      })
    }
  }
})
