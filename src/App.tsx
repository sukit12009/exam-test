import { BrowserRouter as Router, Routes, Route, NavLink as RouterNavLink } from "react-router-dom";
import "./App.css";

// Context
import { ThemeProvider } from "./contexts/ThemeContext";

// Pages
import VirtualizedListPage from "./pages/VirtualizedListPage";
import PaginationHookPage from "./pages/PaginationHookPage";
import ProductManagementPage from "./pages/ProductManagementPage";
import DarkModePage from "./pages/DarkModePage";
import ChatAppPage from "./pages/ChatAppPage";
import FormValidationPage from "./pages/FormValidationPage";
import InfiniteScrollPage from "./pages/InfiniteScrollPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import CsvExportPage from "./pages/CsvExportPage";
import ReduxToolkitPage from "./pages/ReduxToolkitPage";

// Navigation Link Component
const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <RouterNavLink
    to={to}
    className={({ isActive }: { isActive: boolean }) =>
      `px-3 py-2 rounded text-sm font-medium transition-colors ${
        isActive
          ? "bg-blue-700 text-white"
          : "bg-blue-500 text-white hover:bg-blue-600"
      }`
    }
  >
    {children}
  </RouterNavLink>
);

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
          <nav className="bg-blue-600 text-white p-4">
            <h1 className="text-2xl font-bold mb-4">React Features Demo</h1>
            <div className="flex flex-wrap gap-2">
              <NavLink to="/virtualized-list">1. Virtualized List</NavLink>
              <NavLink to="/pagination-hook">2. Pagination Hook</NavLink>
              <NavLink to="/product-management">3. Product Management</NavLink>
              <NavLink to="/dark-mode">4. Dark Mode Toggle</NavLink>
              <NavLink to="/chat">5. Real-Time Chat</NavLink>
              <NavLink to="/form-validation">6. Form Validation</NavLink>
              <NavLink to="/infinite-scroll">7. Infinite Scroll</NavLink>
              <NavLink to="/shopping-cart">8. Shopping Cart</NavLink>
              <NavLink to="/csv-export">9. CSV Export</NavLink>
              <NavLink to="/redux-toolkit">10. Redux Toolkit</NavLink>
            </div>
          </nav>

          <main className="container mx-auto p-4">
            <Routes>
              <Route path="/virtualized-list" element={<VirtualizedListPage />} />
              <Route path="/pagination-hook" element={<PaginationHookPage />} />
              <Route path="/product-management" element={<ProductManagementPage />} />
              <Route path="/dark-mode" element={<DarkModePage />} />
              <Route path="/chat" element={<ChatAppPage />} />
              <Route path="/form-validation" element={<FormValidationPage />} />
              <Route path="/infinite-scroll" element={<InfiniteScrollPage />} />
              <Route path="/shopping-cart" element={<ShoppingCartPage />} />
              <Route path="/csv-export" element={<CsvExportPage />} />
              <Route path="/redux-toolkit" element={<ReduxToolkitPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
