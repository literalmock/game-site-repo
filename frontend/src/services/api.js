const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const readResponse = async (response) => {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
};

export const apiRequest = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const data = await readResponse(response);

  if (!response.ok) {
    const message = typeof data === "string" ? data : data?.message;
    throw new Error(message || "Request failed");
  }

  return data;
};
