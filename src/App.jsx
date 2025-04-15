// src/App.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout Components
import { Layout } from './components/layout/Layout'; // Assuming Layout is in components/layout

// Page Components (Assuming they are created in a 'pages' folder)
// You'll need to create these files and paste the respective page component code into them,
// making sure to export them correctly (e.g., export default function LandingPage() { ... })
// I'll use placeholder imports here. Replace with actual imports.
import LandingPage from './pages/LandingPage'; // Placeholder import
import AuthPage from './pages/AuthPage'; // Placeholder import
import CustomersPage from './pages/CustomersPage'; // Placeholder import
import InventoryPage from './pages/InventoryPage'; // Placeholder import
import RiderDashboardPage from './pages/RiderDashboardPage'; // Placeholder import
import DeliveryTrackingPage from './pages/DeliveryTrackingPage'; // Placeholder import

// Cart and Modal Components (Could be in layout or rendered here)
import { CartSidebar } from './components/cart/CartSidebar'; // Assuming CartSidebar is in components/cart
import { ProductDetailModal } from './components/products/ProductDetailModal'; // Assuming Modal is in components/products
import { ChatInterface } from './components/chat/ChatInterface'; // Assuming Chat is in components/chat

// Mock Data / Helpers (Could be moved to separate files)
import { mockProducts } from './data/mockProducts'; // Assuming mock data is moved
import { renderRatingStars, formatSales } from './utils/helpers'; // Assuming helpers are moved

// --- Main App Component ---
export default function App() {
    // --- Global State Management ---
    // Theme
    const [theme, setTheme] = useState('dark');
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(theme === 'dark' ? 'light' : 'dark');
        root.classList.add(theme);
    }, [theme]);
    const toggleTheme = () => { setTheme(prev => (prev === 'dark' ? 'light' : 'dark')); };

    // Cart
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const cartCount = useMemo(() => cartItems.reduce((count, item) => count + item.quantity, 0), [cartItems]);
    const cartTotal = useMemo(() => cartItems.reduce((total, item) => total + item.price * item.quantity, 0), [cartItems]);
    const toggleCart = () => setIsCartOpen(!isCartOpen);

    const handleAddToCart = (productToAdd) => {
        setCartItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(item => item.id === productToAdd.id);
            if (existingItemIndex > -1) {
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex] = { ...updatedItems[existingItemIndex], quantity: updatedItems[existingItemIndex].quantity + (productToAdd.quantity || 1) };
                return updatedItems;
            } else {
                return [...prevItems, { ...productToAdd, quantity: productToAdd.quantity || 1 }];
            }
        });
    };
    const handleUpdateCartQuantity = (productId, newQuantity) => {
        setCartItems(prevItems => {
            if (newQuantity <= 0) { return prevItems.filter(item => item.id !== productId); }
            else { return prevItems.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item); }
        });
    };
    const handleRemoveFromCart = (productId) => { setCartItems(prevItems => prevItems.filter(item => item.id !== productId)); };

    // Product Modal
    const [selectedProduct, setSelectedProduct] = useState(null);
    const handleProductSelect = (product) => { setSelectedProduct(product); };
    const handleCloseModal = () => { setSelectedProduct(null); };

    // Chat
    const [isChatOpen, setIsChatOpen] = useState(false);
    const handleToggleChat = () => { setIsChatOpen(!isChatOpen); if (selectedProduct) handleCloseModal(); };

    // --- Render ---
    return (
        <Router>
            {/* Apply theme background globally */}
            <div className={`font-sans ${theme === 'dark' ? 'dark bg-gray-900 text-gray-200' : 'bg-white text-gray-800'} transition-colors duration-300`}>
                 {/* Global style for smooth scrolling */}
                 <style jsx global>{` html { scroll-behavior: smooth; } `}</style>

                {/* Layout wraps all routes */}
                <Layout
                    theme={theme}
                    toggleTheme={toggleTheme}
                    cartCount={cartCount}
                    onCartToggle={toggleCart}
                >
                    <Routes>
                        {/* Define Routes for each page */}
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/auth" element={<AuthPage />} />
                        <Route path="/products" element={
                            <CustomersPage
                                onProductSelect={handleProductSelect}
                                onAddToCart={handleAddToCart}
                            />}
                        />
                         <Route path="/inventory" element={<InventoryPage />} /> {/* Assuming InventoryPage exists */}
                         <Route path="/rider-dashboard" element={<RiderDashboardPage riderId="rider-007"/>} /> {/* Assuming RiderDashboardPage exists */}
                         {/* Example route with parameter */}
                         <Route path="/track/:deliveryId" element={<DeliveryTrackingPage />} /> {/* Assuming DeliveryTrackingPage exists */}

                        {/* Add other routes here */}
                        {/* Example fallback for unmatched routes */}
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </Layout>

                {/* Global Modals/Sidebars */}
                <CartSidebar
                    isOpen={isCartOpen}
                    onClose={toggleCart}
                    items={cartItems}
                    onUpdateQuantity={handleUpdateCartQuantity}
                    onRemoveItem={handleRemoveFromCart}
                    total={cartTotal}
                />
                {selectedProduct && (
                    <ProductDetailModal
                        product={selectedProduct}
                        onClose={handleCloseModal}
                        onAddToCart={handleAddToCart}
                    />
                )}
                 {/* Floating Chat Icon & Interface */}
                 <button onClick={handleToggleChat} className={`fixed bottom-6 right-6 z-40 p-4 bg-emerald-500 text-white rounded-full shadow-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 hover:scale-110`} aria-label="Open Chat">
                    <MessageSquare className="w-6 h-6" />
                 </button>
                 {isChatOpen && <ChatInterface onClose={handleToggleChat} />}
            </div>
        </Router>
    );
}

