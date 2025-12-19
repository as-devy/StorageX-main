// Page Navigation Types
export type PageType = 'landing' | 'sign-up' | 'sign-in' | 'dashboard' | 'customers' | 'products' | 'orders' | 'suppliers' | 'analytics' | 'ai-insights' | 'inventory' | 'low-stock' | 'stores' | 'settings' | 'general' | 'stores-config' | 'ai-settings' | 'notifications' | 'billing' | 'documentation' | 'support';

// Navigation Interface
export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  count?: number;
  active?: boolean;
  children?: NavItem[];
}

// Dashboard Stats Interface
export interface StatCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ComponentType<{ className?: string }>;
}

// Inventory Interfaces
export interface InventoryItem {
  id: number;
  name: string;
  sku: string;
  category: string;
  stock: number;
  minStock: number;
  price: string;
  status: 'critical' | 'warning' | 'good';
  lastUpdated: string;
  color?: string;
  size?: string;
  brand?: string;
  material?: string;
}

export interface LowStockItem {
  name: string;
  current: number;
  minimum: number;
  status: 'critical' | 'warning';
}

// Activity and Store Interfaces
export interface ActivityItem {
  action: string;
  item: string;
  time: string;
  type: 'update' | 'alert' | 'shipment' | 'ai';
}

export interface StoreLocation {
  name: string;
  items: number;
  alerts: number;
  status: 'excellent' | 'good' | 'warning';
}

// Landing Page Interfaces
export interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
}

// AI Insights Interface
export interface AIInsight {
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  timeframe: string;
  confidence: string;
}

// Component Props Interfaces
export interface SidebarNavProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  expandedSections: string[];
  onToggleSection: (sectionId: string) => void;
}

export interface DashboardContentProps {
  timeFilter: string;
  onTimeFilterChange: (filter: string) => void;
  onPageChange: (page: PageType) => void;
}

export interface InventoryContentProps {
  inventoryFilter: string;
  onInventoryFilterChange: (filter: string) => void;
  selectedItems: number[];
  onSelectedItemsChange: (items: number[]) => void;
}

export interface LandingPageProps {
  onPageChange: (page: PageType) => void;
}

// Additional Data Interfaces
export interface CategoryData {
  name: string;
  count: number;
  value: string;
}

export interface SalesData {
  month: string;
  sales: number;
  inventory: number;
}

export interface TopSellingProduct {
  name: string;
  units: number;
  revenue: string;
}

export interface Supplier {
  name: string;
  products: number;
  reliability: number;
  avgDelivery: string;
}

// Form and Input Interfaces
export interface SearchFilters {
  query: string;
  category: string;
  status: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export interface BulkAction {
  type: 'edit' | 'delete' | 'export' | 'reorder';
  itemIds: number[];
}

// Settings Interfaces
export interface NotificationSettings {
  lowStockAlerts: boolean;
  aiInsights: boolean;
  weeklyReports: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
}

export interface AIConfiguration {
  predictionSensitivity: 'conservative' | 'balanced' | 'aggressive';
  autoReorderThreshold: number;
  forecastHorizon: number;
  confidenceThreshold: number;
}

export interface GeneralSettings {
  companyName: string;
  timezone: string;
  currency: string;
  language: string;
  dateFormat: string;
}

export interface StoreConfiguration {
  id: string;
  name: string;
  address: string;
  manager: string;
  phone: string;
  email: string;
  operatingHours: string;
  isActive: boolean;
}

// User and Account Interfaces
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'staff';
  avatar?: string;
  lastLogin: string;
  permissions: Permission[];
}

export interface Permission {
  resource: string;
  actions: ('read' | 'write' | 'delete' | 'admin')[];
}

export interface Account {
  id: string;
  companyName: string;
  plan: 'starter' | 'professional' | 'enterprise';
  subscription: {
    status: 'active' | 'inactive' | 'trial';
    expiresAt: string;
    autoRenew: boolean;
  };
  usage: {
    products: number;
    locations: number;
    apiCalls: number;
    storageUsed: number;
  };
  limits: {
    maxProducts: number;
    maxLocations: number;
    maxApiCalls: number;
    maxStorage: number;
  };
}

// API Response Interfaces
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Chart and Analytics Interfaces
export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
  metadata?: Record<string, any>;
}

