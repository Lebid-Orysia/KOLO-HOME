// Змінюємо джерело імпорту на react-router-dom
import { createHashRouter, redirect } from "react-router-dom"; 

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import CatalogPage from "./pages/CatalogPage";
import CategoryProducts from "./pages/CategoryProducts";
import ProductDetailPage from "./pages/ProductDetailPage"; 
import App from "./App";
import ContactsPage from "./pages/ContactsPage";

export const router = createHashRouter([
  {
    path: '/',
    Component: App,
    children: [
      { index: true, Component: HomePage },
      { path: 'about', Component: AboutPage },
      { path: 'catalog/:categoryName/:productId', Component: ProductDetailPage },
      { path: 'contacts', Component: ContactsPage },
      {
        path: 'catalog',
        Component: CatalogPage,
        children: [
          { index: true, loader: () => redirect("wreaths") },
          { path: ':categoryName', Component: CategoryProducts }
        ]
      }
    ]
  }
]);