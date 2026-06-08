import { useState } from "react";
import StatsCards from "./StatsCards";
import SearchBar from "./SearchBar";
import LeadTable from "./LeadTable";
import LeadForm from "./LeadForm";
import Modal from "./Modal";
import DeleteModal from "./DeleteModal";
import { useLeads } from "../hooks/useLeads";
import { useToast } from "./Toast";

const Dashboard = () => {
  const { leads, stats, loading, searchTerm, setSearchTerm, addLead, editLead, removeLead } = useLeads();
  const { toast, ToastContainer } = useToast();

  const [addOpen, setAddOpen] = useState(false);
  const [editLead_, setEditLead] = useState(null);
  const [deleteLead_, setDeleteLead] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleAdd = async (data) => {
    setSaving(true);
    try {
      await addLead(data);
      setAddOpen(false);
      toast("Lead added successfully");
    } catch {
      toast("Failed to add lead", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async (data) => {
    setSaving(true);
    try {
      await editLead(editLead_._id, data);
      setEditLead(null);
      toast("Lead updated");
    } catch {
      toast("Failed to update lead", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setSaving(true);
    try {
      await removeLead(deleteLead_._id);
      setDeleteLead(null);
      toast("Lead deleted");
    } catch {
      toast("Failed to delete lead", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Sidebar strip */}
      <aside className="hidden lg:flex flex-col fixed inset-y-0 left-0 w-16 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 items-center py-6 gap-6 z-10">
        <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center text-white font-bold text-sm select-none">
          L
        </div>
        <nav className="flex flex-col gap-2 mt-4">
          {[
            { icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", active: true },
            { icon: "M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4.13a4 4 0 11-8 0 4 4 0 018 0zM21 8a4 4 0 11-8 0 4 4 0 018 0z" },
            { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
            { icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
          ].map(({ icon, active }, i) => (
            <button
              key={i}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition ${
                active
                  ? "bg-violet-50 text-violet-600 dark:bg-violet-950 dark:text-violet-300"
                  : "text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
              </svg>
            </button>
          ))}
        </nav>
        <div className="mt-auto">
          <div className="w-9 h-9 rounded-full bg-violet-100 dark:bg-violet-900 flex items-center justify-center text-violet-700 dark:text-violet-300 text-xs font-semibold">
            AK
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:pl-16">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-100 dark:border-gray-800 px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-base font-semibold text-gray-900 dark:text-gray-100">Leads</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {leads.length} {leads.length === 1 ? "lead" : "leads"}{searchTerm ? " found" : " total"}
            </p>
          </div>
          <button
            onClick={() => setAddOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-lg transition shadow-sm"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden sm:inline">Add Lead</span>
          </button>
        </header>

        <div className="px-4 sm:px-6 py-6 flex flex-col gap-6">
          {/* Stats */}
          <StatsCards stats={stats} />

          {/* Toolbar */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            <p className="text-xs text-gray-400 dark:text-gray-500 hidden sm:block">
              Click column headers to sort
            </p>
          </div>

          {/* Table */}
          <LeadTable
            leads={leads}
            loading={loading}
            onEdit={setEditLead}
            onDelete={setDeleteLead}
          />
        </div>
      </main>

      {/* Add Modal */}
      <Modal open={addOpen} title="Add New Lead" onClose={() => setAddOpen(false)} size="lg">
        <LeadForm lead={null} onSubmit={handleAdd} onCancel={() => setAddOpen(false)} loading={saving} />
      </Modal>

      {/* Edit Modal */}
      <Modal open={!!editLead_} title="Edit Lead" onClose={() => setEditLead(null)} size="lg">
        <LeadForm lead={editLead_} onSubmit={handleEdit} onCancel={() => setEditLead(null)} loading={saving} />
      </Modal>

      {/* Delete Modal */}
      <DeleteModal
        lead={deleteLead_}
        onConfirm={handleDelete}
        onCancel={() => setDeleteLead(null)}
        loading={saving}
      />

      <ToastContainer />
    </div>
  );
};

export default Dashboard;
