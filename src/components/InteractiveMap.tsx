import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { MapPin, Warehouse, X, FileText, Mail } from 'lucide-react';

interface WarehouseData {
  country: string;
  postalCodes: string[];
  warehouses: Array<{
    code: string;
    city: string;
    isCentral?: boolean;
    mapsLink?: string;
  }>;
  postalCodeLinks?: { [code: string]: string };
}

const warehouseData: WarehouseData[] = [
  {
    country: 'Germany',
    postalCodes: ['85716', '65549', '79576', '16727', '04435', '34253', '22113', '68309', '74321', '49549', '30916', '53881', '18196'],
    warehouses: [
      { code: '85716', city: 'Munich' },
      { code: '65549', city: 'Limburg' },
      { code: '79576', city: 'Weil am Rhein' },
      { code: '16727', city: 'Velten', mapsLink: 'https://maps.app.goo.gl/tJM4zF6BoaPsf3oTA' },
      { code: '04435', city: 'Schkeuditz', mapsLink: 'https://maps.app.goo.gl/AHj21ATFFo92RTRo7' },
      { code: '34253', city: 'Lohfelden', mapsLink: 'https://maps.app.goo.gl/258dBeVmcwiFYcmB9' },
      { code: '22113', city: 'Hamburg', mapsLink: 'https://maps.app.goo.gl/JZU46pmKgMJUppmY9' },
      { code: '68309', city: 'Mannheim' },
      { code: '74321', city: 'Bietigheim-Bissingen', mapsLink: 'https://maps.app.goo.gl/VKXJ5rXq2UnWV53j7' },
      { code: '49549', city: 'Ladbergen', isCentral: true },
      { code: '30916', city: 'Isernhagen', mapsLink: 'https://maps.app.goo.gl/mkamVCm9Ya6KkaX76' },
      { code: '53881', city: 'Euskirchen', mapsLink: 'https://maps.app.goo.gl/noiesWbnik4pVw9A8' },
      { code: '18196', city: 'Dummerstorf', mapsLink: 'https://maps.app.goo.gl/Hj8p7P3ZbT5N8LX46' }
    ],
    postalCodeLinks: {
      '30916': 'https://maps.app.goo.gl/mkamVCm9Ya6KkaX76',
      '04435': 'https://maps.app.goo.gl/AHj21ATFFo92RTRo7',
      '22113': 'https://maps.app.goo.gl/JZU46pmKgMJUppmY9',
      '74321': 'https://maps.app.goo.gl/VKXJ5rXq2UnWV53j7',
      '16727': 'https://maps.app.goo.gl/tJM4zF6BoaPsf3oTA',
      '34253': 'https://maps.app.goo.gl/258dBeVmcwiFYcmB9',
      '53881': 'https://maps.app.goo.gl/noiesWbnik4pVw9A8',
      '18196': 'https://maps.app.goo.gl/Hj8p7P3ZbT5N8LX46'
    }
  },
  {
    country: 'Austria',
    postalCodes: ['1210', '2514'],
    warehouses: [
      { code: '1210', city: 'Wien' },
      { code: '2514', city: 'Linz' }
    ]
  },
  {
    country: 'Belgium',
    postalCodes: ['2830'],
    warehouses: [
      { code: '2830', city: 'Willebroek' }
    ]
  },
  {
    country: 'Netherlands',
    postalCodes: ['4824'],
    warehouses: [
      { code: '4824', city: 'Breda' }
    ]
  },
  {
    country: 'Greece',
    postalCodes: ['58100', '19600'],
    warehouses: [
      { code: '58100', city: 'Γιαννιτσά', isCentral: true },
      { code: '19600', city: 'Ασπρόπυργος' }
    ]
  }
];

