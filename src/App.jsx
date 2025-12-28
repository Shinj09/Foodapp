import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';

function App() {
  return (
    <CartProvider>
      <Router>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmation" element={<Confirmation />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;