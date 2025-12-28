import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();

  // Calculate total items (counting quantities)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const tax = cartTotal * 0.1;
  const grandTotal = cartTotal + tax;

  return (
    <div style={{
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
      paddingBottom: '100px'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#e11d48',
        color: 'white',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link 
            to="/" 
            style={{ 
              color: 'white',
              textDecoration: 'none',
              fontSize: '24px',
              marginRight: '15px'
            }}
          >
            ←
          </Link>
          <div>
            <h1 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              margin: '0'
            }}>
              Your Cart
            </h1>
            <p style={{ opacity: 0.9, margin: '5px 0 0 0', fontSize: '14px' }}>
              Table #05 • Review your items
            </p>
          </div>
        </div>
      </div>

      {cart.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px'
        }}>
          <div style={{
            fontSize: '80px',
            marginBottom: '20px'
          }}>
            🛒
          </div>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '10px',
            color: '#1f2937'
          }}>
            Your cart is empty
          </h2>
          <p style={{
            color: '#6b7280',
            marginBottom: '30px',
            fontSize: '16px'
          }}>
            Add some delicious items from our menu!
          </p>
          <Link 
            to="/"
            style={{
              backgroundColor: '#e11d48',
              color: 'white',
              padding: '15px 40px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '16px',
              display: 'inline-block'
            }}
          >
            Browse Menu
          </Link>
        </div>
      ) : (
        <>
          {/* Cart Items Section */}
          <div style={{ padding: '20px' }}>
            {/* Header with Clear All */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#1f2937'
              }}>
                Items ({totalItems})
              </h2>
              <button
                onClick={clearCart}
                style={{
                  backgroundColor: 'transparent',
                  color: '#e11d48',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Clear All
              </button>
            </div>

            {/* Cart Items List */}
            <div style={{ marginBottom: '30px' }}>
              {cart.map(item => (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    padding: '20px',
                    marginBottom: '15px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* Item Info */}
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        marginBottom: '5px',
                        color: '#111827'
                      }}>
                        {item.name}
                      </h3>
                      <p style={{
                        color: '#e11d48',
                        fontWeight: 'bold',
                        fontSize: '16px',
                        marginBottom: '15px'
                      }}>
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '20px'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#f3f4f6',
                        borderRadius: '12px',
                        overflow: 'hidden'
                      }}>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: '#f3f4f6',
                            border: 'none',
                            fontSize: '20px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          −
                        </button>
                        <span style={{
                          width: '40px',
                          textAlign: 'center',
                          fontWeight: 'bold',
                          fontSize: '16px'
                        }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: '#f3f4f6',
                            border: 'none',
                            fontSize: '20px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          +
                        </button>
                      </div>

                      {/* Item Total & Remove */}
                      <div style={{ textAlign: 'right' }}>
                        <p style={{
                          fontWeight: 'bold',
                          fontSize: '18px',
                          marginBottom: '8px'
                        }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          style={{
                            backgroundColor: '#fee2e2',
                            color: '#dc2626',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '25px',
              marginBottom: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '20px',
                color: '#1f2937'
              }}>
                Order Summary
              </h3>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                marginBottom: '20px'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <span style={{ color: '#6b7280' }}>Subtotal</span>
                  <span style={{ fontWeight: 'bold' }}>${cartTotal.toFixed(2)}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <span style={{ color: '#6b7280' }}>Tax (10%)</span>
                  <span style={{ fontWeight: 'bold' }}>${tax.toFixed(2)}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <span style={{ color: '#6b7280' }}>Service Fee</span>
                  <span style={{ fontWeight: 'bold' }}>$0.00</span>
                </div>
              </div>

              <div style={{
                borderTop: '2px solid #e5e7eb',
                paddingTop: '15px'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontWeight: 'bold',
                  fontSize: '20px'
                }}>
                  <span>Total</span>
                  <span style={{ color: '#e11d48' }}>${grandTotal.toFixed(2)}</span>
                </div>
                <p style={{
                  color: '#6b7280',
                  fontSize: '12px',
                  textAlign: 'right',
                  marginTop: '5px'
                }}>
                  Including all taxes
                </p>
              </div>
            </div>
          </div>

          {/* Sticky Checkout Button */}
          <div style={{
            position: 'fixed',
            bottom: '0',
            left: '0',
            right: '0',
            backgroundColor: 'white',
            padding: '20px',
            boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px'
          }}>
            <Link 
              to="/checkout"
              style={{
                background: 'linear-gradient(135deg, #16a34a, #15803d)',
                color: 'white',
                padding: '18px',
                borderRadius: '14px',
                textDecoration: 'none',
                display: 'block',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '18px'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}>
                <span>Proceed to Checkout</span>
                <span style={{ fontSize: '20px' }}>→</span>
              </div>
              <div style={{
                fontSize: '14px',
                opacity: 0.9,
                marginTop: '5px'
              }}>
                ${grandTotal.toFixed(2)} • Pay securely
              </div>
            </Link>
            <p style={{
              textAlign: 'center',
              color: '#6b7280',
              fontSize: '12px',
              marginTop: '10px'
            }}>
              By proceeding, you agree to our terms
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;