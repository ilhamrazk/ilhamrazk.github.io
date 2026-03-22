import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {HashRouter, Route, Routes} from "react-router";
import Home from "./Home.jsx";
import About from "./About.jsx";
import Product from "./Product.jsx";
import Customer from "./Customer.jsx";
import Seller from "./Seller.jsx";
import Data from "./Data.jsx";
import DataLayout from "./DataLayout.jsx";
import ProductDetail from "./ProductDetail.jsx";
import Image from "./Image.jsx";
import NotFound from "./NotFound.jsx";
import ProductSearch from "./ProductSearch.jsx";
import App from "./App.jsx";
import "./index.css"
import LovePage from "./LovePage.jsx";
import Login from "./Login.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <HashRouter>
          <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/Home" element={
                  <ProtectedRoute>
                      <Home />
                  </ProtectedRoute>
              } />
              <Route path="/App" element={<App />} />
              <Route path="/LovePage" element={<LovePage />} />
              <Route path="/about" element={<About />} />
              <Route path="/images/*" element={<Image />} />
              <Route path="/data" element={<DataLayout />}>
                  <Route index element={<Data />} />
                  <Route path="products" element={<Product />} />
                  <Route path="products/search" element={<ProductSearch />} />
                  <Route path="customers" element={<Customer />} />
                  <Route path="sellers" element={<Seller />} />
                  <Route path="products/:id" element={<ProductDetail />} />
              </Route>
              <Route path="*" element={<NotFound />} />
          </Routes>
      </HashRouter>
  </StrictMode>,
)
