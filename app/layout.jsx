import './globals.css';

export const metadata = {
    title: 'Wall Calendar Challenge',
    description: 'Interactive calendar component with date range selection and notes.'
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
