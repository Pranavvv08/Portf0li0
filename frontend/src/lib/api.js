const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function fetchPortfolioContent() {
  const res = await fetch(`${API_URL}/api/content`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function submitContactMessage({ name, email, subject, body }) {
  const res = await fetch(`${API_URL}/api/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, subject, body }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `API error: ${res.status}`);
  }
  return res.json();
}
