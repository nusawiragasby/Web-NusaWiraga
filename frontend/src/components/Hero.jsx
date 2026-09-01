import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageCircle, CalendarDays, MapPin } from "lucide-react";
import { waLink } from "@/lib/api";

const TARGET = new Date("2026-10-12T08:00:00+07:00").getTime();
const HERO_IMG = "https://images.unsplash.com/photo-1780476871200-d0d5fa1b7609?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNzl8MHwxfHNlYXJjaHwyfHxtYXJ0aWFsJTIwYXJ0cyUyMGZpZ2h0ZXIlMjBraWNrJTIwY29tcGV0aXRpb258ZW58MHx8fHwxNzg4MjcyMDE2fDA&ixlib=rb-4.1.0&q=85";

const STATS = [
  { value: "1.200+", label: "Pendekar Terdaftar" },
  { value: "64", label: "Perguruan Silat" },
  { value: "Rp 75 Jt", label: "Total Hadiah & Medali" },
  { value: "7 Hari", label: "Pekan Akbar 1x Setahun" },
];

const useCountdown = () => {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, TARGET - now);
  return {
    hari: Math.floor(diff / 86400000),
    jam: Math.floor((diff / 3600000) % 24),
    menit: Math.floor((diff / 60000) % 60),
    detik: Math.floor((diff / 1000) % 60),
  };
};

export const Hero = () => {
  const cd = useCountdown();
  return (
    <section id="beranda" className="relative overflow-hidden grain" data-testid="hero-section">
      <img src={HERO_IMG} alt="Pendekar pencak silat bertanding di gelanggang" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 hero-overlay" />
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
          Kejuaraan Tahunan &bull; Edisi ke-5
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="mt-4 max-w-3xl text-4xl font-black uppercase leading-none tracking-tight sm:text-5xl lg:text-6xl">
          Kejuaraan Nasional Pencak Silat <span className="text-gold-gradient">Nusa Wiraga 2026</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="mt-6 max-w-xl text-base text-slate-300 sm:text-lg">
          Satu Pekan Akbar Para Pendekar Nusantara. Uji Tangkas, Junjung Satria, Raih Tahta Juara.
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-300">
          <span className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-amber-400" /> 12 - 18 Oktober 2026</span>
          <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-amber-400" /> GOR Patriot Candrabhaga, Bekasi</span>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="mt-8 flex flex-wrap gap-3" data-testid="hero-countdown">
          {[["Hari", cd.hari], ["Jam", cd.jam], ["Menit", cd.menit], ["Detik", cd.detik]].map(([label, val]) => (
            <div key={label} className="w-20 rounded-2xl border border-amber-500/30 bg-[#13131A]/80 py-3 text-center backdrop-blur">
              <div className="font-display text-2xl font-extrabold text-amber-400">{String(val).padStart(2, "0")}</div>
              <div className="text-xs text-slate-400">{label}</div>
            </div>
          ))}
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="mt-10 flex flex-wrap gap-4">
          <Link to="/daftar" data-testid="hero-register-cta"
            className="rounded-xl bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 px-8 py-4 font-display text-base font-extrabold text-stone-900 transition-transform hover:scale-105 glow-gold">
            Formulir Pendaftaran Online
          </Link>
          <a href={waLink("Halo Panitia Nusa Wiraga, saya ingin bertanya seputar pendaftaran.")}
            target="_blank" rel="noopener noreferrer" data-testid="hero-whatsapp-cta"
            className="flex items-center gap-2 rounded-xl border border-amber-500/40 bg-[#13131A]/60 px-6 py-4 font-display text-base font-bold text-amber-300 backdrop-blur transition-colors hover:bg-[#800E19]/40">
            <MessageCircle className="h-5 w-5" /> Panitia: Nayla
          </a>
          <a href={waLink("Halo Panitia Nusa Wiraga, saya ingin bertanya seputar pendaftaran.", 1)}
            target="_blank" rel="noopener noreferrer" data-testid="hero-whatsapp-cta-2"
            className="flex items-center gap-2 rounded-xl border border-amber-500/40 bg-[#13131A]/60 px-6 py-4 font-display text-base font-bold text-amber-300 backdrop-blur transition-colors hover:bg-[#800E19]/40">
            <MessageCircle className="h-5 w-5" /> Panitia: Alfian
          </a>
        </motion.div>
        <div className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className={`rounded-2xl border border-[#2E2E3A] bg-[#13131A]/80 p-5 backdrop-blur ${i % 2 === 1 ? "lg:mt-6" : ""}`}>
              <div className="font-display text-2xl font-extrabold text-amber-400 sm:text-3xl">{s.value}</div>
              <div className="mt-1 text-xs text-slate-400 sm:text-sm">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
