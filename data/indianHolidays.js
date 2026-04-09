export const indianHolidays = [
    { date: "01-01", name: "New Year's Day", year: 2026, type: "Regional" },
    { date: "01-03", name: "Birthday of Hazrath Ali (R.A.)", year: 2026, type: "Regional" },
    { date: "01-14", name: "Bhogi", year: 2026, type: "Regional" },
    { date: "01-15", name: "Makara Sankranti", year: 2026, type: "Regional" },
    { date: "01-16", name: "Kanuma / Shab-e-Meraj", year: 2026, type: "Regional" },
    { date: "01-26", name: "Republic Day", year: 2026, type: "National" },
    { date: "02-03", name: "Shab-e-Barath", year: 2026, type: "Regional" },
    { date: "03-03", name: "Holi", year: 2026, type: "Regional" },
    { date: "03-11", name: "Shahadat of Hazrath Ali (R.A.)", year: 2026, type: "Regional" },
    { date: "03-13", name: "Jamatul Veda", year: 2026, type: "Regional" },
    { date: "03-19", name: "Ugadi", year: 2026, type: "Regional" },
    { date: "03-20", name: "Eid-ul-Fitr (Ramzan)", year: 2026, type: "Regional" },
    { date: "03-27", name: "Srirama Navami", year: 2026, type: "Regional" },
    { date: "03-31", name: "Mahaveer Jayanthi", year: 2026, type: "Regional" },
    { date: "04-01", name: "Annual Closing Day", year: 2026, type: "Regional" },
    { date: "04-03", name: "Good Friday", year: 2026, type: "Regional" },
    { date: "04-14", name: "Dr. B.R. Ambedkar's Birthday", year: 2026, type: "Regional" },
    { date: "04-20", name: "Basava Jayanthi", year: 2026, type: "Regional" },
    { date: "05-01", name: "May Day / Buddha Purnima", year: 2026, type: "Regional" },
    { date: "05-27", name: "Eid-ul-Adha (Bakrid)", year: 2026, type: "Regional" },
    { date: "06-03", name: "Eid-e-Gadeer", year: 2026, type: "Regional" },
    { date: "06-16", name: "Moharram (1447 Hijhri)", year: 2026, type: "Regional" },
    { date: "06-25", name: "Moharrum (Shahadat Imam Hussian RA)", year: 2026, type: "Regional" },
    { date: "07-16", name: "Ratha Yatra", year: 2026, type: "Regional" },
    { date: "08-04", name: "Arbayeen (Chahallum)", year: 2026, type: "Regional" },
    { date: "08-15", name: "Independence Day / Parsi New Year's Day", year: 2026, type: "National" },
    { date: "08-21", name: "Vara Lakshmi Vratham", year: 2026, type: "Regional" },
    { date: "08-25", name: "Milad-un-Nabi", year: 2026, type: "Regional" },
    { date: "09-04", name: "Sri Krishnaashtami", year: 2026, type: "Regional" },
    { date: "09-14", name: "Vinayaka Chavithi", year: 2026, type: "Regional" },
    { date: "09-22", name: "Yaz Dahum Shareef", year: 2026, type: "Regional" },
    { date: "10-02", name: "Mahatma Gandhi Jayanthi", year: 2026, type: "National" },
    { date: "10-20", name: "Vijaya Dasami", year: 2026, type: "Regional" },
    { date: "10-27", name: "Hazrath Syed Mohammed Juvanpuri Mehdi's Birthday", year: 2026, type: "Regional" },
    { date: "11-24", name: "Guru Nanak Jayanthi", year: 2026, type: "Regional" },
    { date: "12-24", name: "Christmas Eve", year: 2026, type: "Regional" },
    { date: "12-25", name: "Christmas", year: 2026, type: "Regional" },
    { date: "12-26", name: "Boxing Day", year: 2026, type: "Regional" }
];

export function getHolidayForDate(dateObj) {
    const m = String(dateObj.getMonth() + 1).padStart(2, "0");
    const d = String(dateObj.getDate()).padStart(2, "0");
    const y = dateObj.getFullYear();
    const searchSt = `${m}-${d}`;
    // For this list it's all exactly 2026, we check the MM-DD
    return indianHolidays.find(h => h.date === searchSt);
}
