export const businessInfo = {
  name: 'Intracosta',
  legalName: 'In.Tra.Costa EPE',
  foundingDate: '1999',

  address: {
    primary: {
      street: '3ο χλμ Γιαννιτσών Θεσσαλονίκης',
      city: 'Γιαννιτσά',
      region: 'Κεντρική Μακεδονία',
      postalCode: '58100',
      country: 'Greece',
      countryCode: 'GR'
    },
    secondary: {
      street: '1 χλμ Λάκκας-Σκύδρας',
      city: 'Πέλλα',
      region: 'Κεντρική Μακεδονία',
      country: 'Greece',
      countryCode: 'GR'
    },
    germany: {
      street: 'Am Kanal 2-4',
      city: 'Ladbergen',
      postalCode: '49549',
      country: 'Germany',
      countryCode: 'DE'
    }
  },

  coordinates: {
    latitude: 40.7934,
    longitude: 22.4089
  },

  contact: {
    phone: {
      main: '+30 23820 27111',
      formatted: '+30-23820-27111',
      display: '23820 27111'
    },
    email: {
      main: 'info@intracosta.com',
      export: 'export@intracosta.com',
      import: 'import@intracosta.com',
      accounting: 'account@intracosta.com'
    },
    website: 'https://www.intracosta.gr'
  },

  social: {
    facebook: 'https://www.facebook.com/intracosta',
    linkedin: 'https://www.linkedin.com/company/intracosta',
    googleMaps: 'https://g.page/intracosta'
  },

  hours: {
    weekdays: 'Mo-Fr 09:00-17:00',
    weekend: 'Closed',
    timezone: 'Europe/Athens'
  },

  services: [
    {
      name: 'International Road Transport',
      slug: 'international-transport',
      category: 'Transport'
    },
    {
      name: 'Domestic Transport Greece',
      slug: 'domestic-transport',
      category: 'Transport'
    },
    {
      name: 'Warehousing & Storage',
      slug: 'warehousing',
      category: 'Logistics'
    },
    {
      name: 'Customs Clearance',
      slug: 'logistics-services',
      category: 'Logistics'
    },
    {
      name: 'Road Transport Europe',
      slug: 'road-transport',
      category: 'Transport'
    },
    {
      name: 'Intermodal Transport',
      slug: 'intermodal-transport',
      category: 'Transport'
    },
    {
      name: 'Special Transport',
      slug: 'special-transport',
      category: 'Transport'
    }
  ],

  coverage: [
    { country: 'Greece', code: 'GR' },
    { country: 'Germany', code: 'DE' },
    { country: 'Austria', code: 'AT' },
    { country: 'Netherlands', code: 'NL' },
    { country: 'Belgium', code: 'BE' },
    { country: 'Poland', code: 'PL' },
    { country: 'Luxembourg', code: 'LU' },
    { country: 'Denmark', code: 'DK' },
    { country: 'Cyprus', code: 'CY' },
    { country: 'Czech Republic', code: 'CZ' },
    { country: 'Slovakia', code: 'SK' },
    { country: 'Hungary', code: 'HU' },
    { country: 'Romania', code: 'RO' },
    { country: 'Bulgaria', code: 'BG' },
    { country: 'Slovenia', code: 'SI' }
  ],

  keywords: {
    el: [
      'μεταφορές Γιαννιτσά',
      'διεθνείς μεταφορές Θεσσαλονίκη',
      'μεταφορές Γερμανία Ελλάδα',
      'groupage μεταφορές',
      'εκτελωνισμός',
      'αποθήκευση Κεντρική Μακεδονία',
      'οδικές μεταφορές Ευρώπη',
      'logistics Πέλλα'
    ],
    en: [
      'transport Giannitsa',
      'international transport Thessaloniki',
      'transport Germany Greece',
      'groupage services',
      'customs clearance',
      'warehousing Central Macedonia',
      'road transport Europe',
      'logistics Pella'
    ],
    de: [
      'Transport Giannitsa',
      'internationaler Transport Thessaloniki',
      'Transport Deutschland Griechenland',
      'Sammelladung',
      'Zollabfertigung',
      'Lagerung Zentralmakedonien',
      'Straßentransport Europa',
      'Logistik Pella'
    ]
  }
};

export const seoTemplates = {
  locationPages: {
    title: {
      el: (service: string, location: string) =>
        `${service} στη ${location} | Intracosta - Αξιόπιστες Μεταφορές`,
      en: (service: string, location: string) =>
        `${service} in ${location} | Intracosta - Reliable Transport`,
      de: (service: string, location: string) =>
        `${service} in ${location} | Intracosta - Zuverlässiger Transport`
    },
    description: {
      el: (service: string, location: string) =>
        `Επαγγελματικές υπηρεσίες ${service} στη ${location}. Η Intracosta προσφέρει αξιόπιστες λύσεις μεταφοράς με 25+ χρόνια εμπειρίας. ☎️ 23820 27111`,
      en: (service: string, location: string) =>
        `Professional ${service} services in ${location}. Intracosta offers reliable transport solutions with 25+ years experience. ☎️ +30 23820 27111`,
      de: (service: string, location: string) =>
        `Professionelle ${service}-Dienstleistungen in ${location}. Intracosta bietet zuverlässige Transportlösungen mit 25+ Jahren Erfahrung. ☎️ +30 23820 27111`
    }
  }
};

export const getCitationData = () => ({
  name: businessInfo.name,
  address: `${businessInfo.address.primary.street}, ${businessInfo.address.primary.postalCode} ${businessInfo.address.primary.city}, ${businessInfo.address.primary.country}`,
  phone: businessInfo.contact.phone.main,
  website: businessInfo.contact.website
});

export const getNAPConsistency = () => ({
  canonical: {
    name: businessInfo.name,
    address: businessInfo.address.primary.street,
    city: businessInfo.address.primary.city,
    postalCode: businessInfo.address.primary.postalCode,
    country: businessInfo.address.primary.country,
    phone: businessInfo.contact.phone.main,
    email: businessInfo.contact.email.main
  },
  variations: {
    phoneFormatted: businessInfo.contact.phone.formatted,
    phoneDisplay: businessInfo.contact.phone.display,
    addressFull: `${businessInfo.address.primary.street}, ${businessInfo.address.primary.postalCode} ${businessInfo.address.primary.city}, ${businessInfo.address.primary.region}, ${businessInfo.address.primary.country}`
  }
});

export default businessInfo;
