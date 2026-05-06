import axios from 'axios';

// ⚠️ CHANGE THIS URL to match your .NET API's port (e.g., 7123, 5001)
const API_BASE_URL = 'https://localhost:7259/api/nots'; 

export const getNotes = async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
};

export const getNoteById = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
};

export const createNote = async (noteData) => {
    const response = await axios.post(API_BASE_URL, noteData);
    return response.data;
};

export const updateNote = async (id, noteData) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, { id, ...noteData });
    return response.data;
};

export const deleteNote = async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
};