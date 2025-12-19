'use client';

import React, { memo, useCallback, useMemo, useState } from 'react';
import { 
  Filter,
  Download,
  Plus,
  Search,
  Edit3,
  Trash2,
  MoreHorizontal,
  X
} from 'lucide-react';
import { inventoryItems } from '../data/mockData';
import { TableSkeleton } from './LoadingSkeleton';

interface InventoryContentProps {
  inventoryFilter: string;
  onInventoryFilterChange: (filter: string) => void;
  selectedItems: number[];
  onSelectedItemsChange: (items: number[]) => void;
}

const InventoryContent: React.FC<InventoryContentProps> = memo(({ 
  inventoryFilter, 
  onInventoryFilterChange, 
  selectedItems, 
  onSelectedItemsChange 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleItemSelection = useCallback((itemId: number): void => {
    const newSelected = selectedItems.includes(itemId) 
      ? selectedItems.filter(id => id !== itemId)
      : [...selectedItems, itemId];
    onSelectedItemsChange(newSelected);
  }, [selectedItems, onSelectedItemsChange]);

  const handleSelectAll = useCallback((checked: boolean): void => {
    if (checked) {
      onSelectedItemsChange(inventoryItems.map(item => item.id));
    } else {
      onSelectedItemsChange([]);
    }
  }, [onSelectedItemsChange]);

  const handleExport = useCallback(() => {
    setIsLoading(true);
    // Simulate export operation
    setTimeout(() => {
      setIsLoading(false);
      console.log('Export completed');
    }, 2000);
  }, []);

  const handleAddProduct = useCallback(() => {
    console.log('Add product clicked');
  }, []);

  const handleEdit = useCallback((itemId: number) => {
    console.log('Edit item:', itemId);
  }, []);

  const handleDelete = useCallback((itemId: number) => {
    console.log('Delete item:', itemId);
  }, []);

  const getStatusColor = useCallback((status: 'critical' | 'warning' | 'good'): string => {
    switch (status) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'good': return 'bg-green-100 text-green-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  }, []);

  const getColorHex = useCallback((colorName: string): string => {
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
      'Dark Blue': '#00008B',
      'Dark Green': '#006400',
      'Dark Red': '#8B0000',
      'Dark Gray': '#A9A9A9',
      'Light Blue': '#ADD8E6',
      'Light Green': '#90EE90',
      'Light Gray': '#D3D3D3',
      'Light Pink': '#FFB6C1',
      'Sky Blue': '#87CEEB',
      'Sea Green': '#2E8B57',
      'Tomato': '#FF6347',
      'Orchid': '#DA70D6',
      'Khaki': '#F0E68C',
      'Wheat': '#F5DEB3',
      'Moccasin': '#FFE4B5',
      'Navajo White': '#FFDEAD',
      'Bisque': '#FFE4C4',
      'Blanched Almond': '#FFEBCD',
      'Cornsilk': '#FFF8DC',
      'Floral White': '#FFFAF0',
      'Ghost White': '#F8F8FF',
      'Honeydew': '#F0FFF0',
      'Lavender Blush': '#FFF0F5',
      'Lemon Chiffon': '#FFFACD',
      'Misty Rose': '#FFE4E1',
      'Old Lace': '#FDF5E6',
      'Papaya Whip': '#FFEFD5',
      'Seashell': '#FFF5EE',
      'Snow': '#FFFAFA',
      'Thistle': '#D8BFD8',
      'Azure': '#F0FFFF',
      'Alice Blue': '#F0F8FF',
      'Antique White': '#FAEBD7',
      'Aquamarine': '#7FFFD4',
      'Cadet Blue': '#5F9EA0',
      'Chartreuse': '#7FFF00',
      'Chocolate': '#D2691E',
      'Cornflower Blue': '#6495ED',
      'Dark Goldenrod': '#B8860B',
      'Dark Khaki': '#BDB76B',
      'Dark Olive Green': '#556B2F',
      'Dark Orange': '#FF8C00',
      'Dark Orchid': '#9932CC',
      'Dark Salmon': '#E9967A',
      'Dark Sea Green': '#8FBC8F',
      'Dark Slate Blue': '#483D8B',
      'Dark Slate Gray': '#2F4F4F',
      'Dark Turquoise': '#00CED1',
      'Dark Violet': '#9400D3',
      'Deep Pink': '#FF1493',
      'Deep Sky Blue': '#00BFFF',
      'Dim Gray': '#696969',
      'Dodger Blue': '#1E90FF',
      'Fire Brick': '#B22222',
      'Gainsboro': '#DCDCDC',
      'Goldenrod': '#DAA520',
      'Hot Pink': '#FF69B4',
      'Indian Red': '#CD5C5C',
      'Light Coral': '#F08080',
      'Light Cyan': '#E0FFFF',
      'Light Goldenrod Yellow': '#FAFAD2',
      'Light Salmon': '#FFA07A',
      'Light Sea Green': '#20B2AA',
      'Light Sky Blue': '#87CEFA',
      'Light Slate Gray': '#778899',
      'Light Steel Blue': '#B0C4DE',
      'Medium Aquamarine': '#66CDAA',
      'Medium Blue': '#0000CD',
      'Medium Orchid': '#BA55D3',
      'Medium Purple': '#9370DB',
      'Medium Sea Green': '#3CB371',
      'Medium Slate Blue': '#7B68EE',
      'Medium Spring Green': '#00FA9A',
      'Medium Turquoise': '#48D1CC',
      'Medium Violet Red': '#C71585',
      'Pale Goldenrod': '#EEE8AA',
      'Pale Green': '#98FB98',
      'Pale Turquoise': '#AFEEEE',
      'Pale Violet Red': '#DB7093',
      'Peru': '#CD853F',
      'Powder Blue': '#B0E0E6',
      'Rosy Brown': '#BC8F8F',
      'Sandy Brown': '#F4A460',
      'Slate Blue': '#6A5ACD',
      'Slate Gray': '#708090',
      'Spring Green': '#00FF7F',
      'Steel Blue': '#4682B4',
      'Yellow Green': '#9ACD32'
    };
    return colorMap[colorName] || '#6B7280'; // Default to gray if color not found
  }, []);

  // Memoized filtered data
  const filteredItems = useMemo(() => {
    return inventoryItems.filter(item => {
      const matchesFilter = inventoryFilter === 'all' || item.status === inventoryFilter;
      const matchesSearch = searchQuery === '' || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [inventoryFilter, searchQuery]);

  if (isLoading) {
    return <TableSkeleton rows={10} columns={8} />;
  }

  return (
    <div className="flex-1 bg-slate-50 overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Inventory Management</h1>
            <p className="text-slate-600 mt-1">Manage all your products and stock levels</p>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleExport}
              disabled={isLoading}
              className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-200 transition-colors flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Export inventory data"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              <span>{isLoading ? 'Exporting...' : 'Export'}</span>
            </button>
            <button 
              onClick={handleAddProduct}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Add new product to inventory"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              <span>Add Product</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Filters */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-medium text-slate-700">Filters:</span>
            </div>
            <select 
              value={inventoryFilter} 
              onChange={(e) => onInventoryFilterChange(e.target.value)}
              className="bg-slate-100 border-0 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Items</option>
              <option value="critical">Critical Stock</option>
              <option value="warning">Low Stock</option>
              <option value="good">Good Stock</option>
            </select>
            <select className="bg-slate-100 border-0 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500">
              <option>All Categories</option>
              <option>Electronics</option>
              <option>Accessories</option>
              <option>Clothing</option>
              <option>Shoes</option>
              <option>Wearables</option>
              <option>Gaming</option>
            </select>
            <select className="bg-slate-100 border-0 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500">
              <option>All Colors</option>
              <option>Black</option>
              <option>White</option>
              <option>Blue</option>
              <option>Red</option>
              <option>Green</option>
              <option>Gray</option>
              <option>Silver</option>
              <option>Gold</option>
              <option>Brown</option>
              <option>Pink</option>
              <option>Purple</option>
              <option>Orange</option>
              <option>Yellow</option>
              <option>Navy</option>
              <option>Multicolor</option>
              <option>Titanium</option>
              <option>Midnight</option>
              <option>Platinum</option>
              <option>Bred</option>
            </select>
            <select className="bg-slate-100 border-0 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500">
              <option>All Sizes</option>
              <option>XS</option>
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
              <option>XXL</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
              <option>28</option>
              <option>30</option>
              <option>32</option>
              <option>34</option>
              <option>36</option>
              <option>38</option>
              <option>40</option>
              <option>42</option>
              <option>44</option>
              <option>40mm</option>
              <option>44mm</option>
              <option>45mm</option>
            </select>
            <select className="bg-slate-100 border-0 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500">
              <option>All Brands</option>
              <option>Apple</option>
              <option>Samsung</option>
              <option>Sony</option>
              <option>Nintendo</option>
              <option>Dell</option>
              <option>Nike</option>
              <option>Adidas</option>
              <option>Levi's</option>
              <option>Champion</option>
              <option>Vans</option>
              <option>Uniqlo</option>
              <option>Converse</option>
              <option>Patagonia</option>
              <option>Jordan</option>
              <option>Lululemon</option>
              <option>New Balance</option>
              <option>Puma</option>
              <option>Reebok</option>
              <option>ASICS</option>
              <option>Brooks</option>
              <option>Tommy Hilfiger</option>
              <option>Calvin Klein</option>
              <option>Ralph Lauren</option>
              <option>Hugo Boss</option>
              <option>Zara</option>
              <option>Gucci</option>
              <option>Louis Vuitton</option>
              <option>Hermès</option>
              <option>The North Face</option>
              <option>Columbia</option>
              <option>Bose</option>
              <option>JBL</option>
              <option>Anker</option>
              <option>Rolex</option>
              <option>Omega</option>
              <option>Tag Heuer</option>
              <option>Razer</option>
              <option>SteelSeries</option>
              <option>Corsair</option>
              <option>Ray-Ban</option>
              <option>Oakley</option>
              <option>Michael Kors</option>
              <option>Kate Spade</option>
              <option>Coach</option>
            </select>
            <div className="relative ml-auto">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-100 border-0 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 w-64 focus:outline-none"
                aria-label="Search products by name or SKU"
              />
            </div>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden" role="region" aria-label="Inventory table">
          <div className="overflow-x-auto">
            <table className="w-full" role="table" aria-label="Product inventory">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr role="row">
                  <th className="px-6 py-3 text-left" role="columnheader">
                    <input 
                      type="checkbox" 
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                      aria-label="Select all products"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase" role="columnheader">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase" role="columnheader">SKU</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase" role="columnheader">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase" role="columnheader">Color</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase" role="columnheader">Size</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase" role="columnheader">Brand</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase" role="columnheader">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase" role="columnheader">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase" role="columnheader">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase" role="columnheader">Last Updated</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase" role="columnheader">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200" role="rowgroup">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors" role="row">
                    <td className="px-6 py-4" role="cell">
                      <input 
                        type="checkbox" 
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => toggleItemSelection(item.id)}
                        aria-label={`Select ${item.name}`}
                      />
                    </td>
                    <td className="px-6 py-4" role="cell">
                      <div className="font-medium text-slate-900">{item.name}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600" role="cell">{item.sku}</td>
                    <td className="px-6 py-4 text-slate-600" role="cell">{item.category}</td>
                    <td className="px-6 py-4 text-slate-600" role="cell">
                      {item.color ? (
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-4 h-4 rounded-full border border-slate-300"
                            style={{ backgroundColor: getColorHex(item.color) }}
                            title={item.color}
                          ></div>
                          <span>{item.color}</span>
                        </div>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-600" role="cell">
                      {item.size || <span className="text-slate-400">-</span>}
                    </td>
                    <td className="px-6 py-4 text-slate-600" role="cell">
                      {item.brand || <span className="text-slate-400">-</span>}
                    </td>
                    <td className="px-6 py-4" role="cell">
                      <div className="text-slate-900 font-medium">{item.stock}</div>
                      <div className="text-xs text-slate-500">Min: {item.minStock}</div>
                    </td>
                    <td className="px-6 py-4" role="cell">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-900 font-medium" role="cell">{item.price}</td>
                    <td className="px-6 py-4 text-slate-600 text-sm" role="cell">{item.lastUpdated}</td>
                    <td className="px-6 py-4 text-right" role="cell">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={() => handleEdit(item.id)}
                          className="p-1 text-slate-400 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                          aria-label={`Edit ${item.name}`}
                        >
                          <Edit3 className="w-4 h-4" aria-hidden="true" />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-1 text-slate-400 hover:text-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded"
                          aria-label={`Delete ${item.name}`}
                        >
                          <Trash2 className="w-4 h-4" aria-hidden="true" />
                        </button>
                        <button 
                          className="p-1 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 rounded"
                          aria-label={`More options for ${item.name}`}
                        >
                          <MoreHorizontal className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedItems.length > 0 && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white rounded-lg px-6 py-3 shadow-lg flex items-center space-x-4" role="region" aria-label="Bulk actions">
            <span className="text-sm font-medium">{selectedItems.length} items selected</span>
            <button 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Edit selected items"
            >
              Bulk Edit
            </button>
            <button 
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              aria-label="Delete selected items"
            >
              Delete
            </button>
            <button 
              onClick={() => onSelectedItemsChange([])}
              className="text-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 rounded"
              aria-label="Clear selection"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

InventoryContent.displayName = 'InventoryContent';

export default InventoryContent;