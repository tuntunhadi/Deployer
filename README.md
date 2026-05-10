# GitWeb - Mobile Git Client

A beautiful, modern web-based Git client designed for mobile developers. Push, pull, commit, and manage your GitHub repositories directly from your phone.

## Features

✨ **Mobile First Design** - Fully responsive and touch-optimized interface
📱 **Installable App** - Install on your home screen as a progressive web app (PWA)
🔐 **Secure** - Your GitHub token stays local, never shared
⚡ **Lightweight** - Fast and responsive, works online and offline
🎯 **Full Git Support** - Push, pull, commit, branch management, and more

### Git Operations Supported

- **Clone** - Clone repositories from GitHub
- **Status** - View file changes
- **Add** - Stage files for commit
- **Commit** - Create commits with custom messages
- **Push** - Push commits to remote
- **Pull** - Sync with remote repository
- **Branches** - Switch and create branches
- **History** - View commit history

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Git Operations**: isomorphic-git
- **State Management**: Zustand
- **UI Components**: Custom components + Lucide Icons
- **Authentication**: GitHub OAuth via Personal Access Token
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- GitHub account with personal access token

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd git-web-deployer
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Run development server**
```bash
npm run dev
# or
yarn dev
```

4. **Open in browser**
Navigate to `http://localhost:3000`

## Deployment to Vercel

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo>
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Click "Deploy"

Vercel will automatically build and deploy your Next.js application.

## How to Use

1. **Get GitHub Token**
   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Generate new token with `repo` scope
   - Copy the token

2. **Login**
   - Visit the app and paste your GitHub token
   - Click "Login with GitHub"

3. **Select Repository**
   - Choose from your repositories or clone a new one
   - Select your branch

4. **Make Changes**
   - View files and stage them for commit
   - Create commits with descriptions
   - Push changes to GitHub
   - Pull latest changes

## Project Structure

```
git-web-deployer/
├── pages/
│   ├── _app.tsx           # App wrapper
│   ├── _document.tsx      # Document wrapper
│   ├── index.tsx          # Home page
│   ├── login.tsx          # Login page
│   ├── dashboard.tsx      # Repository list
│   └── repo/
│       └── [owner]/
│           └── [repo].tsx # Repository editor
├── components/
│   ├── ui/                # UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Alert.tsx
│   │   └── Modal.tsx
│   └── Navbar.tsx         # Navigation bar
├── store/
│   └── gitStore.ts        # Zustand state management
├── services/
│   └── gitService.ts      # Git operations service
├── styles/
│   └── globals.css        # Global styles
├── public/
│   └── manifest.json      # PWA manifest
├── package.json
├── next.config.js
├── tsconfig.json
├── tailwind.config.js
└── vercel.json
```

## Environment Variables

No environment variables required! The app uses:
- **Browser Storage**: GitHub token saved in localStorage
- **GitHub API**: Uses personal access token for authentication
- **isomorphic-git**: Uses CORS proxy for git operations

## Browser Support

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Mobile Installation

### iPhone
1. Open Safari
2. Navigate to your Vercel URL
3. Click Share → Add to Home Screen
4. Tap "Add"

### Android
1. Open Chrome
2. Navigate to your Vercel URL
3. Menu → Install app
4. Tap "Install"

## Performance

- Lightweight (~150KB gzipped)
- Fast load times with Next.js optimization
- Offline support via service worker
- Local storage for fast data access

## Security

⚠️ **Important Security Note:**
- Your GitHub token is stored in browser localStorage
- Never commit or share your personal access token
- Token is only sent to GitHub API, not to our servers
- Always use tokens with minimal required permissions

## Limitations

- Git operations are limited by browser capabilities
- Large files/repositories may cause performance issues
- Some advanced git features not supported in browser
- Requires internet for GitHub API calls

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## License

MIT License - feel free to use this project for personal or commercial use.

## Support

For issues and questions:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Include screenshots if applicable

## Future Features

- 📝 File editor built-in
- 🔀 Merge conflict resolution UI
- 📊 Repository statistics
- 🌙 Dark mode
- 🌍 Multi-language support
- 🔔 Push notifications
- 💬 Commit comments
- 👥 Collaboration features

---

Built with ❤️ for mobile developers
