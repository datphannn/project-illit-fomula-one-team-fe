'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaEye, FaEyeSlash, FaCheckCircle } from 'react-icons/fa';
import { useAuthStore } from '@/lib/store/authStore';
import logoLight from '@/assets/images/dark.png';
import logoDark from '@/assets/images/dark.png';

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    country: '',
    email: '',
    password: '',
    marketingEmails: false,
    agreeTerms: false,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register, isAuthenticated, checkAuth } = useAuthStore();

  // Check auth status on mount
  useEffect(() => {
    checkAuth();
    // Nếu đã đăng nhập, redirect về homepage
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router, checkAuth]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate form
    if (!formData.agreeTerms) {
      setError('You must agree to the Terms and Conditions');
      return;
    }

    if (!isPasswordValid) {
      setError('Password does not meet all requirements');
      return;
    }

    setIsLoading(true);

    try {
      // Use register from authStore
      await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        title: formData.title,
        dateOfBirth: formData.dateOfBirth,
        country: formData.country,
      });

      // Show success message
      setSuccess('Account created successfully! Redirecting to homepage...');

      // Redirect after delay
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (err: any) {
      console.error('Registration error:', err);

      // Handle different error types
      if (err.message === 'Email already exists') {
        setError(
          'This email is already registered. Please use a different email or sign in.'
        );
      } else if (err.message?.includes('network')) {
        setError('Network error. Please check your connection.');
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const passwordRequirements = {
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
    length: formData.password.length >= 8 && formData.password.length <= 30,
    special: /[!@#$%^&*(),.?":{}|<>+\-=]/.test(formData.password),
  };

  const isPasswordValid = Object.values(passwordRequirements).every(Boolean);

  // Country options
  const countryOptions = [
    { value: '', label: 'Select' },
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'vn', label: 'Vietnam' },
    { value: 'au', label: 'Australia' },
    { value: 'de', label: 'Germany' },
    { value: 'it', label: 'Italy' },
    { value: 'fr', label: 'France' },
    { value: 'es', label: 'Spain' },
    { value: 'jp', label: 'Japan' },
    { value: 'br', label: 'Brazil' },
    { value: 'ca', label: 'Canada' },
  ];

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
            <Link
              href="/signin"
              className="px-8 py-4 text-white font-bold hover:bg-gray-600 transition-colors"
            >
              Sign in
            </Link>
            <button className="px-8 py-4 text-white font-bold border-b-4 border-red-600 bg-gray-600">
              Register
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg border border-gray-300 p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 uppercase">
              Create Account
            </h1>
            <p className="text-gray-600 mb-8">
              Join the F1 community and get access to exclusive content
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                <p className="font-medium">Registration Error</p>
                <p>{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FaCheckCircle />
                  <p className="font-medium">Success!</p>
                </div>
                <p>{success}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information Section */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">
                  Personal Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Title *
                    </label>
                    <select
                      value={formData.title}
                      onChange={e =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent bg-white"
                      required
                      disabled={isLoading}
                    >
                      <option value="">Select</option>
                      <option value="mr">Mr</option>
                      <option value="mrs">Mrs</option>
                      <option value="ms">Ms</option>
                      <option value="dr">Dr</option>
                    </select>
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Country of residence *
                    </label>
                    <select
                      value={formData.country}
                      onChange={e =>
                        setFormData({ ...formData, country: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent bg-white"
                      required
                      disabled={isLoading}
                    >
                      {countryOptions.map(country => (
                        <option key={country.value} value={country.value}>
                          {country.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* First Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      First name *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={e =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      placeholder="First name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Last name *
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={e =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      placeholder="Last name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Date of birth
                    </label>
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          dateOfBirth: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                      disabled={isLoading}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Format: YYYY-MM-DD
                    </p>
                  </div>
                </div>
              </div>

              {/* Account Information Section */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">
                  Account Information
                </h2>

                <div className="space-y-6">
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Email address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={e =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        placeholder="Create a strong password"
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

                    {/* Password Requirements */}
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="font-medium text-gray-900 mb-3">
                        Password Requirements:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {Object.entries(passwordRequirements).map(
                          ([key, isValid]) => {
                            const labels: Record<string, string> = {
                              uppercase: 'At least one uppercase letter',
                              lowercase: 'At least one lowercase letter',
                              number: 'At least one number',
                              length: '8-30 characters long',
                              special:
                                'At least one special character (!@#$%^&*)',
                            };

                            return (
                              <div
                                key={key}
                                className="flex items-center gap-2"
                              >
                                {isValid ? (
                                  <FaCheckCircle className="text-green-500" />
                                ) : (
                                  <div className="w-4 h-4 rounded-full border border-gray-400"></div>
                                )}
                                <span
                                  className={`text-sm ${isValid ? 'text-green-600 font-medium' : 'text-gray-600'}`}
                                >
                                  {labels[key]}
                                </span>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preferences Section */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">
                  Preferences
                </h2>

                <div className="space-y-4">
                  {/* Marketing Emails Checkbox */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="marketing"
                      checked={formData.marketingEmails}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          marketingEmails: e.target.checked,
                        })
                      }
                      className="mt-1 w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-600"
                      disabled={isLoading}
                    />
                    <label
                      htmlFor="marketing"
                      className="text-sm text-gray-700"
                    >
                      I want to receive emails and other marketing
                      communications from F1® including updates, offers, and
                      information about our products and promotions. F1® will
                      process your data in accordance with our{' '}
                      <Link
                        href="/privacy"
                        className="text-red-600 hover:underline font-medium"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </label>
                  </div>

                  {/* Terms Checkbox */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={formData.agreeTerms}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          agreeTerms: e.target.checked,
                        })
                      }
                      className="mt-1 w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-600"
                      required
                      disabled={isLoading}
                    />
                    <label htmlFor="terms" className="text-sm text-gray-700">
                      By clicking on register, I agree that I have read and
                      agree to the{' '}
                      <Link
                        href="/terms"
                        className="text-red-600 hover:underline font-medium"
                      >
                        Terms and Conditions
                      </Link>
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t">
                <div className="text-sm text-gray-600">
                  <p>
                    Already have an account?{' '}
                    <Link
                      href="/signin"
                      className="text-red-600 hover:underline font-medium"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={
                    isLoading || !isPasswordValid || !formData.agreeTerms
                  }
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 uppercase disabled:bg-gray-400 disabled:cursor-not-allowed min-w-[200px]"
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
