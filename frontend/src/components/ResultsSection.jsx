import { motion } from "framer-motion";
import { Radio, Trophy } from "lucide-react";

const ARENAS = [
  { name: "Gelanggang A", type: "Tanding", status: "Dibuka 12 Oktober 2026" },
  { name: "Gelanggang B", type: "Tanding", status: "Dibuka 12 Oktober 2026" },
  { name: "Gelanggang C", type: "Seni (TGR)", status: "Dibuka 14 Oktober 2026" },
];

export const ResultsSection = () => (
  <section id="hasil" className="mx-auto max-w-7xl px-4 py-24 sm:px-6" data-testid="results-section">
    <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Hasil Pertandingan</p>
    <h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
      Bagan & <span className="text-gold-gradient">Papan Skor</span>
    </h2>
    <p className="mt-2 max-w-2xl text-sm text-slate-400 sm:text-base">
      Hasil pertandingan, bagan, dan perolehan medali akan diumumkan di halaman ini selama
      pekan kejuaraan berlangsung (12 - 18 Oktober 2026) dan diarsipkan setelahnya.
    </p>
    <div className="mt-12 grid gap-6 md:grid-cols-3">
      {ARENAS.map((a, i) => (
        <motion.div key={a.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: i * 0.1 }}
          className="rounded-2xl border border-[#2E2E3A] bg-[#13131A] p-6" data-testid={`arena-card-${i}`}>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold sm:text-xl">{a.name}</h3>
            <span className="flex items-center gap-1.5 rounded-full bg-[#800E19]/40 px-3 py-1 text-xs font-semibold text-amber-300">
              <Radio className="h-3 w-3" /> {a.type}
            </span>
          </div>
          <div className="mt-8 flex flex-col items-center py-6 text-center">
            <Trophy className="h-10 w-10 text-amber-500/50" />
            <p className="mt-3 text-sm font-semibold text-slate-300">Segera Hadir</p>
            <p className="mt-1 text-xs text-slate-500">{a.status}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);
