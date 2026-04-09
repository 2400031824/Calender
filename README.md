# Interactive Wall Calendar Component

## Features
- Wall calendar UI with hero image
- Date range selection
- Notes system (local storage)
- Holiday indicators + modal
- Fully responsive design
- Smooth transitions

## Tech Stack
- React / Next.js
- Tailwind CSS
- Framer Motion

## How to Run
```bash
npm install
npm run dev
```

## Desktop Widget Mode (Windows)
```bash
npm run dev:widget
```

This opens the calendar as a floating desktop widget window.

Quick shortcuts:
- `Ctrl + Shift + W`: Toggle overlay mode (always-on-top on/off)
- `Ctrl + Shift + D`: Toggle DevTools
- `Esc`: Hide widget (show again from tray)
- `Ctrl + Shift + H`: Show widget (if hidden/minimized)

Tray menu:
- Desktop Mode
- Overlay Mode
- Start on Windows Login
- Show Widget
- Send to Tray
- Exit

Widget remembers:
- Last position
- Last size
- Last mode (desktop/overlay)

Widget top controls (in widget mode):
- `Overlay/Desktop`: switch pin behavior
- `Send to Tray`: hide widget
- `Restore`: show and focus widget

## Build Desktop App (.exe)
Create an installable Windows app:

```bash
npm install
npm run desktop:pack
```

Output installer path:
- `dist/Wall Calendar Widget Setup <version>.exe`

Optional portable build (no install required):

```bash
npm run desktop:pack-portable
```

Output:
- `dist/Wall Calendar Widget <version>.exe`

Packaged app behavior:
- In dev it loads `http://localhost:3000`
- In packaged mode it loads the deployed URL by default: `https://calender-two-silk.vercel.app`
- You can override URL with env var `WIDGET_URL`
- Auto-update checks run in packaged mode (from GitHub Releases)

Release helper files:
- `.github/RELEASE_CHECKLIST.md`
- `.github/RELEASE_NOTES_TEMPLATE.md`

## My Approach
Built step-by-step starting from core functionality, then improved UI, responsiveness, and motion based on iterative refinements.

*I focused more on user experience and clarity rather than adding excessive animations.*
