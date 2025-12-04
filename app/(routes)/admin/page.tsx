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
  FaTimes,
  FaSave,
  FaUserCircle,
  FaSignOutAlt,
  FaHome,
  FaTag,
  FaFolder,
  FaShoppingCart,
  FaTruck,
  FaCreditCard,
  FaBox,
  FaShoppingBag,
  FaImage,
  FaList,
  FaCheckCircle,
  FaTimesCircle,
  FaPercent,
  FaCalendarAlt,
  FaLink,
  FaToggleOn,
  FaToggleOff,
  FaUpload,
  FaEyeSlash,
  FaStar,
  FaDollarSign,
  FaHashtag,
  FaTextHeight,
  FaSortAmountDown,
  FaRegClock,
  FaGlobe,
  FaUserLock,
  FaFileAlt,
} from 'react-icons/fa';
import Link from 'next/link';

// Extended mock data with shop management modules
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
    description: 'Manage articles, stories, and media content',
    stats: {
      totalStories: 540,
      pendingReview: 12,
      publishedVideos: 89,
      drafts: 45,
    },
    trends: {
      totalStories: 5.2,
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
    ],
  },
  stories: {
    title: 'Stories Management',
    description: 'Manage F1 stories and articles',
    stats: {
      totalStories: 156,
      featured: 12,
      pending: 8,
      published: 145,
    },
    trends: {
      totalStories: 12.3,
      featured: 25.0,
      pending: -15.2,
      published: 18.7,
    },
    columns: [
      'ID',
      'Title',
      'Category',
      'Published',
      'Author',
      'Read Time',
      'Status',
      'Actions',
    ],
    items: [
      {
        id: 1,
        title: 'Verstappen Dominates Monaco GP',
        category: 'Race Report',
        published: '2024-05-26',
        author: 'John Doe',
        readTime: '5 min',
        status: 'Published',
      },
      {
        id: 2,
        title: 'Ferrari Technical Upgrades',
        category: 'Technical',
        published: '2024-05-25',
        author: 'Sarah Smith',
        readTime: '4 min',
        status: 'Published',
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
  // Shop Management Modules
  brands: {
    title: 'Brand Management',
    description: 'Manage product brands and logos',
    stats: {
      totalBrands: 45,
      activeBrands: 38,
      brandsWithLogo: 32,
      newThisMonth: 5,
    },
    trends: {
      totalBrands: 8.2,
      activeBrands: 5.7,
      brandsWithLogo: 12.3,
      newThisMonth: 25.0,
    },
    columns: [
      'ID',
      'Logo',
      'Brand Name',
      'Description',
      'Products',
      'Status',
      'Actions',
    ],
    fields: [
      {
        name: 'Brand Name',
        db: 'name',
        type: 'text',
        required: true,
        note: 'Required',
      },
      {
        name: 'Logo',
        db: 'logo_url',
        type: 'image',
        required: false,
        note: 'Allow single image upload. Show preview after upload',
      },
      {
        name: 'Description',
        db: 'description',
        type: 'textarea',
        required: false,
        note: 'Short introduction about the brand',
      },
    ],
    items: [
      {
        id: 1,
        name: 'Nike',
        logo_url: 'https://via.placeholder.com/100x40/FF6B6B/FFFFFF?text=Nike',
        description: 'World leading sports brand',
        product_count: 156,
        status: 'active',
      },
      {
        id: 2,
        name: 'Adidas',
        logo_url:
          'https://via.placeholder.com/100x40/4ECDC4/FFFFFF?text=Adidas',
        description: 'Three stripes sports fashion',
        product_count: 89,
        status: 'active',
      },
    ],
  },
  categories: {
    title: 'Category Management',
    description: 'Manage product categories and hierarchy',
    stats: {
      totalCategories: 28,
      activeCategories: 24,
      rootCategories: 6,
      subCategories: 22,
    },
    trends: {
      totalCategories: 12.5,
      activeCategories: 8.3,
      rootCategories: 0,
      subCategories: 18.7,
    },
    columns: [
      'ID',
      'Image',
      'Category Name',
      'Slug',
      'Parent',
      'Products',
      'Status',
      'Actions',
    ],
    fields: [
      {
        name: 'Category Name',
        db: 'name',
        type: 'text',
        required: true,
        note: 'Required',
      },
      {
        name: 'Slug',
        db: 'slug',
        type: 'text',
        required: false,
        note: 'Auto-generate from name, allow manual edit',
      },
      {
        name: 'Parent Category',
        db: 'parent_id',
        type: 'select',
        required: false,
        note: 'Select box loads category list. Empty = root category',
      },
      {
        name: 'Thumbnail',
        db: 'image_url',
        type: 'image',
        required: false,
        note: 'Display thumbnail on Menu/homepage',
      },
      {
        name: 'Status',
        db: 'is_active',
        type: 'toggle',
        required: false,
        note: 'Default: On. Off = hidden from website',
      },
      {
        name: 'Description',
        db: 'description',
        type: 'textarea',
        required: false,
        note: 'Good for SEO',
      },
    ],
    items: [
      {
        id: 1,
        name: "Men's Shirts",
        slug: 'mens-shirts',
        parent_id: null,
        parent_name: null,
        image_url: 'https://via.placeholder.com/40/FF6B6B/FFFFFF?text=Shirt',
        product_count: 156,
        is_active: true,
        description: 'Men fashion shirts category',
      },
      {
        id: 2,
        name: 'T-Shirts',
        slug: 't-shirts',
        parent_id: 1,
        parent_name: "Men's Shirts",
        image_url: 'https://via.placeholder.com/40/4ECDC4/FFFFFF?text=T-Shirt',
        product_count: 78,
        is_active: true,
        description: 'Various types of T-shirts',
      },
    ],
  },
  products: {
    title: 'Product Management',
    description: 'Manage products, pricing and inventory',
    stats: {
      totalProducts: 1560,
      activeProducts: 1420,
      outOfStock: 45,
      lowStock: 87,
      featuredProducts: 56,
    },
    trends: {
      totalProducts: 15.2,
      activeProducts: 12.8,
      outOfStock: -8.3,
      lowStock: 5.6,
      featuredProducts: 25.0,
    },
    columns: [
      'ID',
      'Image',
      'Product Name',
      'Slug',
      'Brand',
      'Categories',
      'Price',
      'Stock',
      'Status',
      'Featured',
      'Actions',
    ],
    fields: [
      {
        name: 'Product Name',
        db: 'name',
        type: 'text',
        required: true,
        note: 'Required',
      },
      {
        name: 'Slug',
        db: 'slug',
        type: 'text',
        required: false,
        note: 'Auto-generate from name',
      },
      {
        name: 'Brand',
        db: 'brand_id',
        type: 'select',
        required: false,
        note: 'Load from Brand table',
      },
      {
        name: 'Categories',
        db: 'category_id',
        type: 'multiselect',
        required: false,
        note: 'One product can belong to multiple categories',
      },
      {
        name: 'Base Price',
        db: 'base_price',
        type: 'number',
        required: true,
        note: 'Display reference price (price before sale)',
      },
      {
        name: 'Description',
        db: 'description',
        type: 'richtext',
        required: false,
        note: 'Need editor (CKEditor/Quill) to insert images',
      },
      {
        name: 'Status',
        db: 'is_active',
        type: 'toggle',
        required: false,
        note: 'Hide/Show product',
      },
      {
        name: 'Featured',
        db: 'is_featured',
        type: 'toggle',
        required: false,
        note: 'Show on homepage (Hot section)',
      },
      {
        name: 'Stock',
        db: 'stock',
        type: 'number',
        required: false,
        note: 'Inventory quantity',
      },
    ],
    items: [
      {
        id: 1,
        name: 'Nike Sport Pro T-Shirt',
        slug: 'nike-sport-pro-t-shirt',
        brand_id: 1,
        brand_name: 'Nike',
        category_ids: [1, 2],
        category_names: ["Men's Shirts", 'T-Shirts'],
        base_price: 35.99,
        description: '<p>Premium sports T-shirt, 100% cotton material</p>',
        stock: 45,
        is_active: true,
        is_featured: true,
        image_url: 'https://via.placeholder.com/40/FF6B6B/FFFFFF?text=P1',
      },
      {
        id: 2,
        name: 'Adidas Slim Fit Jeans',
        slug: 'adidas-slim-fit-jeans',
        brand_id: 2,
        brand_name: 'Adidas',
        category_ids: [3],
        category_names: ["Men's Pants"],
        base_price: 89.99,
        description: '<p>Slim fit jeans, 4-way stretch</p>',
        stock: 12,
        is_active: true,
        is_featured: false,
        image_url: 'https://via.placeholder.com/40/4ECDC4/FFFFFF?text=P2',
      },
    ],
  },
  coupons: {
    title: 'Coupon Management',
    description: 'Manage discount codes and promotions',
    stats: {
      totalCoupons: 56,
      activeCoupons: 42,
      expiredCoupons: 8,
      publicCoupons: 35,
      privateCoupons: 21,
    },
    trends: {
      totalCoupons: 8.7,
      activeCoupons: 12.3,
      expiredCoupons: -15.2,
      publicCoupons: 5.8,
      privateCoupons: 15.0,
    },
    columns: [
      'Code',
      'Campaign Name',
      'Discount Type',
      'Value',
      'Min Order',
      'Max Usage',
      'Date Range',
      'Scope',
      'Status',
      'Actions',
    ],
    fields: [
      {
        name: 'Code',
        db: 'code',
        type: 'text',
        required: true,
        note: 'Uppercase, no special characters (e.g., SUMMER2025). Check duplicate',
      },
      {
        name: 'Campaign Name',
        db: 'name',
        type: 'text',
        required: false,
        note: 'e.g., "Summer Sale"',
      },
      {
        name: 'Discount Type',
        db: 'discount_type',
        type: 'radio',
        required: true,
        note: 'Choose: "Percentage" or "Fixed amount"',
      },
      {
        name: 'Discount Value',
        db: 'value',
        type: 'number',
        required: true,
        note: 'Enter percentage or fixed amount',
      },
      {
        name: 'Minimum Order',
        db: 'min_order_amount',
        type: 'number',
        required: false,
        note: 'Order > $500 to use',
      },
      {
        name: 'Max Usage',
        db: 'max_usage',
        type: 'number',
        required: false,
        note: 'Limit how many times one person can use',
      },
      {
        name: 'Date Range',
        db: 'start_end_date',
        type: 'daterange',
        required: true,
        note: 'Select start - end date',
      },
      {
        name: 'Scope',
        db: 'is_public',
        type: 'radio',
        required: false,
        note: 'Public: Guest can use. Private: Members only',
      },
    ],
    items: [
      {
        id: 1,
        code: 'SUMMER2025',
        name: 'Summer Sale',
        discount_type: 'percentage',
        value: 15,
        min_order_amount: 500,
        max_usage: 1000,
        start_date: '2025-06-01',
        end_date: '2025-08-31',
        is_public: true,
        status: 'active',
      },
      {
        id: 2,
        code: 'FREESHIP',
        name: 'Free Shipping',
        discount_type: 'fixed',
        value: 30,
        min_order_amount: 300,
        max_usage: 500,
        start_date: '2025-05-01',
        end_date: '2025-05-31',
        is_public: false,
        status: 'active',
      },
    ],
  },
  orders: {
    title: 'Order Management',
    description: 'Track, process and manage orders',
    stats: {
      totalOrders: 1560,
      pendingOrders: 45,
      processingOrders: 28,
      shippedOrders: 56,
      deliveredOrders: 1420,
      cancelledOrders: 11,
    },
    trends: {
      totalOrders: 18.7,
      pendingOrders: -12.3,
      processingOrders: 5.8,
      shippedOrders: 22.4,
      deliveredOrders: 20.1,
      cancelledOrders: -5.0,
    },
    columns: [
      'Order ID',
      'Customer',
      'Total',
      'Payment',
      'Shipping',
      'Status',
      'Tracking',
      'Order Date',
      'Actions',
    ],
    fields: [
      {
        name: 'Order Status',
        db: 'status',
        type: 'select',
        required: true,
        note: 'Admin changes from Pending -> Processing -> Shipped -> Delivered / Cancelled',
      },
      {
        name: 'Tracking Number',
        db: 'tracking_number',
        type: 'text',
        required: false,
        note: 'Enter GHTK/GHN code for customer tracking',
      },
      {
        name: 'Internal Note',
        db: 'internal_note',
        type: 'textarea',
        required: false,
        note: 'Note order issues',
      },
    ],
    items: [
      {
        id: 1,
        order_code: 'ORD-2025-001',
        customer_name: 'John Smith',
        customer_email: 'john@example.com',
        total_amount: 125.0,
        payment_method: 'COD',
        shipping_method: 'Express Shipping',
        status: 'delivered',
        tracking_number: 'GHN123456789',
        order_date: '2025-05-26',
        internal_note: 'Customer prefers evening delivery',
      },
      {
        id: 2,
        order_code: 'ORD-2025-002',
        customer_name: 'Sarah Johnson',
        customer_email: 'sarah@example.com',
        total_amount: 235.0,
        payment_method: 'Bank Transfer',
        shipping_method: 'Standard Shipping',
        status: 'processing',
        tracking_number: 'GHTK987654321',
        order_date: '2025-05-25',
        internal_note: 'Payment confirmed',
      },
    ],
  },
  shipping: {
    title: 'Shipping & Payment',
    description: 'Manage shipping and payment methods',
    stats: {
      shippingMethods: 5,
      paymentMethods: 4,
      activeShipping: 3,
      activePayment: 4,
      totalUsage: 1560,
    },
    trends: {
      shippingMethods: 0,
      paymentMethods: 0,
      activeShipping: 0,
      activePayment: 25.0,
      totalUsage: 18.7,
    },
    columns: [
      'Method Name',
      'Type',
      'Fee/Description',
      'Estimated Time',
      'Status',
      'Order Count',
      'Actions',
    ],
    fields: [
      {
        name: 'Method Name',
        db: 'name',
        type: 'text',
        required: true,
        note: 'e.g., "Express Shipping", "Bank Transfer"',
      },
      {
        name: 'Shipping Fee',
        db: 'price',
        type: 'number',
        required: false,
        note: 'Fixed shipping fee (if any)',
      },
      {
        name: 'Estimated Time',
        db: 'estimated_days',
        type: 'text',
        required: false,
        note: 'e.g., "2-3 days"',
      },
      {
        name: 'Status',
        db: 'is_active',
        type: 'toggle',
        required: false,
        note: 'If off, customers cannot select',
      },
      {
        name: 'Description',
        db: 'description',
        type: 'textarea',
        required: false,
        note: 'Detailed method description',
      },
    ],
    items: [
      {
        id: 1,
        name: 'Express Shipping',
        type: 'shipping',
        price: 30.0,
        description: 'Delivery within city',
        estimated_days: '2-3 days',
        is_active: true,
        order_count: 856,
      },
      {
        id: 2,
        name: 'Standard Shipping',
        type: 'shipping',
        price: 15.0,
        description: 'Standard delivery',
        estimated_days: '5-7 days',
        is_active: true,
        order_count: 452,
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
  { id: 'content', label: 'Content', icon: FaNewspaper },
  { id: 'stories', label: 'Stories', icon: FaNewspaper },
  { id: 'users', label: 'Users', icon: FaUsers },
  { id: 'schedule', label: 'Schedule', icon: FaCalendar },
  { id: 'tickets', label: 'Tickets', icon: FaTicketAlt },
  // Shop Management Modules
  { id: 'products', label: 'Products', icon: FaShoppingBag },
  { id: 'categories', label: 'Categories', icon: FaFolder },
  { id: 'brands', label: 'Brands', icon: FaTag },
  { id: 'coupons', label: 'Coupons', icon: FaPercent },
  { id: 'orders', label: 'Orders', icon: FaShoppingCart },
  { id: 'shipping', label: 'Shipping', icon: FaTruck },
  { id: 'settings', label: 'Settings', icon: FaCog },
];

type SectionKey = keyof typeof sectionData;

export default function AdminPage() {
  const mockUser = {
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
  };

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [notifications, setNotifications] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSection, setCurrentSection] = useState<SectionKey>('dashboard');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newItem, setNewItem] = useState<any>({});
  const [sectionItems, setSectionItems] = useState<any[]>(
    ('items' in sectionData[currentSection]
      ? (sectionData[currentSection] as any).items
      : []) || []
  );
  const itemsPerPage = 10;

  const sectionInfo = useMemo(() => {
    return sectionData[currentSection];
  }, [currentSection]);

  // Filter and search functionality
  const filteredContent = useMemo(() => {
    if (!('items' in sectionInfo)) {
      return [];
    }

    let items = [...sectionItems];

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

    // Shop modules filters
    if (currentSection === 'products' && filterType !== 'all') {
      if (filterType === 'featured') {
        items = items.filter((item: any) => item.is_featured);
      } else if (filterType === 'low_stock') {
        items = items.filter((item: any) => item.stock <= 10 && item.stock > 0);
      } else if (filterType === 'out_of_stock') {
        items = items.filter((item: any) => item.stock === 0);
      } else if (filterType === 'active') {
        items = items.filter((item: any) => item.is_active);
      }
    }

    if (currentSection === 'orders' && filterType !== 'all') {
      items = items.filter((item: any) => item.status === filterType);
    }

    if (currentSection === 'coupons' && filterType !== 'all') {
      items = items.filter((item: any) => item.status === filterType);
    }

    return items;
  }, [currentSection, sectionInfo, searchTerm, filterType, sectionItems]);

  // Pagination
  const paginatedContent = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredContent.slice(startIndex, endIndex);
  }, [filteredContent, currentPage]);

  const totalPages = Math.ceil(filteredContent.length / itemsPerPage);

  const StatCard = ({ title, value, trend, icon: Icon, color }: any) => (
    <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-600 mb-1 truncate">
            {title}
          </p>
          <p className="text-xl md:text-2xl font-bold text-gray-900 truncate">
            {typeof value === 'number' &&
            title.toLowerCase().includes('revenue')
              ? `$${value.toLocaleString()}`
              : typeof value === 'number'
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
              <span className="text-gray-500 font-normal ml-1 hidden sm:inline">
                vs last month
              </span>
            </div>
          )}
        </div>
        <div className={`p-2 md:p-3 rounded-lg ${color} ml-3 flex-shrink-0`}>
          <Icon className="text-white text-lg md:text-xl" />
        </div>
      </div>
    </div>
  );

  const handleSectionChange = (section: SectionKey) => {
    setCurrentSection(section);
    setSearchTerm('');
    setFilterType('all');
    setCurrentPage(1);
    setIsAddingNew(false);
    setNewItem({});
    setSectionItems(
      ('items' in sectionData[section]
        ? (sectionData[section] as any).items
        : []) || []
    );
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const handleAction = (action: string, item: any) => {
    const itemName =
      item.title ||
      item.username ||
      item.product ||
      item.name ||
      item.order_code ||
      item.code ||
      'Item';

    switch (action) {
      case 'view':
        alert(`Viewing: ${itemName}`);
        break;
      case 'edit':
        setIsAddingNew(true);
        setNewItem({ ...item, isEditing: true });
        break;
      case 'delete':
        if (confirm(`Are you sure you want to delete "${itemName}"?`)) {
          const newItems = sectionItems.filter(i => i.id !== item.id);
          setSectionItems(newItems);
          alert(`Deleted: ${itemName}`);
        }
        break;
      case 'track':
        if (item.tracking_number) {
          alert(`Tracking number: ${item.tracking_number}`);
        } else {
          alert('No tracking number available');
        }
        break;
      case 'toggle_status':
        const newItems = sectionItems.map(i =>
          i.id === item.id
            ? { ...i, status: i.status === 'active' ? 'inactive' : 'active' }
            : i
        );
        setSectionItems(newItems);
        alert(
          `${itemName} ${item.status === 'active' ? 'deactivated' : 'activated'}`
        );
        break;
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(filteredContent, null, 2);
    const dataUri =
      'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = `${currentSection}_data_${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    // Create empty form based on current section
    const emptyItem: any = { id: Date.now() };

    if (currentSection === 'content') {
      emptyItem.title = '';
      emptyItem.type = 'news';
      emptyItem.status = 'draft';
      emptyItem.views = 0;
      emptyItem.author = '';
      emptyItem.date = new Date().toISOString().split('T')[0];
    } else if (currentSection === 'users') {
      emptyItem.username = '';
      emptyItem.email = '';
      emptyItem.role = 'User';
      emptyItem.status = 'Active';
      emptyItem.joindate = new Date().toISOString().split('T')[0];
      emptyItem.avatar = '';
    } else if (currentSection === 'stories') {
      emptyItem.title = '';
      emptyItem.category = 'news';
      emptyItem.published = new Date().toISOString().split('T')[0];
      emptyItem.author = '';
      emptyItem.readTime = '5 min';
      emptyItem.status = 'draft';
    } else if (currentSection === 'brands') {
      emptyItem.name = '';
      emptyItem.logo_url = '';
      emptyItem.description = '';
      emptyItem.status = 'active';
    } else if (currentSection === 'categories') {
      emptyItem.name = '';
      emptyItem.slug = '';
      emptyItem.parent_id = null;
      emptyItem.image_url = '';
      emptyItem.description = '';
      emptyItem.is_active = true;
    } else if (currentSection === 'products') {
      emptyItem.name = '';
      emptyItem.slug = '';
      emptyItem.brand_id = '';
      emptyItem.category_ids = [];
      emptyItem.base_price = 0;
      emptyItem.stock = 0;
      emptyItem.description = '';
      emptyItem.is_active = true;
      emptyItem.is_featured = false;
    } else if (currentSection === 'coupons') {
      emptyItem.code = '';
      emptyItem.name = '';
      emptyItem.discount_type = 'percentage';
      emptyItem.value = 0;
      emptyItem.min_order_amount = 0;
      emptyItem.max_usage = 100;
      emptyItem.start_date = new Date().toISOString().split('T')[0];
      emptyItem.end_date = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0];
      emptyItem.is_public = true;
      emptyItem.status = 'active';
    } else if (currentSection === 'shipping') {
      emptyItem.name = '';
      emptyItem.type = 'shipping';
      emptyItem.price = 0;
      emptyItem.description = '';
      emptyItem.estimated_days = '';
      emptyItem.is_active = true;
    }

    setNewItem(emptyItem);
  };

  const handleCancelAdd = () => {
    setIsAddingNew(false);
    setNewItem({});
  };

  const handleSaveNew = () => {
    if (!newItem) return;

    let itemToSave = { ...newItem };

    // Generate ID if not editing
    if (!itemToSave.isEditing) {
      const maxId = Math.max(...sectionItems.map((item: any) => item.id), 0);
      itemToSave.id = maxId + 1;

      // Auto-generate slug for shop modules
      if (currentSection === 'products' || currentSection === 'categories') {
        if (!itemToSave.slug && itemToSave.name) {
          itemToSave.slug = itemToSave.name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');
        }
      }

      if (currentSection === 'orders') {
        itemToSave.order_code = `ORD-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`;
        itemToSave.order_date = new Date().toISOString().split('T')[0];
      }
    }

    // Remove editing flag
    delete itemToSave.isEditing;

    if (newItem.isEditing) {
      // Update existing item
      const newItems = sectionItems.map((item: any) =>
        item.id === itemToSave.id ? itemToSave : item
      );
      setSectionItems(newItems);
      alert(`Updated item #${itemToSave.id}`);
    } else {
      // Add new item
      setSectionItems([itemToSave, ...sectionItems]);
      alert(`Added new item #${itemToSave.id}`);
    }

    setIsAddingNew(false);
    setNewItem({});
  };

  const handleInputChange = (field: string, value: any) => {
    setNewItem((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const renderFieldInput = (field: any) => {
    const { name, db, type, required, note } = field;
    const value = newItem[db] || '';

    switch (type) {
      case 'text':
        return (
          <div key={db} className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {name} {required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              value={value}
              onChange={e => handleInputChange(db, e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder={`Enter ${name.toLowerCase()}`}
              required={required}
            />
            {note && <p className="text-xs text-gray-500 mt-1">{note}</p>}
          </div>
        );

      case 'textarea':
        return (
          <div key={db} className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {name} {required && <span className="text-red-500">*</span>}
            </label>
            <textarea
              value={value}
              onChange={e => handleInputChange(db, e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
              rows={3}
              placeholder={`Enter ${name.toLowerCase()}`}
              required={required}
            />
            {note && <p className="text-xs text-gray-500 mt-1">{note}</p>}
          </div>
        );

      case 'number':
        return (
          <div key={db} className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {name} {required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="number"
              value={value}
              onChange={e =>
                handleInputChange(db, parseFloat(e.target.value) || 0)
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder={`Enter ${name.toLowerCase()}`}
              min="0"
              step={name.includes('Price') ? '0.01' : '1'}
              required={required}
            />
            {note && <p className="text-xs text-gray-500 mt-1">{note}</p>}
          </div>
        );

      case 'image':
        return (
          <div key={db} className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {name} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              {value && (
                <img
                  src={value}
                  alt="Preview"
                  className="w-16 h-16 rounded-lg object-cover border flex-shrink-0"
                />
              )}
              <div className="flex-1 w-full">
                <button
                  type="button"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 flex items-center justify-center gap-2"
                  onClick={() => {
                    const url = prompt('Enter image URL:');
                    if (url) handleInputChange(db, url);
                  }}
                >
                  <FaUpload />
                  {value ? 'Change Image' : 'Upload Image'}
                </button>
                {note && <p className="text-xs text-gray-500 mt-1">{note}</p>}
              </div>
            </div>
          </div>
        );

      case 'toggle':
        return (
          <div key={db} className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {name}
            </label>
            <button
              type="button"
              onClick={() => handleInputChange(db, !value)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg w-full justify-center sm:justify-start ${value ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
            >
              {value ? (
                <FaToggleOn className="text-green-600" />
              ) : (
                <FaToggleOff className="text-gray-400" />
              )}
              <span>{value ? 'Enabled' : 'Disabled'}</span>
            </button>
            {note && <p className="text-xs text-gray-500 mt-1">{note}</p>}
          </div>
        );

      case 'select':
        return (
          <div key={db} className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {name} {required && <span className="text-red-500">*</span>}
            </label>
            <select
              value={value}
              onChange={e => handleInputChange(db, e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
              required={required}
            >
              <option value="">-- Select --</option>
              {currentSection === 'categories' && (
                <>
                  <option value="">Root Category</option>
                  <option value="1">Men's Shirts</option>
                  <option value="2">T-Shirts</option>
                  <option value="3">Men's Pants</option>
                </>
              )}
              {currentSection === 'products' && (
                <>
                  <option value="1">Nike</option>
                  <option value="2">Adidas</option>
                  <option value="3">Apple</option>
                  <option value="4">Samsung</option>
                </>
              )}
              {currentSection === 'orders' && (
                <>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </>
              )}
            </select>
            {note && <p className="text-xs text-gray-500 mt-1">{note}</p>}
          </div>
        );

      case 'multiselect':
        return (
          <div key={db} className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {name} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="border border-gray-300 rounded-lg p-2 max-h-40 overflow-y-auto">
              {["Men's Shirts", 'T-Shirts', "Men's Pants", 'Shoes'].map(cat => (
                <label
                  key={cat}
                  className="flex items-center gap-2 p-1 hover:bg-gray-50 rounded"
                >
                  <input
                    type="checkbox"
                    checked={Array.isArray(value) && value.includes(cat)}
                    onChange={e => {
                      const newValue = Array.isArray(value) ? [...value] : [];
                      if (e.target.checked) {
                        newValue.push(cat);
                      } else {
                        const index = newValue.indexOf(cat);
                        if (index > -1) newValue.splice(index, 1);
                      }
                      handleInputChange(db, newValue);
                    }}
                  />
                  <span className="truncate">{cat}</span>
                </label>
              ))}
            </div>
            {note && <p className="text-xs text-gray-500 mt-1">{note}</p>}
          </div>
        );

      case 'radio':
        return (
          <div key={db} className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {name} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              {db === 'discount_type' ? (
                <>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={db}
                      value="percentage"
                      checked={value === 'percentage'}
                      onChange={e => handleInputChange(db, e.target.value)}
                      required={required}
                    />
                    <span>Percentage</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={db}
                      value="fixed"
                      checked={value === 'fixed'}
                      onChange={e => handleInputChange(db, e.target.value)}
                      required={required}
                    />
                    <span>Fixed Amount</span>
                  </label>
                </>
              ) : (
                <>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={db}
                      value="true"
                      checked={value === true}
                      onChange={e => handleInputChange(db, true)}
                      required={required}
                    />
                    <span>Public</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={db}
                      value="false"
                      checked={value === false}
                      onChange={e => handleInputChange(db, false)}
                      required={required}
                    />
                    <span>Private</span>
                  </label>
                </>
              )}
            </div>
            {note && <p className="text-xs text-gray-500 mt-1">{note}</p>}
          </div>
        );

      case 'daterange':
        return (
          <div
            key={db}
            className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date {required && <span className="text-red-500">*</span>}
              </label>
              <input
                type="date"
                value={newItem.start_date || ''}
                onChange={e => handleInputChange('start_date', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                required={required}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date {required && <span className="text-red-500">*</span>}
              </label>
              <input
                type="date"
                value={newItem.end_date || ''}
                onChange={e => handleInputChange('end_date', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                required={required}
              />
            </div>
            {note && (
              <p className="text-xs text-gray-500 mt-1 col-span-1 sm:col-span-2">
                {note}
              </p>
            )}
          </div>
        );

      case 'richtext':
        return (
          <div key={db} className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {name} {required && <span className="text-red-500">*</span>}
            </label>
            <textarea
              value={value}
              onChange={e => handleInputChange(db, e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
              rows={4}
              placeholder={`Enter ${name.toLowerCase()}`}
              required={required}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              <button
                type="button"
                className="text-xs px-2 py-1 bg-gray-100 rounded"
              >
                B
              </button>
              <button
                type="button"
                className="text-xs px-2 py-1 bg-gray-100 rounded"
              >
                I
              </button>
              <button
                type="button"
                className="text-xs px-2 py-1 bg-gray-100 rounded"
              >
                U
              </button>
              <button
                type="button"
                className="text-xs px-2 py-1 bg-gray-100 rounded"
              >
                Image
              </button>
              <button
                type="button"
                className="text-xs px-2 py-1 bg-gray-100 rounded"
              >
                Link
              </button>
            </div>
            {note && <p className="text-xs text-gray-500 mt-1">{note}</p>}
          </div>
        );

      default:
        return null;
    }
  };

  const renderAddForm = () => {
    // Shop modules have dynamic forms
    if (
      [
        'brands',
        'categories',
        'products',
        'coupons',
        'orders',
        'shipping',
      ].includes(currentSection)
    ) {
      if (!('fields' in sectionInfo)) return null;

      return (
        <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-gray-200 mb-6 overflow-hidden">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {newItem.isEditing
                ? `Edit ${sectionInfo.title.toLowerCase()}`
                : `Add New ${sectionInfo.title.toLowerCase()}`}
            </h3>
            <button
              onClick={handleCancelAdd}
              className="p-2 text-gray-600 hover:text-red-600 flex-shrink-0"
              title="Cancel"
            >
              <FaTimes className="text-lg" />
            </button>
          </div>

          <div className="space-y-4 md:space-y-6 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {sectionInfo.fields.map((field: any) => (
                <div
                  key={field.db}
                  className={
                    field.type === 'textarea' ||
                    field.type === 'richtext' ||
                    field.type === 'daterange'
                      ? 'md:col-span-2'
                      : ''
                  }
                >
                  {renderFieldInput(field)}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={handleCancelAdd}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveNew}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-md shadow-red-500/30 w-full sm:w-auto"
              >
                <FaSave />
                {newItem.isEditing ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Original forms for existing modules
    if (currentSection === 'content') {
      return (
        <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-gray-200 mb-6 overflow-hidden">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {newItem.isEditing ? 'Edit Content' : 'Add New Content'}
            </h3>
            <button
              onClick={handleCancelAdd}
              className="p-2 text-gray-600 hover:text-red-600 transition-colors flex-shrink-0"
              title="Cancel"
            >
              <FaTimes className="text-lg" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={newItem.title || ''}
                onChange={e => handleInputChange('title', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type *
              </label>
              <select
                value={newItem.type || 'news'}
                onChange={e => handleInputChange('type', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="news">News</option>
                <option value="article">Article</option>
                <option value="schedule">Schedule</option>
                <option value="store">Store</option>
                <option value="gaming">Gaming</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status *
              </label>
              <select
                value={newItem.status || 'draft'}
                onChange={e => handleInputChange('status', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Author *
              </label>
              <input
                type="text"
                value={newItem.author || ''}
                onChange={e => handleInputChange('author', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter author name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                value={newItem.date || new Date().toISOString().split('T')[0]}
                onChange={e => handleInputChange('date', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Views
              </label>
              <input
                type="number"
                value={newItem.views || 0}
                onChange={e =>
                  handleInputChange('views', parseInt(e.target.value) || 0)
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                min="0"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
            <button
              onClick={handleCancelAdd}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveNew}
              disabled={!newItem.title || !newItem.author}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-md shadow-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            >
              <FaSave />
              {newItem.isEditing ? 'Update' : 'Save'}
            </button>
          </div>
        </div>
      );
    }

    if (currentSection === 'stories') {
      return (
        <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-gray-200 mb-6 overflow-hidden">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {newItem.isEditing ? 'Edit Story' : 'Add New Story'}
            </h3>
            <button
              onClick={handleCancelAdd}
              className="p-2 text-gray-600 hover:text-red-600 transition-colors flex-shrink-0"
              title="Cancel"
            >
              <FaTimes className="text-lg" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={newItem.title || ''}
                onChange={e => handleInputChange('title', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter story title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={newItem.category || 'news'}
                onChange={e => handleInputChange('category', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="news">News</option>
                <option value="race-report">Race Report</option>
                <option value="technical">Technical</option>
                <option value="analysis">Analysis</option>
                <option value="interview">Interview</option>
                <option value="feature">Feature</option>
                <option value="exclusive">Exclusive</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Author *
              </label>
              <input
                type="text"
                value={newItem.author || ''}
                onChange={e => handleInputChange('author', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter author name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Read Time *
              </label>
              <input
                type="text"
                value={newItem.readTime || ''}
                onChange={e => handleInputChange('readTime', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="e.g., 5 min read"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Publish Date
              </label>
              <input
                type="date"
                value={
                  newItem.published || new Date().toISOString().split('T')[0]
                }
                onChange={e => handleInputChange('published', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status *
              </label>
              <select
                value={newItem.status || 'draft'}
                onChange={e => handleInputChange('status', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
            <button
              onClick={handleCancelAdd}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveNew}
              disabled={!newItem.title || !newItem.author}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-md shadow-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            >
              <FaSave />
              {newItem.isEditing ? 'Update Story' : 'Add Story'}
            </button>
          </div>
        </div>
      );
    }

    // Default simple form for other sections
    return (
      <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-gray-200 mb-6 overflow-hidden">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Add New{' '}
            {currentSection.charAt(0).toUpperCase() + currentSection.slice(1)}
          </h3>
          <button
            onClick={handleCancelAdd}
            className="p-2 text-gray-600 hover:text-red-600 transition-colors flex-shrink-0"
            title="Cancel"
          >
            <FaTimes className="text-lg" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name/Title *
            </label>
            <input
              type="text"
              value={newItem.name || ''}
              onChange={e => handleInputChange('name', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder={`Enter ${currentSection} name`}
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-end gap-3">
            <button
              onClick={handleCancelAdd}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveNew}
              disabled={!newItem.name}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-md shadow-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            >
              <FaSave />
              Save
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderSectionContent = () => {
    if (currentSection === 'dashboard') {
      return (
        <>
          {/* Welcome Section */}
          <div className="mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-gray-900 mb-2">
              Welcome back, {mockUser.name}! 👋
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Here's what's happening with your platform today.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            <StatCard
              title="Total Users"
              value={15420}
              trend={12.5}
              icon={FaUsers}
              color="bg-blue-600"
            />
            <StatCard
              title="Active Content"
              value={287}
              trend={-3.2}
              icon={FaNewspaper}
              color="bg-green-600"
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
              value={1254300}
              trend={8.3}
              icon={FaChartBar}
              color="bg-purple-600"
            />
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 md:mb-4">
                Recent Orders
              </h3>
              <div className="space-y-2 md:space-y-3">
                {sectionData.orders.items.slice(0, 3).map((order: any) => (
                  <div
                    key={order.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="mb-2 sm:mb-0">
                      <div className="font-medium text-sm md:text-base truncate">
                        {order.order_code}
                      </div>
                      <div className="text-xs md:text-sm text-gray-600 truncate">
                        {order.customer_name}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-sm md:text-base">
                        ${(order.total_amount || 0).toFixed(2)}
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          order.status === 'delivered'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'processing'
                              ? 'bg-blue-100 text-blue-800'
                              : order.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 md:mb-4">
                Low Stock Products
              </h3>
              <div className="space-y-2 md:space-y-3">
                {sectionData.products.items
                  .filter(p => p.stock <= 10)
                  .slice(0, 3)
                  .map((product: any) => (
                    <div
                      key={product.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3 mb-2 sm:mb-0">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-200 rounded-lg flex-shrink-0"></div>
                        <div className="min-w-0">
                          <div className="font-medium text-sm md:text-base line-clamp-1 truncate">
                            {product.name}
                          </div>
                          <div className="text-xs md:text-sm text-gray-600">
                            {product.stock} in stock
                          </div>
                        </div>
                      </div>
                      <div className="font-semibold text-sm md:text-base">
                        ${(product.base_price || 0).toFixed(2)}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </>
      );
    }

    const data = sectionData[currentSection];

    return (
      <div className="space-y-4 md:space-y-6">
        {/* Stats Grid */}
        {'stats' in data && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {Object.entries(data.stats).map(([key, value], index) => {
              const colors = [
                'bg-red-600',
                'bg-blue-600',
                'bg-green-600',
                'bg-yellow-600',
                'bg-purple-600',
              ];
              const icons = [
                FaChartBar,
                FaShoppingCart,
                FaUsers,
                FaShoppingBag,
                FaTag,
              ];
              const titles: Record<string, string> = {
                totalStories: 'Total Stories',
                pendingReview: 'Pending Review',
                publishedVideos: 'Published Videos',
                drafts: 'Drafts',
                total: 'Total Users',
                active: 'Active Users',
                newToday: 'New Today',
                banned: 'Banned Users',
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
                totalBrands: 'Brands',
                activeBrands: 'Active Brands',
                brandsWithLogo: 'With Logo',
                newThisMonth: 'New This Month',
                totalCategories: 'Categories',
                activeCategories: 'Active Categories',
                rootCategories: 'Root Categories',
                subCategories: 'Sub Categories',
                activeProducts: 'Active Products',
                outOfStock: 'Out of Stock',
                featuredProducts: 'Featured',
                totalCoupons: 'Coupons',
                activeCoupons: 'Active Coupons',
                expiredCoupons: 'Expired',
                publicCoupons: 'Public',
                privateCoupons: 'Private',
                pendingOrders: 'Pending Orders',
                processingOrders: 'Processing',
                shippedOrders: 'Shipped',
                deliveredOrders: 'Delivered',
                cancelledOrders: 'Cancelled',
                shippingMethods: 'Shipping Methods',
                paymentMethods: 'Payment Methods',
                activeShipping: 'Active Shipping',
                activePayment: 'Active Payment',
                totalUsage: 'Total Usage',
              };

              const trendData = (data as any).trends;
              const trend = trendData ? trendData[key] : undefined;

              return (
                <StatCard
                  key={key}
                  title={titles[key] || key}
                  value={
                    key === 'revenue' ||
                    key === 'prizes' ||
                    key.includes('Price') ||
                    key === 'total_amount'
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

        {/* Add New Form */}
        {isAddingNew && renderAddForm()}

        {/* Data Table */}
        {'items' in data && (
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-gray-200 overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 md:mb-6 gap-4">
              <div className="min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {data.title} List
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Showing {paginatedContent.length} of {filteredContent.length}{' '}
                  items
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
                <div className="relative w-full sm:w-auto">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={e => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                {(currentSection === 'content' ||
                  currentSection === 'products' ||
                  currentSection === 'orders' ||
                  currentSection === 'coupons') && (
                  <select
                    value={filterType}
                    onChange={e => {
                      setFilterType(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="all">All</option>
                    {currentSection === 'content' && (
                      <>
                        <option value="news">News</option>
                        <option value="article">Article</option>
                        <option value="schedule">Schedule</option>
                        <option value="store">Store</option>
                        <option value="gaming">Gaming</option>
                      </>
                    )}
                    {currentSection === 'products' && (
                      <>
                        <option value="active">Active</option>
                        <option value="featured">Featured</option>
                        <option value="low_stock">Low Stock</option>
                        <option value="out_of_stock">Out of Stock</option>
                      </>
                    )}
                    {currentSection === 'orders' && (
                      <>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </>
                    )}
                    {currentSection === 'coupons' && (
                      <>
                        <option value="active">Active</option>
                        <option value="expired">Expired</option>
                        <option value="upcoming">Upcoming</option>
                      </>
                    )}
                  </select>
                )}
                <div className="flex flex-row gap-3">
                  <button
                    onClick={handleExport}
                    className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 flex-1 sm:flex-none"
                    title="Export data as JSON"
                  >
                    <FaDownload className="text-sm" />
                    <span className="hidden sm:inline">Export</span>
                  </button>
                  <button
                    onClick={handleAddNew}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-md shadow-red-500/30 flex-1 sm:flex-none"
                  >
                    <FaPlus className="text-sm" />
                    <span className="hidden sm:inline">Add New</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <div className="min-w-full">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {data.columns.map((column: string) => (
                        <th
                          key={column}
                          className="text-left py-3 px-3 md:px-4 text-xs md:text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200 whitespace-nowrap"
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
                          className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50"
                        >
                          {data.columns.map((column: string) => {
                            if (column === 'Actions') {
                              return (
                                <td key={column} className="py-3 px-3 md:px-4">
                                  <div className="flex items-center gap-1 md:gap-2">
                                    <button
                                      className="p-1 text-blue-600 hover:text-blue-800"
                                      onClick={() => handleAction('view', item)}
                                      title="View"
                                    >
                                      <FaEye className="text-sm md:text-base" />
                                    </button>
                                    <button
                                      className="p-1 text-green-600 hover:text-green-800"
                                      onClick={() => handleAction('edit', item)}
                                      title="Edit"
                                    >
                                      <FaEdit className="text-sm md:text-base" />
                                    </button>
                                    {(currentSection === 'orders' ||
                                      currentSection === 'coupons') &&
                                      item.tracking_number && (
                                        <button
                                          className="p-1 text-purple-600 hover:text-purple-800"
                                          onClick={() =>
                                            handleAction('track', item)
                                          }
                                          title="Track Order"
                                        >
                                          <FaTruck className="text-sm md:text-base" />
                                        </button>
                                      )}
                                    {(currentSection === 'brands' ||
                                      currentSection === 'coupons') && (
                                      <button
                                        className="p-1 text-yellow-600 hover:text-yellow-800"
                                        onClick={() =>
                                          handleAction('toggle_status', item)
                                        }
                                        title={
                                          item.status === 'active'
                                            ? 'Deactivate'
                                            : 'Activate'
                                        }
                                      >
                                        {item.status === 'active' ? (
                                          <FaToggleOn className="text-sm md:text-base" />
                                        ) : (
                                          <FaToggleOff className="text-sm md:text-base" />
                                        )}
                                      </button>
                                    )}
                                    <button
                                      className="p-1 text-red-600 hover:text-red-800"
                                      onClick={() =>
                                        handleAction('delete', item)
                                      }
                                      title="Delete"
                                    >
                                      <FaTrash className="text-sm md:text-base" />
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
                                Scheduled: 'bg-purple-100 text-purple-800',
                                active: 'bg-green-100 text-green-800',
                                inactive: 'bg-red-100 text-red-800',
                                pending: 'bg-yellow-100 text-yellow-800',
                                processing: 'bg-blue-100 text-blue-800',
                                shipped: 'bg-purple-100 text-purple-800',
                                delivered: 'bg-green-100 text-green-800',
                                cancelled: 'bg-red-100 text-red-800',
                                expired: 'bg-gray-100 text-gray-800',
                                upcoming: 'bg-indigo-100 text-indigo-800',
                              };

                              return (
                                <td key={column} className="py-3 px-3 md:px-4">
                                  <span
                                    className={`text-xs px-2 py-1 rounded-full ${
                                      statusColors[item.status] ||
                                      statusColors[
                                        item.is_active ? 'active' : 'inactive'
                                      ] ||
                                      'bg-gray-100 text-gray-800'
                                    }`}
                                  >
                                    {item.status ||
                                      (item.is_active ? 'Active' : 'Inactive')}
                                  </span>
                                </td>
                              );
                            }

                            if (column === 'Logo' || column === 'Image') {
                              return (
                                <td key={column} className="py-3 px-3 md:px-4">
                                  <img
                                    src={
                                      item.image_url ||
                                      item.logo_url ||
                                      'https://via.placeholder.com/40'
                                    }
                                    alt=""
                                    className="w-8 h-8 md:w-10 md:h-10 rounded-lg object-cover"
                                  />
                                </td>
                              );
                            }

                            if (column === 'Username' && item.avatar) {
                              return (
                                <td key={column} className="py-3 px-3 md:px-4">
                                  <div className="flex items-center gap-2 md:gap-3">
                                    <div className="w-6 h-6 md:w-8 md:h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-xs md:text-sm font-semibold flex-shrink-0">
                                      {item.avatar}
                                    </div>
                                    <span className="text-sm text-gray-900 truncate">
                                      {item.username}
                                    </span>
                                  </div>
                                </td>
                              );
                            }

                            if (
                              column === 'Price' ||
                              column === 'Total' ||
                              column === 'base_price' ||
                              column === 'total_amount' ||
                              column === 'value'
                            ) {
                              const value =
                                item.base_price ||
                                item.price ||
                                item.value ||
                                item.total_amount ||
                                0;
                              const suffix =
                                column === 'value' &&
                                item.discount_type === 'percentage'
                                  ? '%'
                                  : '$';
                              return (
                                <td
                                  key={column}
                                  className="py-3 px-3 md:px-4 font-medium whitespace-nowrap"
                                >
                                  <span className="text-sm md:text-base">
                                    {suffix}
                                    {typeof value === 'number'
                                      ? value.toFixed(2)
                                      : value}
                                  </span>
                                </td>
                              );
                            }

                            if (column === 'Featured') {
                              return (
                                <td key={column} className="py-3 px-3 md:px-4">
                                  {item.is_featured ? (
                                    <FaStar className="text-yellow-500 text-sm md:text-base" />
                                  ) : (
                                    <FaStar className="text-gray-300 text-sm md:text-base" />
                                  )}
                                </td>
                              );
                            }

                            if (column === 'Scope') {
                              return (
                                <td key={column} className="py-3 px-3 md:px-4">
                                  {item.is_public ? (
                                    <span className="flex items-center gap-1 text-green-600 text-xs md:text-sm">
                                      <FaGlobe className="text-xs" /> Public
                                    </span>
                                  ) : (
                                    <span className="flex items-center gap-1 text-blue-600 text-xs md:text-sm">
                                      <FaUserLock className="text-xs" /> Private
                                    </span>
                                  )}
                                </td>
                              );
                            }

                            if (column === 'Date Range') {
                              return (
                                <td key={column} className="py-3 px-3 md:px-4">
                                  <div className="text-xs md:text-sm">
                                    <div className="truncate">
                                      From: {item.start_date}
                                    </div>
                                    <div className="truncate">
                                      To: {item.end_date}
                                    </div>
                                  </div>
                                </td>
                              );
                            }

                            if (column === 'Discount Type') {
                              return (
                                <td key={column} className="py-3 px-3 md:px-4">
                                  <span className="text-xs md:text-sm">
                                    {item.discount_type === 'percentage'
                                      ? 'Percentage'
                                      : 'Fixed Amount'}
                                  </span>
                                </td>
                              );
                            }

                            if (column === 'Categories') {
                              return (
                                <td key={column} className="py-3 px-3 md:px-4">
                                  <div className="flex flex-wrap gap-1">
                                    {Array.isArray(item.category_names) &&
                                      item.category_names
                                        .slice(0, 2)
                                        .map((cat: string, idx: number) => (
                                          <span
                                            key={idx}
                                            className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded truncate max-w-[100px]"
                                          >
                                            {cat}
                                          </span>
                                        ))}
                                    {Array.isArray(item.category_names) &&
                                      item.category_names.length > 2 && (
                                        <span className="text-xs text-gray-500">
                                          +{item.category_names.length - 2}
                                        </span>
                                      )}
                                  </div>
                                </td>
                              );
                            }

                            if (
                              column === 'Stock' ||
                              column === 'Products' ||
                              column === 'Order Count' ||
                              column === 'Max Usage'
                            ) {
                              const value =
                                item.stock ||
                                item.product_count ||
                                item.order_count ||
                                item.max_usage ||
                                0;
                              return (
                                <td key={column} className="py-3 px-3 md:px-4">
                                  <span
                                    className={`font-medium text-sm md:text-base ${
                                      column === 'Stock' && value <= 10
                                        ? value === 0
                                          ? 'text-red-600'
                                          : 'text-orange-600'
                                        : 'text-gray-800'
                                    }`}
                                  >
                                    {value.toLocaleString()}
                                  </span>
                                </td>
                              );
                            }

                            if (column === 'Payment' || column === 'Shipping') {
                              return (
                                <td key={column} className="py-3 px-3 md:px-4">
                                  <div className="flex items-center gap-2">
                                    {column.includes('Payment') ? (
                                      <FaCreditCard className="text-gray-400 text-sm" />
                                    ) : (
                                      <FaTruck className="text-gray-400 text-sm" />
                                    )}
                                    <span className="text-xs md:text-sm truncate">
                                      {item.payment_method ||
                                        item.shipping_method}
                                    </span>
                                  </div>
                                </td>
                              );
                            }

                            if (column === 'Tracking') {
                              return (
                                <td key={column} className="py-3 px-3 md:px-4">
                                  {item.tracking_number ? (
                                    <span className="font-mono text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded truncate inline-block max-w-[120px]">
                                      {item.tracking_number}
                                    </span>
                                  ) : (
                                    <span className="text-gray-400 text-xs md:text-sm">
                                      -
                                    </span>
                                  )}
                                </td>
                              );
                            }

                            if (
                              column === 'Type' &&
                              currentSection === 'shipping'
                            ) {
                              return (
                                <td key={column} className="py-3 px-3 md:px-4">
                                  <span className="text-xs md:text-sm">
                                    {item.type === 'shipping'
                                      ? 'Shipping'
                                      : 'Payment'}
                                  </span>
                                </td>
                              );
                            }

                            if (column === 'Slug') {
                              return (
                                <td key={column} className="py-3 px-3 md:px-4">
                                  <div className="flex items-center gap-1 text-gray-600">
                                    <FaLink className="text-xs" />
                                    <span className="text-xs md:text-sm truncate">
                                      /{item.slug}
                                    </span>
                                  </div>
                                </td>
                              );
                            }

                            // Default text cells
                            const fieldKey = column
                              .toLowerCase()
                              .replace(/\s+/g, '_');
                            const displayValue =
                              item[fieldKey] ||
                              item[column] ||
                              (Array.isArray(item.category_names)
                                ? item.category_names.join(', ')
                                : '-');

                            return (
                              <td
                                key={column}
                                className="py-3 px-3 md:px-4 text-xs md:text-sm text-gray-800 truncate max-w-[150px]"
                                title={displayValue}
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
                          className="py-6 md:py-8 px-4 text-center text-gray-500"
                        >
                          No items found. Try adjusting your search or click
                          "Add New" to create one.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between mt-4 md:mt-6 gap-3">
                <div className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setCurrentPage(prev => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                    className="px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() =>
                      setCurrentPage(prev => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
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
        <div className="px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-4 min-w-0">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 lg:hidden flex-shrink-0"
              >
                <FaBars className="text-gray-600" />
              </button>
              <div className="min-w-0">
                <h1 className="text-xl md:text-2xl font-extrabold text-red-600 truncate">
                  Admin Dashboard
                </h1>
              </div>
              <span className="text-gray-500 font-light hidden md:inline">
                /
              </span>
              <span className="text-base md:text-lg font-semibold text-gray-700 capitalize truncate hidden md:inline">
                {sectionInfo.title}
              </span>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <button
                className="relative p-2 text-gray-600 hover:text-red-600"
                onClick={() => setNotifications(0)}
                title="Notifications"
              >
                <FaBell />
                {notifications > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
                )}
              </button>

              {/* User Dropdown */}
              <div className="relative group">
                <div className="flex items-center gap-2 md:gap-3 cursor-pointer">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0 hover:bg-red-700">
                    {mockUser.name?.[0]?.toUpperCase() || 'A'}
                  </div>
                  <div className="hidden md:block">
                    <div className="text-sm font-medium text-gray-900 truncate max-w-[120px]">
                      {mockUser.name || 'Admin'}
                    </div>
                    <div className="text-xs text-gray-500">Admin</div>
                  </div>
                </div>

                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <div className="text-sm font-medium text-gray-900">
                      {mockUser.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {mockUser.email}
                    </div>
                  </div>
                  <Link
                    href="/"
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100"
                  >
                    <FaHome className="text-gray-500" />
                    <span>View Site</span>
                  </Link>
                  <div className="px-4 py-3 text-sm text-gray-500 italic">
                    (Demo Mode - No Auth Required)
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:hidden mt-2">
            <span className="text-sm font-medium text-gray-700 capitalize">
              {sectionInfo.title}
            </span>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 z-30 bg-black bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          >
            <div
              className="absolute left-0 top-0 h-full w-64 bg-white shadow-xl overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-4 space-y-2">
                {navigationItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleSectionChange(item.id as SectionKey)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left ${
                      currentSection === item.id
                        ? 'bg-red-600 text-white shadow-md shadow-red-500/20'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-red-600'
                    }`}
                  >
                    <item.icon
                      className={`${currentSection === item.id ? 'text-white' : 'text-gray-500'} flex-shrink-0`}
                    />
                    <span className="font-medium truncate">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Desktop Sidebar */}
        <div className="hidden lg:block h-[calc(100vh-73px)] sticky top-[73px] overflow-y-auto z-20 bg-white border-r border-gray-200 flex-shrink-0 w-64">
          <div className="p-4 space-y-2">
            {navigationItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleSectionChange(item.id as SectionKey)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left ${
                  currentSection === item.id
                    ? 'bg-red-600 text-white shadow-md shadow-red-500/20'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-red-600'
                }`}
              >
                <item.icon
                  className={`${currentSection === item.id ? 'text-white' : 'text-gray-500'} flex-shrink-0`}
                />
                <span className="font-medium truncate">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-6 min-h-[calc(100vh-73px)] overflow-x-hidden">
          {/* Section Header */}
          <div className="mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-gray-900">
              {sectionInfo.title}
            </h2>
            <p className="text-gray-600 mt-1 text-sm md:text-base">
              {sectionInfo.description}
            </p>
          </div>

          {renderSectionContent()}
        </div>
      </div>
    </div>
  );
}
