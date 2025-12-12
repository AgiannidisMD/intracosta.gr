import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import LocalSEOHead from './SEO/LocalSEOHead';
import LocalBusinessSchema from './SEO/LocalBusinessSchema';
import CitationConsistency from './SEO/CitationConsistency';
import { PremiumContact } from './ui/premium-contact';

const Contact: React.FC = () => {
  const { t } = useLanguage();

  const handleFormSubmit = async (formData: any) => {
    const sanitizeInput = (val: string) => val.replace(/<[^>]*>?/gm, '');
    const getCsrfToken = () => {
      const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
      return match ? match[1] : '';
    };

    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      company: sanitizeInput(formData.company || ''),
      message: sanitizeInput(formData.message)
    };

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'CSRF-Token': getCsrfToken(),
      },
      body: JSON.stringify(sanitizedData),
    });


    if (!response.ok) {
      throw new Error(`Server error: ${response.status} ${response.statusText}`);
    }


    // Also check response body for error indicators
    const responseData = await response.json().catch(() => ({}));

    if (responseData.success === false) {
      throw new Error(responseData.error || 'Server returned an error');
    }

  };

  return (
    <div id="contact">
      <LocalSEOHead page="contact" />
      <LocalBusinessSchema page="contact" />
      <CitationConsistency />
      <PremiumContact 
        onSubmit={handleFormSubmit}
        contactInfo={{
          email: t('contact.emailUsTitle'),
          emailSubtitle: t('contact.emailUsSubtitle'),
          phone: t('contact.callUsTitle'),
          phoneSubtitle: t('contact.callUsSubtitle'),
          address: t('contact.visitUsTitle'),
          addressSubtitle: t('contact.visitUsSubtitle'),
          emailValue: 'info@intracosta.com',
          phoneValue: '+30 23820 27111',
          addressValue: t('contactVisitUsAddress'),
          formTitle: t('contactFormTitle'),
          formSubmit: t('sendMessage'),
          nameLabel: t('name'),
          emailLabel: t('email'),
          companyLabel: t('companyName'),
          messageLabel: t('message')
        }}
      />
      
      {/* Google Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('contact.visitUsTitle')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('contactVisitUsAddress')}
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.8833864899907!2d22.455286599999997!3d40.7645895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1357c56081abda0d%3A0xf57f47eca15654d3!2sINTRACOSTA%20LTD!5e0!3m2!1sel!2ssk!4v1760977650996!5m2!1sel!2ssk"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="INTRACOSTA LTD Location Map"
              className="w-full h-96 md:h-[500px]"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;