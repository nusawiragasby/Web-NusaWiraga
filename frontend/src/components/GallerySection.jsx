import { motion } from "framer-motion";

const IMAGES = [
  { src: "https://images.unsplash.com/photo-1780476870825-23f9541f99e1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNzl8MHwxfHNlYXJjaHw0fHxtYXJ0aWFsJTIwYXJ0cyUyMGZpZ2h0ZXIlMjBraWNrJTIwY29tcGV0aXRpb258ZW58MHx8fHwxNzg4MjcyMDE2fDA&ixlib=rb-4.1.0&q=85", alt: "Duel tanding dua pesilat di gelanggang", cls: "sm:col-span-2 sm:row-span-2" },
  { src: "https://images.unsplash.com/photo-1767987656450-13e423052ed3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNzl8MHwxfHNlYXJjaHwxfHxtYXJ0aWFsJTIwYXJ0cyUyMGZpZ2h0ZXIlMjBraWNrJTIwY29tcGV0aXRpb258ZW58MHx8fHwxNzg4MjcyMDE2fDA&ixlib=rb-4.1.0&q=85", alt: "Pesilat putri berlatih tanding", cls: "" },
  { src: "https://images.unsplash.com/photo-1706374503312-7a4a4c030d2d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODh8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBtZWRhbCUyMHRyb3BoeSUyMHBvZGl1bSUyMGNlcmVtb255fGVufDB8fHx8MTc4ODI3MjAyNXww&ixlib=rb-4.1.0&q=85", alt: "Medali kejuaraan di podium", cls: "" },
  { src: "https://images.unsplash.com/photo-1757365225211-1515ecc8a109?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODh8MHwxfHNlYXJjaHwyfHxzcG9ydHMlMjBtZWRhbCUyMHRyb3BoeSUyMHBvZGl1bSUyMGNlcmVtb255fGVufDB8fHx8MTc4ODI3MjAyNXww&ixlib=rb-4.1.0&q=85", alt: "Koleksi trofi kejuaraan", cls: "sm:col-span-2" },
  { src: "https://images.unsplash.com/photo-1707405432940-6124db71c729?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTJ8MHwxfHNlYXJjaHwyfHxpbmRvbmVzaWElMjB0cmFkaXRpb25hbCUyMG1hcnRpYWwlMjBhcnRzJTIwc2lsYXR8ZW58MHx8fHwxNzg4MjcyMDI1fDA&ixlib=rb-4.1.0&q=85", alt: "Panggung seni bela diri tradisional", cls: "" },
];

export const GallerySection = () => (
  <section id="galeri" className="mx-auto max-w-7xl px-4 py-24 sm:px-6" data-testid="gallery-section">
    <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Galeri</p>
    <h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
      Kilas <span className="text-gold-gradient">Perjuangan</span>
    </h2>
    <p className="mt-2 max-w-2xl text-sm text-slate-400 sm:text-base">
      Momen epik, keringat, dan penghormatan di gelanggang Nusa Wiraga.
    </p>
    <div className="mt-12 grid auto-rows-[180px] grid-cols-1 gap-4 sm:grid-cols-3 sm:auto-rows-[200px]">
      {IMAGES.map((img, i) => (
        <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ delay: i * 0.07 }}
          className={`group relative overflow-hidden rounded-2xl border border-[#2E2E3A] ${img.cls}`}
          data-testid={`gallery-item-${i}`}>
          <img src={img.src} alt={img.alt} loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0E]/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <p className="absolute bottom-3 left-3 right-3 text-xs font-semibold text-slate-200 opacity-0 transition-opacity group-hover:opacity-100">{img.alt}</p>
        </motion.div>
      ))}
    </div>
  </section>
);
