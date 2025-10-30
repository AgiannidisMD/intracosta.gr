export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export const POSTAL_CODE_PATTERNS: Record<string, RegExp> = {
  Germany: /^\d{5}$/,
  Austria: /^\d{4}$/,
  Netherlands: /^\d{4}\s?[A-Z]{2}$/i,
  Belgium: /^\d{4}$/,
  Poland: /^\d{2}-\d{3}$/,
  Luxembourg: /^\d{4}$/,
  Denmark: /^\d{4}$/,
  Greece: /^\d{3}\s?\d{2}$/,
  Cyprus: /^\d{4}$/,
};

export const PHONE_PATTERNS: Record<string, RegExp> = {
  Germany: /^(\+49|0)[1-9]\d{1,14}$/,
  Austria: /^(\+43|0)\d{1,14}$/,
  Netherlands: /^(\+31|0)\d{9}$/,
  Belgium: /^(\+32|0)\d{8,9}$/,
  Poland: /^(\+48|0)\d{9}$/,
  Luxembourg: /^(\+352)?\d{3,11}$/,
  Denmark: /^(\+45)?\d{8}$/,
  Greece: /^(\+30|0)?[2-9]\d{9}$/,
  Cyprus: /^(\+357)?\d{8}$/,
};

export function validateEmail(email: string): ValidationResult {
  if (!email) {
    return { isValid: false, message: 'Email is required' };
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return { isValid: false, message: 'Please enter a valid email address' };
  }

  return { isValid: true };
}

export function validatePhone(phone: string, country?: string): ValidationResult {
  if (!phone) {
    return { isValid: false, message: 'Phone number is required' };
  }

  const cleanPhone = phone.replace(/[\s\-()]/g, '');

  if (country && PHONE_PATTERNS[country]) {
    if (!PHONE_PATTERNS[country].test(cleanPhone)) {
      return { isValid: false, message: `Invalid phone format for ${country}` };
    }
  } else {
    if (!/^\+?\d{7,15}$/.test(cleanPhone)) {
      return { isValid: false, message: 'Phone must be 7-15 digits' };
    }
  }

  return { isValid: true };
}

export function formatPhoneNumber(phone: string, country?: string): string {
  const cleanPhone = phone.replace(/[\s\-()]/g, '');

  if (country === 'Germany' && cleanPhone.startsWith('0')) {
    return cleanPhone.replace(/^0(\d{2,4})(\d+)/, '0$1 $2');
  }

  if (country === 'Greece' && cleanPhone.startsWith('0')) {
    return cleanPhone.replace(/^0(\d{2})(\d{4})(\d{4})/, '0$1 $2 $3');
  }

  if (cleanPhone.startsWith('+')) {
    return cleanPhone;
  }

  return phone;
}

export function validatePostalCode(postalCode: string, country: string): ValidationResult {
  if (!postalCode) {
    return { isValid: false, message: 'Postal code is required' };
  }

  const pattern = POSTAL_CODE_PATTERNS[country];
  if (!pattern) {
    return { isValid: true };
  }

  if (!pattern.test(postalCode)) {
    return { isValid: false, message: `Invalid postal code format for ${country}` };
  }

  return { isValid: true };
}

export function validateDate(date: string): ValidationResult {
  if (!date) {
    return { isValid: false, message: 'Date is required' };
  }

  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    return { isValid: false, message: 'Date cannot be in the past' };
  }

  return { isValid: true };
}

export function validateWeight(weight: string): ValidationResult {
  if (!weight) {
    return { isValid: false, message: 'Weight is required' };
  }

  const numWeight = parseFloat(weight);
  if (isNaN(numWeight) || numWeight <= 0) {
    return { isValid: false, message: 'Weight must be greater than 0' };
  }

  // No upper limit - removed 25,000 kg restriction
  return { isValid: true };
}

export function validateDimension(dimension: string, name: string): ValidationResult {
  if (!dimension) {
    return { isValid: false, message: `${name} is required` };
  }

  const numDimension = parseFloat(dimension);
  if (isNaN(numDimension) || numDimension <= 0) {
    return { isValid: false, message: `${name} must be greater than 0` };
  }

  // No upper limit - removed 15m restriction
  return { isValid: true };
}
