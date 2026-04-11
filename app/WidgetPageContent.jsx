'use client';

import { useSearchParams } from 'next/navigation';
import WallCalendar from '../components/WallCalendar';

export default function WidgetPageContent() {
  const searchParams = useSearchParams();
  const widgetParam = searchParams.get('widget');
  const isWidget = widgetParam === '1' || widgetParam === 'true';

  const downloadUrl = 'https://github.com/2400031824/Calender/releases/latest';
  const githubUrl = 'https://github.com/2400031824/Calender';

  if (isWidget) {
    return <WallCalendar />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Wall Calendar Widget</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A beautiful Windows desktop calendar widget for notes, holidays, and quick access.
            Stay organized with an always-on-top calendar that remembers your preferences.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a
              href={downloadUrl}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg"
              target="_blank"
              rel="noreferrer"
            >
              Download for Windows
            </a>
            <a
              href={githubUrl}
              className="text-gray-600 hover:text-gray-800 font-medium underline"
              target="_blank"
              rel="noreferrer"
            >
              View on GitHub
            </a>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-xl shadow-xl p-6">
            <WallCalendar />
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">How to Use</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Installation</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Click "Download for Windows" above</li>
                <li>Run the installer (.exe file)</li>
                <li>Follow the installation wizard</li>
                <li>The widget will start automatically</li>
              </ol>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Using the Widget</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Use <kbd className="bg-gray-200 px-1 rounded">Ctrl+Shift+W</kbd> to toggle overlay mode</li>
                <li>Right-click the tray icon for menu options</li>
                <li>Click dates to add notes</li>
                <li>Drag to move, resize corners to adjust size</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
