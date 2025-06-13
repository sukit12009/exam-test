import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Context
import { ThemeProvider } from "./contexts/ThemeContext";

// Components
import { Navigation } from "./components/layout/Navigation";

// Routes
import { routes } from "./routes";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
          <Navigation />
          <main className="container mx-auto p-4">
            <Routes>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
