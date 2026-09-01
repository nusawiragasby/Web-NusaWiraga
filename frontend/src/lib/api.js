import axios from "axios";

export const API_BASE = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const api = axios.create({ baseURL: API_BASE, withCredentials: true });

export function formatApiError(e) {
  const d = e?.response?.data?.detail;
  if (typeof d === "string") return d;
  if (Array.isArray(d)) return d.map((x) => x?.msg || JSON.stringify(x)).join(" ");
  if (d) return String(d);
  return "Terjadi kesalahan. Silakan coba lagi.";
}

export const WA_CONTACTS = [
  { name: "Nayla", number: "6285100476404" },
  { name: "Alfian", number: "6283848956603" },
];
export const waLink = (msg, contact = 0) =>
  `https://wa.me/${WA_CONTACTS[contact].number}?text=${encodeURIComponent(msg)}`;

export const waAthleteLink = (phone, name, regNumber) => {
  const digits = String(phone || "").replace(/\D/g, "").replace(/^0/, "62");
  const msg = `Halo ${name} (${regNumber}), kami dari Panitia Nusa Wiraga 2026.`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(msg)}`;
};