export interface TimeSeriesData {
  timestamp: string;
  value: number;
  category?: string;
}

export interface AnalyticsMetric {
  name: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  period: 'day' | 'week' | 'month' | 'year';
}

// Notification Interfaces
export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  actionText?: string;
}

export interface Alert {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'stock' | 'ai' | 'system' | 'security';
  title: string;
  description: string;
  affectedItems: string[];
  createdAt: string;
  resolvedAt?: string;
  status: 'active' | 'acknowledged' | 'resolved';
}

// Forecasting and Prediction Interfaces
export interface DemandForecast {
  productId: number;
  productName: string;
  currentStock: number;
  predictedDemand: number[];
  confidence: number;
  timeHorizon: string[];
  recommendedAction: 'reorder' | 'reduce' | 'maintain';
  reorderQuantity?: number;
}

export interface SeasonalTrend {
  productId: number;
  season: 'spring' | 'summer' | 'fall' | 'winter';
  averageIncrease: number;
  peakMonth: string;
  historicalData: TimeSeriesData[];
}

// Import/Export Interfaces
export interface ImportResult {
  totalRows: number;
  successfulImports: number;
  failedImports: number;
  errors: ImportError[];
  warnings: ImportWarning[];
}

export interface ImportError {
  row: number;
  field: string;
  message: string;
  value: any;
}

export interface ImportWarning {
  row: number;
  field: string;
  message: string;
  value: any;
}

export interface ExportOptions {
  format: 'csv' | 'xlsx' | 'json' | 'pdf';
  includeImages: boolean;
  dateRange?: {
    start: string;
    end: string;
  };
  filters?: SearchFilters;
  fields: string[];
}

// Integration Interfaces
export interface Integration {
  id: string;
  name: string;
  type: 'ecommerce' | 'accounting' | 'shipping' | 'analytics';
  provider: string;
  status: 'active' | 'inactive' | 'error' | 'pending';
  lastSync: string;
  settings: Record<string, any>;
}

export interface WebhookConfig {
  id: string;
  url: string;
  events: string[];
  secret: string;
  isActive: boolean;
  lastTriggered?: string;
  failureCount: number;
}

// Audit and Logging Interfaces
export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  resourceId: string;
  changes: Record<string, { old: any; new: any }>;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
}

export interface SystemLog {
  id: string;
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  timestamp: string;
  source: string;
  metadata?: Record<string, any>;
}

// Utility Types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Event Types for State Management
export type InventoryEvent = 
  | { type: 'ADD_ITEM'; payload: InventoryItem }
  | { type: 'UPDATE_ITEM'; payload: { id: number; updates: Partial<InventoryItem> } }
  | { type: 'DELETE_ITEM'; payload: number }
  | { type: 'BULK_UPDATE'; payload: { ids: number[]; updates: Partial<InventoryItem> } }
  | { type: 'REORDER_ITEM'; payload: { id: number; quantity: number } };

export type UIEvent = 
  | { type: 'SET_PAGE'; payload: PageType }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_FILTERS'; payload: Partial<SearchFilters> }
  | { type: 'TOGGLE_SIDEBAR'; payload?: boolean }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SHOW_NOTIFICATION'; payload: Notification }
  | { type: 'DISMISS_NOTIFICATION'; payload: string };

// State Interfaces
export interface AppState {
  ui: UIState;
  inventory: InventoryState;
  user: UserState;
  settings: SettingsState;
}

export interface UIState {
  currentPage: PageType;
  sidebarOpen: boolean;
  loading: boolean;
  notifications: Notification[];
  searchQuery: string;
  filters: SearchFilters;
  selectedItems: number[];
}

export interface InventoryState {
  items: InventoryItem[];
  lowStockItems: LowStockItem[];
  categories: CategoryData[];
  totalValue: number;
  totalItems: number;
  alerts: Alert[];
}

export interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
  permissions: Permission[];
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  timezone: string;
  dashboardLayout: string[];
  notificationSettings: NotificationSettings;
}

export interface SettingsState {
  general: GeneralSettings;
  ai: AIConfiguration;
  notifications: NotificationSettings;
  stores: StoreConfiguration[];
  integrations: Integration[];
}