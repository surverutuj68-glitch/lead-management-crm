import { useState } from "react";

const STATUS_STYLES = {
  New: "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:border-sky-800",
  Contacted: "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950 dark:text-violet-300 dark:border-violet-800",
  Qualified: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
  Converted: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
  Lost: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800",
};

const StatusBadge = ({ status }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${STATUS_STYLES[status] || ""}`}>
    {status}
  </span>
);

const initials = (name) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const AVATAR_COLORS = [
  "bg-violet-100 text-violet-700",
  "bg-sky-100 text-sky-700",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700",
];

const avatarColor = (name) =>
  AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const SORT_KEYS = ["name", "company", "status", "createdAt"];

const LeadTable = ({ leads, onEdit, onDelete, loading }) => {
  const [sortKey, setSortKey] = useState("createdAt");
  const [sortDir, setSortDir] = useState("desc");

  const handleSort = (key) => {
    if (!SORT_KEYS.includes(key)) return;
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sorted = [...leads].sort((a, b) => {
    const av = a[sortKey] ?? "";
    const bv = b[sortKey] ?? "";
    const cmp = av < bv ? -1 : av > bv ? 1 : 0;
    return sortDir === "asc" ? cmp : -cmp;
  });

  const SortIcon = ({ col }) => {
    if (sortKey !== col)
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5 opacity-30">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4M16 15l-4 4-4-4" />
        </svg>
      );
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5 text-violet-600">
        {sortDir === "asc" ? (
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 15l-4 4-4-4" />
        )}
      </svg>
    );
  };

  const Th = ({ col, children }) => (
    <th
      onClick={() => handleSort(col)}
      className={`px-4 py-3 text-left text-xs font-semibold tracking-wider text-gray-500 dark:text-gray-400 uppercase select-none ${SORT_KEYS.includes(col) ? "cursor-pointer hover:text-gray-700 dark:hover:text-gray-200" : ""}`}
    >
      <span className="inline-flex items-center gap-1">
        {children}
        {SORT_KEYS.includes(col) && <SortIcon col={col} />}
      </span>
    </th>
  );

  if (loading) {
    return (
      <div className="rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="px-4 py-4 border-b border-gray-50 dark:border-gray-800 last:border-0 animate-pulse flex gap-4 items-center">
            <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/3" />
              <div className="h-2.5 bg-gray-100 dark:bg-gray-800 rounded w-1/2" />
            </div>
            <div className="h-5 w-16 bg-gray-100 dark:bg-gray-800 rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  if (!leads.length) {
    return (
      <div className="rounded-xl border border-dashed border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-16 flex flex-col items-center gap-3 text-center">
        <div className="w-12 h-12 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No leads found</p>
        <p className="text-xs text-gray-400 dark:text-gray-500">Try adjusting your search or add a new lead.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden shadow-sm">
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-50 dark:divide-gray-800">
          <thead className="bg-gray-50/60 dark:bg-gray-800/40">
            <tr>
              <Th col="name">Name</Th>
              <Th col="company">Company</Th>
              <Th col="__">Contact</Th>
              <Th col="status">Status</Th>
              <Th col="createdAt">Created</Th>
              <Th col="__actions">Actions</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
            {sorted.map((lead) => (
              <tr key={lead._id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors group">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${avatarColor(lead.name)}`}>
                      {initials(lead.name)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{lead.name}</p>
                      {lead.notes && (
                        <p className="text-xs text-gray-400 dark:text-gray-500 truncate max-w-[180px]">{lead.notes}</p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{lead.company}</td>
                <td className="px-4 py-3">
                  <p className="text-sm text-gray-700 dark:text-gray-300">{lead.email}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{lead.phone}</p>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={lead.status} />
                </td>
                <td className="px-4 py-3 text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">
                  {formatDate(lead.createdAt)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onEdit(lead)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-950 dark:hover:text-violet-300 transition"
                      title="Edit"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => onDelete(lead)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 dark:hover:text-rose-300 transition"
                      title="Delete"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden divide-y divide-gray-50 dark:divide-gray-800">
        {sorted.map((lead) => (
          <div key={lead._id} className="p-4 flex items-start gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${avatarColor(lead.name)}`}>
              {initials(lead.name)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{lead.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{lead.company}</p>
                </div>
                <StatusBadge status={lead.status} />
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 truncate">{lead.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <button onClick={() => onEdit(lead)} className="text-xs text-violet-600 dark:text-violet-400 font-medium hover:underline">Edit</button>
                <span className="text-gray-200 dark:text-gray-700">·</span>
                <button onClick={() => onDelete(lead)} className="text-xs text-rose-500 font-medium hover:underline">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { StatusBadge };
export default LeadTable;
