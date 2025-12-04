'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { register } from '@/lib/services/authService';
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
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.agreeTerms) {
      setError('You must agree to the Terms and Conditions');
      return;
    }

    if (!isPasswordValid) {
      setError('Password does not meet requirements');
      return;
    }

    setIsLoading(true);

    try {
      // Call register service - it will handle auth store and auto login
      await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        title: formData.title,
        dateOfBirth: formData.dateOfBirth,
        country: formData.country,
      });

      // Redirect to home on success
      router.push('/');
    } catch (err: any) {
      // Handle different error types
      if (err.response?.status === 409) {
        setError('Email already exists');
      } else if (err.response?.status === 400) {
        setError(err.response?.data?.message || 'Invalid registration data');
      } else if (err.message) {
        setError(err.message);
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
            <h1 className="text-3xl font-bold text-gray-900 mb-8 uppercase">
              Create Account
            </h1>

            {error && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Title
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

              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  First name
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
                  Last name
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
                  type="text"
                  value={formData.dateOfBirth}
                  onChange={e =>
                    setFormData({ ...formData, dateOfBirth: e.target.value })
                  }
                  placeholder="(MM/DD/YYYY)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Country of residence
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
                  <option value="">Select</option>
                  <option value="us">United States</option>
                  <option value="uk">United Kingdom</option>
                  <option value="vn">Vietnam</option>
                  <option value="au">Australia</option>
                  <option value="de">Germany</option>
                  <option value="it">Italy</option>
                  <option value="fr">France</option>
                  <option value="es">Spain</option>
                </select>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={e =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="••••••••••"
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
                <div className="mt-3 text-xs text-gray-600 space-y-1">
                  <p className="font-medium mb-2">Password must contain</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${passwordRequirements.uppercase ? 'bg-green-500' : 'bg-gray-300'}`}
                      />
                      <span>Uppercase</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${passwordRequirements.lowercase ? 'bg-green-500' : 'bg-gray-300'}`}
                      />
                      <span>Lowercase</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${passwordRequirements.number ? 'bg-green-500' : 'bg-gray-300'}`}
                      />
                      <span>Number</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${passwordRequirements.length ? 'bg-green-500' : 'bg-gray-300'}`}
                      />
                      <span>8-30 characters</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <span
                      className={`w-2 h-2 rounded-full ${passwordRequirements.special ? 'bg-green-500' : 'bg-gray-300'}`}
                    />
                    <span>Any of !, @, #, %, ^, &, *, +, -, =</span>
                  </div>
                </div>
              </div>

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
                <label htmlFor="marketing" className="text-sm text-gray-700">
                  I want to receive emails and other marketing communications
                  from F1® including updates, offers, and information about our
                  products and promotions. F1® will process your data in
                  accordance with our{' '}
                  <Link href="/privacy" className="text-red-600 underline">
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
                    setFormData({ ...formData, agreeTerms: e.target.checked })
                  }
                  className="mt-1 w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-600"
                  required
                  disabled={isLoading}
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  By clicking on register, I agree that I have read and agree to
                  the{' '}
                  <Link href="/terms" className="text-red-600 underline">
                    Terms and Conditions
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={isLoading || !isPasswordValid}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 uppercase disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Registering...' : 'Register'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
