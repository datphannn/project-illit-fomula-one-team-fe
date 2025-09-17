'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useLocale } from '@/lib/utils/locale';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaThreads,
  FaEnvelope,
  FaPhone,
} from 'react-icons/fa6';
import { FaMapMarkerAlt } from 'react-icons/fa';
//  Import logo từ assets
import LogoLight from '@/assets/images/logo-light.jpg';
import LogoDark from '@/assets/images/logo-dark.jpg';

// Social links
const SOCIAL_LINKS = [
  {
    href: 'https://facebook.com/f1',
    icon: FaFacebookF,
    label: 'Facebook',
    color: 'hover:text-blue-600',
  },
  {
    href: 'https://twitter.com/f1',
    icon: FaTwitter,
    label: 'Twitter',
    color: 'hover:text-sky-500',
  },
  {
    href: 'https://instagram.com/f1',
    icon: FaInstagram,
    label: 'Instagram',
    color: 'hover:text-pink-600',
  },
  {
    href: 'https://youtube.com/f1',
    icon: FaYoutube,
    label: 'YouTube',
    color: 'hover:text-red-600',
  },
  {
    href: 'https://tiktok.com/@f1',
    icon: FaTiktok,
    label: 'TikTok',
    color: 'hover:text-gray-800 dark:hover:text-white',
  },
  {
    href: 'https://threads.net/@f1',
    icon: FaThreads,
    label: 'Threads',
    color: 'hover:text-gray-900 dark:hover:text-gray-100',
  },
] as const;

// Contact info
const CONTACT_INFO = [
  {
    icon: FaEnvelope,
    label: 'Email',
    value: 'info@f1racing.com',
    href: 'mailto:info@f1racing.com',
  },
  {
    icon: FaPhone,
    label: 'Phone',
    value: '+84 123 456 789',
    href: 'tel:+84123456789',
  },
  {
    icon: FaMapMarkerAlt,
    label: 'Address',
    value: 'Ho Chi Minh City, Vietnam',
    href: 'https://maps.google.com',
  },
] as const;

type LinkItem = {
  href: string;
  label: string;
  key?: string;
  external?: boolean;
};

type LinkSectionProps = { title: string; links: LinkItem[]; locale: string };

const LinkSection = ({ title, links, locale }: LinkSectionProps) => (
  <div className="space-y-4 group">
    <h3 className="font-bold text-lg text-gray-900 dark:text-white relative">
      {title}
      <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-blue-500 transition-all duration-300 group-hover:w-full"></div>
    </h3>
    <ul className="space-y-3">
      {links.map(({ href, label, key, external }) => {
        const fullHref = external ? href : `/${locale}${href}`;
        return (
          <li key={key || href}>
            <Link
              href={fullHref}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className="text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-all duration-300 ease-out hover:translate-x-1 inline-flex items-center group/link text-sm"
            >
              <span className="relative">
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover/link:w-full"></span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  </div>
);

export default function Footer() {
  const t = useTranslations('footer');
  const { locale } = useLocale();

  const footerSections = [
    {
      title: t('navigation') || 'Điều hướng',
      links: [
        { href: '', label: t('home') || 'Trang chủ', key: 'home' },
        { href: '/news', label: t('news') || 'Tin tức', key: 'news' },
        {
          href: '/schedule',
          label: t('schedule') || 'Lịch đấu',
          key: 'schedule',
        },
        { href: '/results', label: t('results') || 'Kết quả', key: 'results' },
        { href: '/feedback', label: t('feedback') || 'Góp ý', key: 'feedback' },
      ],
    },
    {
      title: t('about') || 'Về chúng tôi',
      links: [
        { href: '/about', label: t('our_story') || 'Câu chuyện', key: 'about' },
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
      title: t('support') || 'Hỗ trợ',
      links: [
        {
          href: '/help',
          label: t('help_center') || 'Trung tâm trợ giúp',
          key: 'help',
        },
        { href: '/faq', label: t('faq') || 'FAQ', key: 'faq' },
        {
          href: '/customer-service',
          label: t('customer_service') || 'CSKH',
          key: 'customer_service',
        },
        {
          href: '/subscribe',
          label: t('subscribe') || 'Đăng ký',
          key: 'subscribe',
        },
      ],
    },
    {
      title: t('legal') || 'Pháp lý',
      links: [
        {
          href: '/terms',
          label: t('terms_of_service') || 'Điều khoản',
          key: 'terms',
        },
        {
          href: '/privacy',
          label: t('privacy_policy') || 'Bảo mật',
          key: 'privacy',
        },
        {
          href: '/cookies',
          label: t('cookie_policy') || 'Cookie',
          key: 'cookies',
        },
        { href: '/sitemap', label: t('sitemap') || 'Sitemap', key: 'sitemap' },
      ],
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full mt-auto bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-t border-gray-200 dark:border-gray-700">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-blue-500/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 text-center md:text-left">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6 flex flex-col items-center md:items-start">
            <Link
              href={`/${locale}`}
              className="group relative inline-block hover:scale-105 transition-transform duration-300"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-red-500 to-blue-600 rounded-lg opacity-0 group-hover:opacity-20 blur transition-all duration-300"></div>
              <div className="relative flex items-center">
                {/* Light Logo */}
                <Image
                  src={LogoLight}
                  alt="F1 Logo Light"
                  width={140}
                  height={48}
                  className="block dark:hidden object-contain"
                  priority
                />
                {/* Dark Logo */}
                <Image
                  src={LogoDark}
                  alt="F1 Logo Dark"
                  width={140}
                  height={48}
                  className="hidden dark:block object-contain"
                  priority
                />
              </div>
            </Link>

            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm">
                {t('company_description') ||
                  'Trải nghiệm Formula 1 đỉnh cao với tin tức, kết quả và lịch thi đấu cập nhật mới nhất.'}
              </p>

              {/* Contact Info */}
              <div className="space-y-2">
                {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={
                      href.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors group"
                  >
                    <Icon className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
                    <span>{value}</span>
                  </a>
                ))}
              </div>

              <div className="w-16 h-0.5 bg-gradient-to-r from-red-500 to-blue-500 mx-auto md:mx-0"></div>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <LinkSection
              key={section.title || index}
              title={section.title}
              links={section.links}
              locale={locale}
            />
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center space-y-6">
            {/* Social Media */}
            <div className="text-center space-y-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                {t('follow_us') || 'Theo dõi chúng tôi'}
              </p>
              <div className="flex justify-center gap-4">
                {SOCIAL_LINKS.map(({ href, icon: Icon, label, color }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative p-3 rounded-full bg-white dark:bg-gray-700 shadow-md hover:shadow-xl text-gray-600 dark:text-gray-300 ${color} text-lg transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-1`}
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Icon className="relative z-10" />
                  </a>
                ))}
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center space-y-2">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                © {currentYear} {t('company_name') || 'ILLIT F1 Racing'}.{' '}
                {t('all_rights_reserved') || 'Tất cả quyền được bảo lưu'}.
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                {t('made_with') || 'Được tạo với'} ❤️{' '}
                {t('in_vietnam') || 'tại Việt Nam'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-1 bg-gradient-to-r from-red-500 via-blue-500 to-red-500 opacity-80"></div>
    </footer>
  );
}
