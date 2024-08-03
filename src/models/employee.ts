export type Address = {
    line1: string
    country: string
    city:string
    zipcode: string
}

export type ContactMethod = 'email' | 'phone'

export type Contact = {
    contact_method: ContactMethod,
    value: string
}

export type Employee = {
  _id: string
  name: string
  address: Address
  contactMethods: Contact[]
}
