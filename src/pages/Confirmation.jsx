import { Link } from 'react-router-dom';

const Confirmation = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <div style={{ fontSize: '60px', marginBottom: '20px' }}>✅</div>
      <h1 style={{ color: 'red', fontSize: '32px', marginBottom: '10px' }}>Order Confirmed!</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>Your order #MH-{Math.floor(1000 + Math.random() * 9000)} is being prepared</p>
      
      <div style={{ 
        backgroundColor: '#f8f8f8', 
        padding: '20px', 
        borderRadius: '10px',
        margin: '20px 0',
        display: 'inline-block',
        textAlign: 'left'
      }}>
        <p style={{ margin: '5px 0' }}>📅 <strong>Order Time:</strong> {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        <p style={{ margin: '5px 0' }}>⏰ <strong>Estimated Ready:</strong> 15 minutes</p>
        <p style={{ margin: '5px 0' }}>🪑 <strong>Table:</strong> #05</p>
        <p style={{ margin: '5px 0' }}>💰 <strong>Payment:</strong> Paid ✓</p>
      </div>
      
      <div style={{ marginTop: '30px' }}>
        <Link 
          to="/"
          style={{
            backgroundColor: 'red',
            color: 'white',
            padding: '15px 30px',
            borderRadius: '8px',
            textDecoration: 'none',
            display: 'inline-block',
            fontWeight: 'bold',
            fontSize: '18px'
          }}
        >
          Order Again
        </Link>
      </div>
      
      <p style={{ color: '#666', marginTop: '30px', fontSize: '14px' }}>
        Need help? Ask staff or call: (123) 456-7890
      </p>
    </div>
  );
};

export default Confirmation;