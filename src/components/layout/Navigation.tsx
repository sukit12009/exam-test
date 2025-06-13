import { NavLink as RouterNavLink } from "react-router-dom";

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

export const Navigation = () => {
  return (
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
  );
};