const InteractiveMap: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCountry, setSelectedCountry] = useState<WarehouseData | null>(null);

  const handleCountryClick = (countryName: string) => {
    const data = warehouseData.find(item => item.country === countryName);
    setSelectedCountry(data || null);
  };

  const closeModal = () => {
    setSelectedCountry(null);
  };

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('mapTitle')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('mapSubtitle')}
          </p>
        </div>

        {/* Map Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          {/* Removed map component */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {warehouseData.map((country) => (
              <button
                key={country.country}
                onClick={() => handleCountryClick(country.country)}
                className="p-3 sm:p-4 md:p-6 rounded-xl border-2 border-gray-200 hover:border-yellow-500 hover:bg-yellow-50 transition-all duration-300 text-center group"
              >
                <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 group-hover:text-yellow-600 mx-auto mb-1 sm:mb-2" />
                <h3 className="font-bold text-gray-900 group-hover:text-yellow-700 text-sm sm:text-base">
                  {t(country.country)}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  {country.warehouses.length} {t('warehousesTitle').toLowerCase()}
                </p>
              </button>
            ))}
          </div>
        </div>
  
         {/* Country Buttons Grid */}
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
           {warehouseData.map((country) => (
             <button
               key={country.country}
               onClick={() => handleCountryClick(country.country)}
               className="p-6 rounded-xl border-2 border-gray-200 hover:border-yellow-500 hover:bg-yellow-50 transition-all duration-300 text-center group"
             >
               <MapPin className="w-8 h-8 text-gray-400 group-hover:text-yellow-600 mx-auto mb-2" />
               <h3 className="font-bold text-gray-900 group-hover:text-yellow-700">
                 {t(country.country)}
               </h3>
               <p className="text-sm text-gray-500 mt-1">
                 {country.warehouses.length} {t('warehousesTitle').toLowerCase()}
               </p>
             </button>
           ))}
          </div>

        {/* Modal for selected country */}
        {selectedCountry && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden border-2 border-yellow-300 flex flex-col">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                    <MapPin className="w-6 h-6 mr-3 text-yellow-600" />
                    {t(selectedCountry.country)}
                  </h3>
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 flex-1 overflow-hidden flex flex-col">
                {/* Coverage Areas */}
                <div className="mb-6 flex-1 overflow-hidden flex flex-col">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-yellow-600" />
                    {t('warehousesTitle')} ({selectedCountry.warehouses.length})
                  </h4>
                  <div className="overflow-y-auto flex-1 pr-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedCountry.warehouses.map((warehouse, index) => {
                        const mapsLink = warehouse.mapsLink || selectedCountry.postalCodeLinks?.[warehouse.code];
                        return (
                          <div
                            key={index}
                            className={`px-4 py-3 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg border border-yellow-200 hover:shadow-md transition-shadow ${mapsLink ? 'cursor-pointer' : ''}`}
                            onClick={() => {
                              if (mapsLink) {
                                window.open(mapsLink, '_blank', 'noopener,noreferrer');
                              }
                            }}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-gray-900 truncate">{warehouse.city}</p>
                                {mapsLink ? (
                                  <a
                                    href={mapsLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="text-sm text-yellow-600 hover:text-yellow-700 hover:underline font-medium"
                                  >
                                    {t('postalCodeLabel')}: {warehouse.code} <MapPin className="w-3 h-3 inline ml-1" />
                                  </a>
                                ) : (
                                  <p className="text-sm text-gray-600">{t('postalCodeLabel')}: {warehouse.code}</p>
                                )}
                              </div>
                              {warehouse.isCentral && (
                                <span className="px-3 py-1 bg-yellow-200 text-yellow-900 text-xs font-semibold rounded-full ml-2 flex-shrink-0">
                                  {t('centralWarehouseShort')}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Postal Codes */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-yellow-600" />
                    {t('postalCodesTitle')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCountry.postalCodes.map((code, index) => {
                      const mapsLink = selectedCountry.postalCodeLinks?.[code];
                      if (mapsLink) {
                        return (
                          <a
                            key={index}
                            href={mapsLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-yellow-50 hover:border-yellow-500 hover:text-yellow-700 transition-colors flex items-center gap-1"
                          >
                            {code}
                            <MapPin className="w-3 h-3" />
                          </a>
                        );
                      }
                      return (
                        <span
                          key={index}
                          className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          {code}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Call to Action Button */}
                <div className="pt-4">
                  <button 
                    onClick={() => {
                      const quoteSection = document.querySelector('#quote');
                      if (quoteSection) {
                        // Check if user prefers reduced motion for accessibility
                        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                        quoteSection.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
                        closeModal();
                      }
                    }}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <Mail className="w-5 h-5 inline mr-2" />
                    {t('requestQuote')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveMap;
