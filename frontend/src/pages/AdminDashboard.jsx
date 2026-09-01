import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Swords, Users, CheckCircle2, Clock, Wallet, Download, LogOut, Search, Trash2, MessageCircle, Loader2 } from "lucide-react";
import Seo from "@/components/Seo";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api, API_BASE, formatApiError, waAthleteLink } from "@/lib/api";

const CATEGORIES = ["Tanding Putra", "Tanding Putri", "Seni Tunggal Putra", "Seni Tunggal Putri", "Seni Ganda", "Seni Regu (TGR)"];
const STATUS_LABEL = { menunggu: "Menunggu", terverifikasi: "Terverifikasi", ditolak: "Ditolak" };
const STATUS_STYLE = {
  menunggu: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  terverifikasi: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  ditolak: "bg-red-500/15 text-red-400 border-red-500/30",
};

const StatCard = ({ icon: Icon, label, value, testId }) => (
  <div className="rounded-2xl border border-[#2E2E3A] bg-[#13131A] p-5" data-testid={testId}>
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#800E19]/40">
        <Icon className="h-5 w-5 text-amber-400" />
      </span>
      <div>
        <div className="font-display text-2xl font-extrabold text-slate-50">{value}</div>
        <div className="text-xs text-slate-400">{label}</div>
      </div>
    </div>
  </div>
);

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [me, setMe] = useState(null);
  const [stats, setStats] = useState(null);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("semua");
  const [status, setStatus] = useState("semua");

  const load = useCallback(async () => {
    try {
      const params = {
        search: search || undefined,
        category: category === "semua" ? undefined : category,
        status: status === "semua" ? undefined : status,
      };
      const [s, r] = await Promise.all([
        api.get("/admin/stats"),
        api.get("/admin/registrants", { params }),
      ]);
      setStats(s.data);
      setRows(r.data);
    } catch (err) {
      if (err?.response?.status === 401) navigate("/admin/login");
      else toast.error(formatApiError(err));
    } finally {
      setLoading(false);
    }
  }, [search, category, status, navigate]);

  useEffect(() => {
    api.get("/auth/me").then((res) => setMe(res.data)).catch(() => navigate("/admin/login"));
  }, [navigate]);

  useEffect(() => {
    const t = setTimeout(load, 300);
    return () => clearTimeout(t);
  }, [load]);

  const updateStatus = async (id, patch, successMsg) => {
    try {
      await api.patch(`/admin/registrants/${id}`, patch);
      toast.success(successMsg);
      load();
    } catch (err) {
      toast.error(formatApiError(err));
    }
  };

  const remove = async (id, name) => {
    if (!window.confirm(`Hapus pendaftar "${name}"? Tindakan ini tidak dapat dibatalkan.`)) return;
    try {
      await api.delete(`/admin/registrants/${id}`);
      toast.success("Pendaftar dihapus");
      load();
    } catch (err) {
      toast.error(formatApiError(err));
    }
  };

  const logout = async () => {
    await api.post("/auth/logout").catch(() => {});
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#0B0B0E] text-slate-50" data-testid="admin-dashboard">
      <Seo title="Dashboard Admin — Nusa Wiraga 2026" siteName="Nusa Wiraga" description="Panel manajemen kontingen dan pendaftar Nusa Wiraga." />
      <header className="sticky top-0 z-40 border-b border-amber-500/20 bg-[#0B0B0E]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2" data-testid="admin-logo">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#800E19]">
              <Swords className="h-5 w-5 text-amber-400" />
            </span>
            <span className="font-display text-lg font-extrabold">NUSA <span className="text-gold-gradient">WIRAGA</span></span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-slate-400 sm:block">{me?.email || ""}</span>
            <button onClick={logout} data-testid="admin-logout-btn"
              className="flex items-center gap-2 rounded-xl border border-[#2E2E3A] px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-[#1C1C24]">
              <LogOut className="h-4 w-4" /> Keluar
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Panel Manajemen <span className="text-gold-gradient">Pendaftar</span></h1>
        <p className="mt-1 text-sm text-slate-400">Kelola kontingen, verifikasi berkas, dan pantau pembayaran atlet.</p>

        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard icon={Users} label="Total Pendaftar" value={stats?.total ?? "-"} testId="admin-stats-total" />
          <StatCard icon={CheckCircle2} label="Terverifikasi" value={stats?.verified ?? "-"} testId="admin-stats-verified" />
          <StatCard icon={Clock} label="Menunggu Verifikasi" value={stats?.pending ?? "-"} testId="admin-stats-pending" />
          <StatCard icon={Wallet} label="Belum Lunas" value={stats?.unpaid ?? "-"} testId="admin-stats-unpaid" />
        </div>

        {stats?.by_category?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2" data-testid="admin-stats-categories">
            {stats.by_category.map((c) => (
              <Badge key={c.category} variant="outline" className="border-[#2E2E3A] bg-[#13131A] px-3 py-1 text-xs text-slate-300">
                {c.category}: <span className="ml-1 font-bold text-amber-400">{c.count}</span>
              </Badge>
            ))}
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-[#2E2E3A] bg-[#13131A] p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} data-testid="admin-search-input"
              placeholder="Cari nama, perguruan, atau no. registrasi..."
              className="border-[#2E2E3A] bg-[#0B0B0E] pl-9 text-slate-100 focus-visible:ring-amber-500" />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="border-[#2E2E3A] bg-[#0B0B0E] sm:w-56" data-testid="admin-filter-category">
              <SelectValue placeholder="Semua Kategori" />
            </SelectTrigger>
            <SelectContent className="border-[#2E2E3A] bg-[#1C1C24] text-slate-100">
              <SelectItem value="semua">Semua Kategori</SelectItem>
              {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="border-[#2E2E3A] bg-[#0B0B0E] sm:w-44" data-testid="admin-filter-status">
              <SelectValue placeholder="Semua Status" />
            </SelectTrigger>
            <SelectContent className="border-[#2E2E3A] bg-[#1C1C24] text-slate-100">
              <SelectItem value="semua">Semua Status</SelectItem>
              <SelectItem value="menunggu">Menunggu</SelectItem>
              <SelectItem value="terverifikasi">Terverifikasi</SelectItem>
              <SelectItem value="ditolak">Ditolak</SelectItem>
            </SelectContent>
          </Select>
          <a href={`${API_BASE}/admin/registrants/export/csv`} data-testid="admin-export-csv-btn"
            className="flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-sm font-extrabold text-stone-900 hover:opacity-90">
            <Download className="h-4 w-4" /> Export CSV
          </a>
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl border border-[#2E2E3A] bg-[#13131A]" data-testid="admin-table">
          <Table>
            <TableHeader>
              <TableRow className="border-[#2E2E3A] hover:bg-transparent">
                <TableHead className="text-slate-400">No. Reg</TableHead>
                <TableHead className="text-slate-400">Atlet</TableHead>
                <TableHead className="text-slate-400">Perguruan</TableHead>
                <TableHead className="text-slate-400">Kategori</TableHead>
                <TableHead className="text-slate-400">Status</TableHead>
                <TableHead className="text-slate-400">Pembayaran</TableHead>
                <TableHead className="text-right text-slate-400">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow className="border-[#2E2E3A]"><TableCell colSpan={7} className="py-12 text-center text-slate-500"><Loader2 className="mx-auto h-6 w-6 animate-spin" /></TableCell></TableRow>
              ) : rows.length === 0 ? (
                <TableRow className="border-[#2E2E3A]"><TableCell colSpan={7} className="py-12 text-center text-sm text-slate-500" data-testid="admin-table-empty">Belum ada pendaftar yang cocok.</TableCell></TableRow>
              ) : rows.map((r) => (
                <TableRow key={r.id} className="border-[#2E2E3A] hover:bg-[#1C1C24]/50" data-testid={`admin-row-${r.reg_number}`}>
                  <TableCell className="font-mono text-xs font-bold text-amber-400">{r.reg_number}</TableCell>
                  <TableCell>
                    <div className="text-sm font-semibold">{r.full_name}</div>
                    <div className="text-xs text-slate-500">{r.age_class}{r.weight_class ? ` · ${r.weight_class}` : ""}</div>
                  </TableCell>
                  <TableCell className="text-sm text-slate-300">{r.contingent_school}</TableCell>
                  <TableCell className="text-sm text-slate-300">{r.category}</TableCell>
                  <TableCell>
                    <Select value={r.status} onValueChange={(v) => updateStatus(r.id, { status: v }, `Status ${r.full_name} diperbarui`)}>
                      <SelectTrigger className={`h-8 w-36 border text-xs font-semibold ${STATUS_STYLE[r.status]}`} data-testid={`admin-status-select-${r.reg_number}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="border-[#2E2E3A] bg-[#1C1C24] text-slate-100">
                        {Object.entries(STATUS_LABEL).map(([v, l]) => <SelectItem key={v} value={v}>{l}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => updateStatus(r.id, { payment_status: r.payment_status === "lunas" ? "belum_bayar" : "lunas" },
                        `Pembayaran ${r.full_name} diperbarui`)}
                      data-testid={`admin-payment-toggle-${r.reg_number}`}
                      className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                        r.payment_status === "lunas"
                          ? "border-emerald-500/30 bg-emerald-500/15 text-emerald-400"
                          : "border-red-500/30 bg-red-500/15 text-red-400"
                      }`}>
                      {r.payment_status === "lunas" ? "Lunas" : "Belum Bayar"}
                    </button>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <a href={waAthleteLink(r.phone_whatsapp, r.full_name, r.reg_number)} target="_blank" rel="noopener noreferrer"
                        data-testid={`admin-wa-btn-${r.reg_number}`} aria-label="WhatsApp atlet"
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#2E2E3A] text-amber-400 hover:bg-[#1C1C24]">
                        <MessageCircle className="h-4 w-4" />
                      </a>
                      <button onClick={() => remove(r.id, r.full_name)} data-testid={`admin-delete-btn-${r.reg_number}`} aria-label="Hapus pendaftar"
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#2E2E3A] text-red-400 hover:bg-[#1C1C24]">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}
