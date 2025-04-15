import React, { useState, useEffect, useMemo } from 'react';
import { Star, Heart, X, MessageSquare, Filter, ChevronDown, ChevronUp, ShoppingCart, Search } from 'lucide-react';

// --- Mock Data ---
// Added 'isFrequentlyBought' property
const mockProducts = [
  { id: 1, name: 'Wireless Noise-Cancelling Headphones', category: 'Electronics', color: 'Black', price: 199.99, rating: 4.5, imageUrl: 'https://placehold.co/300x300/000000/FFFFFF?text=Headphones', description: 'Immersive sound experience with active noise cancellation. Long battery life and comfortable design.', isFrequentlyBought: true },
  { id: 2, name: 'Smartphone Pro', category: 'Electronics', color: 'Silver', price: 799.00, rating: 4.8, imageUrl: 'https://placehold.co/300x300/C0C0C0/000000?text=Smartphone', description: 'Latest generation smartphone with a stunning display, powerful processor, and advanced camera system.', isFrequentlyBought: true },
  { id: 3, name: 'Classic Cotton T-Shirt', category: 'Clothing', color: 'White', price: 24.99, rating: 4.2, imageUrl: 'https://placehold.co/300x300/FFFFFF/000000?text=T-Shirt', description: 'A comfortable and versatile t-shirt made from 100% premium cotton. Perfect for everyday wear.', isFrequentlyBought: true },
  { id: 4, name: 'Running Shoes', category: 'Shoes', color: 'Blue', price: 89.95, rating: 4.6, imageUrl: 'https://placehold.co/300x300/0000FF/FFFFFF?text=Shoes', description: 'Lightweight and breathable running shoes designed for maximum comfort and performance.', isFrequentlyBought: false },
  { id: 5, name: 'Bluetooth Speaker', category: 'Electronics', color: 'Gray', price: 49.99, rating: 4.3, imageUrl: 'https://placehold.co/300x300/808080/FFFFFF?text=Speaker', description: 'Portable speaker with rich sound and long playtime. Water-resistant design.', isFrequentlyBought: false },
  { id: 6, name: 'Denim Jeans', category: 'Clothing', color: 'Blue', price: 59.99, rating: 4.0, imageUrl: 'https://placehold.co/300x300/0000FF/FFFFFF?text=Jeans', description: 'Stylish and durable denim jeans with a classic fit.', isFrequentlyBought: false },
  { id: 7, name: 'Leather Loafers', category: 'Shoes', color: 'Black', price: 120.00, rating: 4.7, imageUrl: 'https://placehold.co/300x300/000000/FFFFFF?text=Loafers', description: 'Elegant leather loafers suitable for both casual and formal occasions.', isFrequentlyBought: false },
  { id: 8, name: 'Laptop Ultrabook', category: 'Electronics', color: 'Silver', price: 1199.00, rating: 4.9, imageUrl: 'https://placehold.co/300x300/C0C0C0/000000?text=Laptop', description: 'Thin and light ultrabook with high performance for productivity on the go.', isFrequentlyBought: true },
  { id: 9, name: 'Hooded Sweatshirt', category: 'Clothing', color: 'Gray', price: 45.00, rating: 4.4, imageUrl: 'https://placehold.co/300x300/808080/FFFFFF?text=Hoodie', description: 'Warm and cozy hooded sweatshirt, perfect for cooler weather.', isFrequentlyBought: false },
];

// --- Helper Functions ---
const renderRatingStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={`full-${i}`} className="w-4 h-4 text-yellow-400 fill-current" />);
  }
  for (let i = 0; i < 5 - fullStars; i++) {
    stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
  }
  return <div className="flex items-center">{stars}</div>;
};

// --- Main App Component (for context if needed) ---
export default function App() {
    return <CustomersPage />;
}

