const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
const API_TOKEN = import.meta.env.VITE_API_TOKEN || '';

export async function fetchApi(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': API_TOKEN,
        ...(options.headers || {})
      },
      ...options
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return { success: false, message: error.message };
  }
}
