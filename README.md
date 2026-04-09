# Wall Calendar Challenge

Interactive React/Next.js rectangular wall calendar component with integrated notes.

## Features

- Rectangular wall calendar layout (4:3 ratio)
- Large hero image at the top (spring-themed for April)
- Calendar grid with faded adjacent month dates
- Drag-to-select date ranges
- Integrated notes section (month notes + selection notes)
- Bottom-to-top page flip animation with sound
- LocalStorage persistence for notes
- No separate panels - everything in one cohesive calendar

## Run locally

1. Install dependencies

```bash
npm install
```

2. Start the development server

```bash
npm run dev
```

3. Open the browser at `http://localhost:3000`

## Notes

- The calendar is implemented in `components/WallCalendar.tsx`
- Styles are in `app/globals.css`
- Notes persist client-side using `localStorage`
- Click the top/bottom edges to flip between months
