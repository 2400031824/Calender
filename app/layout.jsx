import './globals.css';

export const metadata = {
  title: 'Interactive Wall Calendar',
  description: 'A premium physical wall calendar experience built with React and Framer Motion.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

