import git from 'isomorphic-git';
import http from 'isomorphic-git/http/web';

export class GitService {
  private static instance: GitService;
  private token: string = '';

  private constructor() {}

  static getInstance(): GitService {
    if (!GitService.instance) {
      GitService.instance = new GitService();
    }
    return GitService.instance;
  }

  setToken(token: string) {
    this.token = token;
  }

  async cloneRepository(owner: string, repo: string, branch: string = 'main') {
    try {
      const url = `https://github.com/${owner}/${repo}.git`;
      const dir = `/${repo}`;

      await git.clone({
        fs: (window as any).fs,
        http,
        dir,
        url,
        ref: branch,
        corsProxy: 'https://cors.isomorphic-git.org',
        onAuth: () => ({
          username: this.token,
          password: 'x-oauth-basic',
        }),
      });

      return { success: true, dir };
    } catch (error) {
      console.error('Clone error:', error);
      throw error;
    }
  }

  async getStatus(dir: string) {
    try {
      const status = await git.statusMatrix({
        fs: (window as any).fs,
        dir,
      });
      return status;
    } catch (error) {
      console.error('Status error:', error);
      throw error;
    }
  }

  async addFile(dir: string, filepath: string) {
    try {
      await git.add({
        fs: (window as any).fs,
        dir,
        filepath,
      });
      return { success: true };
    } catch (error) {
      console.error('Add error:', error);
      throw error;
    }
  }

  async addAll(dir: string) {
    try {
      const status = await this.getStatus(dir);
      for (const [filepath, worktreeStatus] of status) {
        if (filepath === '.') continue;
        if (worktreeStatus !== 0) {
          await this.addFile(dir, filepath);
        }
      }
      return { success: true };
    } catch (error) {
      console.error('Add all error:', error);
      throw error;
    }
  }

  async commit(dir: string, message: string, author: string, email: string) {
    try {
      const sha = await git.commit({
        fs: (window as any).fs,
        dir,
        message,
        author: {
          name: author,
          email: email,
        },
      });
      return { success: true, sha };
    } catch (error) {
      console.error('Commit error:', error);
      throw error;
    }
  }

  async push(dir: string, remote: string = 'origin', branch: string = 'main') {
    try {
      await git.push({
        fs: (window as any).fs,
        http,
        dir,
        remote,
        ref: branch,
        corsProxy: 'https://cors.isomorphic-git.org',
        onAuth: () => ({
          username: this.token,
          password: 'x-oauth-basic',
        }),
      });
      return { success: true };
    } catch (error) {
      console.error('Push error:', error);
      throw error;
    }
  }

  async pull(dir: string, remote: string = 'origin', branch: string = 'main') {
    try {
      await git.pull({
        fs: (window as any).fs,
        http,
        dir,
        remote,
        ref: branch,
        corsProxy: 'https://cors.isomorphic-git.org',
        onAuth: () => ({
          username: this.token,
          password: 'x-oauth-basic',
        }),
        singleBranch: true,
      });
      return { success: true };
    } catch (error) {
      console.error('Pull error:', error);
      throw error;
    }
  }

  async getLog(dir: string, depth: number = 10) {
    try {
      const logs = await git.log({
        fs: (window as any).fs,
        dir,
        depth,
      });
      return logs;
    } catch (error) {
      console.error('Log error:', error);
      throw error;
    }
  }

  async getBranches(dir: string) {
    try {
      const branches = await git.listBranches({
        fs: (window as any).fs,
        dir,
      });
      return branches;
    } catch (error) {
      console.error('Branches error:', error);
      throw error;
    }
  }

  async createBranch(dir: string, branchName: string) {
    try {
      await git.branch({
        fs: (window as any).fs,
        dir,
        ref: branchName,
      });
      return { success: true };
    } catch (error) {
      console.error('Create branch error:', error);
      throw error;
    }
  }

  async checkoutBranch(dir: string, branchName: string) {
    try {
      await git.checkout({
        fs: (window as any).fs,
        dir,
        ref: branchName,
      });
      return { success: true };
    } catch (error) {
      console.error('Checkout error:', error);
      throw error;
    }
  }

  async getRemotes(dir: string) {
    try {
      const remotes = await git.listRemotes({
        fs: (window as any).fs,
        dir,
      });
      return remotes;
    } catch (error) {
      console.error('Remotes error:', error);
      throw error;
    }
  }
}

export default GitService.getInstance();
