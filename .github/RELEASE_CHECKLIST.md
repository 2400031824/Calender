# Release Checklist

## Pre-release
- [ ] Pull latest `main`
- [ ] Run `npm install`
- [ ] Run `npm run build`
- [ ] Run `npm run desktop:pack`
- [ ] Verify installer exists in `dist/`
- [ ] Smoke test desktop app:
  - [ ] Opens in Desktop mode
  - [ ] Overlay/Desktop toggle works instantly
  - [ ] Drag and resize work correctly
  - [ ] Tray menu appears with update actions
  - [ ] Calendar interactions (notes/ranges/holidays) work

## Versioning
- [ ] Bump version in `package.json`
- [ ] Commit release changes
- [ ] Push to `main`

## GitHub Release
- [ ] Create a new GitHub Release tag (`vX.Y.Z`)
- [ ] Title format: `Wall Calendar Widget vX.Y.Z`
- [ ] Attach installer:
  - [ ] `dist/Wall Calendar Widget Setup X.Y.Z.exe`
- [ ] Attach portable build (optional)
- [ ] Use release notes template and confirm sections are filled

## Post-release
- [ ] Verify Vercel web deployment is healthy
- [ ] Install fresh from release asset on another machine
- [ ] Confirm auto-update checks run from tray app
- [ ] Share release link
