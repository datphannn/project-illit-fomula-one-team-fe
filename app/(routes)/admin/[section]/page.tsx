'use client';

import React, { useState, useMemo } from 'react';
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
  FaFilter,
  FaDownload,
  FaArrowUp,
  FaArrowDown,
} from 'react-icons/fa';

// Mock data for different sections
const sectionData = {
  dashboard: {
    title: 'Dashboard Overview',
    description: 'Key metrics and recent activity',
    stats: {
      totalUsers: 15420,
      pageViews: 450000,
      totalSales: 987,
      serverLoad: '25%',
    },
    trends: {
      totalUsers: 12.5,
      pageViews: 8.3,
      totalSales: 5.8,
      serverLoad: -2.1,
    },
  },
  content: {
    title: 'Content Management',
    description: 'Manage articles, videos, and media content',
    stats: {
      totalArticles: 540,
      pendingReview: 12,
      publishedVideos: 89,
      drafts: 45,
    },
    trends: {
      totalArticles: 5.2,
      pendingReview: -8.7,
      publishedVideos: 15.3,
      drafts: 12.1,
    },
    columns: [
      'ID',
      'Title',
      'Type',
      'Status',
      'Views',
      'Author',
      'Date',
      'Actions',
    ],
    items: [
      {
        id: 1,
        title: 'Verstappen Wins Monaco GP in Thrilling Finish',
        type: 'news',
        status: 'published',
        views: 15420,
        date: '2024-05-26',
        author: 'John Doe',
      },
      {
        id: 2,
        title: 'Ferrari Technical Analysis: New Aerodynamic Package',
        type: 'article',
        status: 'draft',
        views: 0,
        date: '2024-05-25',
        author: 'Sarah Smith',
      },
      {
        id: 3,
        title: 'Summer Break Schedule and Team Updates',
        type: 'schedule',
        status: 'published',
        views: 8920,
        date: '2024-05-24',
        author: 'Mike Johnson',
      },
      {
        id: 4,
        title: 'New Mercedes-AMG Team Merchandise Collection',
        type: 'store',
        status: 'published',
        views: 4320,
        date: '2024-05-23',
        author: 'Admin',
      },
      {
        id: 5,
        title: 'F1 2024 Season Preview and Predictions',
        type: 'article',
        status: 'draft',
        views: 0,
        date: '2024-05-22',
        author: 'Sarah Smith',
      },
    ],
  },
  users: {
    title: 'User Management',
    description: 'Manage users, permissions, and roles',
    stats: {
      total: 15420,
      active: 13250,
      newToday: 45,
      banned: 87,
    },
    trends: {
      total: 12.5,
      active: 8.3,
      newToday: -15.2,
      banned: 3.4,
    },
    columns: [
      'ID',
      'Username',
      'Email',
      'Role',
      'Status',
      'Join Date',
      'Actions',
    ],
    items: [
      {
        id: 1,
        username: 'john_doe',
        email: 'john@example.com',
        role: 'User',
        status: 'Active',
        joindate: '2024-01-15',
        avatar: 'JD',
      },
      {
        id: 2,
        username: 'sarah_smith',
        email: 'sarah@example.com',
        role: 'Premium',
        status: 'Active',
        joindate: '2024-02-20',
        avatar: 'SS',
      },
      {
        id: 3,
        username: 'mike_johnson',
        email: 'mike@example.com',
        role: 'Admin',
        status: 'Active',
        joindate: '2024-03-10',
        avatar: 'MJ',
      },
      {
        id: 4,
        username: 'banned_user',
        email: 'banned@example.com',
        role: 'User',
        status: 'Banned',
        joindate: '2024-04-05',
        avatar: 'BU',
      },
    ],
  },
  schedule: {
    title: 'Race Schedule Management',
    description: 'Manage race calendar, sessions, and timing',
    stats: {
      totalRaces: 24,
      upcoming: 3,
      completed: 18,
      cancelled: 1,
    },
    trends: {
      totalRaces: 0,
      upcoming: 50.0,
      completed: 28.6,
      cancelled: -50.0,
    },
    columns: ['Race', 'Circuit', 'Date', 'Sessions', 'Status', 'Actions'],
    items: [
      {
        id: 1,
        race: 'Monaco Grand Prix',
        circuit: 'Circuit de Monaco',
        date: '2024-05-26',
        sessions: 'FP1, FP2, FP3, Qualifying, Race',
        status: 'Completed',
      },
      {
        id: 2,
        race: 'Canadian Grand Prix',
        circuit: 'Circuit Gilles Villeneuve',
        date: '2024-06-09',
        sessions: 'FP1, FP2, FP3, Qualifying, Race',
        status: 'Upcoming',
      },
      {
        id: 3,
        race: 'Spanish Grand Prix',
        circuit: 'Circuit de Barcelona-Catalunya',
        date: '2024-06-23',
        sessions: 'FP1, FP2, FP3, Qualifying, Race',
        status: 'Upcoming',
      },
    ],
  },
  store: {
    title: 'Store Management',
    description: 'Manage products, inventory, and orders',
    stats: {
      totalProducts: 156,
      lowStock: 8,
      totalOrders: 892,
      revenue: 1254300,
    },
    trends: {
      totalProducts: 12.3,
      lowStock: -25.0,
      totalOrders: 15.2,
      revenue: 18.7,
    },
    columns: [
      'Product',
      'Category',
      'Price',
      'Stock',
      'Status',
      'Sales',
      'Actions',
    ],
    items: [
      {
        id: 1,
        product: 'Red Bull Racing Cap',
        category: 'Headwear',
        price: 35.99,
        stock: 45,
        status: 'In Stock',
        sales: 120,
      },
      {
        id: 2,
        product: 'Ferrari Team Jacket',
        category: 'Apparel',
        price: 89.99,
        stock: 12,
        status: 'Low Stock',
        sales: 67,
      },
      {
        id: 3,
        product: 'Mercedes Polo Shirt',
        category: 'Apparel',
        price: 49.99,
        stock: 0,
        status: 'Out of Stock',
        sales: 89,
      },
    ],
  },
  gaming: {
    title: 'Gaming & Fantasy Management',
    description: 'Manage fantasy leagues, predictions, and gaming content',
    stats: {
      activePlayers: 8420,
      totalLeagues: 156,
      predictions: 28900,
      prizes: 50000,
    },
    trends: {
      activePlayers: 8.4,
      totalLeagues: 12.2,
      predictions: 25.7,
      prizes: 15.0,
    },
    columns: [
      'Game',
      'Type',
      'Participants',
      'Status',
      'Prize Pool',
      'End Date',
      'Actions',
    ],
    items: [
      {
        id: 1,
        game: 'Monaco GP Predictions',
        type: 'Prediction',
        participants: 4200,
        status: 'Active',
        prizepool: 10000,
        enddate: '2024-05-25',
      },
      {
        id: 2,
        game: 'Fantasy League Season',
        type: 'Fantasy',
        participants: 3200,
        status: 'Active',
        prizepool: 25000,
        enddate: '2024-12-15',
      },
    ],
  },
  tickets: {
    title: 'Ticket Sales Management',
    description: 'Manage race tickets, packages, and bookings',
    stats: {
      totalEvents: 24,
      ticketsSold: 89250,
      revenue: 8450000,
      available: 12500,
    },
    trends: {
      totalEvents: 0,
      ticketsSold: 22.5,
      revenue: 18.3,
      available: -15.7,
    },
    columns: [
      'Event',
      'Ticket Type',
      'Price',
      'Sold',
      'Available',
      'Status',
      'Actions',
    ],
    items: [
      {
        id: 1,
        event: 'Monaco Grand Prix',
        tickettype: 'Grandstand',
        price: 450,
        sold: 8500,
        available: 500,
        status: 'Almost Sold Out',
      },
      {
        id: 2,
        event: 'Canadian Grand Prix',
        tickettype: 'General Admission',
        price: 120,
        sold: 12500,
        available: 2500,
        status: 'Available',
      },
    ],
  },
  settings: {
    title: 'System Settings',
    description: 'Configure system preferences and global settings',
    stats: {
      activeModules: 12,
      storageUsed: '2.4GB',
      systemStatus: 'Healthy',
      lastBackup: '2024-05-24',
    },
  },
};

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

