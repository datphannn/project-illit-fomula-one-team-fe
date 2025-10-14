'use client';

import React, { useState, useMemo } from 'react';
// Đảm bảo import useRouter từ Next.js App Router
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
  FaUpload, // Giữ lại FaUpload dù không dùng
} from 'react-icons/fa';

// Mock data for different sections (UNCHANGED)
const sectionData = {
  users: {
    title: 'User Management',
    description: 'Manage users, permissions, and roles',
    stats: {
      total: 15420,
      active: 13250,
      newToday: 45,
      banned: 87,
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
        joinDate: '2024-01-15',
        avatar: 'JD',
      },
      {
        id: 2,
        username: 'sarah_smith',
        email: 'sarah@example.com',
        role: 'Premium',
        status: 'Active',
        joinDate: '2024-02-20',
        avatar: 'SS',
      },
      {
        id: 3,
        username: 'mike_johnson',
        email: 'mike@example.com',
        role: 'Admin',
        status: 'Active',
        joinDate: '2024-03-10',
        avatar: 'MJ',
      },
      {
        id: 4,
        username: 'banned_user',
        email: 'banned@example.com',
        role: 'User',
        status: 'Banned',
        joinDate: '2024-04-05',
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
        prizePool: 10000,
        endDate: '2024-05-25',
      },
      {
        id: 2,
        game: 'Fantasy League Season',
        type: 'Fantasy',
        participants: 3200,
        status: 'Active',
        prizePool: 25000,
        endDate: '2024-12-15',
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
        ticketType: 'Grandstand',
        price: 450,
        sold: 8500,
        available: 500,
        status: 'Almost Sold Out',
      },
      {
        id: 2,
        event: 'Canadian Grand Prix',
        ticketType: 'General Admission',
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
  // Thêm mock data cho dashboard và content để không bị lỗi
  dashboard: {
    title: 'Dashboard Overview',
    description: 'Key metrics and recent activity',
    stats: {
      totalUsers: 15420,
      pageViews: 450000,
      totalSales: 987,
      serverLoad: '25%',
    },
  },
  content: {
    title: 'Content Management',
    description: 'Manage articles, videos, and media',
    stats: {
      totalArticles: 540,
      pendingReview: 12,
      publishedVideos: 89,
      drafts: 45,
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

interface SectionPageProps {
  params: {
    locale: string;
    section: SectionKey | string;
  };
}

export default function SectionPage({ params }: SectionPageProps) {
  // Đã sửa lỗi: Lấy locale từ params để dùng trong router.push
  const { section, locale } = params;
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // SỬA LỖI LOGIC: Không cần activeTab state, dùng trực tiếp params.section
  const currentSectionKey: SectionKey | string = section;

  // Lấy data sử dụng useMemo để tránh re-calculation
  const sectionInfo = useMemo(() => {
    return (
      sectionData[currentSectionKey as SectionKey] || {
        title: 'Section Not Found',
        description: 'The requested section does not exist',
      }
    );
  }, [currentSectionKey]);

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-shadow duration-300 hover:shadow-xl hover:shadow-red-500/10">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
        </div>
        <div className={`p-3 rounded-lg ${color} bg-opacity-80`}>
          <Icon className="text-white text-xl" />
        </div>
      </div>
    </div>
  );

  const handleSidebarClick = (id: string) => {
    // SỬA LỖI LOGIC: Sử dụng router.push để thay đổi URL và đồng bộ trạng thái
    router.push(`/${locale}/admin/${id}`);
    if (window.innerWidth < 1024) {
      // Đóng sidebar trên mobile
      setSidebarOpen(false);
    }
  };

  const renderSectionContent = () => {
    if (!sectionData[currentSectionKey as SectionKey]) {
      return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Section Not Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              The requested admin section **{section}** does not exist.
            </p>
          </div>
        </div>
      );
    }

    // Dữ liệu đã được kiểm tra an toàn ở trên
    const data = sectionData[currentSectionKey as SectionKey];

    return (
      <div className="space-y-6">
        {/* Stats Grid */}
        {'stats' in data && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(data.stats).map(([key, value], index) => {
              const colors = [
                'bg-red-600', // Red for primary actions
                'bg-blue-600', // Blue
                'bg-green-600', // Green
                'bg-yellow-600', // Yellow
              ];
              const icons = [FaChartBar, FaCalendar, FaBell, FaUsers];
              const titles = {
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

              return (
                <StatCard
                  key={key}
                  title={titles[key as keyof typeof titles] || key}
                  value={
                    key === 'revenue'
                      ? `$${Number(value).toLocaleString()}`
                      : key === 'prizes'
                        ? `$${Number(value).toLocaleString()}`
                        : key === 'ticketsSold' ||
                            key === 'revenue' ||
                            key === 'totalSales'
                          ? `$${Number(value).toLocaleString()}`
                          : value
                  }
                  icon={icons[index % icons.length]}
                  color={colors[index % colors.length]}
                />
              );
            })}
          </div>
        )}

        {/* Data Table */}
        {'items' in data && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {data.title} List
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Manage and review all {section} items
                </p>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder={`Search ${section}...`}
                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
                  />
                </div>
                <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <FaFilter />
                  Filter
                </button>
                <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <FaDownload />
                  Export
                </button>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow-md shadow-red-500/30 transition-all duration-200 hover:shadow-lg">
                  <FaPlus />
                  Add New
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
              <table className="w-full min-w-max">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    {data.columns.map((column: string) => (
                      <th
                        key={column}
                        className="text-left py-3 px-4 text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((item: any) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-200 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      {data.columns.map((column: string) => {
                        const key = column.toLowerCase().replace(' ', '');
                        const value = item[key];

                        if (column === 'Actions') {
                          return (
                            <td key={column} className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <button className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                                  <FaEye />
                                </button>
                                <button className="p-1 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 transition-colors">
                                  <FaEdit />
                                </button>
                                <button className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors">
                                  <FaTrash />
                                </button>
                              </div>
                            </td>
                          );
                        }

                        if (column === 'Status') {
                          const statusColors = {
                            Active:
                              'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
                            Banned:
                              'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
                            Completed:
                              'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
                            Upcoming:
                              'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
                            'In Stock':
                              'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
                            'Low Stock':
                              'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
                            'Out of Stock':
                              'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
                            'Almost Sold Out':
                              'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
                            Available:
                              'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
                          };

                          return (
                            <td key={column} className="py-3 px-4">
                              <span
                                className={`text-xs font-medium px-2 py-1 rounded-full ${
                                  statusColors[
                                    item.status as keyof typeof statusColors
                                  ] ||
                                  'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
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
                                <span className="text-sm text-gray-900 dark:text-white">
                                  {item[key]}
                                </span>
                              </div>
                            </td>
                          );
                        }

                        // Định dạng giá tiền
                        const displayValue =
                          key.includes('price') && typeof value === 'number'
                            ? `$${value.toFixed(2)}`
                            : typeof value === 'number' && key !== 'id'
                              ? value.toLocaleString()
                              : value;

                        return (
                          <td
                            key={column}
                            className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300"
                          >
                            {displayValue}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Settings Section */}
        {section === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                General Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Site Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-shadow"
                    placeholder="Enter site name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Admin Email
                  </label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-shadow"
                    placeholder="admin@example.com"
                  />
                </div>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md shadow-red-500/30 transition-all duration-200">
                  Save Settings
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                System Information
              </h3>
              <div className="space-y-3">
                {Object.entries(data.stats).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600 last:border-b-0"
                  >
                    <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}:
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {typeof value === 'number'
                        ? value.toLocaleString()
                        : String(value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Navigation */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <FaBars className="text-gray-600 dark:text-gray-400" />
              </button>
              <h1 className="text-2xl font-extrabold text-red-600 dark:text-red-400">
                F1 Admin
              </h1>
              <span className="text-gray-500 dark:text-gray-400 font-light hidden sm:inline">
                /
              </span>
              <span className="text-lg font-semibold text-gray-700 dark:text-gray-300 capitalize">
                {section}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative hidden sm:block">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
                />
              </div>
              <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                <FaBell />
              </button>
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                A
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`h-screen sticky top-[4.5rem] overflow-y-auto z-20 
          bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex-shrink-0
          ${sidebarOpen ? 'w-64' : 'w-0 -ml-16 lg:w-20 lg:ml-0'}`}
        >
          <div className="p-4 space-y-2">
            {navigationItems.map(item => (
              <button
                key={item.id}
                // SỬ DỤNG currentSectionKey (từ params) để kiểm tra active
                onClick={() => handleSidebarClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors whitespace-nowrap overflow-hidden ${
                  currentSectionKey === item.id
                    ? 'bg-red-600 text-white shadow-md shadow-red-500/20'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                title={!sidebarOpen ? item.label : undefined}
              >
                <item.icon />
                <span
                  className={`${sidebarOpen ? 'opacity-100' : 'opacity-0 lg:hidden'}`}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 transition-all duration-300">
          {/* Section Header */}
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              {sectionInfo.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {sectionInfo.description}
            </p>
          </div>

          {renderSectionContent()}
        </div>
      </div>
    </div>
  );
}
