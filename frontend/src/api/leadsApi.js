/**
 * API Layer — swap out mock implementations with real fetch() calls
 * when your backend is ready. All functions return Promises.
 *
 * Real endpoints:
 *   GET    /api/leads              → getLeads()
 *   POST   /api/leads              → createLead(data)
 *   PUT    /api/leads/:id          → updateLead(id, data)
 *   DELETE /api/leads/:id          → deleteLead(id)
 *   GET    /api/leads/search?term= → searchLeads(term)
 */

import { mockLeads } from "../data/mockLeads";

let store = [...mockLeads];
let nextId = store.length + 1;

const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

export const getLeads = async () => {
    const response = await fetch('http://localhost:5000/api/leads');
    const result = await response.json();
    return result;
};

export const createLead = async (data) => {
  await delay();
  const lead = {
    ...data,
    _id: String(nextId++),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  store = [lead, ...store];
  return lead;
};

export const updateLead = async (id, data) => {
  await delay();
  store = store.map((l) =>
    l._id === id ? { ...l, ...data, updatedAt: new Date().toISOString() } : l
  );
  return store.find((l) => l._id === id);
};

export const deleteLead = async (id) => {
  await delay();
  store = store.filter((l) => l._id !== id);
  return { success: true };
};

export const searchLeads = async (term) => {
  await delay(150);
  const q = term.toLowerCase();
  const data = store.filter(
    (l) =>
      l.name.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q) ||
      l.company.toLowerCase().includes(q)
  );
  return { count: data.length, data };
};
