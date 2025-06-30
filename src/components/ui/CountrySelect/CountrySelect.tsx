// ================================
// src/components/ui/CountrySelect/CountrySelect.tsx
// ================================

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { CountrySelectProps } from './CountrySelect.types';
import { ContactValidationService } from '@/services/validation/contactValidation';
import type { Country } from '@/types';

export const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onChange,
  placeholder = 'Select country',
  className = '',
  error,
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState<Country[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const validationService = new ContactValidationService();

  useEffect(() => {
    setCountries(validationService.getCountries());
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedCountry = value ? validationService.getCountryByCode(value) : null;

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.dialCode.includes(searchTerm)
  );

  const handleSelect = (country: Country) => {
    onChange(country.code);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Country
      </label>
      
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-left flex items-center justify-between transition-colors focus:border-cyan-400 focus:outline-none ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        } ${error ? 'border-red-500' : ''} ${className}`}
      >
        <div className="flex items-center space-x-2">
          {selectedCountry ? (
            <>
              <span className="text-lg">{selectedCountry.flag}</span>
              <span>{selectedCountry.name}</span>
              <span className="text-gray-400">({selectedCountry.dialCode})</span>
            </>
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </div>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg max-h-60 overflow-hidden">
          {/* Search Input */}
          <div className="p-3 border-b border-gray-600">
            <input
              type="text"
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
            />
          </div>

          {/* Countries List */}
          <div className="overflow-y-auto max-h-48">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleSelect(country)}
                  className={`w-full p-3 text-left hover:bg-gray-700 transition-colors flex items-center space-x-3 ${
                    selectedCountry?.code === country.code ? 'bg-cyan-900/50 text-cyan-400' : 'text-white'
                  }`}
                >
                  <span className="text-lg">{country.flag}</span>
                  <div className="flex-1">
                    <div className="font-medium">{country.name}</div>
                    <div className="text-sm text-gray-400">{country.dialCode}</div>
                  </div>
                </button>
              ))
            ) : (
              <div className="p-3 text-gray-400 text-center">
                No countries found
              </div>
            )}
          </div>
        </div>
      )}

      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};