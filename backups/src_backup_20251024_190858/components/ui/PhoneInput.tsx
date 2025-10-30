import React, { useState, useEffect } from 'react';
import { Phone, ChevronDown } from 'lucide-react';

interface Country {
  code: string;
  name: string;
  flag: string;
  phoneCode: string;
  phonePattern: RegExp;
}

const countries: Country[] = [
  { code: 'GR', name: 'Greece', flag: '🇬🇷', phoneCode: '+30', phonePattern: /^(\+30|0)?[2-9]\d{9}$/ },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', phoneCode: '+49', phonePattern: /^(\+49|0)[1-9]\d{1,14}$/ },
  { code: 'AT', name: 'Austria', flag: '🇦🇹', phoneCode: '+43', phonePattern: /^(\+43|0)\d{1,14}$/ },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', phoneCode: '+31', phonePattern: /^(\+31|0)\d{9}$/ },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪', phoneCode: '+32', phonePattern: /^(\+32|0)\d{8,9}$/ },
  { code: 'PL', name: 'Poland', flag: '🇵🇱', phoneCode: '+48', phonePattern: /^(\+48|0)\d{9}$/ },
  { code: 'LU', name: 'Luxembourg', flag: '🇱🇺', phoneCode: '+352', phonePattern: /^(\+352)?\d{3,11}$/ },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰', phoneCode: '+45', phonePattern: /^(\+45)?\d{8}$/ },
  { code: 'CY', name: 'Cyprus', flag: '🇨🇾', phoneCode: '+357', phonePattern: /^(\+357)?\d{8}$/ },
];

interface PhoneInputProps {
  value: string;
  onChange: (value: string, countryCode: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
  'aria-label'?: string;
  'aria-required'?: boolean;
  'aria-invalid'?: boolean;
  autoComplete?: string;
  id?: string;
  name?: string;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  onBlur,
  placeholder = 'Phone number',
  className = '',
  required = false,
  'aria-label': ariaLabel,
  'aria-required': ariaRequired,
  'aria-invalid': ariaInvalid,
  autoComplete = 'tel',
  id,
  name = 'phone'
}) => {
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]); // Default to Greece
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // Parse existing value to extract country and phone number
    if (value) {
      const country = countries.find(c => value.startsWith(c.phoneCode));
      if (country) {
        setSelectedCountry(country);
        setPhoneNumber(value.replace(country.phoneCode, '').trim());
      } else {
        setPhoneNumber(value);
      }
    }
  }, [value]);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
    const fullNumber = phoneNumber ? `${country.phoneCode} ${phoneNumber}` : '';
    onChange(fullNumber, country.code);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setPhoneNumber(inputValue);
    const fullNumber = inputValue ? `${selectedCountry.phoneCode} ${inputValue}` : '';
    onChange(fullNumber, selectedCountry.code);
  };

  const formatPhoneNumber = (phone: string, country: Country): string => {
    const cleanPhone = phone.replace(/[\s\-()]/g, '');
    
    if (country.code === 'GR' && cleanPhone.startsWith('0')) {
      return cleanPhone.replace(/^0(\d{2})(\d{4})(\d{4})/, '0$1 $2 $3');
    }
    
    if (country.code === 'DE' && cleanPhone.startsWith('0')) {
      return cleanPhone.replace(/^0(\d{2,4})(\d+)/, '0$1 $2');
    }
    
    return phone;
  };

  return (
    <div className="relative">
      <div className="flex">
        {/* Country Selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center px-3 py-3 border border-gray-300 border-r-0 rounded-l-lg bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all min-h-[48px]"
            aria-label="Select country"
          >
            <span className="text-lg mr-2">{selectedCountry.flag}</span>
            <span className="text-sm font-medium text-gray-700">{selectedCountry.phoneCode}</span>
            <ChevronDown className="w-4 h-4 ml-2 text-gray-500" />
          </button>
          
          {/* Dropdown */}
          {isDropdownOpen && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setIsDropdownOpen(false)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setIsDropdownOpen(false);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label="Close country selector"
              />
              <div className="absolute top-full left-0 z-20 mt-1 w-64 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {countries.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => handleCountrySelect(country)}
                    className="w-full flex items-center px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                  >
                    <span className="text-lg mr-3">{country.flag}</span>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{country.name}</div>
                      <div className="text-sm text-gray-500">{country.phoneCode}</div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Phone Number Input */}
        <div className="flex-1 relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          <input
            type="tel"
            id={id}
            name={name}
            value={phoneNumber}
            onChange={handlePhoneChange}
            onBlur={onBlur}
            placeholder={placeholder}
            className={`w-full pl-12 pr-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all min-h-[48px] text-base ${className}`}
            required={required}
            aria-label={ariaLabel}
            aria-required={ariaRequired}
            aria-invalid={ariaInvalid}
            autoComplete={autoComplete}
          />
        </div>
      </div>
    </div>
  );
};
