const API_URL = import.meta.env.VITE_API_URL;

export const getLeads = async () => {
    const response = await fetch(`${API_URL}/api/leads`);
    const result = await response.json();
    return result;
};

export const createLead = async (data) => {
    const response = await fetch(
        `${API_URL}/api/leads`,
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
        `${API_URL}/api/leads/${id}`,
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
        `${API_URL}/api/leads/${id}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
};

export const searchLeads = async (term) => {
    const response = await fetch(
        `${API_URL}/api/leads/search?term=${encodeURIComponent(term)}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }
    );

    const result = await response.json();

    return result;
};
