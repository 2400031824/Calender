export const indianHolidays = [
    { date: "01-26", name: "Republic Day", dynamic: false },
    { date: "08-15", name: "Independence Day", dynamic: false },
    { date: "10-02", name: "Gandhi Jayanti", dynamic: false },
    { date: "12-25", name: "Christmas Day", dynamic: false },
    // 2025/2026 dynamic dates
    { date: "03-14", name: "Holi", dynamic: true, year: 2025 },
    { date: "10-20", name: "Diwali", dynamic: true, year: 2025 },
    { date: "03-03", name: "Holi", dynamic: true, year: 2026 },
    { date: "11-08", name: "Diwali", dynamic: true, year: 2026 },
];

export function getHolidayForDate(dateObj) {
    const m = String(dateObj.getMonth() + 1).padStart(2, "0");
    const d = String(dateObj.getDate()).padStart(2, "0");
    const y = dateObj.getFullYear();
    const searchSt = `${m}-${d}`;
    return indianHolidays.find(h => {
        if (h.dynamic) return h.date === searchSt && h.year === y;
        return h.date === searchSt;
    });
}
