import { useState } from 'react';
import { Link } from 'react-router-dom';

const QRGenerator = () => {
  const [restaurantName, setRestaurantName] = useState('HIMALAYAN TASTE RESTAURANT');
  const [baseUrl, setBaseUrl] = useState('https://food-ordering-app.vercel.app');
  const [numberOfTables, setNumberOfTables] = useState(10);
  const [qrCodes, setQrCodes] = useState([]);

  const generateQRs = () => {
    const codes = [];
    for (let i = 1; i <= numberOfTables; i++) {
      const tableNumber = i.toString().padStart(2, '0');
      const url = `${baseUrl}/?table=${tableNumber}`;
      
      // Generate QR code using QRServer API
      const qrData = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
      
      codes.push({
        table: tableNumber,
        url: url,
        qrUrl: qrData,
        shortUrl: url
      });
    }
    setQrCodes(codes);
  };

  const downloadQR = (tableNumber, qrUrl) => {
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = `table-${tableNumber}-qrcode.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('URL copied to clipboard!');
  };

  return (
    <div style={{
      backgroundColor: '#0a0a0a',
      minHeight: '100vh',
      color: 'white',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #000000, #1a0000)',
        padding: '25px',
        borderRadius: '15px',
        marginBottom: '30px',
        border: '2px solid #dc2626',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          margin: '0 0 10px 0',
          color: '#dc2626'
        }}>
          🏷️ RESTAURANT QR CODE GENERATOR
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '0' }}>
          Generate unique QR codes for each table. Customers scan to order.
        </p>
      </div>

      {/* Main Content */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        
        {/* Configuration Panel */}
        <div style={{
          background: 'rgba(30, 30, 30, 0.95)',
          padding: '25px',
          borderRadius: '15px',
          border: '1px solid rgba(220, 38, 38, 0.3)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
        }}>
          <h2 style={{ color: '#22c55e', marginBottom: '20px', fontSize: '24px' }}>
            ⚙️ CONFIGURATION
          </h2>
          
          <div style={{ display: 'grid', gap: '20px' }}>
            {/* Restaurant Name */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#94a3b8', fontWeight: 'bold' }}>
                Restaurant Name
              </label>
              <input
                type="text"
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  border: '2px solid rgba(220, 38, 38, 0.5)',
                  borderRadius: '10px',
                  color: 'white',
                  fontSize: '16px',
                  outline: 'none'
                }}
              />
            </div>

            {/* Website URL */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#94a3b8', fontWeight: 'bold' }}>
                Your Website URL
              </label>
              <input
                type="text"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  border: '2px solid rgba(220, 38, 38, 0.5)',
                  borderRadius: '10px',
                  color: 'white',
                  fontSize: '16px',
                  outline: 'none'
                }}
                placeholder="https://your-restaurant.vercel.app"
              />
              <p style={{ color: '#60a5fa', marginTop: '8px', fontSize: '14px' }}>
                🔗 Current URL: {baseUrl}
              </p>
            </div>

            {/* Number of Tables */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#94a3b8', fontWeight: 'bold' }}>
                Number of Tables: <span style={{ color: '#dc2626' }}>{numberOfTables}</span>
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={numberOfTables}
                  onChange={(e) => setNumberOfTables(parseInt(e.target.value))}
                  style={{
                    flex: 1,
                    height: '10px',
                    backgroundColor: 'rgba(220, 38, 38, 0.3)',
                    borderRadius: '5px',
                    outline: 'none',
                    WebkitAppearance: 'none'
                  }}
                />
                <div style={{
                  display: 'flex',
                  gap: '10px'
                }}>
                  {[5, 10, 15, 20].map(num => (
                    <button
                      key={num}
                      onClick={() => setNumberOfTables(num)}
                      style={{
                        padding: '8px 15px',
                        backgroundColor: numberOfTables === num ? '#dc2626' : 'rgba(255, 255, 255, 0.1)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                      }}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generateQRs}
              style={{
                background: 'linear-gradient(45deg, #dc2626, #ea580c)',
                color: 'white',
                border: 'none',
                padding: '18px',
                borderRadius: '12px',
                fontWeight: 'bold',
                fontSize: '18px',
                cursor: 'pointer',
                width: '100%',
                transition: 'all 0.3s',
                marginTop: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 0 25px rgba(220, 38, 38, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              🏷️ GENERATE QR CODES FOR {numberOfTables} TABLES
            </button>
          </div>
        </div>

        {/* Generated QR Codes */}
        {qrCodes.length > 0 && (
          <div style={{
            background: 'rgba(30, 30, 30, 0.95)',
            padding: '25px',
            borderRadius: '15px',
            border: '1px solid rgba(22, 163, 74, 0.3)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '25px'
            }}>
              <h2 style={{ color: '#22c55e', margin: 0, fontSize: '24px' }}>
                📱 GENERATED QR CODES ({qrCodes.length} TABLES)
              </h2>
              <div style={{ color: '#94a3b8', fontSize: '14px' }}>
                ⬇️ Click any QR to download
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '25px'
            }}>
              {qrCodes.map((qr, index) => (
                <div
                  key={index}
                  style={{
                    background: 'linear-gradient(145deg, rgba(20, 20, 20, 0.9), rgba(30, 30, 30, 0.9))',
                    borderRadius: '15px',
                    padding: '20px',
                    border: '2px solid rgba(220, 38, 38, 0.3)',
                    textAlign: 'center',
                    transition: 'all 0.3s',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(220, 38, 38, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Table Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(45deg, #dc2626, #ea580c)',
                    color: 'white',
                    padding: '6px 20px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    zIndex: 2,
                    boxShadow: '0 4px 10px rgba(220, 38, 38, 0.4)'
                  }}>
                    🪑 TABLE #{qr.table}
                  </div>

                  {/* QR Code */}
                  <div
                    onClick={() => downloadQR(qr.table, qr.qrUrl)}
                    style={{
                      backgroundColor: 'white',
                      padding: '20px',
                      borderRadius: '12px',
                      margin: '25px 0 20px',
                      display: 'inline-block',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                    title="Click to download QR code"
                  >
                    <img
                      src={qr.qrUrl}
                      alt={`QR Code for Table ${qr.table}`}
                      style={{
                        width: '160px',
                        height: '160px',
                        display: 'block'
                      }}
                    />
                  </div>

                  {/* URL Display */}
                  <div style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    padding: '12px',
                    borderRadius: '10px',
                    marginBottom: '15px',
                    wordBreak: 'break-all',
                    fontSize: '12px',
                    color: '#94a3b8',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    🔗 {qr.url}
                  </div>

                  {/* Action Buttons */}
                  <div style={{
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'center'
                  }}>
                    <button
                      onClick={() => downloadQR(qr.table, qr.qrUrl)}
                      style={{
                        backgroundColor: '#dc2626',
                        color: 'white',
                        border: 'none',
                        padding: '10px 15px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        flex: 1
                      }}
                    >
                      ⬇️ Download
                    </button>
                    <button
                      onClick={() => copyToClipboard(qr.url)}
                      style={{
                        backgroundColor: 'rgba(22, 163, 74, 0.2)',
                        color: '#22c55e',
                        border: '1px solid #22c55e',
                        padding: '10px 15px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        flex: 1
                      }}
                    >
                      📋 Copy URL
                    </button>
                  </div>

                  {/* Instructions */}
                  <div style={{
                    marginTop: '15px',
                    padding: '10px',
                    backgroundColor: 'rgba(22, 163, 74, 0.1)',
                    borderRadius: '8px',
                    border: '1px solid rgba(22, 163, 74, 0.3)',
                    fontSize: '12px',
                    color: '#86efac'
                  }}>
                    📍 Place on Table #{qr.table}
                  </div>
                </div>
              ))}
            </div>

            {/* Batch Actions */}
            <div style={{
              marginTop: '30px',
              paddingTop: '20px',
              borderTop: '2px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              gap: '15px',
              justifyContent: 'center'
            }}>
              <button
                onClick={() => {
                  qrCodes.forEach(qr => downloadQR(qr.table, qr.qrUrl));
                }}
                style={{
                  background: 'linear-gradient(45deg, #16a34a, #22c55e)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 25px',
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                ⬇️ DOWNLOAD ALL QR CODES
              </button>
              <button
                onClick={() => window.print()}
                style={{
                  background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 25px',
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                🖨️ PRINT ALL
              </button>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div style={{
          background: 'rgba(30, 30, 30, 0.95)',
          padding: '25px',
          borderRadius: '15px',
          border: '1px solid rgba(59, 130, 246, 0.3)'
        }}>
          <h3 style={{ color: '#60a5fa', marginBottom: '20px', fontSize: '20px' }}>
            📋 HOW TO SET UP YOUR TABLES
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            <div style={{ padding: '15px' }}>
              <div style={{ color: '#22c55e', fontWeight: 'bold', marginBottom: '10px' }}>
                1️⃣ GENERATE
              </div>
              <ul style={{ color: '#94a3b8', paddingLeft: '20px', lineHeight: '1.6' }}>
                <li>Enter your restaurant name</li>
                <li>Use your Vercel URL</li>
                <li>Set number of tables</li>
                <li>Click "Generate QR Codes"</li>
              </ul>
            </div>
            <div style={{ padding: '15px' }}>
              <div style={{ color: '#22c55e', fontWeight: 'bold', marginBottom: '10px' }}>
                2️⃣ PRINT
              </div>
              <ul style={{ color: '#94a3b8', paddingLeft: '20px', lineHeight: '1.6' }}>
                <li>Download all QR codes</li>
                <li>Print on A4 paper</li>
                <li>Use color printer if possible</li>
                <li>Laminate for durability</li>
              </ul>
            </div>
            <div style={{ padding: '15px' }}>
              <div style={{ color: '#22c55e', fontWeight: 'bold', marginBottom: '10px' }}>
                3️⃣ PLACE
              </div>
              <ul style={{ color: '#94a3b8', paddingLeft: '20px', lineHeight: '1.6' }}>
                <li>Place QR code on each table</li>
                <li>Use table stands or stickers</li>
                <li>Make sure it's visible</li>
                <li>Test scanning from table</li>
              </ul>
            </div>
          </div>
          
          {/* Important Note */}
          <div style={{
            marginTop: '25px',
            padding: '15px',
            backgroundColor: 'rgba(220, 38, 38, 0.1)',
            borderRadius: '10px',
            border: '1px solid rgba(220, 38, 38, 0.3)'
          }}>
            <div style={{ color: '#fca5a5', fontWeight: 'bold', marginBottom: '8px' }}>
              ⚠️ IMPORTANT NOTE
            </div>
            <p style={{ color: '#fca5a5', margin: 0, fontSize: '14px' }}>
              Your QR codes will only work when your website is LIVE on Vercel. 
              Make sure your deployment is successful before placing QR codes on tables.
            </p>
          </div>
        </div>

        {/* Back to Menu Link */}
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <Link 
            to="/"
            style={{
              background: 'linear-gradient(45deg, #dc2626, #16a34a)',
              color: 'white',
              padding: '15px 40px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '16px',
              display: 'inline-block'
            }}
          >
            🍔 BACK TO MENU
          </Link>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-area, .print-area * {
            visibility: visible;
          }
          .print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          button, .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default QRGenerator;