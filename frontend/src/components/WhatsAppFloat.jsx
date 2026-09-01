import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/api";

export const WhatsAppFloat = () => (
  <a
    href={waLink("Halo Admin Nusa Wiraga, saya ingin informasi mengenai Kejuaraan Silat Nusa Wiraga 2026.")}
    target="_blank" rel="noopener noreferrer"
    data-testid="floating-whatsapp-btn"
    aria-label="Hubungi panitia via WhatsApp"
    className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-stone-900 transition-transform hover:scale-110 glow-gold"
  >
    <MessageCircle className="h-7 w-7" />
  </a>
);