type SectionKey = keyof typeof sectionData;

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [notifications, setNotifications] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSection, setCurrentSection] = useState<SectionKey>('content');
  const itemsPerPage = 10;

  const sectionInfo = useMemo(() => {
    return (
      sectionData[currentSection] || {
        title: 'Section Not Found',
        description: 'The requested section does not exist',
        stats: {},
      }
    );
  }, [currentSection]);

  // Filter and search functionality
  const filteredContent = useMemo(() => {
    if (!('items' in sectionInfo)) {
      return [];
    }

    let items = [...sectionInfo.items];

    // Search filter
    if (searchTerm) {
      items = items.filter((item: any) => {
        const searchableFields = Object.values(item).join(' ').toLowerCase();
        return searchableFields.includes(searchTerm.toLowerCase());
      });
    }

    // Type filter (for content section)
    if (currentSection === 'content' && filterType !== 'all') {
      items = items.filter((item: any) => item.type === filterType);
    }

    return items;
  }, [currentSection, sectionInfo, searchTerm, filterType]);

  // Pagination
  const paginatedContent = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredContent.slice(startIndex, endIndex);
  }, [filteredContent, currentPage]);

  const totalPages = Math.ceil(filteredContent.length / itemsPerPage);

  const StatCard = ({ title, value, trend, icon: Icon, color }: any) => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">
            {typeof value === 'number' && value > 1000
              ? value.toLocaleString()
              : value}
          </p>
          {trend !== undefined && (
            <div
              className={`flex items-center gap-1 mt-2 text-sm font-semibold ${
                trend > 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {trend > 0 ? (
                <FaArrowUp className="text-xs" />
              ) : (
                <FaArrowDown className="text-xs" />
              )}
              <span>{Math.abs(trend)}%</span>
              <span className="text-gray-500 font-normal ml-1">
                vs last month
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="text-white text-xl" />
        </div>
      </div>
    </div>
  );

  const handleSectionChange = (section: SectionKey) => {
    setCurrentSection(section);
    setSearchTerm('');
    setFilterType('all');
    setCurrentPage(1);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const handleAction = (action: string, item: any) => {
    const itemName =
      item.title ||
      item.username ||
      item.product ||
      item.game ||
      item.race ||
      item.event ||
      'Item';

    switch (action) {
      case 'view':
        alert(`Viewing: ${itemName}`);
        break;
      case 'edit':
        alert(`Editing: ${itemName}`);
        break;
      case 'delete':
        if (confirm(`Are you sure you want to delete "${itemName}"?`)) {
          alert(`Deleted: ${itemName}`);
        }
        break;
    }
  };

  const handleExport = () => {
    alert('Exporting data...');
  };

  const handleAddNew = () => {
    alert(`Adding new ${currentSection} item...`);
  };

  const renderDashboardContent = () => (
    <>
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-2">
          Welcome back, Admin! 👋
        </h2>
        <p className="text-gray-600 text-sm lg:text-base">
          Here's what's happening with your F1 platform today. You have{' '}
          {notifications} new notifications.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        <StatCard
          title="Total Users"
          value={15420}
          trend={12.5}
          icon={FaUsers}
          color="bg-blue-600"
          onClick={() => handleSectionChange('users')}
        />
        <StatCard
          title="Active Content"
          value={287}
          trend={-3.2}
          icon={FaNewspaper}
          color="bg-green-600"
          onClick={() => handleSectionChange('content')}
        />
        <StatCard
          title="Pending Approvals"
          value={12}
          trend={5.8}
          icon={FaBell}
          color="bg-yellow-600"
        />
        <StatCard
          title="Revenue"
          value="$1,254K"
          trend={8.3}
          icon={FaChartBar}
          color="bg-purple-600"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-4 lg:p-6 shadow-lg mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg lg:text-xl font-bold text-white mb-2">
              Quick Actions
            </h3>
            <p className="text-red-100 text-sm">
              Jump to frequently used sections
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => handleSectionChange('content')}
              className="bg-white text-red-600 hover:bg-red-50 px-3 lg:px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow-lg transition-all duration-200 text-sm lg:text-base"
            >
              <FaPlus /> New Content
            </button>
            <button
              onClick={() => handleSectionChange('users')}
              className="bg-white/10 text-white hover:bg-white/20 px-3 lg:px-4 py-2 rounded-lg font-semibold flex items-center gap-2 backdrop-blur-sm transition-all duration-200 text-sm lg:text-base"
            >
              <FaUsers /> Manage Users
            </button>
            <button
              onClick={() => handleSectionChange('schedule')}
              className="bg-white/10 text-white hover:bg-white/20 px-3 lg:px-4 py-2 rounded-lg font-semibold flex items-center gap-2 backdrop-blur-sm transition-all duration-200 text-sm lg:text-base"
            >
              <FaCalendar /> Schedule
            </button>
            <button
              onClick={() => handleSectionChange('store')}
              className="bg-white/10 text-white hover:bg-white/20 px-3 lg:px-4 py-2 rounded-lg font-semibold flex items-center gap-2 backdrop-blur-sm transition-all duration-200 text-sm lg:text-base"
            >
              <FaStore /> Store
            </button>
          </div>
        </div>
      </div>
    </>
  );

  const renderSectionContent = () => {
    if (currentSection === 'dashboard') {
      return renderDashboardContent();
    }

    const data = sectionData[currentSection];

    return (
      <div className="space-y-6">
        {/* Stats Grid */}
        {'stats' in data && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(data.stats).map(([key, value], index) => {
              const colors = [
                'bg-red-600',
                'bg-blue-600',
                'bg-green-600',
                'bg-yellow-600',
              ];
              const icons = [FaChartBar, FaCalendar, FaBell, FaUsers];
              const titles: Record<string, string> = {
                total: 'Total',
                active: 'Active',
                newToday: 'New Today',
                banned: 'Banned',
                totalRaces: 'Total Races',
                upcoming: 'Upcoming',
                completed: 'Completed',
                cancelled: 'Cancelled',
                totalProducts: 'Products',
                lowStock: 'Low Stock',
                totalOrders: 'Total Orders',
                revenue: 'Revenue',
                activePlayers: 'Active Players',
                totalLeagues: 'Total Leagues',
                predictions: 'Predictions',
                prizes: 'Prize Pool',
                totalEvents: 'Total Events',
                ticketsSold: 'Tickets Sold',
                available: 'Available',
                activeModules: 'Active Modules',
                storageUsed: 'Storage Used',
                systemStatus: 'System Status',
                lastBackup: 'Last Backup',
                totalUsers: 'Total Users',
                pageViews: 'Page Views',
                totalSales: 'Total Sales',
                serverLoad: 'Server Load',
                totalArticles: 'Total Articles',
                pendingReview: 'Pending Review',
                publishedVideos: 'Published Videos',
                drafts: 'Drafts',
              };

              const trendData = (data as any).trends;
              const trend = trendData ? trendData[key] : undefined;

              return (
                <StatCard
                  key={key}
                  title={titles[key] || key}
                  value={
                    key === 'revenue' || key === 'prizes'
                      ? `$${Number(value).toLocaleString()}`
                      : typeof value === 'number'
                        ? value.toLocaleString()
                        : value
                  }
                  trend={trend}
                  icon={icons[index % icons.length]}
                  color={colors[index % colors.length]}
                />
              );
            })}
          </div>
        )}

        {/* Data Table */}
        {'items' in data && (
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {data.title} List
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Manage and review all {currentSection} items
                </p>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder={`Search ${currentSection}...`}
                    value={searchTerm}
                    onChange={e => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
                  />
                </div>
                {currentSection === 'content' && (
                  <select
                    value={filterType}
                    onChange={e => {
                      setFilterType(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="all">All Types</option>
                    <option value="news">News</option>
                    <option value="article">Article</option>
                    <option value="schedule">Schedule</option>
                    <option value="store">Store</option>
                    <option value="gaming">Gaming</option>
                  </select>
                )}
                <button
                  onClick={handleExport}
                  className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <FaDownload />
                  Export
                </button>
                <button
                  onClick={handleAddNew}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow-md shadow-red-500/30 transition-all duration-200"
                >
                  <FaPlus />
                  Add New
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full min-w-max">
                <thead className="bg-gray-50">
                  <tr>
                    {data.columns.map((column: string) => (
                      <th
                        key={column}
                        className="text-left py-3 px-4 text-sm font-bold text-gray-700 uppercase tracking-wider border-b border-gray-200"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginatedContent.length > 0 ? (
                    paginatedContent.map((item: any) => (
                      <tr
                        key={item.id}
                        className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors"
                      >
                        {data.columns.map((column: string) => {
                          const key = column.toLowerCase().replace(/\s+/g, '');
                          const value = item[key];

                          if (column === 'Actions') {
                            return (
                              <td key={column} className="py-3 px-4">
                                <div className="flex items-center gap-2">
                                  <button
                                    className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                                    onClick={() => handleAction('view', item)}
                                    title="View"
                                  >
                                    <FaEye />
                                  </button>
                                  <button
                                    className="p-1 text-green-600 hover:text-green-800 transition-colors"
                                    onClick={() => handleAction('edit', item)}
                                    title="Edit"
                                  >
                                    <FaEdit />
                                  </button>
                                  <button
                                    className="p-1 text-red-600 hover:text-red-800 transition-colors"
                                    onClick={() => handleAction('delete', item)}
                                    title="Delete"
                                  >
                                    <FaTrash />
                                  </button>
                                </div>
                              </td>
                            );
                          }

                          if (column === 'Status') {
                            const statusColors: Record<string, string> = {
                              published: 'bg-green-100 text-green-800',
                              draft: 'bg-yellow-100 text-yellow-800',
                              Active: 'bg-green-100 text-green-800',
                              Banned: 'bg-red-100 text-red-800',
                              Completed: 'bg-blue-100 text-blue-800',
                              Upcoming: 'bg-yellow-100 text-yellow-800',
                              'In Stock': 'bg-green-100 text-green-800',
                              'Low Stock': 'bg-orange-100 text-orange-800',
                              'Out of Stock': 'bg-red-100 text-red-800',
                              'Almost Sold Out': 'bg-red-100 text-red-800',
                              Available: 'bg-green-100 text-green-800',
                            };

                            return (
                              <td key={column} className="py-3 px-4">
                                <span
                                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                                    statusColors[item.status] ||
                                    'bg-gray-100 text-gray-800'
                                  }`}
                                >
                                  {item.status}
                                </span>
                              </td>
                            );
                          }

                          if (column === 'Username' && item.avatar) {
                            return (
                              <td key={column} className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                                    {item.avatar}
                                  </div>
                                  <span className="text-sm text-gray-900">
                                    {value}
                                  </span>
                                </div>
                              </td>
                            );
                          }

                          // Format prices and numbers
                          const displayValue =
                            key.includes('price') && typeof value === 'number'
                              ? `$${value.toFixed(2)}`
                              : typeof value === 'number' && key !== 'id'
                                ? value.toLocaleString()
                                : value || '-';

                          return (
                            <td
                              key={column}
                              className="py-3 px-4 text-sm text-gray-800"
                            >
                              {displayValue}
                            </td>
                          );
                        })}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={data.columns.length}
                        className="py-8 px-4 text-center text-gray-500"
                      >
                        No items found. Try adjusting your search or filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setCurrentPage(prev => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() =>
                      setCurrentPage(prev => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
              >
                <FaBars className="text-gray-600" />
              </button>
              <h1 className="text-2xl font-extrabold text-red-600">
                F1 Admin Dashboard
              </h1>
              <span className="text-gray-500 font-light">/</span>
              <span className="text-lg font-semibold text-gray-700 capitalize">
                {currentSection}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 w-64"
                />
              </div>
              <button
                className="relative p-2 text-gray-600 hover:text-red-600 transition-colors"
                onClick={() => setNotifications(0)}
                title="Notifications"
              >
                <FaBell />
                {notifications > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
                )}
              </button>
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0 cursor-pointer hover:bg-red-700 transition-colors">
                A
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div
          className={`hidden lg:block h-[calc(100vh-73px)] sticky top-[73px] overflow-y-auto z-20 
          bg-white border-r border-gray-200 transition-all duration-300 flex-shrink-0
          ${sidebarOpen ? 'w-64' : 'w-20'}`}
        >
          <div className="p-4 space-y-2">
            {navigationItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleSectionChange(item.id as SectionKey)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 whitespace-nowrap overflow-hidden group ${
                  currentSection === item.id
                    ? 'bg-red-600 text-white shadow-md shadow-red-500/20'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-red-600'
                }`}
                title={!sidebarOpen ? item.label : undefined}
              >
                <item.icon
                  className={`${currentSection === item.id ? 'text-white' : 'text-gray-500 group-hover:text-red-600'} transition-colors flex-shrink-0`}
                />
                <span
                  className={`${sidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'} transition-all duration-300 font-medium`}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 transition-all duration-300 min-h-[calc(100vh-73px)]">
          {/* Section Header */}
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold text-gray-900">
              {sectionInfo.title}
            </h2>
            <p className="text-gray-600 mt-1">{sectionInfo.description}</p>
          </div>

          {renderSectionContent()}
        </div>
      </div>
    </div>
  );
}
