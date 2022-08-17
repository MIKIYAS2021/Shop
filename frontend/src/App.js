import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
//import header
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import Home from "./components/home";
import ProductDetails from "./components/product/productDetail";
import Login from "./components/user/login";
import Register from "./components/user/register";
import Profile from "./components/user/profile";
import { loadUser } from "./Action/userAction";
import store from "./store";
import ProtectedRoute from "./components/route/ProtectedRoute";
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/search/:keyword" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} exact />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/me"
              element={
                <ProtectedRoute>
                   <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>

        </div>
        <Footer />
      </div>
    </Router>
  );
}
export default App;
