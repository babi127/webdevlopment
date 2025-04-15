import React, { useState } from 'react';
import { Home, Package, Users, LogIn, Menu, X } from 'lucide-react'; // Using lucide-react for icons
import { Link } from 'react-router-dom';

// Main App component (acts as a simple router/container)
export default function App() {
  // In a real app, you'd use a router. Here we just show the LandingPage.
  return <LandingPage />;
}

// Landing Page Component
export function LandingPage() {
  // State for mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 font-sans antialiased">
      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand Name */}
            <div className="flex-shrink-0 flex items-center cursor-pointer">
              <Package className="h-8 w-8 text-indigo-600 mr-2" />
              <span className="text-xl font-bold text-gray-800">MDS Platform</span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex md:items-center md:space-x-2 lg:space-x-4">
              {/* Added transition, hover/focus effects including a subtle glow via shadow */}
              <a href="#" className="text-gray-600 hover:text-indigo-600 focus:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-all duration-300 ease-in-out hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] focus:shadow-[0_0_15px_rgba(99,102,241,0.4)]">
                <Home className="h-4 w-4 mr-1" /> Home
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 focus:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] focus:shadow-[0_0_15px_rgba(99,102,241,0.4)]">
                About
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 focus:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] focus:shadow-[0_0_15px_rgba(99,102,241,0.4)]">
                Services
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 focus:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] focus:shadow-[0_0_15px_rgba(99,102,241,0.4)]">
                Contact
              </a>
              {/* Added transition and hover/focus effects to the button */}
              <Link to="/login" className="bg-indigo-600 text-white text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out">
                <LogIn className="h-4 w-4 mr-1" /> Login / Sign Up
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition duration-150 ease-in-out"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel - Added transitions */}
        {isMobileMenuOpen && (
           <div className="md:hidden absolute top-16 inset-x-0 bg-white shadow-lg z-40 border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {/* Added hover/focus states for mobile */}
              <a href="#" className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 focus:bg-indigo-100 focus:text-indigo-700 focus:outline-none block px-3 py-2 rounded-md text-base font-medium flex items-center transition duration-150 ease-in-out">
                <Home className="h-5 w-5 mr-2" /> Home
              </a>
              <a href="#" className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 focus:bg-indigo-100 focus:text-indigo-700 focus:outline-none block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out">
                About
              </a>
              <a href="#" className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 focus:bg-indigo-100 focus:text-indigo-700 focus:outline-none block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out">
                Services
              </a>
              <a href="#" className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 focus:bg-indigo-100 focus:text-indigo-700 focus:outline-none block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out">
                Contact
              </a>
              <a href="#" className="bg-indigo-600 text-white block w-full text-left px-4 py-2 mt-2 rounded-md text-base font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center shadow hover:shadow-md transition duration-150 ease-in-out">
                <LogIn className="h-5 w-5 mr-2" /> Login / Sign Up
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <main>
        <div className="relative pt-20 pb-36 flex content-center items-center justify-center min-h-[80vh]">
          {/* Background Image/Overlay */}
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              // Using a different, potentially more relevant placeholder image
              backgroundImage: "url('https://images.unsplash.com/photo-1604754742629-9e3d76133995?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80')",
            }}
          >
            {/* Slightly darker overlay for better text contrast */}
            <span id="blackOverlay" className="w-full h-full absolute opacity-80 bg-black"></span>
          </div>

          {/* Hero Content */}
          <div className="container relative mx-auto px-4">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-8/12 px-4 mx-auto text-center">
                <div>
                  {/* Enhanced text styling */}
                  <h1 className="text-white font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-tight drop-shadow-lg">
                    Seamless Delivery, <span className="text-indigo-400">Simplified.</span>
                  </h1>
                  <p className="mt-4 text-lg lg:text-xl text-gray-200 drop-shadow-md max-w-3xl mx-auto">
                    Empowering merchants with fast, reliable, and trackable delivery solutions across Debre Markos. Focus on your business, we'll handle the logistics.
                  </p>
                  <div className="mt-12">
                    {/* Enhanced button styling and hover effect */}
                    <a
                      href="#"
                      className="get-started text-white font-bold px-8 py-4 rounded-lg shadow-lg outline-none focus:outline-none mr-1 mb-1 bg-indigo-500 active:bg-indigo-600 uppercase text-sm hover:bg-indigo-600 hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out"
                    >
                      Get Started Today
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Updated Wave/Shape Divider */}
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-20" // Increased height
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              {/* Changed polygon to match the new background gradient start color */}
              <polygon
                className="text-gray-50 fill-current" // Matches the start of the next section's background
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>

        {/* Features Section - Adjusted background and card styling */}
        <section className="pb-20 bg-gradient-to-br from-gray-50 to-gray-200 -mt-24">
          <div className="container mx-auto px-4">
             <div className="flex flex-wrap justify-center text-center mb-16">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-4xl font-semibold text-gray-800">Why Choose MDS Platform?</h2>
                <p className="text-lg leading-relaxed mt-15 mb-4 text-gray-600">
                  We provide the tools and reliability you need to get your products delivered efficiently.
                </p>
              </div>
            </div>
            {/* Updated Feature Cards with hover effects */}
            <div className="flex flex-wrap justify-center gap-y-8 lg:gap-x-8">
              {/* Example Feature Card 1 */}
               <div className="w-full md:w-5/12 lg:w-3/12 px-4">
                 {/* Added transition, hover shadow and lift */}
                 <div className="relative flex flex-col min-w-0 break-words bg-white w-full shadow-lg hover:shadow-xl rounded-lg p-6 transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                   <div className="flex-shrink-0">
                      <Package className="w-12 h-12 text-white bg-indigo-500 p-3 rounded-full mb-5 shadow-md" />
                   </div>
                   <h6 className="text-xl mb-1 font-semibold text-gray-700">Real-time Tracking</h6>
                   <p className="mb-4 text-gray-600">
                     Monitor your deliveries every step of the way with live updates for you and your customers.
                   </p>
                 </div>
               </div>
               {/* Example Feature Card 2 */}
                <div className="w-full md:w-5/12 lg:w-3/12 px-4">
                 <div className="relative flex flex-col min-w-0 break-words bg-white w-full shadow-lg hover:shadow-xl rounded-lg p-6 transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                   <div className="flex-shrink-0">
                      <Users className="w-12 h-12 text-white bg-green-500 p-3 rounded-full mb-5 shadow-md" />
                   </div>
                   <h6 className="text-xl mb-1 font-semibold text-gray-700">Verified Riders</h6>
                   <p className="mb-4 text-gray-600">
                     Trustworthy and professional riders ensure safe handling and timely delivery of goods.
                   </p>
                 </div>
               </div>
                {/* Example Feature Card 3 */}
                <div className="w-full md:w-5/12 lg:w-3/12 px-4">
                 <div className="relative flex flex-col min-w-0 break-words bg-white w-full shadow-lg hover:shadow-xl rounded-lg p-6 transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                   <div className="flex-shrink-0">
                     <Home className="w-12 h-12 text-white bg-red-500 p-3 rounded-full mb-5 shadow-md" />
                   </div>
                   <h6 className="text-xl mb-1 font-semibold text-gray-700">Wide Coverage</h6>
                   <p className="mb-4 text-gray-600">
                     Our extensive delivery network covers Debre Markos, reaching more customers for you.
                   </p>
                 </div>
               </div>
            </div>
          </div>
        </section>

        {/* Add more modern sections as needed (e.g., How it works, Testimonials) */}

      </main>

      {/* Footer - Slightly updated styling */}
      <footer className="relative bg-gray-800 pt-12 pb-8 mt-12">
         {/* Optional decorative top border */}
         <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-500"></div>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap text-left lg:text-left">
            <div className="w-full lg:w-6/12 px-4 mb-8 lg:mb-0">
              <h4 className="text-3xl font-semibold text-white">MDS Platform</h4>
              <h5 className="text-lg mt-1 mb-2 text-gray-400">
                Your reliable partner for merchant delivery in Debre Markos.
              </h5>
              {/* Add social media icons if desired */}
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="flex flex-wrap items-top mb-6">
                <div className="w-6/12 lg:w-4/12 px-4 ml-auto mb-6 lg:mb-0">
                  <span className="block uppercase text-gray-400 text-sm font-semibold mb-2">Useful Links</span>
                  <ul className="list-unstyled space-y-2">
                    <li><a className="text-gray-300 hover:text-white font-semibold text-sm transition duration-150 ease-in-out" href="#">About Us</a></li>
                    <li><a className="text-gray-300 hover:text-white font-semibold text-sm transition duration-150 ease-in-out" href="#">How it Works</a></li>
                    <li><a className="text-gray-300 hover:text-white font-semibold text-sm transition duration-150 ease-in-out" href="#">Blog</a></li>
                  </ul>
                </div>
                <div className="w-6/12 lg:w-4/12 px-4">
                  <span className="block uppercase text-gray-400 text-sm font-semibold mb-2">Other Resources</span>
                  <ul className="list-unstyled space-y-2">
                    <li><a className="text-gray-300 hover:text-white font-semibold text-sm transition duration-150 ease-in-out" href="#">Terms & Conditions</a></li>
                    <li><a className="text-gray-300 hover:text-white font-semibold text-sm transition duration-150 ease-in-out" href="#">Privacy Policy</a></li>
                    <li><a className="text-gray-300 hover:text-white font-semibold text-sm transition duration-150 ease-in-out" href="#">Contact Us</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-700" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-gray-400 font-semibold py-1">
                © {new Date().getFullYear()} MDS Platform - Debre Markos.
                {/* <a href="#" className="text-gray-300 hover:text-white"> Your Team </a> */}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
