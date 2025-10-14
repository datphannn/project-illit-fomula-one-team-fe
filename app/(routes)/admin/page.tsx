// app/[locale]/admin/page.tsx
'use client';

import React, { useState } from 'react';
import {
  FaUsers,
  FaNewspaper,
  FaCalendar,
  FaChartBar,
  FaCog,
  FaBell,
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaTachometerAlt,
  FaTicketAlt,
  FaStore,
  FaGamepad,
  FaBars,
} from 'react-icons/fa';

// Mock data
const mockStats = {
  totalUsers: 15420,
  activeContent: 287,
  pendingApprovals: 12,
  revenue: 1254300,
};

const mockRecentActivities = [
  {
    id: 1,
    action: 'New article published',
    user: 'John Doe',
    time: '2 minutes ago',
    type: 'news',
  },
  {
    id: 2,
    action: 'User registration',
    user: 'Sarah Smith',
    time: '5 minutes ago',
    type: 'user',
  },
  {
    id: 3,
    action: 'Race result updated',
    user: 'Mike Johnson',
    time: '1 hour ago',
    type: 'schedule',
  },
  {
    id: 4,
    action: 'Product added to store',
    user: 'Admin',
    time: '2 hours ago',
    type: 'store',
  },
];

const mockContent = [
  {
    id: 1,
    title: 'Verstappen Wins Monaco GP',
    type: 'news',
    status: 'published',
    views: 15420,
    date: '2024-05-26',
  },
  {
    id: 2,
    title: 'Ferrari Technical Analysis',
    type: 'article',
    status: 'draft',
    views: 0,
    date: '2024-05-25',
  },
  {
    id: 3,
    title: 'Summer Break Schedule',
    type: 'schedule',
    status: 'published',
    views: 8920,
    date: '2024-05-24',
  },
  {
    id: 4,
    title: 'New Team Merchandise',
    type: 'store',
    status: 'published',
    views: 4320,
    date: '2024-05-23',
  },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
            {value.toLocaleString()}
          </p>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="text-white text-xl" />
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={mockStats.totalUsers}
          icon={FaUsers}
          color="bg-blue-500"
        />
        <StatCard
          title="Active Content"
          value={mockStats.activeContent}
          icon={FaNewspaper}
          color="bg-green-500"
        />
        <StatCard
          title="Pending Approvals"
          value={mockStats.pendingApprovals}
          icon={FaBell}
          color="bg-yellow-500"
        />
        <StatCard
          title="Revenue"
          value={`$${mockStats.revenue.toLocaleString()}`}
          icon={FaChartBar}
          color="bg-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {mockRecentActivities.map(activity => (
              <div
                key={activity.id}
                className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    activity.type === 'news'
                      ? 'bg-blue-500'
                      : activity.type === 'user'
                        ? 'bg-green-500'
                        : activity.type === 'schedule'
                          ? 'bg-yellow-500'
                          : 'bg-purple-500'
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    by {activity.user} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Management */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Content
            </h3>
            <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm font-semibold flex items-center gap-2">
              <FaPlus className="text-xs" />
              New Content
            </button>
          </div>
          <div className="space-y-3">
            {mockContent.map(item => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        item.status === 'published'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}
                    >
                      {item.status}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {item.type}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {item.views} views
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                    <FaEye />
                  </button>
                  <button className="p-1 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300">
                    <FaEdit />
                  </button>
                  <button className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContentManagement = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Content Management
        </h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search content..."
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <select className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500">
            <option>All Types</option>
            <option>News</option>
            <option>Articles</option>
            <option>Schedule</option>
            <option>Store</option>
          </select>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2">
            <FaPlus />
            Add New
          </button>
        </div>
      </div>

      {/* Content Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-600">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                Title
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                Type
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                Status
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                Views
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                Date
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {mockContent.map(item => (
              <tr
                key={item.id}
                className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                  {item.title}
                </td>
                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400 capitalize">
                  {item.type}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      item.status === 'published'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                  {item.views.toLocaleString()}
                </td>
                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                  {item.date}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <button className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                      <FaEye />
                    </button>
                    <button className="p-1 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300">
                      <FaEdit />
                    </button>
                    <button className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FaTachometerAlt },
    { id: 'content', label: 'Content Management', icon: FaNewspaper },
    { id: 'users', label: 'User Management', icon: FaUsers },
    { id: 'schedule', label: 'Race Schedule', icon: FaCalendar },
    { id: 'store', label: 'Store Management', icon: FaStore },
    { id: 'gaming', label: 'Gaming & Fantasy', icon: FaGamepad },
    { id: 'tickets', label: 'Ticket Sales', icon: FaTicketAlt },
    { id: 'settings', label: 'Settings', icon: FaCog },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Navigation */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaBars className="text-gray-600 dark:text-gray-400" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Admin Panel
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <FaBell />
              </button>
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold">
                A
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
            sidebarOpen ? 'w-64' : 'w-0 lg:w-20'
          }`}
        >
          <div className="p-4 space-y-2">
            {navigationItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? 'bg-red-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'content' && renderContentManagement()}
          {activeTab === 'users' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                User Management
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                User management content coming soon...
              </p>
            </div>
          )}
          {activeTab === 'schedule' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Race Schedule Management
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Race schedule management content coming soon...
              </p>
            </div>
          )}
          {activeTab === 'store' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Store Management
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Store management content coming soon...
              </p>
            </div>
          )}
          {activeTab === 'gaming' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Gaming & Fantasy Management
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Gaming and fantasy management content coming soon...
              </p>
            </div>
          )}
          {activeTab === 'tickets' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Ticket Sales Management
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Ticket sales management content coming soon...
              </p>
            </div>
          )}
          {activeTab === 'settings' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Settings
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Settings panel content coming soon...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
