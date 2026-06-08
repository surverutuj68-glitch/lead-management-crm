import { useState, useEffect } from "react";
import { STATUSES } from "../constants/statuses";

const EMPTY = { name: "", email: "", phone: "", company: "", status: "New", notes: "" };

const Field = ({ label, error, children }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
      {label}
    </label>
    {children}
    {error && <p className="text-xs text-rose-500">{error}</p>}
  </div>
);

const inputCls =
  "w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition";

const validate = (data) => {
  const errors = {};
  if (!data.name.trim()) errors.name = "Name is required";
  if (!data.email.trim()) errors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(data.email)) errors.email = "Enter a valid email";
  if (!data.company.trim()) errors.company = "Company is required";
  return errors;
};

const LeadForm = ({ lead, onSubmit, onCancel, loading }) => {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(lead ? { ...EMPTY, ...lead } : EMPTY);
    setErrors({});
  }, [lead]);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    await onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Full Name *" error={errors.name}>
          <input
            type="text"
            className={inputCls}
            placeholder="Jane Smith"
            value={form.name}
            onChange={set("name")}
          />
        </Field>
        <Field label="Company *" error={errors.company}>
          <input
            type="text"
            className={inputCls}
            placeholder="Acme Corp"
            value={form.company}
            onChange={set("company")}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Email *" error={errors.email}>
          <input
            type="email"
            className={inputCls}
            placeholder="jane@example.com"
            value={form.email}
            onChange={set("email")}
          />
        </Field>
        <Field label="Phone">
          <input
            type="tel"
            className={inputCls}
            placeholder="+1 (555) 000-0000"
            value={form.phone}
            onChange={set("phone")}
          />
        </Field>
      </div>

      <Field label="Status">
        <select className={inputCls} value={form.status} onChange={set("status")}>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </Field>

      <Field label="Notes">
        <textarea
          className={`${inputCls} resize-none`}
          rows={3}
          placeholder="Any additional notes…"
          value={form.notes}
          onChange={set("notes")}
        />
      </Field>

      <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100 dark:border-gray-800">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-700 active:bg-violet-800 rounded-lg transition disabled:opacity-60 flex items-center gap-2"
        >
          {loading && (
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          )}
          {lead ? "Save Changes" : "Add Lead"}
        </button>
      </div>
    </form>
  );
};

export default LeadForm;
