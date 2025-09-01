'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaThreads,
} from 'react-icons/fa6';

// Social links data with brand colors
const SOCIAL_LINKS = [
  {
    href: 'https://facebook.com/your-page',
    icon: FaFacebookF,
    label: 'Facebook',
    color: 'hover:text-blue-600',
  },
  {
    href: 'https://twitter.com/your-handle',
    icon: FaTwitter,
    label: 'Twitter',
    color: 'hover:text-sky-500',
  },
  {
    href: 'https://instagram.com/your-handle',
    icon: FaInstagram,
    label: 'Instagram',
    color: 'hover:text-pink-600',
  },
  {
    href: 'https://youtube.com/your-channel',
    icon: FaYoutube,
    label: 'YouTube',
    color: 'hover:text-red-600',
  },
  {
    href: 'https://tiktok.com/@your-handle',
    icon: FaTiktok,
    label: 'TikTok',
    color: 'hover:text-gray-800 dark:hover:text-white',
  },
  {
    href: 'https://threads.net/@your-handle',
    icon: FaThreads,
    label: 'Threads',
    color: 'hover:text-gray-900 dark:hover:text-gray-100',
  },
];

// Enhanced LinkSection with improved styling
type LinkItem = {
  href: string;
  label: string;
  key?: string;
};

type LinkSectionProps = {
  title: string;
  links: LinkItem[];
};

const LinkSection = ({ title, links }: LinkSectionProps) => (
  <div className="space-y-4 group">
    <h3 className="font-bold text-lg text-gray-900 dark:text-white border-b-2 border-transparent group-hover:border-red-500 pb-2 transition-all duration-300">
      {title}
    </h3>
    <ul className="space-y-3">
      {links.map(({ href, label, key }) => (
        <li key={key || href}>
          <Link
            href={href}
            className="text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-all duration-300 ease-out hover:translate-x-1 inline-flex items-center group/link"
          >
            <span className="relative">
              {label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover/link:w-full"></span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default function Footer() {
  const t = useTranslations('footer');

  // Cấu trúc footer hợp logic hơn
  const footerSections = [
    {
      title: t('about_us') || 'Về chúng tôi',
      links: [
        {
          href: '/about',
          label: t('our_story') || 'Câu chuyện của chúng tôi',
          key: 'about',
        },
        { href: '/team', label: t('our_team') || 'Đội ngũ', key: 'team' },
        {
          href: '/careers',
          label: t('careers') || 'Tuyển dụng',
          key: 'careers',
        },
        { href: '/contact', label: t('contact') || 'Liên hệ', key: 'contact' },
      ],
    },
    {
      title: t('services') || 'Dịch vụ',
      links: [
        {
          href: '/tickets',
          label: t('tickets') || 'Vé xem đua',
          key: 'tickets',
        },
        {
          href: '/hospitality',
          label: t('hospitality') || 'Dịch vụ VIP',
          key: 'hospitality',
        },
        { href: '/store', label: t('merchandise') || 'Cửa hàng', key: 'store' },
        {
          href: '/experiences',
          label: t('experiences') || 'Trải nghiệm',
          key: 'experiences',
        },
      ],
    },
    {
      title: t('support') || 'Hỗ trợ',
      links: [
        {
          href: '/help',
          label: t('help_center') || 'Trung tâm trợ giúp',
          key: 'help',
        },
        { href: '/faq', label: t('faq') || 'Câu hỏi thường gặp', key: 'faq' },
        {
          href: '/customer-service',
          label: t('customer_service') || 'Chăm sóc khách hàng',
          key: 'customer_service',
        },
        { href: '/feedback', label: t('feedback') || 'Góp ý', key: 'feedback' },
      ],
    },
    {
      title: t('legal') || 'Pháp lý',
      links: [
        {
          href: '/terms-of-service',
          label: t('terms_of_service') || 'Điều khoản dịch vụ',
          key: 'terms',
        },
        {
          href: '/privacy-policy',
          label: t('privacy_policy') || 'Chính sách bảo mật',
          key: 'privacy',
        },
        {
          href: '/cookie-policy',
          label: t('cookie_policy') || 'Chính sách cookie',
          key: 'cookies',
        },
        {
          href: '/refund-policy',
          label: t('refund_policy') || 'Chính sách hoàn tiền',
          key: 'refund',
        },
      ],
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full mt-auto bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-t border-gray-200 dark:border-gray-700 backdrop-blur-sm">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-blue-500/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-center md:text-left">
          {/* Enhanced Logo + Description Section */}
          <div className="lg:col-span-1 space-y-6 flex flex-col items-center md:items-start">
            <Link
              href="/"
              className="group relative inline-block hover:scale-105 transition-transform duration-300"
              aria-label="Trang chủ"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-red-500 to-blue-600 rounded-lg opacity-0 group-hover:opacity-20 blur transition-all duration-300"></div>
              <div className="relative">
                <Image
                  src="/images/F1.jpg"
                  alt="F1 Logo"
                  width={120}
                  height={40}
                  className="object-contain dark:hidden"
                  priority
                />
                <Image
                  src="/images/F1.jpg"
                  alt="F1 Logo"
                  width={120}
                  height={40}
                  className="object-contain hidden dark:block"
                  priority
                />
              </div>
            </Link>

            <div className="space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-xs">
                {t('company_description') ||
                  'Trải nghiệm đua xe F1 đỉnh cao với các dịch vụ chất lượng nhất.'}
              </p>
              <div className="w-16 h-0.5 bg-gradient-to-r from-red-500 to-blue-500 mx-auto md:mx-0"></div>
            </div>
          </div>

          {/* Enhanced Footer Sections */}
          {footerSections.map((section, index) => (
            <LinkSection
              key={section.title || index}
              title={section.title}
              links={section.links}
            />
          ))}
        </div>
      </div>

      {/* Enhanced Social Media Section */}
      <div className="relative border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center space-y-6">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              {t('follow_us') ||
                'Theo dõi chúng tôi để cập nhật tin tức mới nhất'}
            </p>

            <div className="flex justify-center gap-4">
              {SOCIAL_LINKS.map(({ href, icon: Icon, label, color }) => (
                <Link
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative p-3 rounded-full bg-white dark:bg-gray-700 shadow-md hover:shadow-xl text-gray-600 dark:text-gray-300 ${color} text-lg transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2`}
                  aria-label={`Truy cập trang ${label} của chúng tôi`}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Icon className="relative z-10" />
                </Link>
              ))}
            </div>

            {/* Copyright notice */}
            <div className="text-center space-y-2">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                © {currentYear} {t('company_name') || 'F1 Racing'}.{' '}
                {t('all_rights_reserved') || 'Tất cả quyền được bảo lưu'}.
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                {t('powered_by') || 'Được phát triển bởi'}{' '}
                <span className="font-semibold">Your Company</span>
              </p>
            </div>

            {/* Decorative elements */}
            <div className="flex items-center space-x-4">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600"></div>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated bottom accent */}
      <div className="h-1 bg-gradient-to-r from-red-500 via-blue-500 to-red-500 animate-pulse"></div>
    </footer>
  );
}
