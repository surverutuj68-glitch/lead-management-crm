import { useState, useEffect, useCallback } from "react";
import {
  getLeads,
  createLead,
  updateLead,
  deleteLead,
  searchLeads,
} from "../api/leadsApi";

export const useLeads = () => {
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const computeStats = (data) => {
    const total = data.length;
    const byStatus = data.reduce((acc, l) => {
      acc[l.status] = (acc[l.status] || 0) + 1;
      return acc;
    }, {});
    const conversionRate =
      total > 0 ? Math.round(((byStatus.Converted || 0) / total) * 100) : 0;
    return { total, byStatus, conversionRate };
  };

  const fetchLeads = useCallback(async (term = "") => {
    setLoading(true);
    setError(null);
    try {
      const result = term ? await searchLeads(term) : await getLeads();
      setLeads(result.data);
      if (!term) setStats(computeStats(result.data));
    } catch (err) {
      setError(err.message || "Failed to load leads");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const id = setTimeout(() => fetchLeads(searchTerm), 300);
    return () => clearTimeout(id);
  }, [searchTerm, fetchLeads]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const addLead = async (data) => {
    const lead = await createLead(data);
    setLeads((prev) => [lead, ...prev]);
    setStats(computeStats([lead, ...leads]));
    return lead;
  };

  const editLead = async (id, data) => {
    const updated = await updateLead(id, data);
    const next = leads.map((l) => (l._id === id ? updated : l));
    setLeads(next);
    setStats(computeStats(next));
    return updated;
  };

  const removeLead = async (id) => {
    await deleteLead(id);
    const next = leads.filter((l) => l._id !== id);
    setLeads(next);
    setStats(computeStats(next));
  };

  return {
    leads,
    stats,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    addLead,
    editLead,
    removeLead,
    refetch: () => fetchLeads(searchTerm),
  };
};
