import React, { useState, useEffect } from 'react';
import { Plus, RefreshCw, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import { useGitStore } from '@/store/gitStore';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Dashboard: React.FC = () => {
  const { githubToken, repositories, setRepositories, setCurrentRepo, error, setError, success, setSuccess } = useGitStore();
  const [isLoading, setIsLoading] = useState(true);
  const [showCloneModal, setShowCloneModal] = useState(false);
  const [cloneUrl, setCloneUrl] = useState('');
  const [cloneError, setCloneError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!githubToken) {
      router.push('/login');
      return;
    }

    fetchRepositories();
  }, [githubToken, router]);

  const fetchRepositories = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('https://api.github.com/user/repos?sort=updated&per_page=30', {
        headers: {
          Authorization: `token ${githubToken}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch repositories');

      const data = await response.json();
      setRepositories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch repositories');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloneRepository = async (e: React.FormEvent) => {
    e.preventDefault();
    setCloneError('');

    try {
      if (!cloneUrl.trim()) {
        throw new Error('Please enter a repository URL');
      }

      // Parse repository URL
      const urlPattern = /github\.com[:/]([^/]+)\/([^/]+)(\.git)?/;
      const match = cloneUrl.match(urlPattern);

      if (!match) {
        throw new Error('Invalid GitHub repository URL');
      }

      const owner = match[1];
      const name = match[2];

      // Fetch repo details
      const response = await fetch(`https://api.github.com/repos/${owner}/${name}`, {
        headers: {
          Authorization: `token ${githubToken}`,
        },
      });

      if (!response.ok) throw new Error('Repository not found');

      const repoData = await response.json();
      setCurrentRepo(repoData);
      
      setSuccess('Repository loaded! Redirecting...');
      setTimeout(() => {
        router.push(`/repo/${owner}/${name}`);
      }, 1000);
    } catch (err) {
      setCloneError(err instanceof Error ? err.message : 'Failed to clone repository');
    }
  };

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900 mb-2">Repositories</h1>
            <p className="text-secondary-600">Select or clone a repository to start working</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={fetchRepositories}
              isLoading={isLoading}
              size="md"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
            <Button
              variant="primary"
              onClick={() => setShowCloneModal(true)}
              size="md"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Clone Repository</span>
            </Button>
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <Alert
            variant="error"
            message={error}
            onClose={() => setError(null)}
          />
        )}
        {success && (
          <Alert
            variant="success"
            message={success}
            onClose={() => setSuccess(null)}
          />
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
          </div>
        )}

        {/* Repositories Grid */}
        {!isLoading && repositories.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {repositories.map((repo) => (
              <Link key={repo.id} href={`/repo/${repo.owner.login}/${repo.name}`}>
                <div className="card p-6 cursor-pointer group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors">
                        {repo.name}
                      </h3>
                      <p className="text-xs text-secondary-500 mt-1">
                        {repo.owner.login}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-secondary-300 group-hover:text-primary-600 transition-colors" />
                  </div>

                  {repo.description && (
                    <p className="text-sm text-secondary-600 mb-4 line-clamp-2">
                      {repo.description}
                    </p>
                  )}

                  <div className="flex items-center gap-4 pt-4 border-t border-secondary-100 text-xs text-secondary-500">
                    <span>⭐ {repo.stargazers_count}</span>
                    <span>🍴 {repo.forks_count}</span>
                    <span>🔔 {repo.watchers_count}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && repositories.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-secondary-400" />
            </div>
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">No Repositories</h3>
            <p className="text-secondary-600 mb-6">Clone a repository to get started</p>
            <Button onClick={() => setShowCloneModal(true)}>
              Clone Repository
            </Button>
          </div>
        )}
      </main>

      {/* Clone Modal */}
      <Modal
        isOpen={showCloneModal}
        title="Clone Repository"
        onClose={() => {
          setShowCloneModal(false);
          setCloneError('');
          setCloneUrl('');
        }}
      >
        <form onSubmit={handleCloneRepository} className="space-y-4">
          {cloneError && (
            <Alert variant="error" message={cloneError} />
          )}
          <Input
            label="Repository URL"
            placeholder="https://github.com/username/repository"
            value={cloneUrl}
            onChange={(e) => setCloneUrl(e.target.value)}
            helperText="Enter the HTTPS URL of the GitHub repository"
          />
          <div className="flex gap-3 justify-end">
            <Button
              variant="secondary"
              onClick={() => {
                setShowCloneModal(false);
                setCloneError('');
                setCloneUrl('');
              }}
            >
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Clone
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Dashboard;
