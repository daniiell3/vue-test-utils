export default {
  name () {
    return `Dr(a). ${this.dentist.name}`
  },

  cro () {
    return `CRO ${this.dentist.cro}`
  },

  providerType () {
    return `Estabelecimento: ${this.dentist.providerType}`
  },

  postcode () {
    return `CEP ${this.dentist.address.postcode}`
  },

  address () {
    return `${this.dentist.address.description} - ${this.dentist.address.neighborhood}`
  },

  city () {
    return `${this.dentist.address.city} - ${this.dentist.address.state}`
  }
}
