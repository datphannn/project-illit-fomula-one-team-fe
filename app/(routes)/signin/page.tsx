'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuthStore } from '@/lib/store/authStore';
import logoLight from '@/assets/images/dark.png';

export default function SignInPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login, isAuthenticated, checkAuth } = useAuthStore();

  // Check auth status on mount
  useEffect(() => {
    checkAuth();
    // Nếu đã đăng nhập, redirect về trang tương ứng
    if (isAuthenticated) {
      const userJson = localStorage.getItem('f1_current_user');
      if (userJson) {
        try {
          const user = JSON.parse(userJson);
          if (user.email === 'admin@f1.com') {
            router.push('/admin');
          } else {
            router.push('/');
          }
        } catch {
          router.push('/');
        }
      } else {
        router.push('/');
      }
    }
  }, [isAuthenticated, router, checkAuth]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Sử dụng login từ authStore
      await login(formData.email, formData.password);

      // Lấy user từ localStorage để check role
      const userJson = localStorage.getItem('f1_current_user');
      if (userJson) {
        const user = JSON.parse(userJson);

        // Redirect dựa trên email (admin hay user thường)
        if (user.email === 'admin@f1.com') {
          router.push('/admin');
        } else {
          router.push('/');
        }
      } else {
        router.push('/');
      }
    } catch (err: any) {
      console.error('Login error:', err);

      // Xử lý lỗi cụ thể hơn
      if (err.message === 'Invalid email or password') {
        setError('Invalid email or password. Please try again.');
      } else if (err.message?.includes('network')) {
        setError('Network error. Please check your connection.');
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-[#15151e] py-4">
        <div className="container mx-auto px-4">
          <Link href="/">
            <Image
              src={logoLight}
              alt="F1 Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex">
            <button className="px-8 py-4 text-white font-bold border-b-4 border-red-600 bg-gray-600">
              Sign in
            </button>
            <Link
              href="/register"
              className="px-8 py-4 text-white font-bold hover:bg-gray-600 transition-colors"
            >
              Register
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 uppercase">
            Sign In
          </h1>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              <p className="font-medium">Error</p>
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={e =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                required
                disabled={isLoading}
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={formData.password}
                  onChange={e =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent pr-12"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Forgotten Password */}
            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-sm text-gray-700 hover:text-red-600 underline font-medium"
              >
                Forgotten password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 uppercase disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>

            {/* Register Link */}
            <div className="text-center pt-4">
              <span className="text-gray-700">Don't have an account yet? </span>
              <Link
                href="/register"
                className="text-gray-900 hover:text-red-600 font-bold underline"
              >
                Register with F1
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
