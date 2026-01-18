import axios from 'axios';

// Function to get API base URL at runtime
const getApiBaseUrl = (): string => {
  if (typeof window !== 'undefined') {
    // Client-side: try to get from environment or use a default
    return process.env.NEXT_PUBLIC_API_URL || "https://web-production-e4e27.up.railway.app";
  }
  // Server-side (during build): fallback to environment
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
};

// Create axios instance with default config
const api = axios.create({
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer test-token`, // Using the test token from the backend
  },
});

// Request interceptor to set base URL dynamically
api.interceptors.request.use(
  (config) => {
    const baseUrl = getApiBaseUrl();
    if (!config.baseURL && !config.url?.startsWith('http')) {
      config.baseURL = baseUrl;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // If you implement auth later
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// API service methods
export const ApiService = {
  // Health check
  healthCheck: () => api.get('/health'),
  
  // System status
  getSystemStatus: () => api.get('/status'),
  
  // Get satellite positions
  getSatellitePositions: () => api.get('/satellites/positions'),
  
  // Get satellite catalog
  getSatelliteCatalog: () => api.get('/satellites/catalog'),
  
  // Get institutional catalog with filtering
  getInstitutionalCatalog: (params?: {
    type_filter?: string;
    search?: string;
    limit?: number;
  }) => api.get('/satellites/institutional-catalog', { params }),
  
  // Get recent alerts
  getRecentAlerts: (limit: number = 50) => 
    api.get(`/alerts/recent`, { params: { limit } }),
  
  // Get catalog statistics
  getCatalogStatistics: () => api.get('/statistics/catalog'),
  
  // Get intelligence summary
  getIntelligenceSummary: () => api.get('/intelligence/summary'),
  
  // Screen for conjunctions
  screenConjunctions: (payload: {
    primary_norad_id: number;
    time_window_hours?: number;
    screening_threshold_km?: number;
    probability_threshold?: number;
    include_debris?: boolean;
  }) => api.post('/conjunctions/screen', payload),
  
  // Get conjunction events
  getConjunctionEvents: (params?: {
    hours_back?: number;
    min_probability?: number;
    limit?: number;
  }) => api.get('/conjunctions/events', { params }),
  
  // Get latest TLE for a satellite
  getLatestTle: (norad_id: number) => api.get(`/tle/latest/${norad_id}`),
  
  // Detect maneuvers
  detectManeuvers: (norad_id: number, days_back: number = 7) =>
    api.post('/maneuvers/detect', null, { params: { norad_id, days_back } }),
  
  // Get priority targets
  getPriorityTargets: () => api.get('/intelligence/priority-targets'),
  
  // Get conjunctions summary
  getConjunctionsSummary: () => api.get('/intelligence/conjunctions-summary'),
};

export default api;