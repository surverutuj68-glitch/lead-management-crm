const CARD_CONFIG = [
  {
    label: "Total Leads",
    key: "total",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4.13a4 4 0 11-8 0 4 4 0 018 0zM21 8a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    color: "bg-violet-50 text-violet-600 dark:bg-violet-950 dark:text-violet-300",
    border: "border-violet-100 dark:border-violet-900",
    getValue: (stats) => stats.total ?? 0,
  },
  {
    label: "New",
    key: "New",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    ),
    color: "bg-sky-50 text-sky-600 dark:bg-sky-950 dark:text-sky-300",
    border: "border-sky-100 dark:border-sky-900",
    getValue: (stats) => stats.byStatus?.New ?? 0,
  },
  {
    label: "Qualified",
    key: "Qualified",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-300",
    border: "border-amber-100 dark:border-amber-900",
    getValue: (stats) => stats.byStatus?.Qualified ?? 0,
  },
  {
    label: "Converted",
    key: "Converted",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300",
    border: "border-emerald-100 dark:border-emerald-900",
    getValue: (stats) => stats.byStatus?.Converted ?? 0,
  },
  {
    label: "Conversion Rate",
    key: "rate",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-8-5v5M8 3v1m8-1v1M3 12h1m17 0h-1M5.6 5.6l.7.7m12.1-.7l-.7.7" />
      </svg>
    ),
    color: "bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-300",
    border: "border-rose-100 dark:border-rose-900",
    getValue: (stats) => `${stats.conversionRate ?? 0}%`,
  },
];

const StatsCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
      {CARD_CONFIG.map(({ label, color, border, icon, getValue }) => (
        <div
          key={label}
          className={`bg-white dark:bg-gray-900 rounded-xl border ${border} p-4 flex flex-col gap-3 shadow-sm`}
        >
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}>
            {icon}
          </div>
          <div>
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-50 leading-none">
              {getValue(stats)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium tracking-wide uppercase">
              {label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