// --- Customers Page Component ---
export function CustomersPage() {
  const [products] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [activeFilters, setActiveFilters] = useState({ category: '', color: '' });
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [savedItems, setSavedItems] = useState(new Set());
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Extract unique categories and colors
  const categories = useMemo(() => [...new Set(products.map(p => p.category))], [products]);
  const colors = useMemo(() => [...new Set(products.map(p => p.color))], [products]);

  // Filter frequently bought items
  const frequentlyBoughtItems = useMemo(() => products.filter(p => p.isFrequentlyBought), [products]);

  // Apply filters and search whenever dependencies change
  useEffect(() => {
    let tempProducts = products;

    // Apply category filter
    if (activeFilters.category) {
      tempProducts = tempProducts.filter(p => p.category === activeFilters.category);
    }
    // Apply color filter
    if (activeFilters.color) {
      tempProducts = tempProducts.filter(p => p.color === activeFilters.color);
    }
    // Apply search term filter (case-insensitive)
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      tempProducts = tempProducts.filter(p =>
        p.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        p.description.toLowerCase().includes(lowerCaseSearchTerm) ||
        p.category.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }
    setFilteredProducts(tempProducts);
  }, [activeFilters, products, searchTerm]); // Added searchTerm dependency

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setActiveFilters(prev => ({ ...prev, [filterType]: value }));
  };

  // Handle search input changes
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle selecting a product
  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  // Close modal
  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  // Toggle chat
  const handleToggleChat = () => {
    setIsChatOpen(!isChatOpen);
     if (selectedProduct) handleCloseModal();
  };

  // Toggle save item
  const handleSaveToggle = (productId) => {
    setSavedItems(prev => {
      const newSavedItems = new Set(prev);
      if (newSavedItems.has(productId)) {
        newSavedItems.delete(productId);
      } else {
        newSavedItems.add(productId);
      }
      return newSavedItems;
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Filter Sidebar */}
      <FilterSidebar
        categories={categories}
        colors={colors}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto"> {/* Added overflow */}
        <div className="max-w-7xl mx-auto">
          {/* Top Bar: Title, Search, Filter Toggle */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Products</h1>
            {/* Search Input */}
            <div className="relative w-full md:w-1/2 lg:w-1/3">
              <input
                type="search"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            {/* Filter Toggle Button (Mobile) */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="md:hidden p-2 rounded-md bg-white text-gray-600 shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>

          {/* Frequently Bought Section */}
          <FrequentlyBoughtSection
            products={frequentlyBoughtItems}
            onProductSelect={handleProductSelect}
            onSaveToggle={handleSaveToggle}
            savedItems={savedItems}
          />

          {/* Separator */}
          <hr className="my-8 border-gray-200" />

          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-6">All Products</h2>
          {/* Product Grid */}
          <ProductGrid
            products={filteredProducts}
            onProductSelect={handleProductSelect}
            onSaveToggle={handleSaveToggle}
            savedItems={savedItems}
          />
        </div>
      </main>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal product={selectedProduct} onClose={handleCloseModal} />
      )}

      {/* Floating Chat Icon */}
      <button
        onClick={handleToggleChat}
        className="fixed bottom-6 right-6 z-40 p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-transform duration-200 hover:scale-110"
        aria-label="Open Chat"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chat Interface */}
      {isChatOpen && <ChatInterface onClose={handleToggleChat} />}
    </div>
  );
}


// --- Sub Components ---

