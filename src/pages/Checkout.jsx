import { Link } from 'react-router-dom';

const Checkout = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Link to="/cart" style={{ color: 'blue', textDecoration: 'none' }}>← Back to Cart</Link>
      <h1 style={{ color: 'red', fontSize: '28px', marginTop: '10px' }}>Checkout</h1>
      
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px',
        border: '1px solid #ccc',
        margin: '20px 0'
      }}>
        <h3>Payment Method:</h3>
        <div style={{ marginTop: '10px' }}>
          <button style={{ 
            padding: '10px 20px', 
            marginRight: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            backgroundColor: '#f0f0f0'
          }}>
            💳 Card
          </button>
          <button style={{ 
            padding: '10px 20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            backgroundColor: '#f0f0f0'
          }}>
            💵 Cash
          </button>
        </div>
      </div>
      
      <Link 
        to="/confirmation"
        style={{
          backgroundColor: 'green',
          color: 'white',
          padding: '15px',
          borderRadius: '8px',
          textDecoration: 'none',
          display: 'block',
          textAlign: 'center',
          fontWeight: 'bold',
          marginTop: '20px'
        }}
      >
        Place Order
      </Link>
    </div>
  );
};

export default Checkout;