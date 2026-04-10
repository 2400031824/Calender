import WallCalendar from '../components/WallCalendar';

export default function Home() {
  const downloadUrl = 'https://github.com/2400031824/Calender/releases/latest';
  const githubUrl = 'https://github.com/2400031824/Calender';

  return (
    <>
      <WallCalendar />
      <div className="download-cta">
        <div className="download-cta__text">
          <p className="download-cta__title">Wall Calendar Widget</p>
          <p className="download-cta__subtitle">Download the Windows desktop app</p>
        </div>
        <div className="download-cta__actions">
          <a className="download-cta__btn" href={downloadUrl} target="_blank" rel="noreferrer">
            Download for Windows
          </a>
          <a className="download-cta__link" href={githubUrl} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </>
  );
}
