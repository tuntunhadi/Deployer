import React, { useState, useEffect } from 'react';
import {
  GitBranch,
  Plus,
  Upload,
  Download,
  Save,
  ChevronDown,
  File,
  Folder,
  RefreshCw,
  ChevronRight,
} from 'lucide-react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Alert from '@/components/ui/Alert';
import Modal from '@/components/ui/Modal';
import { useGitStore } from '@/store/gitStore';

const Repository: React.FC = () => {
  const router = useRouter();
  const { owner, repo } = router.query;
  const {
    githubToken,
    setCurrentRepo,
    setCurrentBranch,
    currentBranch,
    stagedFiles,
    addStagedFile,
    removeStagedFile,
    clearStagedFiles,
    setError,
    setSuccess,
    error,
    success,
  } = useGitStore();

  const [files, setFiles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [branches, setBranches] = useState<string[]>([]);
  const [showCommitModal, setShowCommitModal] = useState(false);
  const [commitMessage, setCommitMessage] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [isCommitting, setIsCommitting] = useState(false);
  const [showBranchMenu, setShowBranchMenu] = useState(false);

  useEffect(() => {
    if (owner && repo) {
      fetchRepository();
      fetchFiles();
      fetchBranches();
    }
  }, [owner, repo, githubToken]);

  const fetchRepository = async () => {
    try {
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
        headers: { Authorization: `token ${githubToken}` },
      });
      if (!response.ok) throw new Error('Failed to fetch repository');
      const data = await response.json();
      setCurrentRepo(data);
      setCurrentBranch(data.default_branch || 'main');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch repository');
    }
  };

  const fetchFiles = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents?ref=${currentBranch}`,
        { headers: { Authorization: `token ${githubToken}` } }
      );
      if (!response.ok) throw new Error('Failed to fetch files');
      const data = await response.json();
      setFiles(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch files');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBranches = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/branches`,
        { headers: { Authorization: `token ${githubToken}` } }
      );
      if (!response.ok) throw new Error('Failed to fetch branches');
      const data = await response.json();
      setBranches(data.map((b: any) => b.name));
    } catch (err) {
      console.error('Failed to fetch branches:', err);
    }
  };

  const handleCommit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCommitting(true);

    try {
      if (!commitMessage.trim()) {
        throw new Error('Commit message is required');
      }
      if (stagedFiles.length === 0) {
        throw new Error('No files staged');
      }

      setSuccess('Commit successful! (Mock operation)');
      setShowCommitModal(false);
      setCommitMessage('');
      clearStagedFiles();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Commit failed');
    } finally {
      setIsCommitting(false);
    }
  };

  const handlePush = async () => {
    try {
      setSuccess('Push successful! (Mock operation)');
    } catch (err) {
      setError('Push failed');
    }
  };

  const handlePull = async () => {
    try {
      await fetchFiles();
      setSuccess('Pull successful!');
    } catch (err) {
      setError('Pull failed');
    }
  };

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold text-secondary-900">{repo}</h1>
              <span className="text-sm bg-secondary-100 text-secondary-700 px-2.5 py-1 rounded-full">
                Public
              </span>
            </div>
            <p className="text-secondary-600">by {owner}</p>
          </div>

          {/* Branch Selector */}
          <div className="relative w-full sm:w-auto">
            <button
              onClick={() => setShowBranchMenu(!showBranchMenu)}
              className="w-full sm:w-auto flex items-center gap-2 px-4 py-2 bg-white border border-secondary-200 rounded-lg hover:bg-secondary-50 transition-colors"
            >
              <GitBranch className="w-4 h-4" />
              <span className="font-medium text-secondary-900">{currentBranch}</span>
              <ChevronDown className="w-4 h-4 text-secondary-500" />
            </button>

            {showBranchMenu && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-secondary-200 rounded-lg shadow-lg z-10">
                {branches.map((branch) => (
                  <button
                    key={branch}
                    onClick={() => {
                      setCurrentBranch(branch);
                      setShowBranchMenu(false);
                      fetchFiles();
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-secondary-50 transition-colors ${
                      branch === currentBranch ? 'bg-primary-50 text-primary-600 font-medium' : ''
                    }`}
                  >
                    {branch}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Alerts */}
        {error && <Alert variant="error" message={error} onClose={() => setError(null)} />}
        {success && <Alert variant="success" message={success} onClose={() => setSuccess(null)} />}

        {/* Actions */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant="primary"
            onClick={handlePull}
            size="md"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Pull</span>
          </Button>
          <Button
            variant="primary"
            onClick={handlePush}
            size="md"
          >
            <Upload className="w-4 h-4" />
            <span className="hidden sm:inline">Push</span>
          </Button>
          <Button
            variant="secondary"
            onClick={() => setShowCommitModal(true)}
            disabled={stagedFiles.length === 0}
            size="md"
          >
            <Save className="w-4 h-4" />
            <span className="hidden sm:inline">Commit</span>
            {stagedFiles.length > 0 && (
              <span className="ml-1 bg-primary-600 text-white text-xs px-1.5 py-0.5 rounded">
                {stagedFiles.length}
              </span>
            )}
          </Button>
          <Button
            variant="secondary"
            onClick={fetchFiles}
            size="md"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
        </div>

        {/* Files Browser */}
        <div className="card">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
            </div>
          ) : files.length > 0 ? (
            <div className="divide-y divide-secondary-100">
              {files.map((file) => (
                <div
                  key={file.sha}
                  className="flex items-center justify-between p-4 hover:bg-secondary-50 transition-colors cursor-pointer"
                  onClick={() => {
                    if (stagedFiles.includes(file.path)) {
                      removeStagedFile(file.path);
                    } else {
                      addStagedFile(file.path);
                    }
                  }}
                >
                  <div className="flex items-center gap-3 flex-1">
                    {file.type === 'dir' ? (
                      <Folder className="w-5 h-5 text-primary-500 flex-shrink-0" />
                    ) : (
                      <File className="w-5 h-5 text-secondary-400 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-secondary-900 truncate">{file.name}</p>
                      <p className="text-xs text-secondary-500">{file.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {stagedFiles.includes(file.path) && (
                      <span className="bg-green-100 text-green-700 text-xs px-2.5 py-1 rounded-full font-medium">
                        Staged
                      </span>
                    )}
                    <ChevronRight className="w-5 h-5 text-secondary-300" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-secondary-500">No files found</p>
            </div>
          )}
        </div>
      </main>

      {/* Commit Modal */}
      <Modal
        isOpen={showCommitModal}
        title="Create Commit"
        onClose={() => {
          setShowCommitModal(false);
          setCommitMessage('');
          setAuthorName('');
          setAuthorEmail('');
        }}
      >
        <form onSubmit={handleCommit} className="space-y-4">
          <Input
            label="Commit Message"
            placeholder="Describe your changes..."
            value={commitMessage}
            onChange={(e) => setCommitMessage(e.target.value)}
            required
          />
          <Input
            label="Author Name"
            placeholder="Your name"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
          />
          <Input
            label="Author Email"
            type="email"
            placeholder="your@email.com"
            value={authorEmail}
            onChange={(e) => setAuthorEmail(e.target.value)}
          />

          <div className="bg-secondary-50 rounded-lg p-4">
            <p className="text-sm font-medium text-secondary-900 mb-2">Staged Files:</p>
            <div className="space-y-1 max-h-40 overflow-y-auto">
              {stagedFiles.map((file) => (
                <p key={file} className="text-xs text-secondary-600">
                  • {file}
                </p>
              ))}
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={() => setShowCommitModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" isLoading={isCommitting}>
              Commit Changes
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Repository;
