import { motion } from "framer-motion";
import { ShieldCheck, Trophy, Landmark } from "lucide-react";

const PILLARS = [
  { icon: ShieldCheck, title: "Satria & Berintegritas", desc: "Menjunjung nilai kesatriaan, sportivitas mutlak, dan rasa hormat antar perguruan." },
  { icon: Trophy, title: "Standar Wasit Juri PERSILAT", desc: "Sistem penilaian digital nirkabel real-time untuk akurasi dan transparansi penuh." },
  { icon: Landmark, title: "Pentas Budaya & Prestasi", desc: "Wadah pembinaan atlet usia dini hingga dewasa menyongsong pentas dunia." },
];

const IMG = "https://images.unsplash.com/photo-1707544338077-37ea82e1d994?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTJ8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWElMjB0cmFkaXRpb25hbCUyMG1hcnRpYWwlMjBhcnRzJTIwc2lsYXR8ZW58MHx8fHwxNzg4MjcyMDI1fDA&ixlib=rb-4.1.0&q=85";

export const AboutSection = () => (
  <section id="profil" className="mx-auto max-w-7xl px-4 py-24 sm:px-6" data-testid="about-section">
    <div className="grid items-center gap-12 lg:grid-cols-2">
      <motion.div initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Profil & Visi</p>
        <h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
          Tentang <span className="text-gold-gradient">Nusa Wiraga</span>
        </h2>
        <p className="mt-2 text-base text-slate-400 sm:text-lg">Warisan Budaya Nusantara, Dedikasi Tanpa Batas</p>
        <p className="mt-6 text-sm leading-relaxed text-slate-300 sm:text-base">
          Nusa Wiraga adalah gelanggang kejuaraan pencak silat tahunan bergengsi tingkat nasional yang
          diselenggarakan selama satu pekan penuh setiap tahunnya. Menghimpun aliran silat dari pelosok
          kepulauan Indonesia dalam semangat persaudaraan, integritas, dan keunggulan teknik bela diri
          bertaraf IPSI / PERSILAT.
        </p>
        <div className="mt-8 space-y-4">
          {PILLARS.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="flex gap-4 rounded-2xl border border-[#2E2E3A] bg-[#13131A] p-4 transition-transform hover:-translate-y-1">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#800E19]/40">
                <p.icon className="h-5 w-5 text-amber-400" />
              </span>
              <div>
                <h3 className="text-base font-bold">{p.title}</h3>
                <p className="mt-1 text-sm text-slate-400">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
        className="relative">
        <div className="absolute -inset-4 rounded-3xl bg-[#800E19]/20 blur-2xl" />
        <img src={IMG} alt="Pesilat mempertunjukkan jurus tradisional pencak silat"
          className="relative aspect-[4/5] w-full rounded-3xl border border-amber-500/20 object-cover" />
        <div className="absolute -bottom-6 -left-6 rounded-2xl border border-amber-500/30 bg-[#13131A] p-5 glow-gold">
          <div className="font-display text-3xl font-extrabold text-amber-400">5 Tahun</div>
          <div className="text-xs text-slate-400">Mengabdi untuk Silat Indonesia</div>
        </div>
      </motion.div>
    </div>
  </section>
);
