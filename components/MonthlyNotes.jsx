'use client';

export default function MonthlyNotes({ accent, commitmentRows, onOpenEntry }) {
  return (
    <section>
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">Monthly Commitments (Notes)</p>

      <div className="min-h-[300px] max-h-[360px] space-y-2 overflow-y-auto rounded-md border border-slate-200 bg-white/95 px-2 py-2">
        {commitmentRows.length === 0 ? (
          <p className="text-sm text-slate-400">No commitments yet. Add a day note or date-range note from the calendar.</p>
        ) : (
          commitmentRows.map((row) => (
            <button
              key={row.id}
              type="button"
              onClick={() => onOpenEntry(row.target)}
              className="block w-full rounded px-2 py-2 text-left text-sm text-slate-700 hover:bg-slate-100"
            >
              <span className="font-semibold" style={{ color: accent }}>
                • {row.label}
              </span>
              {row.preview ? <span className="text-slate-600"> — {row.preview}</span> : null}
            </button>
          ))
        )}
      </div>
    </section>
  );
}
