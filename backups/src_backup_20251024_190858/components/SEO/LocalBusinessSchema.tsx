import React from 'react';
import { Helmet } from 'react-helmet-async';

const LocalBusinessSchema: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TransportationCompany",
    "name": "Intracosta",
    "description": "Professional European transport and logistics services",
    "url": "https://intracosta.com",
    "telephone": "+30 2310 123456",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "GR",
      "addressLocality": "Greece"
    },
    "areaServed": [
      "Germany",
      "Austria",
      "Netherlands",
      "Belgium",
      "Poland",
      "Luxembourg",
      "Denmark",
      "Greece",
      "Cyprus"
    ],
    "serviceType": [
      "International Transport",
      "Road Transport",
      "Warehousing",
      "Logistics Services"
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default LocalBusinessSchema;
