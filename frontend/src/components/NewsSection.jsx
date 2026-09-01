import { motion } from "framer-motion";
import { CalendarDays, ChevronRight } from "lucide-react";

const NEWS = [
  { title: "Jadwal Technical Meeting & Pengundian Bagan Pertandingan", date: "05 Oktober 2026", badge: "Penting" },
  { title: "Panduan Standar Perlengkapan Body Protector & Deker Sesuai Regulasi IPSI 2026", date: "28 September 2026", badge: "Regulasi" },
  { title: "Daftar 64 Perguruan Silat yang Telah Mengonfirmasi Kontingen", date: "20 September 2026", badge: "Kontingen" },
];

export const NewsSection = () => (
  <section id="berita" className="border-y border-[#2E2E3A] bg-[#13131A]/50 py-24" data-testid="news-section">
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Warta & Informasi</p>
      <h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
        Kabar Terkini dari <span className="text-gold-gradient">Gelanggang</span>
      </h2>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {NEWS.map((n, i) => (
          <motion.article key={n.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="group cursor-pointer rounded-2xl border border-[#2E2E3A] bg-[#1C1C24] p-6 transition-all hover:-translate-y-2 hover:border-amber-500/40"
            data-testid={`news-card-${i}`}>
            <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-bold text-amber-400">{n.badge}</span>
            <h3 className="mt-4 text-base font-bold leading-snug sm:text-lg">{n.title}</h3>
            <div className="mt-6 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" /> {n.date}</span>
              <ChevronRight className="h-4 w-4 text-amber-400 transition-transform group-hover:translate-x-1" />
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);
