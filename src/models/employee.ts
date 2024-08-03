type Address = {
    line1: string
    country: string
    city:string
    zipcode: string
}

type Contact = {
    contact_method: 'email' | 'phone',
    value: string
}

export type Employee = {
  _id: string
  name: string
  address: Address
  contactMethods: Contact[]
}
