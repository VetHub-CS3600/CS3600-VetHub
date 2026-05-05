export const getAuthHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
});

export const getJsonHeaders = (token) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});
