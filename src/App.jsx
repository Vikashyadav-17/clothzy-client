import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Profile";
import Home from "./pages/Home"; 
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import Collection from "./pages/Collection";
import About from "./pages/About";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />      
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<Register />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/profile" element={<Profile />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
