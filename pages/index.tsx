import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useGitStore } from '@/store/gitStore';
import Link from 'next/link';
import { GitBranch, Smartphone, Zap, Shield } from 'lucide-react';
import Button from '@/components/ui/Button';

const Home: React.FC = () => {
  const { githubToken } = useGitStore();
  const router = useRouter();

  useEffect(() => {
    if (githubToken) {
      router.push('/dashboard');
    }
  }, [githubToken, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-secondary-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-primary-600 rounded-lg group-hover:bg-primary-700 transition-colors">
                <GitBranch className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-secondary-900">GitWeb</span>
            </Link>
            <Link href="/login">
              <Button variant="primary" size="md">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="text-center space-y-6 mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-600 rounded-2xl">
            <GitBranch className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-900 leading-tight">
            Git on Your Phone
          </h1>
          <p className="text-lg sm:text-xl text-secondary-600 max-w-2xl mx-auto">
            Push, pull, commit, and manage your GitHub repositories directly from your mobile device with a beautiful, intuitive interface.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/login">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Start Using GitWeb
              </Button>
            </Link>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Learn More
              </Button>
            </a>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 py-16">
          <div className="bg-white rounded-2xl p-8 border border-secondary-100 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <Smartphone className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">Mobile First</h3>
            <p className="text-secondary-600">
              Fully optimized for mobile devices. Work on your code from anywhere, anytime.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-secondary-100 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">Installable</h3>
            <p className="text-secondary-600">
              Install on your home screen like a native app. Works offline and online.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-secondary-100 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">Secure</h3>
            <p className="text-secondary-600">
              Your token is stored locally. We never access your personal data.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-secondary-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-secondary-900 mb-12 text-center">
            Everything You Need
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                ✓
              </div>
              <div>
                <h3 className="font-semibold text-secondary-900">Git Commits</h3>
                <p className="text-secondary-600">Stage files and create commits with custom messages</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                ✓
              </div>
              <div>
                <h3 className="font-semibold text-secondary-900">Push & Pull</h3>
                <p className="text-secondary-600">Synchronize your work with GitHub instantly</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                ✓
              </div>
              <div>
                <h3 className="font-semibold text-secondary-900">Branch Management</h3>
                <p className="text-secondary-600">Switch between branches and create new ones</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                ✓
              </div>
              <div>
                <h3 className="font-semibold text-secondary-900">Commit History</h3>
                <p className="text-secondary-600">View your commit history and track changes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-12 sm:p-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Git on the Go?
          </h2>
          <p className="text-primary-100 mb-8 max-w-xl mx-auto">
            Start managing your GitHub repositories from your phone today. It only takes a few seconds to get started.
          </p>
          <Link href="/login">
            <Button variant="primary" size="lg" className="bg-white text-primary-600 hover:bg-secondary-50">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-secondary-400">
            Built with ❤️ for mobile developers
          </p>
          <p className="text-xs text-secondary-500 mt-2">
            © 2024 GitWeb. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
