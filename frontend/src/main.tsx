import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/responsive.css'
import './styles/fixes.css'
import { initAnalytics } from './lib/analytics'
import { initPerformanceMonitoring } from './lib/performance'

// Initialize analytics and performance monitoring
initAnalytics();
initPerformanceMonitoring();

createRoot(document.getElementById("root")!).render(<App />);
