const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// "/uploads/abc.jpg" ko poore URL me badalta hai
export const fileUrl = (path) =>
  path ? `${API.replace(/\/api\/?$/, "")}${path}` : "";

export async function api(path, { method = "GET", body, token } = {}) {
  const isForm = body instanceof FormData;

  const res = await fetch(`${API}${path}`, {
    method,
    headers: {
      ...(!isForm && { "Content-Type": "application/json" }),
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: body ? (isForm ? body : JSON.stringify(body)) : undefined,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
}