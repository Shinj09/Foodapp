import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Menu = () => {
  const { cart, addToCart, cartTotal } = useCart();
  const [activeSection, setActiveSection] = useState(0);
  const [tableNumber, setTableNumber] = useState('05');
  const [selectedCustomizations, setSelectedCustomizations] = useState({});
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const sectionRefs = useRef([]);
  
  // Get table number from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tableFromUrl = urlParams.get('table');
    if (tableFromUrl) {
      setTableNumber(tableFromUrl.padStart(2, '0'));
    }
  }, []);

  // Customization options for different categories
  const customizationOptions = {
    momo: [
      { id: 'sauce1', name: 'Spicy Achar', price: 0.50 },
      { id: 'sauce2', name: 'Sesame Chutney', price: 0.50 },
      { id: 'sauce3', name: 'Tomato Chilli', price: 0.50 },
      { id: 'extra1', name: 'Extra Soup', price: 1.00 },
      { id: 'extra2', name: 'Extra Momo (4 pcs)', price: 3.00 }
    ],
    chowmein: [
      { id: 'extra1', name: 'Extra Egg', price: 1.00 },
      { id: 'extra2', name: 'Extra Chicken', price: 2.00 },
      { id: 'extra3', name: 'Extra Buff', price: 2.00 },
      { id: 'sauce1', name: 'Extra Soy Sauce', price: 0.30 },
      { id: 'sauce2', name: 'Extra Chilli Oil', price: 0.50 }
    ],
    burger: [
      { id: 'cheese1', name: 'Extra Cheese', price: 1.00 },
      { id: 'cheese2', name: 'Mozzarella', price: 1.50 },
      { id: 'extra1', name: 'Extra Patty', price: 2.50 },
      { id: 'sauce1', name: 'Spicy Mayo', price: 0.50 },
      { id: 'sauce2', name: 'Garlic Sauce', price: 0.50 },
      { id: 'veg1', name: 'Extra Veggies', price: 0.80 }
    ],
    khana: [
      { id: 'extra1', name: 'Extra Chiura', price: 0.80 },
      { id: 'extra2', name: 'Extra Pickle', price: 0.50 },
      { id: 'extra3', name: 'Extra Black Soybeans', price: 0.80 },
      { id: 'sauce1', name: 'Extra Spicy Achar', price: 0.50 }
    ],
    coffee: [
      { id: 'extra1', name: 'Extra Shot', price: 1.00 },
      { id: 'extra2', name: 'Soy Milk', price: 0.80 },
      { id: 'extra3', name: 'Almond Milk', price: 1.00 },
      { id: 'extra4', name: 'Whipped Cream', price: 0.50 },
      { id: 'extra5', name: 'Caramel Drizzle', price: 0.50 }
    ],
    drinks: [
      { id: 'extra1', name: 'Extra Lime', price: 0.30 },
      { id: 'extra2', name: 'Extra Mint', price: 0.30 },
      { id: 'extra3', name: 'Less Sugar', price: 0.00 },
      { id: 'extra4', name: 'More Sugar', price: 0.00 }
    ],
    cocktails: [
      { id: 'extra1', name: 'Extra Strong', price: 2.00 },
      { id: 'extra2', name: 'Less Sweet', price: 0.00 },
      { id: 'extra3', name: 'Extra Lime', price: 0.50 },
      { id: 'extra4', name: 'More Ice', price: 0.00 }
    ]
  };

  // Your menu items
  const menuCategories = [
    {
      name: "🥟 MOMO MANIA",
      id: "momo",
      icon: "🥟",
      items: [
        { 
          id: 1, 
          name: 'STEAMED MOMO (8 pcs)', 
          price: 6.99, 
          description: 'Served with Spicy Achar & Clear Soup',
          variants: ['Chicken', 'Buff', 'Veg (Cabbage/Paneer)', 'Kothey (Half Fried)'],
          category: 'momo'
        },
        { 
          id: 2, 
          name: 'FRIED MOMO (8 pcs)', 
          price: 7.99, 
          description: 'Crispy golden fried dumplings',
          variants: ['Chicken', 'Buff', 'Veg'],
          category: 'momo'
        },
        { 
          id: 3, 
          name: 'CHILLY MOMO', 
          price: 8.99, 
          description: 'Tossed in spicy Manchurian sauce',
          variants: ['Chicken', 'Buff'],
          popular: true,
          category: 'momo'
        },
        { 
          id: 4, 
          name: 'JHOL MOMO', 
          price: 8.99, 
          description: 'Momo dunked in flavorful spicy broth',
          variants: ['Chicken', 'Buff'],
          category: 'momo'
        },
        { 
          id: 5, 
          name: 'C MOMO (CHILLY)', 
          price: 8.99, 
          description: 'Spicy, saucy, and addictive',
          variants: ['Chicken', 'Buff'],
          popular: true,
          category: 'momo'
        },
        { 
          id: 6, 
          name: 'MOMOS PLATE (12 pcs)', 
          price: 12.99, 
          description: 'Mix & Match any two types',
          variants: [],
          category: 'momo'
        }
      ]
    },
    {
      name: "🍝 CHOWMEIN & NOODLES",
      id: "noodles",
      icon: "🍝",
      items: [
        { 
          id: 7, 
          name: 'CHICKEN CHOWMEIN', 
          price: 7.99, 
          description: 'Wok-tossed with fresh veggies & chicken',
          variants: [],
          category: 'chowmein'
        },
        { 
          id: 8, 
          name: 'BUFF CHOWMEIN', 
          price: 7.99, 
          description: 'Traditional Nepali style',
          variants: [],
          category: 'chowmein'
        },
        { 
          id: 9, 
          name: 'VEG CHOWMEIN', 
          price: 6.99, 
          description: 'Fresh vegetable noodles',
          variants: [],
          category: 'chowmein'
        },
        { 
          id: 10, 
          name: 'EGG CHOWMEIN', 
          price: 6.99, 
          description: 'With scrambled eggs',
          variants: [],
          category: 'chowmein'
        },
        { 
          id: 11, 
          name: 'MIXED CHOWMEIN', 
          price: 9.99, 
          description: 'Chicken + Buff + Veg combo',
          popular: true,
          variants: [],
          category: 'chowmein'
        },
        { 
          id: 12, 
          name: 'AMERICAN CHOPSUEY', 
          price: 8.99, 
          description: 'Crispy noodle with sweet & sour sauce',
          variants: [],
          category: 'chowmein'
        }
      ]
    },
    {
      name: "🍔 BURGERS & SANDWICHES",
      id: "burgers",
      icon: "🍔",
      items: [
        { 
          id: 13, 
          name: 'CLASSIC CHICKEN BURGER', 
          price: 8.99, 
          description: 'Served with Fries & Coleslaw',
          variants: ['Grilled Patty', 'Crispy Patty'],
          category: 'burger'
        },
        { 
          id: 14, 
          name: 'BUFF BURGER', 
          price: 9.99, 
          description: 'Spiced ground buff patty',
          variants: [],
          popular: true,
          category: 'burger'
        },
        { 
          id: 15, 
          name: 'VEG SUPREME BURGER', 
          price: 8.49, 
          description: 'Paneer & veg patty',
          variants: [],
          category: 'burger'
        },
        { 
          id: 16, 
          name: 'CLUB SANDWICH', 
          price: 9.99, 
          description: 'Triple decker with chicken, egg, veggies',
          variants: [],
          category: 'burger'
        },
        { 
          id: 17, 
          name: 'GRILLED CHICKEN SANDWICH', 
          price: 8.99, 
          description: 'Charcoal grilled chicken',
          variants: [],
          category: 'burger'
        },
        { 
          id: 18, 
          name: 'SUKUTI SANDWICH', 
          price: 7.99, 
          description: 'Dried, spiced meat with greens',
          variants: [],
          category: 'burger'
        }
      ]
    },
    {
      name: "🥘 NEPALI KHANA SET",
      id: "khana",
      icon: "🥘",
      items: [
        { 
          id: 19, 
          name: 'SUKUTI SET', 
          price: 12.99, 
          description: 'Dried buff, chiura, soybeans, pickles',
          variants: [],
          category: 'khana'
        },
        { 
          id: 20, 
          name: 'TAAS SET', 
          price: 11.99, 
          description: 'Spicy fried buff/chicken with onions',
          variants: ['Buff', 'Chicken'],
          popular: true,
          category: 'khana'
        },
        { 
          id: 21, 
          name: 'BUFF CHOILA SET', 
          price: 13.99, 
          description: 'Grilled spiced buff with chiura',
          variants: [],
          category: 'khana'
        },
        { 
          id: 22, 
          name: 'CHICKEN SEKUWA SET', 
          price: 12.99, 
          description: 'Charcoal-grilled chicken chunks',
          variants: [],
          category: 'khana'
        },
        { 
          id: 23, 
          name: 'MIXED KHAJA PLATTER', 
          price: 24.99, 
          description: 'For 2-3 people - A bit of everything',
          variants: [],
          category: 'khana'
        }
      ]
    },
    {
      name: "☕ COFFEE CORNER",
      id: "coffee",
      icon: "☕",
      items: [
        { 
          id: 24, 
          name: 'REGULAR COFFEE', 
          price: 2.99, 
          description: 'Nepali style brewed coffee',
          variants: [],
          category: 'coffee'
        },
        { 
          id: 25, 
          name: 'BLACK COFFEE', 
          price: 2.49, 
          description: 'Strong Himalayan beans',
          variants: [],
          category: 'coffee'
        },
        { 
          id: 26, 
          name: 'HOT CAPPUCCINO', 
          price: 3.99, 
          description: 'Creamy frothy coffee',
          variants: [],
          category: 'coffee'
        },
        { 
          id: 27, 
          name: 'HOT LATTE', 
          price: 3.99, 
          description: 'Smooth milk coffee',
          variants: [],
          category: 'coffee'
        },
        { 
          id: 28, 
          name: 'ICED COFFEE', 
          price: 4.49, 
          description: 'Chilled coffee delight',
          variants: [],
          category: 'coffee'
        },
        { 
          id: 29, 
          name: 'CARAMEL MACCHIATO', 
          price: 4.99, 
          description: 'Sweet caramel coffee',
          variants: [],
          category: 'coffee'
        }
      ]
    },
    {
      name: "🥤 SOFT DRINKS",
      id: "drinks",
      icon: "🥤",
      items: [
        { 
          id: 30, 
          name: 'LASSI', 
          price: 3.99, 
          description: 'Traditional yogurt drink',
          variants: ['Sweet', 'Salted', 'Mango'],
          category: 'drinks'
        },
        { 
          id: 31, 
          name: 'FRESH LIME SODA', 
          price: 2.99, 
          description: 'Refreshing citrus drink',
          variants: ['Sweet', 'Salted'],
          category: 'drinks'
        },
        { 
          id: 32, 
          name: 'FRESH JUICE', 
          price: 4.99, 
          description: 'Seasonal fresh fruit juice',
          variants: ['Orange', 'Mango', 'Pineapple'],
          category: 'drinks'
        },
        { 
          id: 33, 
          name: 'ENERGY DRINKS', 
          price: 3.49, 
          description: 'Boost your energy',
          variants: ['Red Bull', 'Monster'],
          category: 'drinks'
        }
      ]
    },
    {
      name: "🍹 FOR MEN (COCKTAILS)",
      id: "cocktails",
      icon: "🍹",
      items: [
        { 
          id: 34, 
          name: 'KHUKURI RUM PUNCH', 
          price: 8.99, 
          description: 'Dark rum with tropical juices',
          variants: [],
          category: 'cocktails'
        },
        { 
          id: 35, 
          name: 'EVEREST HIGHBALL', 
          price: 9.99, 
          description: 'Whisky, ginger ale, and lemon',
          variants: [],
          popular: true,
          category: 'cocktails'
        },
        { 
          id: 36, 
          name: 'GORKHA GIMLET', 
          price: 8.99, 
          description: 'Vodka or Gin with lime cordial',
          variants: ['Vodka', 'Gin'],
          category: 'cocktails'
        },
        { 
          id: 37, 
          name: 'KATHMANDU COOLER', 
          price: 7.99, 
          description: 'Local raksi, mint, and soda',
          variants: [],
          category: 'cocktails'
        },
        { 
          id: 38, 
          name: 'SPICY TAMATAR', 
          price: 8.49, 
          description: 'Bloody Mary with local spices',
          variants: [],
          category: 'cocktails'
        }
      ]
    },
    {
      name: "🎉 SPECIAL OFFERS",
      id: "offers",
      icon: "🎉",
      items: [
        { 
          id: 39, 
          name: 'COMBO 1', 
          price: 9.99, 
          description: 'Any Momo + Any Soft Drink = Save $3',
          originalPrice: 12.99,
          variants: [],
          category: 'offers'
        },
        { 
          id: 40, 
          name: 'COMBO 2', 
          price: 11.99, 
          description: 'Any Burger + Fries + Coke = Save $4',
          originalPrice: 15.99,
          variants: [],
          category: 'offers'
        },
        { 
          id: 41, 
          name: 'GROUP OFFER', 
          price: 29.99, 
          description: '2 Khaja Sets + 4 Beers = Free Fried Momo',
          originalPrice: 39.99,
          variants: [],
          category: 'offers'
        }
      ]
    }
  ];

  // Calculate total items
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Handle scroll to detect active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (let i = 0; i < sectionRefs.current.length; i++) {
        const section = sectionRefs.current[i];
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(i);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to section
  const scrollToSection = (index) => {
    setActiveSection(index);
    if (sectionRefs.current[index]) {
      sectionRefs.current[index].scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle item selection with customization
  const handleItemClick = (item) => {
    setCurrentItem(item);
    setSelectedCustomizations({});
    setShowCustomizeModal(true);
  };

  // Handle customization selection
  const handleCustomizationToggle = (customizationId) => {
    setSelectedCustomizations(prev => ({
      ...prev,
      [customizationId]: !prev[customizationId]
    }));
  };

  // Calculate total with customizations
  const calculateItemTotal = (item) => {
    let total = item.price;
    if (item.originalPrice) total = item.originalPrice;
    
    if (currentItem && currentItem.id === item.id) {
      const category = item.category;
      if (customizationOptions[category]) {
        customizationOptions[category].forEach(option => {
          if (selectedCustomizations[option.id]) {
            total += option.price;
          }
        });
      }
    }
    return total;
  };

  // Add to cart with customizations
  const handleAddToCart = () => {
    if (!currentItem) return;
    
    const customizations = [];
    const category = currentItem.category;
    let customizationTotal = 0;
    
    if (customizationOptions[category]) {
      customizationOptions[category].forEach(option => {
        if (selectedCustomizations[option.id]) {
          customizations.push(option.name);
          customizationTotal += option.price;
        }
      });
    }
    
    const itemWithCustomizations = {
      ...currentItem,
      customizations,
      customizationTotal,
      finalPrice: currentItem.price + customizationTotal
    };
    
    addToCart(itemWithCustomizations);
    setShowCustomizeModal(false);
    setCurrentItem(null);
    setSelectedCustomizations({});
  };

  // Modal for customization
  const CustomizeModal = () => {
    if (!showCustomizeModal || !currentItem) return null;
    
    const category = currentItem.category;
    const options = customizationOptions[category] || [];

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        padding: '20px'
      }}>
        <div style={{
          background: 'linear-gradient(145deg, #1a1a1a, #2a1a1a)',
          borderRadius: '20px',
          padding: '30px',
          maxWidth: '500px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          border: '2px solid #dc2626',
          boxShadow: '0 0 50px rgba(220, 38, 38, 0.5)'
        }}>
          {/* Modal Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            borderBottom: '2px solid rgba(220, 38, 38, 0.3)',
            paddingBottom: '15px'
          }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
              margin: 0
            }}>
              Customize Your {currentItem.name}
            </h3>
            <button
              onClick={() => setShowCustomizeModal(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#dc2626',
                fontSize: '28px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              ×
            </button>
          </div>

          {/* Item Info */}
          <div style={{
            backgroundColor: 'rgba(220, 38, 38, 0.1)',
            padding: '15px',
            borderRadius: '12px',
            marginBottom: '20px',
            border: '1px solid rgba(220, 38, 38, 0.3)'
          }}>
            <h4 style={{ color: 'white', margin: '0 0 8px 0' }}>{currentItem.name}</h4>
            <p style={{ color: '#94a3b8', margin: '0 0 10px 0', fontSize: '14px' }}>
              {currentItem.description}
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ color: '#22c55e', fontWeight: 'bold' }}>
                Base Price: ${currentItem.price}
              </span>
              {currentItem.variants && currentItem.variants.length > 0 && (
                <select style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  border: '1px solid rgba(220, 38, 38, 0.5)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  fontSize: '14px'
                }}>
                  <option value="">Select Type</option>
                  {currentItem.variants.map((variant, index) => (
                    <option key={index} value={variant}>{variant}</option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* Customization Options */}
          {options.length > 0 ? (
            <div style={{ marginBottom: '25px' }}>
              <h4 style={{
                color: '#22c55e',
                margin: '0 0 15px 0',
                fontSize: '18px'
              }}>
                Add Extra Toppings/Sauces
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {options.map(option => (
                  <label
                    key={option.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 15px',
                      backgroundColor: selectedCustomizations[option.id] 
                        ? 'rgba(22, 163, 74, 0.2)' 
                        : 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '10px',
                      border: selectedCustomizations[option.id]
                        ? '2px solid #22c55e'
                        : '1px solid rgba(255, 255, 255, 0.1)',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <input
                        type="checkbox"
                        checked={!!selectedCustomizations[option.id]}
                        onChange={() => handleCustomizationToggle(option.id)}
                        style={{
                          width: '18px',
                          height: '18px',
                          accentColor: '#dc2626'
                        }}
                      />
                      <span style={{ color: 'white', fontWeight: 'bold' }}>
                        {option.name}
                      </span>
                    </div>
                    <span style={{
                      color: option.price > 0 ? '#22c55e' : '#94a3b8',
                      fontWeight: 'bold'
                    }}>
                      {option.price > 0 ? `+$${option.price.toFixed(2)}` : 'FREE'}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '20px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              marginBottom: '20px'
            }}>
              <p style={{ color: '#94a3b8', margin: 0 }}>
                No customizations available for this item.
              </p>
            </div>
          )}

          {/* Total Calculation */}
          <div style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: '15px',
            borderRadius: '12px',
            marginBottom: '20px',
            border: '1px solid rgba(220, 38, 38, 0.3)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#94a3b8' }}>Base Price:</span>
              <span style={{ color: 'white' }}>${currentItem.price.toFixed(2)}</span>
            </div>
            {options.map(option => selectedCustomizations[option.id] && (
              <div key={option.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span style={{ color: '#94a3b8', fontSize: '14px' }}>{option.name}:</span>
                <span style={{ color: '#22c55e', fontSize: '14px' }}>
                  +${option.price.toFixed(2)}
                </span>
              </div>
            ))}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '10px',
              paddingTop: '10px',
              borderTop: '2px solid rgba(220, 38, 38, 0.3)',
              fontWeight: 'bold',
              fontSize: '18px'
            }}>
              <span style={{ color: 'white' }}>Total:</span>
              <span style={{ color: '#dc2626' }}>
                ${calculateItemTotal(currentItem).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '15px' }}>
            <button
              onClick={() => setShowCustomizeModal(false)}
              style={{
                flex: 1,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '15px',
                borderRadius: '12px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleAddToCart}
              style={{
                flex: 2,
                background: 'linear-gradient(45deg, #dc2626, #16a34a)',
                color: 'white',
                border: 'none',
                padding: '15px',
                borderRadius: '12px',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(220, 38, 38, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              ADD TO CART - ${calculateItemTotal(currentItem).toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{
      backgroundColor: '#0a0a0a',
      minHeight: '100vh',
      paddingBottom: totalItems > 0 ? '100px' : '20px',
      color: 'white'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #000000, #1a0000)',
        color: 'white',
        padding: '25px 20px 20px',
        textAlign: 'center',
        boxShadow: '0 4px 20px rgba(220, 38, 38, 0.3)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        borderBottom: '3px solid #dc2626'
      }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          margin: '0 0 8px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          background: 'linear-gradient(45deg, #dc2626, #16a34a)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          <span style={{ fontSize: '36px', filter: 'drop-shadow(0 0 8px #dc2626)' }}>🥟</span>
          My Fucking RESTAURANT
          <span style={{ fontSize: '36px', filter: 'drop-shadow(0 0 8px #16a34a)' }}>🍜</span>
        </h1>
        <p style={{ opacity: 0.9, margin: '0', fontSize: '14px' }}>
          SCAN QR • CUSTOMIZE • ORDER • ENJOY!
        </p>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '20px',
          background: 'rgba(0, 0, 0, 0.7)',
          padding: '12px 20px',
          borderRadius: '12px',
          border: '1px solid rgba(220, 38, 38, 0.3)'
        }}>
          <div style={{ textAlign: 'left' }}>
            <div style={{ opacity: 0.8, fontSize: '12px', color: '#16a34a' }}>TABLE NUMBER</div>
            <div style={{ fontWeight: 'bold', fontSize: '24px', color: '#dc2626' }}>
              #{tableNumber}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ opacity: 0.8, fontSize: '12px', color: '#16a34a' }}>YOUR CART</div>
            <Link 
              to="/cart"
              style={{
                fontWeight: 'bold',
                fontSize: '20px',
                color: 'white',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span style={{
                backgroundColor: '#dc2626',
                padding: '4px 10px',
                borderRadius: '20px',
                fontSize: '14px'
              }}>
                {totalItems}
              </span>
              ITEMS
            </Link>
          </div>
        </div>
      </div>

      {/* Sticky Section Tabs */}
      <div style={{
        position: 'sticky',
        top: '200px',
        zIndex: 90,
        background: 'rgba(10, 10, 10, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '15px 20px',
        borderBottom: '2px solid rgba(220, 38, 38, 0.3)',
        display: 'flex',
        overflowX: 'auto',
        gap: '10px'
      }}>
        {menuCategories.map((category, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            style={{
              backgroundColor: activeSection === index ? '#dc2626' : 'rgba(255, 255, 255, 0.1)',
              color: activeSection === index ? 'white' : '#94a3b8',
              border: activeSection === index ? 'none' : '1px solid rgba(220, 38, 38, 0.3)',
              borderRadius: '25px',
              padding: '12px 24px',
              fontWeight: 'bold',
              fontSize: '14px',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span style={{ fontSize: '18px' }}>{category.icon}</span>
            {category.name.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Menu Categories */}
      <div style={{ padding: '0 20px 40px' }}>
        {menuCategories.map((category, catIndex) => (
          <div 
            key={catIndex} 
            ref={el => sectionRefs.current[catIndex] = el}
            style={{ marginBottom: '40px' }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '25px',
              paddingBottom: '15px',
              borderBottom: '2px solid rgba(220, 38, 38, 0.3)'
            }}>
              <h2 style={{
                fontSize: '26px',
                fontWeight: 'bold',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                gap: '15px'
              }}>
                <span style={{ fontSize: '36px' }}>{category.icon}</span>
                <span style={{
                  background: 'linear-gradient(45deg, #dc2626, #16a34a)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {category.name}
                </span>
              </h2>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '20px'
            }}>
              {category.items.map(item => (
                <div
                  key={item.id}
                  style={{
                    background: 'linear-gradient(145deg, rgba(20, 20, 20, 0.9), rgba(30, 30, 30, 0.9))',
                    borderRadius: '20px',
                    padding: '25px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(220, 38, 38, 0.2)',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                >
                  {item.popular && (
                    <div style={{
                      position: 'absolute',
                      top: '15px',
                      right: '15px',
                      background: 'linear-gradient(45deg, #dc2626, #ea580c)',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      zIndex: 2
                    }}>
                      🔥 POPULAR
                    </div>
                  )}
                  
                  {item.originalPrice && (
                    <div style={{
                      position: 'absolute',
                      top: '15px',
                      left: '15px',
                      background: 'linear-gradient(45deg, #16a34a, #22c55e)',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      zIndex: 2
                    }}>
                      💰 SAVE ${(item.originalPrice - item.price).toFixed(2)}
                    </div>
                  )}
                  
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <div>
                          <h3 style={{
                            fontSize: '20px',
                            fontWeight: 'bold',
                            marginBottom: '8px',
                            color: '#ffffff'
                          }}>
                            {item.name}
                          </h3>
                          <p style={{
                            color: '#94a3b8',
                            fontSize: '14px',
                            lineHeight: '1.5',
                            marginBottom: '15px'
                          }}>
                            {item.description}
                          </p>
                        </div>
                        <div style={{
                          color: '#22c55e',
                          fontSize: '24px',
                          fontWeight: 'bold'
                        }}>
                          ${item.price}
                          {item.originalPrice && (
                            <div style={{
                              color: '#94a3b8',
                              fontSize: '14px',
                              textDecoration: 'line-through',
                              textAlign: 'right'
                            }}>
                              ${item.originalPrice}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {item.variants && item.variants.length > 0 && (
                        <div style={{
                          backgroundColor: 'rgba(220, 38, 38, 0.1)',
                          padding: '10px',
                          borderRadius: '8px',
                          marginBottom: '15px',
                          border: '1px solid rgba(220, 38, 38, 0.3)'
                        }}>
                          <select style={{
                            width: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            color: 'white',
                            border: '1px solid rgba(220, 38, 38, 0.5)',
                            borderRadius: '8px',
                            padding: '8px 12px',
                            fontSize: '14px'
                          }}>
                            <option value="">Select Type/Variant</option>
                            {item.variants.map((variant, index) => (
                              <option key={index} value={variant}>{variant}</option>
                            ))}
                          </select>
                        </div>
                      )}
                      
                      <button
                        onClick={() => handleItemClick(item)}
                        style={{
                          background: 'linear-gradient(45deg, #dc2626, #16a34a)',
                          color: 'white',
                          border: 'none',
                          padding: '15px 25px',
                          borderRadius: '12px',
                          fontWeight: 'bold',
                          fontSize: '16px',
                          cursor: 'pointer',
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '12px',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <span>CUSTOMIZE & ADD</span>
                        <span style={{ fontSize: '24px' }}>➕</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Sticky Cart Footer */}
      {totalItems > 0 && (
        <div style={{
          position: 'fixed',
          bottom: '0',
          left: '0',
          right: '0',
          background: 'linear-gradient(90deg, rgba(0,0,0,0.95), rgba(30,0,0,0.95))',
          padding: '20px',
          boxShadow: '0 -8px 32px rgba(220, 38, 38, 0.4)',
          borderTop: '3px solid #dc2626',
          zIndex: 1000
        }}>
          <Link 
            to="/cart"
            style={{
              background: 'linear-gradient(90deg, #dc2626, #16a34a)',
              color: 'white',
              padding: '20px',
              borderRadius: '15px',
              textDecoration: 'none',
              display: 'block',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '18px'
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>YOUR ORDER</div>
                <div style={{ fontSize: '22px', fontWeight: 'bold' }}>
                  {totalItems} ITEM{totalItems !== 1 ? 'S' : ''}
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>TOTAL AMOUNT</div>
                <div style={{ fontSize: '28px', fontWeight: 'bold' }}>
                  ${cartTotal.toFixed(2)}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>CHECKOUT</div>
                <div style={{
                  backgroundColor: 'white',
                  color: '#dc2626',
                  width: '45px',
                  height: '45px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '24px',
                  marginLeft: 'auto'
                }}>
                  ➔
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Customization Modal */}
      <CustomizeModal />

      {/* Footer Note */}
      <div style={{
        textAlign: 'center',
        padding: '30px 20px',
        color: '#94a3b8',
        fontSize: '14px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        marginTop: '30px'
      }}>
        <p style={{ margin: '0 0 10px 0' }}>
          All prices are exclusive of VAT and service charge.
        </p>
        <p style={{ margin: '0', fontSize: '16px', color: '#22c55e', fontWeight: 'bold' }}>
          Thank you for your visit! Matey House! 🙏
        </p>
      </div>

      {/* Custom Scrollbar */}
      <style>{`
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #1a1a1a;
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(#dc2626, #16a34a);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(#ef4444, #22c55e);
        }
      `}</style>
    </div>
  );
};

export default Menu;