// --- Placeholder Page Components (Replace imports above with these or actual files) ---

// function LandingPage() { return <div className="p-8"><h1>Landing Page</h1></div>; }
// function AuthPage() { return <div className="p-8"><h1>Login/Sign Up Page</h1></div>; }
// function CustomersPage({ onProductSelect, onAddToCart }) { return <div className="p-8"><h1>Product Listing Page</h1><p>Content goes here...</p></div>; }
// function InventoryPage() { return <div className="p-8"><h1>Inventory Page</h1></div>; }
// function RiderDashboardPage({ riderId }) { return <div className="p-8"><h1>Rider Dashboard ({riderId})</h1></div>; }
// function DeliveryTrackingPage() { const { deliveryId } = useParams(); return <div className="p-8"><h1>Tracking Delivery: {deliveryId}</h1></div>; } // Needs useParams from react-router-dom
function NotFoundPage() { return <div className="p-8 text-center"><h1>404 - Page Not Found</h1></div>; }

// --- Placeholder Component Imports (Replace with actual component files) ---
// These components are defined in previous immersives or need to be created based on them

// Assuming CartSidebar is defined elsewhere
// function CartSidebar({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, total }) { return isOpen ? <div className="fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-700 shadow-lg z-50 p-4">Cart Content</div> : null; }
// Assuming ProductDetailModal is defined elsewhere
// function ProductDetailModal({ product, onClose, onAddToCart }) { return product ? <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"><div className="bg-white p-8 rounded">Modal for {product.name}<button onClick={onClose}>Close</button></div></div> : null; }
// Assuming ChatInterface is defined elsewhere
// function ChatInterface({ onClose }) { return <div className="fixed bottom-24 right-6 w-80 h-96 bg-gray-200 z-50 p-4">Chat UI<button onClick={onClose}>Close</button></div>; }

// --- Placeholder Data/Utils Imports ---
// const mockProducts = [];
// const renderRatingStars = () => null;
// const formatSales = () => null;

// --- Actual Page Component Definitions ---
// Paste the actual code for LandingPage, AuthPage, CustomersPage (simplified),
// InventoryPage, RiderDashboardPage, DeliveryTrackingPage into separate files
// within a 'src/pages' directory and import them above. Remember to remove
// the 'export default function App()' from each of those files and just export
// the page component itself. Also update them to use the reusable UI components.
// For brevity, I am not including the full code for every page here again.
// You would take the code from the previous immersives, save them as separate files,
// remove the App export, and import them above.

// Example: Simplified CustomersPage structure for this context
// (You would replace this with the actual CustomersPage code from previous steps,
// removing its own App export and internal header/theme logic)
// function CustomersPage({ onProductSelect, onAddToCart }) {
//     const [products] = useState(mockProducts); // Use imported mock data
//     // ... rest of CustomersPage state and logic (search, filter, save) ...
//     return (
//         <main className="flex-grow overflow-y-auto">
//             <PageSpecificHeader /* ... props ... */ />
//             <div className="max-w-none mx-auto p-4 md:p-6 lg:p-8">
//                 <ProductGrid
//                     products={filteredProducts}
//                     onProductSelect={onProductSelect}
//                     onSaveToggle={handleSaveToggle}
//                     savedItems={savedItems}
//                     onAddToCart={onAddToCart}
//                 />
//             </div>
//         </main>
//     );
// }
// Define PageSpecificHeader, ProductGrid, ProductCard here or import them


// --- Actual Component Definitions (Paste from previous immersives) ---
// For this example to be runnable, you'd need to:
// 1. Create the folder structure (src/pages, src/components/ui, src/components/layout, etc.)
// 2. Save the component code from previous immersives into the corresponding files.
// 3. Ensure imports/exports match the file structure.
// 4. Define placeholder components or paste actual component code below if not using separate files.

