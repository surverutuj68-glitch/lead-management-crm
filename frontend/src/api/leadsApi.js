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
    const response = await fetch(
        "http://localhost:5000/api/leads",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    );

    const result = await response.json();

    return result.data;
};

export const updateLead = async (id, data) => {
    const response = await fetch(
        `http://localhost:5000/api/leads/${id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    );

    const result = await response.json();

    return result.data;
};

export const deleteLead = async (id) => {
    await fetch(
        `http://localhost:5000/api/leads/${id}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
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
