import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const getMaintenanceRecords = async () => {
  const response = await axios.get(`${API_URL}/maintenance_records`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

export const createMaintenanceRecord = async (recordData) => {
  const response = await axios.post(`${API_URL}/maintenance_records`, recordData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

export const updateMaintenanceRecord = async (id, recordData) => {
  const response = await axios.put(`${API_URL}/maintenance_records/${id}`, recordData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

export const deleteMaintenanceRecord = async (id) => {
  const response = await axios.delete(`${API_URL}/maintenance_records/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};