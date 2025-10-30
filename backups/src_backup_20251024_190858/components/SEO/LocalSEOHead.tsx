import React from 'react';
import { Helmet } from 'react-helmet-async';

interface LocalSEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const LocalSEOHead: React.FC<LocalSEOHeadProps> = ({
  title = "Intracosta - European Transport & Logistics",
  description = "Professional transport and logistics services across Europe. Fast, reliable, and secure freight solutions.",
  keywords = "transport, logistics, freight, European transport, international shipping"
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default LocalSEOHead;
