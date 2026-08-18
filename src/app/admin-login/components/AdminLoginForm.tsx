'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

// Backend integration point: replace with real authentication API call
const MOCK_EMAIL = 'admin@edpca.eu';
const MOCK_PASSWORD = 'SecureAdmin@2026';

export default function AdminLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<LoginForm>();

  const onSubmit = (data: LoginForm) => {
    setLoading(true);
    setTimeout(() => {
      if (data.email === MOCK_EMAIL && data.password === MOCK_PASSWORD) {
        toast.success('Authentication successful. Welcome, Administrator.');
        router.push('/admin-dashboard');
      } else {
        setError('email', { message: 'Invalid credentials — use the demo accounts below to sign in' });
        setLoading(false);
      }
    }, 1200);
  };

  const autofill = () => {
    setValue('email', MOCK_EMAIL);
    setValue('password', MOCK_PASSWORD);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-primary p-10 xl:p-14 hero-pattern relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary/90" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <AppLogo size={40} />
            <div>
              <p className="text-primary-foreground font-bold text-lg leading-tight">EDPCA</p>
              <p className="text-primary-foreground/60 text-xs">European Drug Prevention & Compliance Agency</p>
            </div>
          </div>

          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 text-accent-foreground/80 text-xs font-medium px-3 py-1.5 rounded-full mb-5">
              <Icon name="ShieldCheckIcon" size={14} />
              Restricted Access — Authorised Personnel Only
            </div>
            <h1 className="text-3xl xl:text-4xl font-bold text-primary-foreground leading-tight mb-4">
              Administrator Console
            </h1>
            <p className="text-primary-foreground/65 text-base leading-relaxed">
              Secure case management, evidence handling, and public notice administration for the EDPCA agency.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { icon: 'FolderOpenIcon', label: 'Case Management', desc: 'Create, manage and track all cases' },
              { icon: 'DocumentTextIcon', label: 'Public Notices', desc: 'Control notice publication' },
              { icon: 'ChartBarIcon', label: 'Reports & Analytics', desc: 'Case statistics and trends' },
            ].map((item) => (
              <div key={`feature-${item.label}`} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center flex-shrink-0">
                  <Icon name={item.icon as Parameters<typeof Icon>[0]['name']} size={20} className="text-primary-foreground/80" />
                </div>
                <div>
                  <p className="text-primary-foreground font-medium text-sm">{item.label}</p>
                  <p className="text-primary-foreground/50 text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-primary-foreground/30 text-xs">
            © 2026 EDPCA — European Drug Prevention & Compliance Agency. Unauthorised access is prohibited and may be subject to prosecution.
          </p>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex flex-col justify-center items-center bg-background px-6 py-10">
        {/* Mobile Logo */}
        <div className="lg:hidden flex items-center gap-3 mb-8">
          <AppLogo size={36} />
          <div>
            <p className="text-primary font-bold text-base">EDPCA</p>
            <p className="text-muted-foreground text-xs">Administrator Login</p>
          </div>
        </div>

        <div className="w-full max-w-md">
          <div className="mb-7">
            <h2 className="text-2xl font-bold text-primary mb-1">Sign In</h2>
            <p className="text-muted-foreground text-sm">Enter your administrator credentials to access the secure console.</p>
          </div>

          {/* Security Notice */}
          <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6">
            <Icon name="ExclamationTriangleIcon" size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-amber-800 text-xs leading-relaxed">
              This is a restricted administrative system. Unauthorised access attempts are logged. Session activity is monitored.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                Administrator Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="admin@edpca.eu"
                className={`w-full px-4 py-3 border rounded bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${errors.email ? 'border-accent' : 'border-border'}`}
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' },
                })}
              />
              {errors.email && (
                <p className="text-accent text-xs mt-1.5 flex items-center gap-1">
                  <Icon name="ExclamationCircleIcon" size={13} />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className={`w-full px-4 py-3 pr-11 border rounded bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${errors.password ? 'border-accent' : 'border-border'}`}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 8, message: 'Password must be at least 8 characters' },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <Icon name={showPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={18} />
                </button>
              </div>
              {errors.password && (
                <p className="text-accent text-xs mt-1.5 flex items-center gap-1">
                  <Icon name="ExclamationCircleIcon" size={13} />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border text-primary focus:ring-ring"
                  {...register('remember')}
                />
                <span className="text-sm text-muted-foreground">Keep me signed in</span>
              </label>
              <button type="button" className="text-sm text-primary hover:text-secondary font-medium transition-colors">
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-primary-foreground font-semibold py-3 rounded transition-all duration-150 active:scale-95 disabled:opacity-60 text-sm"
            >
              {loading ? (
                <>
                  <Icon name="ArrowPathIcon" size={18} className="animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <Icon name="LockClosedIcon" size={18} />
                  Sign In to Admin Console
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 border border-border rounded-lg overflow-hidden">
            <div className="bg-muted px-4 py-2.5 flex items-center justify-between border-b border-border">
              <div className="flex items-center gap-2">
                <Icon name="KeyIcon" size={14} className="text-muted-foreground" />
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Demo Credentials</span>
              </div>
              <button
                onClick={autofill}
                className="text-xs text-primary hover:text-secondary font-medium flex items-center gap-1 transition-colors"
              >
                <Icon name="ClipboardDocumentIcon" size={13} />
                Autofill
              </button>
            </div>
            <div className="px-4 py-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground w-16">Email</span>
                <span className="font-mono-data text-xs text-foreground">{MOCK_EMAIL}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground w-16">Password</span>
                <span className="font-mono-data text-xs text-foreground">{MOCK_PASSWORD}</span>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Not an administrator?{' '}
            <a href="/" className="text-primary hover:text-secondary font-medium transition-colors">
              Return to public website
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}