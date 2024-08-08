export const login = async (formData) => {
  try {
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Login failed');
    }

    // Store the token in localStorage
    localStorage.setItem('access_token', data.token);

    return data;
  } catch (error) {
    throw error;
  }
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('access_token');
};