import { RouteObject } from "react-router-dom";

// Import all page components
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

export const routes: RouteObject[] = [
  {
    path: "/virtualized-list",
    element: <VirtualizedListPage />,
  },
  {
    path: "/pagination-hook",
    element: <PaginationHookPage />,
  },
  {
    path: "/product-management",
    element: <ProductManagementPage />,
  },
  {
    path: "/dark-mode",
    element: <DarkModePage />,
  },
  {
    path: "/chat",
    element: <ChatAppPage />,
  },
  {
    path: "/form-validation",
    element: <FormValidationPage />,
  },
  {
    path: "/infinite-scroll",
    element: <InfiniteScrollPage />,
  },
  {
    path: "/shopping-cart",
    element: <ShoppingCartPage />,
  },
  {
    path: "/csv-export",
    element: <CsvExportPage />,
  },
  {
    path: "/redux-toolkit",
    element: <ReduxToolkitPage />,
  },
];