// Filter Sidebar Component (No changes needed for this update)
function FilterSidebar({ categories, colors, activeFilters, onFilterChange, isOpen, onClose }) {
  const [openSections, setOpenSections] = useState({ category: true, color: true });

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleRadioChange = (type, value) => {
    if (activeFilters[type] === value) {
        onFilterChange(type, '');
    } else {
        onFilterChange(type, value);
    }
  }

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/30 z-30 md:hidden" onClick={onClose}></div>}
      <aside className={`fixed md:sticky top-0 left-0 z-40 md:z-10 w-64 h-full bg-white shadow-lg md:shadow-none border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:top-0 md:flex-shrink-0 md:h-screen md:overflow-y-auto`}> {/* Added height and overflow */}
        <div className="p-4 h-full flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Filters</h2>
            <button onClick={onClose} className="md:hidden p-1 text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>
          {/* Category Filter */}
          <div className="mb-6">
            <button onClick={() => toggleSection('category')} className="w-full flex justify-between items-center text-left font-medium text-gray-600 mb-2">
              Category {openSections.category ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openSections.category && (
              <div className="space-y-1 pl-2">
                 <label className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                      <input type="radio" name="category" value="" checked={!activeFilters.category} onChange={() => onFilterChange('category', '')} className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"/>
                      <span>All Categories</span>
                    </label>
                {categories.map(category => (
                  <label key={category} className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                    <input type="radio" name="category" value={category} checked={activeFilters.category === category} onChange={() => handleRadioChange('category', category)} className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"/>
                    <span>{category}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
          {/* Color Filter */}
          <div className="mb-6">
            <button onClick={() => toggleSection('color')} className="w-full flex justify-between items-center text-left font-medium text-gray-600 mb-2">
              Color {openSections.color ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openSections.color && (
              <div className="space-y-1 pl-2">
                 <label className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                      <input type="radio" name="color" value="" checked={!activeFilters.color} onChange={() => onFilterChange('color', '')} className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"/>
                      <span>All Colors</span>
                    </label>
                {colors.map(color => (
                  <label key={color} className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                    <input type="radio" name="color" value={color} checked={activeFilters.color === color} onChange={() => handleRadioChange('color', color)} className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"/>
                    <span>{color}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

// Frequently Bought Section Component
function FrequentlyBoughtSection({ products, onProductSelect, onSaveToggle, savedItems }) {
   if (!products || products.length === 0) {
    return null; // Don't render if no frequently bought items
  }
  return (
    <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4">Frequently Bought Together</h2>
        {/* Using a smaller grid for this section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
             {products.map(product => (
                <ProductCard
                key={`freq-${product.id}`} // Ensure unique key
                product={product}
                onSelect={onProductSelect}
                onSaveToggle={onSaveToggle}
                isSaved={savedItems.has(product.id)}
                />
            ))}
        </div>
    </div>
  );
}


// Product Grid Component (No changes needed for this update)
function ProductGrid({ products, onProductSelect, onSaveToggle, savedItems }) {
  if (!products || products.length === 0) {
    return <p className="text-center text-gray-500 mt-10">No products found matching your criteria.</p>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onSelect={onProductSelect}
          onSaveToggle={onSaveToggle}
          isSaved={savedItems.has(product.id)}
        />
      ))}
    </div>
  );
}


// Product Card Component (Updated with Animations/Glow)
function ProductCard({ product, onSelect, onSaveToggle, isSaved }) {
  const [isAnimatingHeart, setIsAnimatingHeart] = useState(false);

  const handleHeartClick = (e) => {
      e.stopPropagation(); // Prevent card click
      onSaveToggle(product.id);
      setIsAnimatingHeart(true);
      // Remove animation class after animation duration (e.g., 300ms)
      setTimeout(() => setIsAnimatingHeart(false), 300);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out group flex flex-col"> {/* Added flex flex-col */}
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover cursor-pointer"
          onClick={() => onSelect(product)}
          onError={(e) => { e.target.onerror = null; e.target.src=`https://placehold.co/300x300/EFEFEF/AAAAAA?text=Image+Not+Found`; }}
        />
        {/* Save Icon with Animation */}
        <button
          onClick={handleHeartClick}
          className={`absolute top-2 right-2 p-1.5 rounded-full transition-all duration-200 ease-in-out ${
            isSaved ? 'bg-red-500 text-white' : 'bg-white/70 text-gray-600 hover:text-red-500 hover:bg-white'
          } ${isAnimatingHeart ? 'animate-heart-pop' : ''}`} // Added animation class conditionally
          aria-label={isSaved ? 'Unsave item' : 'Save item'}
        >
          <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-grow"> {/* Added flex flex-col flex-grow */}
        <h3
          className="text-md font-semibold text-gray-800 mb-1 truncate cursor-pointer hover:text-indigo-600"
          onClick={() => onSelect(product)}
          title={product.name}
        >
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mb-2">{product.category}</p>
        <div className="flex justify-between items-center mb-3">
          <p className="text-lg font-bold text-indigo-600">${product.price.toFixed(2)}</p>
          {renderRatingStars(product.rating)}
        </div>
         {/* Add to Cart Button with Golden Glow */}
         <button
            onClick={(e) => { e.stopPropagation(); alert(`Added ${product.name} to cart (placeholder)`); }}
            className="w-full mt-auto px-4 py-2 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 transition-all duration-300 ease-in-out flex items-center justify-center space-x-1 group/button hover:bg-yellow-100 hover:text-yellow-800 hover:shadow-[0_0_15px_rgba(250,204,21,0.6)] focus:shadow-[0_0_15px_rgba(250,204,21,0.6)]" // Added hover/focus glow (using yellow for gold) and transition
         >
            <ShoppingCart className="w-4 h-4 transition-colors duration-300 group-hover/button:text-yellow-700"/>
            <span className="transition-colors duration-300">Add to Cart</span>
         </button>
      </div>
      {/* Keyframes for Heart Animation */}
      <style jsx global>{`
        @keyframes heartPop {
          0% { transform: scale(1); }
          50% { transform: scale(1.4); }
          100% { transform: scale(1); }
        }
        .animate-heart-pop {
          animation: heartPop 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}


// Product Detail Modal Component (No changes needed for this update)
function ProductDetailModal({ product, onClose }) {
  if (!product) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 p-1 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500" aria-label="Close modal">
          <X className="w-6 h-6" />
        </button>
        <div className="p-6 md:p-8">
           <div className="md:flex md:space-x-6">
                <div className="md:w-1/2 flex-shrink-0 mb-4 md:mb-0">
                     <img src={product.imageUrl} alt={product.name} className="w-full h-64 md:h-auto object-contain rounded-md border" onError={(e) => { e.target.onerror = null; e.target.src=`https://placehold.co/400x400/EFEFEF/AAAAAA?text=Image+Not+Found`; }}/>
                </div>
                <div className="md:w-1/2">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h2>
                    <p className="text-sm text-gray-500 mb-3">{product.category} - {product.color}</p>
                    <div className="flex items-center mb-4">
                        {renderRatingStars(product.rating)}
                        <span className="ml-2 text-sm text-gray-600">({product.rating.toFixed(1)} rating)</span>
                    </div>
                    <p className="text-3xl font-extrabold text-indigo-600 mb-4">${product.price.toFixed(2)}</p>
                    <h3 className="text-md font-semibold text-gray-700 mb-1">Description</h3>
                    <p className="text-sm text-gray-600 mb-6">{product.description}</p>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                         <button onClick={(e) => { e.stopPropagation(); alert(`Added ${product.name} to cart (placeholder)`); onClose(); }} className="flex-1 px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out flex items-center justify-center space-x-1">
                            <ShoppingCart className="w-4 h-4"/>
                            <span>Add to Cart</span>
                         </button>
                    </div>
                </div>
           </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
}


// Chat Interface Placeholder Component (No changes needed for this update)
function ChatInterface({ onClose }) {
  return (
    <div className="fixed bottom-24 right-6 z-50 w-80 h-96 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col animate-fade-in-up">
      <div className="flex justify-between items-center p-3 bg-indigo-600 text-white rounded-t-lg">
        <h3 className="font-semibold text-md">Chat Support</h3>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-1 focus:ring-white">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto text-sm text-gray-600 flex flex-col justify-between">
         <div><p className="bg-gray-100 p-2 rounded-lg mb-2 max-w-[80%] self-start">Hello! How can I help you today?</p></div>
         <p className="text-center text-gray-400 text-xs mt-4">Chat interface placeholder</p>
      </div>
      <div className="p-2 border-t border-gray-200">
        <input type="text" placeholder="Type your message..." className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500" />
      </div>
       <style jsx global>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
}