// --- Placeholder definitions for brevity ---
const LandingPage = () => <div className="p-8"><h1>Landing Page Placeholder</h1></div>;
const AuthPage = () => <div className="p-8"><h1>Auth Page Placeholder</h1></div>;
const CustomersPage = ({ onProductSelect, onAddToCart }) => {
    // Simplified version for this example
    const [products] = useState(mockProducts);
    const [filteredProducts, setFilteredProducts] = useState(mockProducts);
    const [activeFilters, setActiveFilters] = useState({ category: '', color: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [savedItems, setSavedItems] = useState(new Set());
    const categories = useMemo(() => ['All Categories', ...new Set(products.map(p => p.category))], [products]);
    const colors = useMemo(() => ['All Colors', ...new Set(products.map(p => p.color))], [products]);

     useEffect(() => {
        let tempProducts = [...products];
        if (activeFilters.category && activeFilters.category !== 'All Categories') { tempProducts = tempProducts.filter(p => p.category === activeFilters.category); }
        if (activeFilters.color && activeFilters.color !== 'All Colors') { tempProducts = tempProducts.filter(p => p.color === activeFilters.color); }
        if (searchTerm) { const lower = searchTerm.toLowerCase(); tempProducts = tempProducts.filter(p => p.name.toLowerCase().includes(lower) || p.description.toLowerCase().includes(lower) || p.category.toLowerCase().includes(lower) ); }
        setFilteredProducts(tempProducts);
    }, [activeFilters, products, searchTerm]);

    const handleFilterChange = (filterType, value) => { const actualValue = (filterType === 'category' && value === 'All Categories') || (filterType === 'color' && value === 'All Colors') ? '' : value; setActiveFilters(prev => ({ ...prev, [filterType]: actualValue })); };
    const handleSearchChange = (event) => { setSearchTerm(event.target.value); };
    const handleSaveToggle = (productId) => { setSavedItems(prev => { const n = new Set(prev); n.has(productId)?n.delete(productId):n.add(productId); return n; }); };

    return (
        <main className="flex-grow overflow-y-auto">
            <PageSpecificHeader searchTerm={searchTerm} onSearchChange={handleSearchChange} categories={categories} colors={colors} activeFilters={activeFilters} onFilterChange={handleFilterChange} />
            <div className="max-w-none mx-auto p-4 md:p-6 lg:p-8">
                <ProductGrid products={filteredProducts} onProductSelect={onProductSelect} onSaveToggle={handleSaveToggle} savedItems={savedItems} onAddToCart={onAddToCart} />
            </div>
        </main>
    );
};
const InventoryPage = () => <div className="p-8"><h1>Inventory Page Placeholder</h1></div>;
const RiderDashboardPage = ({ riderId }) => <div className="p-8"><h1>Rider Dashboard Placeholder ({riderId})</h1></div>;
const DeliveryTrackingPage = () => { const { deliveryId } = useParams(); return <div className="p-8"><h1>Tracking Delivery Placeholder: {deliveryId}</h1></div>; }; // Needs useParams
import { useParams } from 'react-router-dom'; // Make sure to import useParams

// --- Placeholder component definitions ---
const PageSpecificHeader = ({ searchTerm, onSearchChange, categories, colors, activeFilters, onFilterChange }) => ( <div className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700/50 px-4 sm:px-6 lg:px-8 py-3 flex-shrink-0"> {/* Content... */} <input type="search" placeholder="Search..." value={searchTerm} onChange={onSearchChange} className="border p-1 rounded" /> Filters... </div> );
const ProductGrid = ({ products, onProductSelect, onSaveToggle, savedItems, onAddToCart }) => ( <div className="grid grid-cols-2 md:grid-cols-4 gap-4"> {products.map(p => <div key={p.id} className="border p-2 rounded dark:bg-gray-700"> <p>{p.name}</p> <button onClick={() => onAddToCart(p)} className="text-xs bg-emerald-200 p-1">Add</button> <button onClick={() => onProductSelect(p)} className="text-xs ml-1">Details</button> </div>)} </div> );
const CartSidebar = ({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, total }) => isOpen ? <div className="fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-700 shadow-lg z-50 p-4 overflow-y-auto"><button onClick={onClose} className="float-right">X</button><h2>Cart</h2>Items: {items.length}, Total: ${total.toFixed(2)}</div> : null;
const ProductDetailModal = ({ product, onClose, onAddToCart }) => product ? <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"><div className="bg-white dark:bg-gray-600 p-8 rounded"><h2>{product.name}</h2><p>{product.description}</p><button onClick={() => onAddToCart(product)} className="bg-emerald-300 p-1">Add to Cart</button><button onClick={onClose} className="ml-2">Close</button></div></div> : null;
const ChatInterface = ({ onClose }) => <div className="fixed bottom-24 right-6 w-80 h-96 bg-gray-200 dark:bg-gray-700 z-50 p-4 rounded shadow-lg"><p>Chat UI</p><button onClick={onClose}>Close</button></div>;

