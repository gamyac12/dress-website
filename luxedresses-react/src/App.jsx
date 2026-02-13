import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Wishlist from './pages/Wishlist';
import Orders from './pages/Orders';
import Checkout from './pages/Checkout';
import CartDrawer from './components/CartDrawer';
import QuickViewModal from './components/QuickViewModal';
import LoginModal from './components/LoginModal';
import PaymentOverlay from './components/PaymentOverlay';
import api from './services/api';

function App() {
  const [dresses, setDresses] = useState([]);
  const [currentView, setCurrentView] = useState('home');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [paymentStep, setPaymentStep] = useState(0);
  const [showPaymentOverlay, setShowPaymentOverlay] = useState(false);

  useEffect(() => {
    // Check for stored user
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Fetch products
    api.getProducts()
      .then(data => setDresses(data))
      .catch(err => console.error("Failed to fetch products", err));
  }, []);

  // Initialize Icons (not needed in React as imports handle it, but for good measure if using script-based logic elsewhere)
  // useEffect(() => { lucide.createIcons(); }, [currentView, cart, wishlist]); 

  // Handlers
  const toggleCart = (forceOpen) => {
    if (forceOpen === true) setIsCartOpen(true);
    else setIsCartOpen(!isCartOpen);
  };

  const toggleLoginModal = () => setIsLoginOpen(!isLoginOpen);

  const openQuickView = (id) => {
    const product = dresses.find(d => d.id === id);
    setQuickViewProduct(product);
  };

  const closeQuickView = () => setQuickViewProduct(null);

  const toggleWishlist = (id) => {
    const exists = wishlist.find(i => i.id === id);
    if (exists) {
      setWishlist(wishlist.filter(i => i.id !== id));
    } else {
      const product = dresses.find(d => d.id === id);
      setWishlist([...wishlist, product]);
    }
  };

  const addToBag = (id, size) => {
    const product = dresses.find(d => d.id === id);
    setCart(prevCart => {
      const existing = prevCart.find(i => i.id === id && i.size === size);
      if (existing) {
        return prevCart.map(i => i.id === id && i.size === size ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prevCart, { ...product, size, qty: 1 }];
    });
    closeQuickView();
    toggleCart(true);
  };

  const removeFromCart = (id, size) => {
    setCart(cart.filter(i => !(i.id === id && i.size === size)));
  };

  const changeQty = (id, size, delta) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === id && item.size === size) {
          const newQty = item.qty + delta;
          if (newQty < 1) return null;
          return { ...item, qty: newQty };
        }
        return item;
      }).filter(Boolean);
    });
  };

  const handleLoginSuccess = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const goToCheckout = () => {
    setIsCartOpen(false);
    setPaymentStep(0);
    setCurrentView('checkout');
  };

  useEffect(() => {
    if (user) {
      api.getOrders(localStorage.getItem('token'))
        .then(data => setOrders(data))
        .catch(err => console.error("Failed to fetch orders", err));
    } else {
      setOrders([]);
    }
  }, [user]);

  const handlePayment = async (checkoutData) => {
    if (!user) {
      alert("Please login to place an order");
      toggleLoginModal();
      return;
    }

    setShowPaymentOverlay(true);

    // Prepare order data
    const orderData = {
      items: cart.map(item => ({
        id: item.id,
        qty: item.qty,
        size: item.size
      })),
      total: cart.reduce((acc, i) => acc + (i.price * i.qty), 0),
      shipping_address: JSON.stringify(checkoutData || {}),
      payment_method: checkoutData.paymentMethod || 'Card'
    };

    try {
      const token = localStorage.getItem('token');
      const newOrder = await api.createOrder(orderData, token);

      setTimeout(() => {
        setShowPaymentOverlay(false);
        setOrders([newOrder, ...orders]);
        setCart([]);
        setPaymentStep(2);
        setCurrentView('checkout');
      }, 2000);
    } catch (err) {
      console.error("Order creation failed", err);
      setShowPaymentOverlay(false);
      alert("Failed to place order: " + err.message);
    }
  };

  return (
    <div className="bg-neutral-50 text-neutral-900 selection:bg-amber-100 overflow-x-hidden min-h-screen">
      <PaymentOverlay show={showPaymentOverlay} />

      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        toggleLoginModal={toggleLoginModal}
        toggleCart={toggleCart}
        wishlistCount={wishlist.length}
        cartCount={cart.length}
        user={user}
        onLogout={handleLogout}
      />

      <div id="view-container">
        {currentView === 'home' && (
          <Home
            DRESSES={dresses}
            openQuickView={openQuickView}
            toggleWishlist={toggleWishlist}
            wishlist={wishlist}
          />
        )}
        {currentView === 'wishlist' && (
          <Wishlist
            wishlist={wishlist}
            setCurrentView={setCurrentView}
            openQuickView={openQuickView}
          />
        )}
        {currentView === 'orders' && (
          <Orders orders={orders} setCurrentView={setCurrentView} />
        )}
        {currentView === 'checkout' && (
          <Checkout
            cart={cart}
            paymentStep={paymentStep}
            setPaymentStep={setPaymentStep}
            handlePayment={handlePayment}
            setCurrentView={setCurrentView}
            setOrders={setOrders}
          />
        )}
      </div>

      <Footer setCurrentView={setCurrentView} />

      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={closeQuickView}
        addToBag={addToBag}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={toggleLoginModal}
        onLoginSuccess={handleLoginSuccess}
      />

      <CartDrawer
        isOpen={isCartOpen}
        toggleCart={toggleCart}
        cart={cart}
        removeFromCart={removeFromCart}
        changeQty={changeQty}
        goToCheckout={goToCheckout}
      />
    </div>
  );
}

export default App;
