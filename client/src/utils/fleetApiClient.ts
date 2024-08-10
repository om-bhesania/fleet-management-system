// apiClient.ts
const API_URL = "http://localhost:5500/api/v1";

export const fetchFleetData = async () => {
  const response = await fetch(`${API_URL}/getallfleet`);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

export const deleteFleet = async (id: string) => {
  const response = await fetch(`${API_URL}/deletefleet/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

export const updateFleet = async (id: string, data: any) => {
  const response = await fetch(`${API_URL}/updatefleet/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

export const addFleet = async (data: any) => {
  const response = await fetch(`${API_URL}/addfleet`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};
