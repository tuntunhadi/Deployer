import React from 'react';
import Link from 'next/link';
import { GitBranch, LogOut, Menu, X } from 'lucide-react';
import { useGitStore } from '@/store/gitStore';
import { useState } from 'react';

const Navbar: React.FC = () => {
  const { githubToken, clearGithubToken, currentRepo, currentBranch } = useGitStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    clearGithubToken();
    window.location.href = '/';
  };

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-secondary-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-primary-600 rounded-lg group-hover:bg-primary-700 transition-colors">
              <GitBranch className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-secondary-900">GitWeb</h1>
              <p className="text-xs text-secondary-500">Mobile Git Client</p>
            </div>
          </Link>

          {/* Center - Repo Info */}
          {currentRepo && (
            <div className="hidden md:flex items-center gap-4">
              <div className="text-center">
                <p className="text-xs text-secondary-500">Repository</p>
                <p className="text-sm font-medium text-secondary-900">{currentRepo.name}</p>
              </div>
              <div className="w-px h-8 bg-secondary-100" />
              <div className="text-center">
                <p className="text-xs text-secondary-500">Branch</p>
                <p className="text-sm font-medium text-primary-600 flex items-center gap-1">
                  <GitBranch className="w-3.5 h-3.5" /> {currentBranch}
                </p>
              </div>
            </div>
          )}

          {/* Right - Auth Menu */}
          <div className="flex items-center gap-4">
            {githubToken ? (
              <>
                <button
                  onClick={handleLogout}
                  className="hidden sm:flex items-center gap-2 px-3 py-2 text-secondary-600 hover:text-secondary-900 transition-colors text-sm font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="sm:hidden p-2 text-secondary-600 hover:text-secondary-900"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </>
            ) : null}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && githubToken && (
          <div className="sm:hidden pb-4 border-t border-secondary-100 pt-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 text-secondary-600 hover:text-secondary-900 transition-colors text-sm font-medium"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
