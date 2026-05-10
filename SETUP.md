# 🚀 GitWeb Setup Guide

## Quick Start (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally
```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### 3. Build & Deploy to Vercel

**Option A: Using Vercel CLI**
```bash
npm i -g vercel
vercel
```

**Option B: GitHub Integration**
1. Push to GitHub
2. Go to vercel.com
3. Import from GitHub
4. Done! Vercel auto-deploys on every push

---

## Getting GitHub Token

1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Set name: "GitWeb"
4. Check scopes:
   - ✓ repo (all options)
   - ✓ read:user
   - ✓ gist
5. Click "Generate token"
6. Copy the token (you won't see it again!)

---

## File Structure Explained

```
git-web-deployer/
│
├── pages/                    # Next.js pages (auto-routing)
│   ├── index.tsx            # Home page (/)
│   ├── login.tsx            # Login page (/login)
│   ├── dashboard.tsx        # Repository list (/dashboard)
│   ├── repo/[owner]/[repo].tsx  # Editor (/repo/owner/name)
│   ├── _app.tsx             # App wrapper
│   └── _document.tsx        # HTML document
│
├── components/              # React components
│   ├── ui/                  # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Alert.tsx
│   │   └── Modal.tsx
│   └── Navbar.tsx
│
├── store/                   # State management (Zustand)
│   └── gitStore.ts          # Git app state
│
├── services/                # Business logic
│   └── gitService.ts        # Git operations
│
├── styles/                  # CSS & Tailwind
│   └── globals.css
│
├── public/                  # Static files
│   ├── manifest.json        # PWA config
│   └── favicon.ico
│
├── package.json             # Dependencies
├── next.config.js           # Next.js config
├── tsconfig.json            # TypeScript config
├── tailwind.config.js       # Tailwind config
└── vercel.json              # Vercel config
```

---

## Customization

### Change App Name
1. Edit `public/manifest.json` → `name` & `short_name`
2. Edit `pages/_app.tsx` → title
3. Edit `pages/index.tsx` → text

### Change Colors
Edit `tailwind.config.js`:
```js
colors: {
  primary: { /* your colors */ },
  secondary: { /* your colors */ }
}
```

### Add Features
1. Create new page in `pages/`
2. Add route in navigation
3. Use existing components or create new ones

---

## Troubleshooting

### "Token invalid" error
- Check token format starts with `ghp_`
- Verify token has `repo` scope
- Try generating new token

### App won't load on mobile
- Make sure Vercel deployment is complete
- Clear browser cache
- Try incognito mode

### Git operations failing
- Check GitHub token
- Verify repository access
- Try pulling again

### Service worker issues
- Clear browser cache
- Uninstall and reinstall app
- Check browser dev tools console

---

## Performance Tips

1. **Cache Management**
   - Browser caches git data automatically
   - Clear localStorage to reset: `localStorage.clear()`

2. **Large Repositories**
   - Avoid cloning very large repos (100MB+)
   - Use branch-specific operations

3. **Mobile Data**
   - App caches files offline
   - Minimal data usage after initial load

---

## Security Checklist

✓ Token stored in localStorage (NOT transmitted to our servers)  
✓ No server-side storage  
✓ All operations local to browser  
✓ GitHub API calls directly from browser  
✓ HTTPS only  

---

## Deployment Checklist

Before deploying to production:

- [ ] Update app name/description
- [ ] Add custom icons/logo
- [ ] Test on iOS and Android
- [ ] Verify PWA installation
- [ ] Test all git operations
- [ ] Update README
- [ ] Set up GitHub repository
- [ ] Deploy to Vercel

---

## Next Steps

1. ✅ Install & run locally
2. ✅ Test with your GitHub account
3. ✅ Customize branding
4. ✅ Deploy to Vercel
5. ✅ Install as mobile app
6. ✅ Start managing repos on your phone!

---

Happy coding! 🎉
