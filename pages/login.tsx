import React, { useState, useEffect } from 'react';
import { GitBranch, Github, AlertCircle } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import { useGitStore } from '@/store/gitStore';
import { useRouter } from 'next/router';

const Login: React.FC = () => {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setGithubToken, githubToken } = useGitStore();
  const router = useRouter();

  useEffect(() => {
    if (githubToken) {
      router.push('/dashboard');
    }
  }, [githubToken, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!token.trim()) {
        throw new Error('Please enter a GitHub token');
      }

      if (!token.startsWith('ghp_') && !token.startsWith('github_pat_')) {
        throw new Error('Invalid GitHub token format');
      }

      // Verify token by making a test request
      const response = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `token ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Invalid GitHub token');
      }

      setGithubToken(token);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-2xl mb-4">
            <GitBranch className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">GitWeb</h1>
          <p className="text-secondary-600">Mobile Git Client</p>
          <p className="text-sm text-secondary-500 mt-2">Git operations from your phone</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-secondary-900 mb-2">Login with GitHub</h2>
              <p className="text-sm text-secondary-600">
                Enter your GitHub personal access token to get started
              </p>
            </div>

            {error && (
              <Alert
                variant="error"
                message={error}
                onClose={() => setError('')}
              />
            )}

            <Input
              label="GitHub Personal Access Token"
              type="password"
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              helperText="Keep this token safe and never share it"
              error={error ? 'Invalid token' : ''}
            />

            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full flex items-center justify-center gap-2"
            >
              <Github className="w-5 h-5" />
              Login with GitHub
            </Button>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-700">
                  <p className="font-medium mb-1">How to create a token:</p>
                  <ol className="list-decimal list-inside space-y-1 text-xs">
                    <li>Go to GitHub Settings → Developer settings</li>
                    <li>Click "Personal access tokens"</li>
                    <li>Generate new token with repo scope</li>
                    <li>Copy and paste it here</li>
                  </ol>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-secondary-600 mt-6">
          Your token is stored locally and never shared
        </p>
      </div>
    </div>
  );
};

export default Login;
