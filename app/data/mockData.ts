import { 
    StatCard, 
    LowStockItem, 
    ActivityItem, 
    StoreLocation, 
    InventoryItem, 
    Feature, 
    Testimonial, 
    PricingPlan, 
    AIInsight 
  } from '../types';
  import { 
    DollarSign, 
    Package, 
    AlertTriangle, 
    ShoppingCart,
    Cpu,
    BarChart,
    Shield,
    Globe,
    Clock
  } from 'lucide-react';
  
  // Dashboard Stats Data
  export const stats: StatCard[] = [
    {
      title: 'Total Inventory Value',
      value: '$847,392',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign
    },
    {
      title: 'Items In Stock',
      value: '1,247',
      change: '-23',
      trend: 'down',
      icon: Package
    },
    {
      title: 'Low Stock Alerts',
      value: '12',
      change: '+4',
      trend: 'up',
      icon: AlertTriangle
    },
    {
      title: 'Monthly Sales',
      value: '$234,567',
      change: '+18.2%',
      trend: 'up',
      icon: ShoppingCart
    }
  ];
  
  // Low Stock Items Data
  export const lowStockItems: LowStockItem[] = [
    { 
      name: 'iPhone 15 Pro - Black', 
      current: 3, 
      minimum: 10, 
      status: 'critical' 
    },
    { 
      name: 'Samsung Galaxy S24', 
      current: 8, 
      minimum: 15, 
      status: 'warning' 
    },
    { 
      name: 'MacBook Air M2', 
      current: 5, 
      minimum: 8, 
      status: 'warning' 
    },
    { 
      name: 'AirPods Pro', 
      current: 12, 
      minimum: 25, 
      status: 'warning' 
    },
    { 
      name: 'iPad Air 5th Gen', 
      current: 2, 
      minimum: 8, 
      status: 'critical' 
    },
    { 
      name: 'Apple Watch Series 9', 
      current: 6, 
      minimum: 12, 
      status: 'warning' 
    }
  ];
  
  // Recent Activity Data
  export const recentActivity: ActivityItem[] = [
    { 
      action: 'Stock updated', 
      item: 'iPhone 15 Pro - Black', 
      time: '2 minutes ago', 
      type: 'update' 
    },
    { 
      action: 'Low stock alert', 
      item: 'Samsung Galaxy S24', 
      time: '15 minutes ago', 
      type: 'alert' 
    },
    { 
      action: 'New shipment received', 
      item: '25 items added', 
      time: '1 hour ago', 
      type: 'shipment' 
    },
    { 
      action: 'AI prediction generated', 
      item: 'Weekly forecast ready', 
      time: '2 hours ago', 
      type: 'ai' 
    },
    { 
      action: 'Product discontinued', 
      item: 'iPhone 14 Mini', 
      time: '3 hours ago', 
      type: 'update' 
    },
    { 
      action: 'Reorder triggered', 
      item: 'MacBook Air M2', 
      time: '4 hours ago', 
      type: 'shipment' 
    },
    { 
      action: 'Price updated', 
      item: 'AirPods Pro', 
      time: '5 hours ago', 
      type: 'update' 
    },
    { 
      action: 'Critical stock alert', 
      item: 'iPad Air 5th Gen', 
      time: '6 hours ago', 
      type: 'alert' 
    }
  ];
  
  // Store Locations Data
  export const stores: StoreLocation[] = [
    { 
      name: 'Downtown Store', 
      items: 423, 
      alerts: 5, 
      status: 'good' 
    },
    { 
      name: 'Mall Location', 
      items: 567, 
      alerts: 3, 
      status: 'excellent' 
    },
    { 
      name: 'Outlet Store', 
      items: 257, 
      alerts: 4, 
      status: 'good' 
    },
    { 
      name: 'Airport Branch', 
      items: 189, 
      alerts: 8, 
      status: 'warning' 
    },
    { 
      name: 'Warehouse Hub', 
      items: 1234, 
      alerts: 2, 
      status: 'excellent' 
    }
  ];
  
  // Complete Inventory Items Data
  export const inventoryItems: InventoryItem[] = [
    {
      id: 1,
      name: 'iPhone 15 Pro',
      sku: 'IPH15P-BLK',
      category: 'Electronics',
      stock: 3,
      minStock: 10,
      price: '$999.00',
      status: 'critical',
      lastUpdated: '2 hours ago',
      color: 'Black',
      brand: 'Apple'
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24',
      sku: 'SGS24-WHT',
      category: 'Electronics',
      stock: 8,
      minStock: 15,
      price: '$799.00',
      status: 'warning',
      lastUpdated: '1 day ago',
      color: 'White',
      brand: 'Samsung'
    },
    {
      id: 3,
      name: 'MacBook Air M2',
      sku: 'MBA-M2-SLV',
      category: 'Electronics',
      stock: 15,
      minStock: 8,
      price: '$1,199.00',
      status: 'good',
      lastUpdated: '3 hours ago',
      color: 'Silver',
      brand: 'Apple'
    },
    {
      id: 4,
      name: 'AirPods Pro',
      sku: 'APP-WHT',
      category: 'Accessories',
      stock: 12,
      minStock: 25,
      price: '$249.00',
      status: 'warning',
      lastUpdated: '5 hours ago',
      color: 'White',
      brand: 'Apple'
    },
    {
      id: 5,
      name: 'iPad Air 5th Gen',
      sku: 'IPA5-BLU',
      category: 'Electronics',
      stock: 22,
      minStock: 12,
      price: '$599.00',
      status: 'good',
      lastUpdated: '1 hour ago',
      color: 'Blue',
      brand: 'Apple'
    },
    {
      id: 6,
      name: 'Apple Watch Series 9',
      sku: 'AWS9-GPS',
      category: 'Wearables',
      stock: 6,
      minStock: 12,
      price: '$399.00',
      status: 'warning',
      lastUpdated: '4 hours ago',
      color: 'Midnight',
      size: '45mm',
      brand: 'Apple'
    },
    {
      id: 7,
      name: 'Sony WH-1000XM5',
      sku: 'SNY-WH1000XM5',
      category: 'Accessories',
      stock: 18,
      minStock: 10,
      price: '$349.00',
      status: 'good',
      lastUpdated: '2 days ago',
      color: 'Black',
      brand: 'Sony'
    },
    {
      id: 8,
      name: 'Nintendo Switch OLED',
      sku: 'NSW-OLED-WHT',
      category: 'Gaming',
      stock: 4,
      minStock: 8,
      price: '$349.99',
      status: 'warning',
      lastUpdated: '6 hours ago',
      color: 'White',
      brand: 'Nintendo'
    },
    {
      id: 9,
      name: 'Dell XPS 13',
      sku: 'DELL-XPS13-I7',
      category: 'Electronics',
      stock: 7,
      minStock: 5,
      price: '$1,299.00',
      status: 'good',
      lastUpdated: '1 day ago',
      color: 'Platinum',
      brand: 'Dell'
    },
    {
      id: 10,
      name: 'iPhone 15 Pro',
      sku: 'IPH15P-TIT',
      category: 'Electronics',
      stock: 1,
      minStock: 8,
      price: '$1,099.00',
      status: 'critical',
      lastUpdated: '30 minutes ago',
      color: 'Titanium',
      brand: 'Apple'
    },
    // Clothing Items
    {
      id: 11,
      name: 'Nike Air Max 270',
      sku: 'NK-AM270-BLK-10',
      category: 'Shoes',
      stock: 15,
      minStock: 8,
      price: '$150.00',
      status: 'good',
      lastUpdated: '2 hours ago',
      color: 'Black',
      size: '10',
      brand: 'Nike',
      material: 'Mesh/Leather'
    },
    {
      id: 12,
      name: 'Adidas Ultraboost 22',
      sku: 'AD-UB22-WHT-9',
      category: 'Shoes',
      stock: 8,
      minStock: 12,
      price: '$180.00',
      status: 'warning',
      lastUpdated: '1 day ago',
      color: 'White',
      size: '9',
      brand: 'Adidas',
      material: 'Primeknit'
    },
    {
      id: 13,
      name: 'Levi\'s 501 Jeans',
      sku: 'LV-501-BLU-32',
      category: 'Clothing',
      stock: 12,
      minStock: 15,
      price: '$89.00',
      status: 'warning',
      lastUpdated: '3 hours ago',
      color: 'Blue',
      size: '32',
      brand: 'Levi\'s',
      material: 'Denim'
    },
    {
      id: 14,
      name: 'Champion Hoodie',
      sku: 'CH-HOOD-GRY-L',
      category: 'Clothing',
      stock: 20,
      minStock: 10,
      price: '$65.00',
      status: 'good',
      lastUpdated: '4 hours ago',
      color: 'Gray',
      size: 'Large',
      brand: 'Champion',
      material: 'Cotton'
    },
    {
      id: 15,
      name: 'Vans Old Skool',
      sku: 'VN-OS-BLK-8',
      category: 'Shoes',
      stock: 6,
      minStock: 10,
      price: '$70.00',
      status: 'warning',
      lastUpdated: '5 hours ago',
      color: 'Black',
      size: '8',
      brand: 'Vans',
      material: 'Canvas'
    },
    {
      id: 16,
      name: 'Uniqlo T-Shirt',
      sku: 'UQ-TS-WHT-M',
      category: 'Clothing',
      stock: 25,
      minStock: 20,
      price: '$19.90',
      status: 'good',
      lastUpdated: '1 hour ago',
      color: 'White',
      size: 'Medium',
      brand: 'Uniqlo',
      material: 'Cotton'
    },
    {
      id: 17,
      name: 'Converse Chuck Taylor',
      sku: 'CV-CT-RED-9',
      category: 'Shoes',
      stock: 4,
      minStock: 8,
      price: '$55.00',
      status: 'warning',
      lastUpdated: '6 hours ago',
      color: 'Red',
      size: '9',
      brand: 'Converse',
      material: 'Canvas'
    },
    {
      id: 18,
      name: 'Patagonia Jacket',
      sku: 'PT-JKT-BLK-XL',
      category: 'Clothing',
      stock: 3,
      minStock: 5,
      price: '$199.00',
      status: 'warning',
      lastUpdated: '2 days ago',
      color: 'Black',
      size: 'XL',
      brand: 'Patagonia',
      material: 'Polyester'
    },
    {
      id: 19,
      name: 'Jordan 1 Retro',
      sku: 'JD-J1-BRD-11',
      category: 'Shoes',
      stock: 2,
      minStock: 6,
      price: '$170.00',
      status: 'critical',
      lastUpdated: '1 hour ago',
      color: 'Bred',
      size: '11',
      brand: 'Jordan',
      material: 'Leather'
    },
    {
      id: 20,
      name: 'Lululemon Leggings',
      sku: 'LL-LEG-BLK-S',
      category: 'Clothing',
      stock: 18,
      minStock: 12,
      price: '$98.00',
      status: 'good',
      lastUpdated: '3 hours ago',
      color: 'Black',
      size: 'Small',
      brand: 'Lululemon',
      material: 'Lycra'
    },
    // More Shoe Examples
    {
      id: 21,
      name: 'New Balance 990v5',
      sku: 'NB-990V5-GRY-10',
      category: 'Shoes',
      stock: 12,
      minStock: 8,
      price: '$185.00',
      status: 'good',
      lastUpdated: '2 hours ago',
      color: 'Gray',
      size: '10',
      brand: 'New Balance',
      material: 'Mesh/Suede'
    },
    {
      id: 22,
      name: 'Puma Suede Classic',
      sku: 'PM-SUEDE-WHT-9',
      category: 'Shoes',
      stock: 7,
      minStock: 10,
      price: '$75.00',
      status: 'warning',
      lastUpdated: '1 day ago',
      color: 'White',
      size: '9',
      brand: 'Puma',
      material: 'Suede'
    },
    {
      id: 23,
      name: 'Reebok Classic Leather',
      sku: 'RB-CL-BLK-11',
      category: 'Shoes',
      stock: 9,
      minStock: 12,
      price: '$80.00',
      status: 'warning',
      lastUpdated: '4 hours ago',
      color: 'Black',
      size: '11',
      brand: 'Reebok',
      material: 'Leather'
    },
    {
      id: 24,
      name: 'ASICS Gel-Kayano 28',
      sku: 'AS-GK28-BLU-10',
      category: 'Shoes',
      stock: 15,
      minStock: 8,
      price: '$160.00',
      status: 'good',
      lastUpdated: '3 hours ago',
      color: 'Blue',
      size: '10',
      brand: 'ASICS',
      material: 'Mesh/Synthetic'
    },
    {
      id: 25,
      name: 'Brooks Ghost 14',
      sku: 'BR-GH14-PNK-8',
      category: 'Shoes',
      stock: 6,
      minStock: 10,
      price: '$130.00',
      status: 'warning',
      lastUpdated: '5 hours ago',
      color: 'Pink',
      size: '8',
      brand: 'Brooks',
      material: 'Mesh'
    },
    // More Clothing Examples
    {
      id: 26,
      name: 'Tommy Hilfiger Polo Shirt',
      sku: 'TH-POLO-BLU-M',
      category: 'Clothing',
      stock: 22,
      minStock: 15,
      price: '$89.00',
      status: 'good',
      lastUpdated: '1 hour ago',
      color: 'Blue',
      size: 'Medium',
      brand: 'Tommy Hilfiger',
      material: 'Cotton'
    },
    {
      id: 27,
      name: 'Calvin Klein Jeans',
      sku: 'CK-JEANS-BLK-34',
      category: 'Clothing',
      stock: 8,
      minStock: 12,
      price: '$95.00',
      status: 'warning',
      lastUpdated: '2 days ago',
      color: 'Black',
      size: '34',
      brand: 'Calvin Klein',
      material: 'Denim'
    },
    {
      id: 28,
      name: 'Ralph Lauren Sweater',
      sku: 'RL-SWEAT-GRY-L',
      category: 'Clothing',
      stock: 14,
      minStock: 10,
      price: '$125.00',
      status: 'good',
      lastUpdated: '3 hours ago',
      color: 'Gray',
      size: 'Large',
      brand: 'Ralph Lauren',
      material: 'Wool Blend'
    },
    {
      id: 29,
      name: 'Hugo Boss Dress Shirt',
      sku: 'HB-SHIRT-WHT-L',
      category: 'Clothing',
      stock: 11,
      minStock: 8,
      price: '$145.00',
      status: 'good',
      lastUpdated: '4 hours ago',
      color: 'White',
      size: 'Large',
      brand: 'Hugo Boss',
      material: 'Cotton'
    },
    {
      id: 30,
      name: 'Zara Blazer',
      sku: 'ZR-BLAZ-NVY-M',
      category: 'Clothing',
      stock: 5,
      minStock: 8,
      price: '$79.90',
      status: 'warning',
      lastUpdated: '6 hours ago',
      color: 'Navy',
      size: 'Medium',
      brand: 'Zara',
      material: 'Wool Blend'
    },
    // Luxury Brand Examples
    {
      id: 31,
      name: 'Gucci Ace Sneakers',
      sku: 'GC-ACE-WHT-9',
      category: 'Shoes',
      stock: 3,
      minStock: 5,
      price: '$650.00',
      status: 'warning',
      lastUpdated: '1 day ago',
      color: 'White',
      size: '9',
      brand: 'Gucci',
      material: 'Leather'
    },
    {
      id: 32,
      name: 'Louis Vuitton Belt',
      sku: 'LV-BELT-BRN-32',
      category: 'Accessories',
      stock: 2,
      minStock: 4,
      price: '$580.00',
      status: 'critical',
      lastUpdated: '2 hours ago',
      color: 'Brown',
      size: '32',
      brand: 'Louis Vuitton',
      material: 'Leather'
    },
    {
      id: 33,
      name: 'Hermès Scarf',
      sku: 'HM-SCARF-MLT-OS',
      category: 'Accessories',
      stock: 1,
      minStock: 3,
      price: '$420.00',
      status: 'critical',
      lastUpdated: '30 minutes ago',
      color: 'Multicolor',
      size: 'One Size',
      brand: 'Hermès',
      material: 'Silk'
    },
    // Seasonal Examples
    {
      id: 34,
      name: 'North Face Winter Jacket',
      sku: 'NF-JKT-BLK-L',
      category: 'Clothing',
      stock: 16,
      minStock: 12,
      price: '$299.00',
      status: 'good',
      lastUpdated: '2 hours ago',
      color: 'Black',
      size: 'Large',
      brand: 'The North Face',
      material: 'Nylon'
    },
    {
      id: 35,
      name: 'Columbia Hiking Boots',
      sku: 'CL-HB-BRN-10',
      category: 'Shoes',
      stock: 9,
      minStock: 8,
      price: '$180.00',
      status: 'good',
      lastUpdated: '4 hours ago',
      color: 'Brown',
      size: '10',
      brand: 'Columbia',
      material: 'Leather/Synthetic'
    },
    {
      id: 36,
      name: 'Patagonia Fleece Jacket',
      sku: 'PT-FLEE-GRN-M',
      category: 'Clothing',
      stock: 13,
      minStock: 10,
      price: '$129.00',
      status: 'good',
      lastUpdated: '3 hours ago',
      color: 'Green',
      size: 'Medium',
      brand: 'Patagonia',
      material: 'Polyester'
    },
    // Tech Accessories
    {
      id: 37,
      name: 'Bose QuietComfort 45',
      sku: 'BS-QC45-BLK-OS',
      category: 'Accessories',
      stock: 8,
      minStock: 12,
      price: '$329.00',
      status: 'warning',
      lastUpdated: '1 day ago',
      color: 'Black',
      size: 'One Size',
      brand: 'Bose',
      material: 'Plastic/Fabric'
    },
    {
      id: 38,
      name: 'JBL Charge 5 Speaker',
      sku: 'JB-CH5-BLU-OS',
      category: 'Accessories',
      stock: 15,
      minStock: 10,
      price: '$179.95',
      status: 'good',
      lastUpdated: '2 hours ago',
      color: 'Blue',
      size: 'One Size',
      brand: 'JBL',
      material: 'Plastic'
    },
    {
      id: 39,
      name: 'Anker PowerCore 20000',
      sku: 'AK-PC20-BLK-OS',
      category: 'Accessories',
      stock: 20,
      minStock: 15,
      price: '$49.99',
      status: 'good',
      lastUpdated: '1 hour ago',
      color: 'Black',
      size: 'One Size',
      brand: 'Anker',
      material: 'Plastic'
    },
    // Watch Examples
    {
      id: 40,
      name: 'Rolex Submariner',
      sku: 'RL-SUB-BLK-OS',
      category: 'Wearables',
      stock: 1,
      minStock: 2,
      price: '$8,100.00',
      status: 'critical',
      lastUpdated: '1 week ago',
      color: 'Black',
      size: 'One Size',
      brand: 'Rolex',
      material: 'Steel'
    },
    {
      id: 41,
      name: 'Omega Seamaster',
      sku: 'OM-SEA-BLU-OS',
      category: 'Wearables',
      stock: 2,
      minStock: 3,
      price: '$4,200.00',
      status: 'warning',
      lastUpdated: '3 days ago',
      color: 'Blue',
      size: 'One Size',
      brand: 'Omega',
      material: 'Steel'
    },
    {
      id: 42,
      name: 'Tag Heuer Formula 1',
      sku: 'TH-F1-RED-OS',
      category: 'Wearables',
      stock: 4,
      minStock: 5,
      price: '$1,500.00',
      status: 'warning',
      lastUpdated: '2 days ago',
      color: 'Red',
      size: 'One Size',
      brand: 'Tag Heuer',
      material: 'Steel'
    },
    // Gaming Accessories
    {
      id: 43,
      name: 'Razer DeathAdder V3',
      sku: 'RZ-DA3-BLK-OS',
      category: 'Gaming',
      stock: 18,
      minStock: 12,
      price: '$69.99',
      status: 'good',
      lastUpdated: '1 hour ago',
      color: 'Black',
      size: 'One Size',
      brand: 'Razer',
      material: 'Plastic'
    },
    {
      id: 44,
      name: 'SteelSeries Arctis 7',
      sku: 'SS-AR7-BLK-OS',
      category: 'Gaming',
      stock: 12,
      minStock: 10,
      price: '$149.99',
      status: 'good',
      lastUpdated: '3 hours ago',
      color: 'Black',
      size: 'One Size',
      brand: 'SteelSeries',
      material: 'Plastic/Fabric'
    },
    {
      id: 45,
      name: 'Corsair K70 RGB Keyboard',
      sku: 'CS-K70-BLK-OS',
      category: 'Gaming',
      stock: 7,
      minStock: 8,
      price: '$169.99',
      status: 'warning',
      lastUpdated: '5 hours ago',
      color: 'Black',
      size: 'One Size',
      brand: 'Corsair',
      material: 'Aluminum/Plastic'
    },
    // Fashion Accessories
    {
      id: 46,
      name: 'Ray-Ban Aviator Sunglasses',
      sku: 'RB-AVI-GLD-OS',
      category: 'Accessories',
      stock: 14,
      minStock: 10,
      price: '$154.00',
      status: 'good',
      lastUpdated: '2 hours ago',
      color: 'Gold',
      size: 'One Size',
      brand: 'Ray-Ban',
      material: 'Metal/Glass'
    },
    {
      id: 47,
      name: 'Oakley Holbrook Sunglasses',
      sku: 'OK-HB-BLK-OS',
      category: 'Accessories',
      stock: 9,
      minStock: 8,
      price: '$184.00',
      status: 'good',
      lastUpdated: '4 hours ago',
      color: 'Black',
      size: 'One Size',
      brand: 'Oakley',
      material: 'Plastic'
    },
    {
      id: 48,
      name: 'Michael Kors Handbag',
      sku: 'MK-HB-BLK-OS',
      category: 'Accessories',
      stock: 6,
      minStock: 8,
      price: '$298.00',
      status: 'warning',
      lastUpdated: '1 day ago',
      color: 'Black',
      size: 'One Size',
      brand: 'Michael Kors',
      material: 'Leather'
    },
    {
      id: 49,
      name: 'Kate Spade Wallet',
      sku: 'KS-WAL-PNK-OS',
      category: 'Accessories',
      stock: 11,
      minStock: 10,
      price: '$128.00',
      status: 'good',
      lastUpdated: '3 hours ago',
      color: 'Pink',
      size: 'One Size',
      brand: 'Kate Spade',
      material: 'Leather'
    },
    {
      id: 50,
      name: 'Coach Crossbody Bag',
      sku: 'CC-CB-BRN-OS',
      category: 'Accessories',
      stock: 8,
      minStock: 10,
      price: '$195.00',
      status: 'warning',
      lastUpdated: '2 days ago',
      color: 'Brown',
      size: 'One Size',
      brand: 'Coach',
      material: 'Leather'
    }
  ];
  
  // Landing Page Features Data
  export const features: Feature[] = [
    {
      icon: Cpu,
      title: "AI-Powered Insights",
      description: "Advanced machine learning algorithms predict demand, optimize stock levels, and prevent stockouts before they happen."
    },
    {
      icon: BarChart,
      title: "Real-Time Analytics",
      description: "Get instant visibility into your inventory performance across all locations with beautiful, actionable dashboards."
    },
    {
      icon: AlertTriangle,
      title: "Smart Alerts",
      description: "Intelligent notifications for low stock, overstock situations, and seasonal demand patterns."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security with encrypted data, role-based access, and compliance with industry standards."
    },
    {
      icon: Globe,
      title: "Multi-Location Support",
      description: "Manage inventory across unlimited store locations with centralized control and location-specific insights."
    },
    {
      icon: Clock,
      title: "Automated Workflows",
      description: "Set up automatic reordering, transfer requests, and approval workflows to streamline operations."
    }
  ];
  
  // Customer Testimonials Data
  export const testimonials: Testimonial[] = [
    {
      name: "Sarah Johnson",
      role: "Operations Manager",
      company: "TechMart Electronics",
      content: "Storagex reduced our stockouts by 85% and saved us over $50,000 in inventory costs in just 6 months.",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Store Owner",
      company: "Chen's Retail Chain",
      content: "The AI predictions are incredibly accurate. We now know exactly what to order and when.",
      rating: 5
    },
    {
      name: "Lisa Rodriguez",
      role: "Inventory Director",
      company: "Fashion Forward",
      content: "Finally, an inventory system that actually understands seasonal trends and customer behavior.",
      rating: 5
    },
    {
      name: "David Kumar",
      role: "Supply Chain Manager",
      company: "Global Electronics",
      content: "Storagex transformed our entire inventory process. The ROI was visible within the first month.",
      rating: 5
    },
    {
      name: "Emma Thompson",
      role: "Store Manager",
      company: "Urban Outfitters",
      content: "The multi-location features are game-changing. We can manage 15 stores from one dashboard.",
      rating: 5
    },
    {
      name: "Carlos Martinez",
      role: "CEO",
      company: "Retail Innovations",
      content: "Best investment we've made. The AI insights have revolutionized how we approach inventory.",
      rating: 5
    }
  ];
  
  // Pricing Plans Data
  export const pricingPlans: PricingPlan[] = [
    {
      name: "Starter",
      price: "$49",
      period: "/month",
      description: "Perfect for small retail stores",
      features: [
        "Up to 1,000 products",
        "1 store location",
        "Basic AI insights",
        "Email support",
        "Mobile app access",
        "Standard reporting"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$149",
      period: "/month",
      description: "For growing retail businesses",
      features: [
        "Up to 10,000 products",
        "5 store locations",
        "Advanced AI predictions",
        "Priority support",
        "Custom integrations",
        "Advanced analytics",
        "Automated reordering",
        "API access"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$399",
      period: "/month",
      description: "For large retail operations",
      features: [
        "Unlimited products",
        "Unlimited locations",
        "Full AI suite",
        "24/7 phone support",
        "Custom workflows",
        "Dedicated success manager",
        "White-label options",
        "Advanced security features",
        "Custom reporting",
        "Priority feature requests"
      ],
      popular: false
    }
  ];
  
  // AI Insights Data
  export const aiInsights: AIInsight[] = [
    {
      title: "Seasonal Trend Analysis",
      description: "Back-to-school season approaching. Recommend increasing laptop and tablet inventory by 40%.",
      impact: "High",
      timeframe: "Next 2 weeks",
      confidence: "92%"
    },
    {
      title: "Cross-Selling Opportunity", 
      description: "Customers buying iPhones have 78% likelihood of purchasing cases within 30 days.",
      impact: "Medium",
      timeframe: "Ongoing",
      confidence: "78%"
    },
    {
      title: "Price Optimization",
      description: "AirPods Pro showing price elasticity. 5% price reduction could increase volume by 23%.",
      impact: "Medium",
      timeframe: "Next month",
      confidence: "84%"
    },
    {
      title: "Supply Chain Risk",
      description: "Potential disruption in Samsung supply chain. Consider increasing Galaxy S24 stock by 25%.",
      impact: "High",
      timeframe: "Next 3 weeks",
      confidence: "67%"
    },
    {
      title: "Holiday Preparation",
      description: "Gaming console demand expected to spike 150% during holiday season. Increase Nintendo Switch inventory.",
      impact: "High",
      timeframe: "Next 6 weeks",
      confidence: "89%"
    },
    {
      title: "Market Trend Shift",
      description: "Increasing demand for premium headphones. Sony WH-1000XM5 showing 45% growth potential.",
      impact: "Medium",
      timeframe: "Next 2 months",
      confidence: "73%"
    }
  ];
  
  // Additional Sample Data for Future Features
  export const categoryData = [
    { name: 'Electronics', count: 567, value: '$2,340,000' },
    { name: 'Accessories', count: 234, value: '$456,000' },
    { name: 'Wearables', count: 123, value: '$234,000' },
    { name: 'Gaming', count: 89, value: '$178,000' },
    { name: 'Audio', count: 156, value: '$345,000' }
  ];
  
  export const salesData = [
    { month: 'Jan', sales: 45000, inventory: 234000 },
    { month: 'Feb', sales: 52000, inventory: 267000 },
    { month: 'Mar', sales: 48000, inventory: 251000 },
    { month: 'Apr', sales: 61000, inventory: 298000 },
    { month: 'May', sales: 55000, inventory: 276000 },
    { month: 'Jun', sales: 67000, inventory: 312000 }
  ];
  
  export const topSellingProducts = [
    { name: 'iPhone 15 Pro', units: 234, revenue: '$233,400' },
    { name: 'MacBook Air M2', units: 123, revenue: '$147,477' },
    { name: 'AirPods Pro', units: 456, revenue: '$113,544' },
    { name: 'iPad Air', units: 189, revenue: '$113,211' },
    { name: 'Apple Watch', units: 267, revenue: '$106,533' }
  ];
  
  // Supplier Data
  export const suppliers = [
    { name: 'Apple Inc.', products: 45, reliability: 98, avgDelivery: '3 days' },
    { name: 'Samsung Electronics', products: 32, reliability: 95, avgDelivery: '5 days' },
    { name: 'Sony Corporation', products: 28, reliability: 92, avgDelivery: '4 days' },
    { name: 'Dell Technologies', products: 19, reliability: 94, avgDelivery: '6 days' },
    { name: 'Nintendo', products: 12, reliability: 89, avgDelivery: '7 days' }
  ];