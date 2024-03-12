import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import Home from "./pages/Home/Home";
import AdminLog from "./features/Admin/AdminLog";
import { Private } from "./features/Loging/Private";
import AdminCon from "./features/Admin/AdminCon";
import { AuthProvider } from "./features/Auth/AuthProvide";
import PhoneCat from "./pages/Catalog/PhoneCat";
import TshirtCat from "./pages/Catalog/TshirtCat";
import GiftCat from "./pages/Catalog/GiftCat";
import View from "./pages/View/View";
import { store, persistor } from "./pages/Cart/Store";
import { Provider } from "react-redux"; // Import Provider from react-redux
import CartItem from "./pages/Cart/CartItem/CartItem";
import { PersistGate } from "redux-persist/integration/react";
import Contact from "./pages/About/Contact";
import ServicePage from "./pages/Service/Service";
import Coupon from "./features/Coupon/Coupon";
import Shipping from "./pages/Shipping/Shipping";
import Test from "./pages/Shipping/Test";
import Pay from "./pages/Pay/Pay";
import Control from "./features/Admin/Control";
import Verified from "./features/Admin/Verified";
import AdminProduct from "./features/Admin/AdminProduct";
import SuccessPage from "./pages/Pay/Success";

function App() {
  return (
    <Provider store={store}>
      {" "}
      {/* Wrap your entire application with Provider and pass your Redux store */}
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/admin" element={<AdminLog />} />
                <Route element={<Private />}>
                  <Route path="/admin/control" element={<AdminCon />} />
                  <Route path="/admin/control/coupon" element={<Coupon />} />
                  <Route path="/admin/control/shipping" element ={<Control />} />
                  <Route path="/admin/Verified" element = {<Verified />} />
                  <Route path="/admin/productcontrol" element = {<AdminProduct />} />
                </Route>

                <Route path="/phone" element={<PhoneCat />} />
                <Route path="/tshirt" element={<TshirtCat />} />
                <Route path="/gift" element={<GiftCat />} />
                <Route path="/view/:id" element={<View />} />

                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<Error />} />
                <Route path="/service" element={<ServicePage />} />

                <Route path="/cartitem" element={<CartItem />} />
                <Route path="/cartitem/shipping" element={<Shipping />} />
                <Route path="/cartitem/test" element = {<Test />} />
                <Route path="/cartitem/test/pay" element = { <Pay />} />
                <Route path="/success" element = { <SuccessPage />} />
              </Route>
            </Routes>
          </AuthProvider>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
