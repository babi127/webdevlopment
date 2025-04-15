import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Truck,
  Settings,
  Bell,
  UserCircle,
  ChevronDown,
  AreaChart,
  Table,
  Package, // Added for consistency
  Menu, // For mobile toggle
  X // For mobile toggle
} from 'lucide-react';

// Main App component (acts as a simple router/container)
// In a real app, this would likely be part of a larger routing setup
// protected by authentication.
export default function App() {
  // For demonstration, we directly render the AdminDashboard.
  return <AdminDashboard />;
}

// Admin Dashboard Component
function AdminDashboard() {
  // State to track the active dashboard section
  const [activeSection, setActiveSection] = useState('overview');
  // State for mobile sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to render the content based on the active section
  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection />;
      case 'users':
        return <UsersSection />;
      case 'deliveries':
        return <DeliveriesSection />;
      case 'settings':
        return <SettingsSection />;
      default:
        return <OverviewSection />;
    }
  };

  // Sidebar navigation items
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'users', label: 'Manage Users', icon: Users },
    { id: 'deliveries', label: 'Manage Deliveries', icon: Truck },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className={`absolute md:relative z-20 flex-shrink-0 w-64 h-full bg-white border-r border-gray-200 shadow-md md:shadow-none transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
             <div className="flex items-center">
                <Package className="h-8 w-8 text-indigo-600 mr-2" />
                <span className="text-xl font-bold text-gray-800">MDS Admin</span>
             </div>
             {/* Close button for mobile */}
             <button
                onClick={() => setIsSidebarOpen(false)}
                className="md:hidden p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
             >
                <X className="h-6 w-6" />
             </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 mt-4 px-2 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsSidebarOpen(false); // Close sidebar on mobile after selection
                }}
                className={`w-full flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out group ${
                  activeSection === item.id
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <item.icon className={`mr-3 h-5 w-5 ${
                  activeSection === item.id ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-500'
                }`} />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Sidebar Footer (Optional) */}
          <div className="mt-auto p-4 border-t border-gray-200">
            {/* Can add logout or profile link here */}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Bar */}
        <header className="flex items-center justify-between h-16 px-4 md:px-6 bg-white border-b border-gray-200 shadow-sm">
          {/* Mobile Menu Toggle */}
           <button
             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
             className="md:hidden p-1 mr-4 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
           >
             <Menu className="h-6 w-6" />
           </button>

          {/* Placeholder for Search or Title */}
           <div className="flex-1">
              <h1 className="text-lg font-semibold text-gray-700 capitalize">{activeSection}</h1>
           </div>


          {/* Right side icons/profile */}
          <div className="flex items-center space-x-4">
            <button className="p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <Bell className="h-6 w-6" />
            </button>
            {/* Profile Dropdown Placeholder */}
            <div className="relative">
              <button className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <UserCircle className="h-8 w-8 text-gray-600" />
                <span className="hidden md:inline text-sm font-medium text-gray-700">Admin Name</span>
                <ChevronDown className="hidden md:inline h-4 w-4 text-gray-500" />
              </button>
              {/* Dropdown menu would go here */}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-6 lg:p-8">
          {/* Render the active section's content */}
          {renderSection()}
        </main>
      </div>
    </div>
  );
}

// --- Placeholder Section Components ---

// Overview Section Component (Placeholder)
function OverviewSection() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard Overview</h2>
      {/* Grid for summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Example Summary Card 1 */}
        <div className="bg-white p-5 rounded-lg shadow hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase">Total Users</p>
              <p className="text-2xl font-bold text-gray-800">1,234</p>
            </div>
            <div className="bg-indigo-100 p-2 rounded-full">
              <Users className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
        </div>
        {/* Example Summary Card 2 */}
        <div className="bg-white p-5 rounded-lg shadow hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase">Active Deliveries</p>
              <p className="text-2xl font-bold text-gray-800">56</p>
            </div>
            <div className="bg-green-100 p-2 rounded-full">
              <Truck className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        {/* Add more summary cards as needed */}
         <div className="bg-white p-5 rounded-lg shadow hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase">Completed Orders</p>
              <p className="text-2xl font-bold text-gray-800">8,910</p>
            </div>
            <div className="bg-blue-100 p-2 rounded-full">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
         <div className="bg-white p-5 rounded-lg shadow hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase">Issues Reported</p>
              <p className="text-2xl font-bold text-gray-800">3</p>
            </div>
            <div className="bg-red-100 p-2 rounded-full">
              <Bell className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder for Charts */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Delivery Statistics</h3>
        <div className="h-64 flex items-center justify-center text-gray-400">
          <AreaChart className="h-16 w-16 mr-2" /> Chart Placeholder
        </div>
      </div>
    </div>
  );
}

// Users Section Component (Placeholder)
function UsersSection() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Manage Users</h2>
      {/* Add filters/search and Add User button here */}
      <div className="mb-4 flex justify-between items-center">
         <input type="search" placeholder="Search users..." className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
         <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm font-medium flex items-center shadow-sm hover:shadow">
            <Users className="h-4 w-4 mr-1" /> Add User
         </button>
      </div>
      {/* Placeholder for Users Table */}
      <div className="bg-white p-6 rounded-lg shadow overflow-x-auto">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">User List</h3>
        <div className="min-w-full h-64 flex items-center justify-center text-gray-400 border border-dashed border-gray-300 rounded-md">
          <Table className="h-16 w-16 mr-2" /> User Table Placeholder
        </div>
        {/* Add pagination controls here */}
      </div>
    </div>
  );
}

// Deliveries Section Component (Placeholder)
function DeliveriesSection() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Manage Deliveries</h2>
      {/* Add filters/search here */}
       <div className="mb-4">
         <input type="search" placeholder="Search deliveries by ID, customer, rider..." className="w-full md:w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
         {/* Add date pickers or status filters if needed */}
      </div>
      {/* Placeholder for Deliveries Table */}
      <div className="bg-white p-6 rounded-lg shadow overflow-x-auto">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Delivery List</h3>
        <div className="min-w-full h-64 flex items-center justify-center text-gray-400 border border-dashed border-gray-300 rounded-md">
          <Table className="h-16 w-16 mr-2" /> Delivery Table Placeholder
        </div>
         {/* Add pagination controls here */}
      </div>
    </div>
  );
}

// Settings Section Component (Placeholder)
function SettingsSection() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Settings</h2>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">System Settings</h3>
        <div className="space-y-4 text-gray-600">
          <p>Placeholder for various system configuration options:</p>
          <ul className="list-disc list-inside">
            <li>Delivery fee configuration</li>
            <li>Notification settings</li>
            <li>Admin account management</li>
            <li>API Keys (if applicable)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
