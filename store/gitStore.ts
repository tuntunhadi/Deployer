import { create } from 'zustand';

interface GitState {
  // Auth
  githubToken: string | null;
  setGithubToken: (token: string) => void;
  clearGithubToken: () => void;

  // Repository info
  currentRepo: any;
  setCurrentRepo: (repo: any) => void;
  currentBranch: string;
  setCurrentBranch: (branch: string) => void;
  repositories: any[];
  setRepositories: (repos: any[]) => void;

  // File operations
  stagedFiles: string[];
  addStagedFile: (file: string) => void;
  removeStagedFile: (file: string) => void;
  clearStagedFiles: () => void;

  // UI state
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  success: string | null;
  setSuccess: (success: string | null) => void;

  // History
  commits: any[];
  setCommits: (commits: any[]) => void;
  changedFiles: any[];
  setChangedFiles: (files: any[]) => void;
}

export const useGitStore = create<GitState>((set) => ({
  // Auth
  githubToken: typeof window !== 'undefined' ? localStorage.getItem('github_token') : null,
  setGithubToken: (token) => {
    localStorage.setItem('github_token', token);
    set({ githubToken: token });
  },
  clearGithubToken: () => {
    localStorage.removeItem('github_token');
    set({ githubToken: null });
  },

  // Repository
  currentRepo: null,
  setCurrentRepo: (repo) => set({ currentRepo: repo }),
  currentBranch: 'main',
  setCurrentBranch: (branch) => set({ currentBranch: branch }),
  repositories: [],
  setRepositories: (repos) => set({ repositories: repos }),

  // Files
  stagedFiles: [],
  addStagedFile: (file) =>
    set((state) => ({
      stagedFiles: [...new Set([...state.stagedFiles, file])],
    })),
  removeStagedFile: (file) =>
    set((state) => ({
      stagedFiles: state.stagedFiles.filter((f) => f !== file),
    })),
  clearStagedFiles: () => set({ stagedFiles: [] }),

  // UI
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
  error: null,
  setError: (error) => set({ error }),
  success: null,
  setSuccess: (success) => set({ success }),

  // History
  commits: [],
  setCommits: (commits) => set({ commits }),
  changedFiles: [],
  setChangedFiles: (files) => set({ changedFiles: files }),
}));
