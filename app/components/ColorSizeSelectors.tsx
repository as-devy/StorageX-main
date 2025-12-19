'use client';

import React, { useState } from 'react';
import { Check, Palette, Ruler } from 'lucide-react';

interface ColorSelectorProps {
  selectedColor?: string;
  onColorChange: (color: string) => void;
  colors?: string[];
  label?: string;
}

interface SizeSelectorProps {
  selectedSize?: string;
  onSizeChange: (size: string) => void;
  sizes?: string[];
  label?: string;
  category?: string;
}

// Comprehensive color options
const DEFAULT_COLORS = [
  'Black', 'White', 'Blue', 'Red', 'Green', 'Gray', 'Silver', 'Gold',
  'Brown', 'Pink', 'Purple', 'Orange', 'Yellow', 'Navy', 'Beige',
  'Cream', 'Maroon', 'Teal', 'Cyan', 'Lime', 'Indigo', 'Violet',
  'Magenta', 'Coral', 'Turquoise', 'Olive', 'Tan', 'Charcoal',
  'Ivory', 'Burgundy', 'Forest Green', 'Royal Blue', 'Crimson',
  'Sapphire', 'Emerald', 'Ruby', 'Amber', 'Rose Gold', 'Copper',
  'Bronze', 'Steel', 'Gunmetal', 'Pearl', 'Champagne', 'Mint',
  'Lavender', 'Peach', 'Salmon', 'Aqua', 'Fuchsia', 'Lime Green',
  'Titanium', 'Midnight', 'Platinum', 'Bred', 'Multicolor'
];

// Size options by category
const SIZE_OPTIONS = {
  clothing: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
  shoes: ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13', '13.5', '14'],
  jeans: ['28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46'],
  watches: ['38mm', '40mm', '41mm', '42mm', '44mm', '45mm', '46mm'],
  electronics: ['Small', 'Medium', 'Large', 'Extra Large'],
  default: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '6', '7', '8', '9', '10', '11', '12']
};

const getColorHex = (colorName: string): string => {
  const colorMap: Record<string, string> = {
    'Black': '#000000',
    'White': '#FFFFFF',
    'Blue': '#3B82F6',
    'Red': '#EF4444',
    'Green': '#10B981',
    'Yellow': '#F59E0B',
    'Purple': '#8B5CF6',
    'Pink': '#EC4899',
    'Orange': '#F97316',
    'Gray': '#6B7280',
    'Silver': '#9CA3AF',
    'Gold': '#F59E0B',
    'Titanium': '#71717A',
    'Midnight': '#1E293B',
    'Platinum': '#E5E7EB',
    'Bred': '#DC2626',
    'Navy': '#1E3A8A',
    'Brown': '#92400E',
    'Beige': '#F5F5DC',
    'Cream': '#FFFDD0',
    'Maroon': '#800000',
    'Teal': '#14B8A6',
    'Cyan': '#06B6D4',
    'Lime': '#84CC16',
    'Indigo': '#6366F1',
    'Violet': '#8B5CF6',
    'Magenta': '#D946EF',
    'Coral': '#FF7F50',
    'Turquoise': '#40E0D0',
    'Olive': '#808000',
    'Tan': '#D2B48C',
    'Charcoal': '#36454F',
    'Ivory': '#FFFFF0',
    'Burgundy': '#800020',
    'Forest Green': '#228B22',
    'Royal Blue': '#4169E1',
    'Crimson': '#DC143C',
    'Sapphire': '#0F52BA',
    'Emerald': '#50C878',
    'Ruby': '#E0115F',
    'Amber': '#FFBF00',
    'Rose Gold': '#E8B4B8',
    'Copper': '#B87333',
    'Bronze': '#CD7F32',
    'Steel': '#71797E',
    'Gunmetal': '#2C3539',
    'Pearl': '#F8F6F0',
    'Champagne': '#F7E7CE',
    'Mint': '#98FB98',
    'Lavender': '#E6E6FA',
    'Peach': '#FFCBA4',
    'Salmon': '#FA8072',
    'Aqua': '#00FFFF',
    'Fuchsia': '#FF00FF',
    'Lime Green': '#32CD32',
    'Multicolor': '#FF6B6B'
  };
  return colorMap[colorName] || '#6B7280';
};

export const ColorSelector: React.FC<ColorSelectorProps> = ({
  selectedColor,
  onColorChange,
  colors = DEFAULT_COLORS,
  label = 'Color'
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-slate-700 mb-2">
        <Palette className="w-4 h-4 inline mr-1" />
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-left focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between"
      >
        <div className="flex items-center space-x-2">
          {selectedColor ? (
            <>
              <div 
                className="w-4 h-4 rounded-full border border-slate-300"
                style={{ backgroundColor: getColorHex(selectedColor) }}
              />
              <span>{selectedColor}</span>
            </>
          ) : (
            <span className="text-slate-500">Select color</span>
          )}
        </div>
        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-slate-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          <div className="p-2">
            <div className="grid grid-cols-6 gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => {
                    onColorChange(color);
                    setIsOpen(false);
                  }}
                  className="flex flex-col items-center p-2 rounded-lg hover:bg-slate-100 transition-colors"
                  title={color}
                >
                  <div 
                    className="w-8 h-8 rounded-full border border-slate-300 mb-1"
                    style={{ backgroundColor: getColorHex(color) }}
                  />
                  <span className="text-xs text-slate-600 truncate w-full text-center">
                    {color}
                  </span>
                  {selectedColor === color && (
                    <Check className="w-3 h-3 text-blue-600 absolute top-1 right-1" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const SizeSelector: React.FC<SizeSelectorProps> = ({
  selectedSize,
  onSizeChange,
  sizes,
  label = 'Size',
  category = 'default'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const availableSizes = sizes || SIZE_OPTIONS[category as keyof typeof SIZE_OPTIONS] || SIZE_OPTIONS.default;

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-slate-700 mb-2">
        <Ruler className="w-4 h-4 inline mr-1" />
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-left focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between"
      >
        <span>{selectedSize || 'Select size'}</span>
        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-slate-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          <div className="p-2">
            <div className="grid grid-cols-4 gap-2">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => {
                    onSizeChange(size);
                    setIsOpen(false);
                  }}
                  className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                    selectedSize === size
                      ? 'bg-blue-100 border-blue-500 text-blue-700'
                      : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Combined component for forms
export const ColorSizeFormGroup: React.FC<{
  selectedColor?: string;
  selectedSize?: string;
  onColorChange: (color: string) => void;
  onSizeChange: (size: string) => void;
  category?: string;
  colors?: string[];
  sizes?: string[];
}> = ({
  selectedColor,
  selectedSize,
  onColorChange,
  onSizeChange,
  category = 'default',
  colors,
  sizes
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ColorSelector
        selectedColor={selectedColor}
        onColorChange={onColorChange}
        colors={colors}
      />
      <SizeSelector
        selectedSize={selectedSize}
        onSizeChange={onSizeChange}
        sizes={sizes}
        category={category}
      />
    </div>
  );
};

const ColorSizeSelectorsColorSizeFormGroup  = { ColorSelector, SizeSelector, ColorSizeFormGroup }

export default ColorSizeSelectorsColorSizeFormGroup;
