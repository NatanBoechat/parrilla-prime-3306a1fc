import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import logoAsset from "@/assets/parrilla-logo-vermelha.png";
import logoBrancaVermelha from "@/assets/parrilla-logo-branca-vermelha.png";
import skullAsset from "@/assets/skull.jpg";
import porchettaAsset from "@/assets/porchetta.jpg";
import chefAsset from "@/assets/chef.jpg";
import coupleAsset from "@/assets/couple.jpg";
const heroDesktopAsset = { url: "/hero/hero-desktop.png" };
const heroMobileAsset = { url: "/hero/hero-mobile.png" };
const eventMapAsset = { url: "/gallery/event-map-aerial.jpg" };
import rodaGiganteImg from "@/assets/roda-gigante-real.png";
import touroMecanicoImg from "@/assets/touro-real.png";
import roboGiganteImg from "@/assets/robo-real.png";
import balonismoImg from "@/assets/balonismo-real.png";
import estacoesImg from "@/assets/estacoes.jpg";
import showSertanejoImg from "@/assets/shows-real.png";
import kidsZoneImg from "@/assets/kids-zone.png";
import showsFlyerImg from "@/assets/shows-flyer.png";
import rodaCarneImg from "@/assets/roda-carne.png";
const gallery1 = { url: "/gallery/gallery-35.jpg" };
const gallery2 = { url: "/gallery/gallery-36.jpg" };
const gallery3 = { url: "/gallery/gallery-37.jpg" };
const gallery4 = { url: "/gallery/gallery-38.jpg" };
const gallery5 = { url: "/gallery/gallery-39.jpg" };

import caraguafmLogo from "@/assets/sponsors/caraguafm.jpg";
import tncLogo from "@/assets/sponsors/tnc.png";
import fordLogo from "@/assets/sponsors/ford.png";
import redbullLogo from "@/assets/sponsors/redbull.png";
import trombiniLogo from "@/assets/sponsors/trombini.png";
import ambevLogo from "@/assets/sponsors/ambev.png";
import realezaLogo from "@/assets/sponsors/realeza.png";
import selvaLogo from "@/assets/sponsors/selva.png";
import hamptonLogo from "@/assets/sponsors/hampton.png";
import bandLogo from "@/assets/sponsors/band.png";
import qbLogo from "@/assets/sponsors/qb.png";
import bigjhonLogo from "@/assets/sponsors/bigjhon.png";
const sponsorLogos = [
  { src: tncLogo, name: "TNC" },
  { src: fordLogo, name: "Ford" },
  { src: redbullLogo, name: "Red Bull" },
  { src: trombiniLogo, name: "Diversões Trombini" },
  { src: ambevLogo, name: "Ambev" },
  { src: realezaLogo, name: "Realeza" },
  { src: selvaLogo, name: "Selva Zeladoria" },
  { src: hamptonLogo, name: "Hampton by Hilton" },
  { src: bandLogo, name: "Band" },
  { src: qbLogo, name: "QB Construções" },
  { src: caraguafmLogo, name: "Caraguá FM 89.5" },
  { src: bigjhonLogo, name: "Big Jhon" },
];

export const Route = createFileRoute("/")({
  component: Index,
});

const EVENT_DATE = new Date("2026-09-05T12:00:00-03:00").getTime();

// All cuts combined (Front Stage + Camarote exclusives), no chef names.
const CORTES = [
  "Alcatra de Cordeiro",
  "Ancho",
  "Arroz à Mineira",
  "Brisket",
  "Burger",
  "Chorizo",
  "Costela",
  "Costelinha Suína",
  "Cupim",
  "Chicken Fries",
  "Peixe",
  "Picanha",
  "Prime Rib",
  "Sobrecoxa",
  "Torresmo",
  "Gnocchi & Ragu de Linguiça",
  "Paella de Frutos do Mar",
];

function Reveal({ children, className = "", delay = 0, as: Tag = "div" }: { children: React.ReactNode; className?: string; delay?: number; as?: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        filter: visible ? "blur(0)" : "blur(6px)",
        transition: `opacity 900ms cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 900ms cubic-bezier(.2,.7,.2,1) ${delay}ms, filter 900ms ease ${delay}ms`,
        willChange: "opacity, transform, filter",
      }}
    >
      {children}
    </Tag>
  );
}

function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const duration = 2200;
    let raf = 0;
    const tick = () => {
      const p = Math.min(1, (Date.now() - start) / duration);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(onDone, 400);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500"
      style={{ opacity: progress >= 1 ? 0 : 1, pointerEvents: progress >= 1 ? "none" : "auto" }}
    >
      <div className="relative w-56 md:w-72 animate-flicker">
        <img src={logoAsset} alt="Parrilla Day" className="w-full h-auto" />
      </div>
      <div className="mt-12 w-48 h-px bg-border overflow-hidden">
        <div className="h-full bg-ember" style={{ width: `${progress * 100}%`, transition: "width 0.1s linear" }} />
      </div>
      <p className="mt-4 text-xs tracking-[0.3em] text-muted-foreground uppercase">
        Acendendo a brasa · {Math.round(progress * 100)}%
      </p>
    </div>
  );
}

function HeroHeadline({ play }: { play: boolean }) {
  const lines = [
    { text: "O MAIOR", accent: false },
    { text: "FESTIVAL DE", accent: false },
    { text: "CHURRASCO", accent: true },
    { text: "DO LITORAL NORTE", accent: false },
  ];

  let charIndex = 0;
  return (
    <h1
      className="text-display leading-[0.92] md:leading-[0.82] text-bone select-none"
      style={{ perspective: "1000px" }}
    >
      {lines.map((line, li) => (
        <div
          key={li}
          className={`block overflow-hidden ${
            line.accent
              ? "text-[16vw] md:text-[8.5vw] text-ember"
              : "text-[11vw] md:text-[5.8vw]"
          } leading-[0.92] md:leading-[0.82]`}
        >
          <span className="inline-block" style={{ transformStyle: "preserve-3d" }}>
            {line.text.split("").map((ch, i) => {
              const delay = 0.15 + charIndex * 0.022 + li * 0.08;
              charIndex++;
              return (
                <span
                  key={i}
                  className="inline-block"
                  style={{
                    animation: play ? `char-rise 1.1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s both` : "none",
                    opacity: play ? undefined : 0,
                    whiteSpace: ch === " " ? "pre" : "normal",
                    transformOrigin: "50% 100%",
                  }}
                >
                  {ch === " " ? "\u00A0" : ch}
                </span>
              );
            })}
          </span>
        </div>
      ))}
    </h1>
  );
}

function Countdown() {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, EVENT_DATE - Date.now());
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff / 3600000) % 24);
      const m = Math.floor((diff / 60000) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setT({ d, h, m, s });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  const items = [
    { label: "Dias", v: t.d },
    { label: "Horas", v: t.h },
    { label: "Minutos", v: t.m },
    { label: "Segundos", v: t.s },
  ];
  return (
    <div className="grid grid-cols-4 gap-2 md:gap-6">
      {items.map((it) => (
        <div key={it.label} className="text-center">
          <div className="text-display text-5xl md:text-8xl text-ember ember-glow tabular-nums">
            {String(it.v).padStart(2, "0")}
          </div>
          <div className="mt-2 text-[10px] md:text-xs tracking-[0.3em] uppercase text-muted-foreground">
            {it.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function PhotoStrip() {
  const photos = [skullAsset, porchettaAsset, estacoesImg, chefAsset, coupleAsset];
  const captions = ["Tradição", "Fogo lento", "Estações", "Mestres", "Encontros"];
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      const p = Math.min(1, Math.max(0, -rect.top / total));
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={ref} className="relative" style={{ height: `${photos.length * 55}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {photos.map((p, i) => {
          const start = i / photos.length;
          const end = (i + 1) / photos.length;
          let opacity = 0;
          let scale = 1.15;
          let y = 60;
          const isLast = i === photos.length - 1;
          if (progress >= start && progress < end) {
            const local = (progress - start) / (end - start);
            if (i === 0) {
              opacity = local > 0.85 ? (1 - local) / 0.15 : 1;
            } else if (isLast) {
              opacity = local < 0.15 ? local / 0.15 : 1;
            } else {
              opacity = local < 0.15 ? local / 0.15 : local > 0.85 ? (1 - local) / 0.15 : 1;
            }
            scale = 1.15 - local * 0.15;
            y = 60 - local * 60;
          } else if (i === 0 && progress < start) {
            opacity = 1;
            scale = 1;
            y = 0;
          } else if (isLast && progress >= end) {
            opacity = 1;
            scale = 1;
            y = 0;
          }
          const objPos = i === 3 || i === 4 ? "center 20%" : "center";
          return (
            <div
              key={i}
              className="absolute inset-0 transition-none"
              style={{ opacity, transform: `translateY(${y}px) scale(${scale})` }}
            >
              <img src={p} alt={captions[i]} className="w-full h-full object-cover" style={{ objectPosition: objPos }} />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/60" />
              <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                <h2 data-reveal className="text-display text-6xl md:text-9xl text-bone ember-glow">
                  {captions[i]}
                </h2>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function PhotoStripNew() {
  const photos = [gallery1.url, gallery2.url, gallery3.url, gallery4.url, gallery5.url];
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      const p = Math.min(1, Math.max(0, -rect.top / total));
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={ref} className="relative" style={{ height: `${photos.length * 55}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {photos.map((p, i) => {
          const start = i / photos.length;
          const end = (i + 1) / photos.length;
          let opacity = 0;
          let scale = 1.15;
          let y = 60;
          const isLast = i === photos.length - 1;
          if (progress >= start && progress < end) {
            const local = (progress - start) / (end - start);
            if (i === 0) {
              opacity = local > 0.85 ? (1 - local) / 0.15 : 1;
            } else if (isLast) {
              opacity = local < 0.15 ? local / 0.15 : 1;
            } else {
              opacity = local < 0.15 ? local / 0.15 : local > 0.85 ? (1 - local) / 0.15 : 1;
            }
            scale = 1.15 - local * 0.15;
            y = 60 - local * 60;
          } else if (i === 0 && progress < start) {
            opacity = 1;
            scale = 1;
            y = 0;
          } else if (isLast && progress >= end) {
            opacity = 1;
            scale = 1;
            y = 0;
          }
          return (
            <div
              key={i}
              className="absolute inset-0 transition-none"
              style={{ opacity, transform: `translateY(${y}px) scale(${scale})` }}
            >
              <img src={p} alt="" className="w-full h-full object-cover" style={{ objectPosition: "center" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/40" />
            </div>
          );
        })}
      </div>
    </section>
  );
}

const ATRACOES = [
  { t: "Shows Sertanejos", d: "Guilherme & Vinícius, Naessa, Peddro Henrique & Luciano no palco principal.", img: showSertanejoImg, tag: "Dia 05" },
  { t: "Balonismo", d: "Subida de balão de ar quente sobre o litoral ao nascer do sol.", img: balonismoImg, tag: "Dia 05" },
  { t: "Robô Gigante", d: "Performance interativa com LEDs e fumaça que para o festival.", img: roboGiganteImg, tag: "Dia 05" },
  { t: "Roda Gigante", d: "Vista panorâmica do festival e da praia de Caraguatatuba.", img: rodaGiganteImg, tag: "Dia 05" },
  { t: "Touro Mecânico", d: "O clássico desafio sertanejo. Quem aguenta os 8 segundos?", img: touroMecanicoImg, tag: "Dia 05" },
  { t: "Mega Estação Kids", d: "Brinquedos, monitores e diversão para os pequenos.", img: kidsZoneImg, tag: "Dia 05" },
];

function StickyBuyBar({ visible }: { visible: boolean }) {
  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 px-3 pb-3 md:px-6 md:pb-6 pointer-events-none"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(120%)",
        transition: "opacity 500ms ease, transform 600ms cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div
        className="pointer-events-auto max-w-5xl mx-auto flex items-center justify-between gap-3 md:gap-6 px-4 md:px-6 py-3 md:py-4 rounded-2xl border border-ember/40 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]"
        style={{
          background: "oklch(0.13 0.02 30 / 0.55)",
          backdropFilter: "blur(22px) saturate(160%)",
        }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <img src={logoBrancaVermelha} alt="" className="h-9 md:h-11 w-auto shrink-0" />
          <div className="min-w-0 hidden sm:block">
            <div className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-ember">Parrilla Day · 05 Set 2026</div>
            <div className="text-xs md:text-sm text-bone/80 truncate">Open Churrasco Premium · Open Bar Premium</div>
          </div>
        </div>
        <a
          href="#ingressos"
          className="group relative shrink-0 px-5 md:px-8 py-3 md:py-4 bg-ember text-background text-[10px] md:text-xs tracking-[0.25em] uppercase font-bold hover:bg-ember/90 transition overflow-hidden rounded-md"
        >
          <span className="relative z-10">Garantir agora →</span>
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-bone/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </a>
      </div>
    </div>
  );
}

function InlineCTA({ label = "Garantir agora" }: { label?: string }) {
  return (
    <div className="px-6 py-16 md:py-24">
      <div
        className="max-w-4xl mx-auto text-center rounded-2xl border border-ember/40 px-8 md:px-16 py-12 md:py-20"
        style={{
          background: "radial-gradient(ellipse at top, oklch(0.22 0.06 35 / 0.9), oklch(0.12 0.03 30 / 0.95) 70%)",
          boxShadow: "0 24px 80px -24px rgba(0,0,0,0.6), inset 0 1px 0 0 oklch(0.7 0.18 45 / 0.15)",
        }}
      >
        <div className="text-[11px] md:text-xs tracking-[0.45em] uppercase text-ember mb-5">05 · SET · 2026</div>
        <h3 className="text-display text-4xl md:text-6xl lg:text-7xl text-bone mb-8 leading-none">{label}</h3>
        <a
          href="#ingressos"
          className="group inline-flex items-center justify-center gap-3 px-10 md:px-14 py-4 md:py-5 bg-ember text-background text-xs md:text-sm tracking-[0.3em] uppercase font-bold hover:bg-ember/90 transition rounded-lg"
        >
          Garantir agora
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>
    </div>
  );
}

function Index() {
  const [loaded, setLoaded] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const [menuGlass, setMenuGlass] = useState(false);

  useEffect(() => {
    if (!loaded) return;
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    els.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(28px)";
      el.style.filter = "blur(6px)";
      el.style.transition = "opacity 900ms cubic-bezier(.2,.7,.2,1), transform 900ms cubic-bezier(.2,.7,.2,1), filter 900ms ease";
      el.style.willChange = "opacity, transform, filter";
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            const delay = Number(el.dataset.revealDelay || 0);
            el.style.transitionDelay = `${delay}ms`;
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            el.style.filter = "blur(0)";
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [loaded]);

  useEffect(() => {
    if (!loaded) return;
    const onScroll = () => {
      const y = window.scrollY;
      setMenuGlass(y > 80);
      setShowBar(y > window.innerHeight * 0.9);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [loaded]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {!loaded && <Preloader onDone={() => setLoaded(true)} />}

      {/* NAV */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          menuGlass
            ? "bg-background/70 border-b border-border/20 backdrop-blur-xl md:translate-y-0 md:opacity-100"
            : "bg-transparent border-b border-transparent md:-translate-y-full md:opacity-0 md:pointer-events-none"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">
          <a href="#top" className="flex items-center gap-3">
            <img src={logoBrancaVermelha} alt="Parrilla Day" className="h-14 md:h-16 w-auto" />
          </a>
          <nav className="hidden md:flex items-center gap-8 text-xs tracking-[0.25em] uppercase text-muted-foreground">
            <a href="#atracoes" className="hover:text-ember transition">Atrações</a>
            <a href="#estacoes" className="hover:text-ember transition">Estações</a>
            <a href="#mapa" className="hover:text-ember transition">Mapa</a>
            <a href="#ingressos" className="hover:text-ember transition">Ingressos</a>
          </nav>
          <a href="#ingressos" className="text-xs tracking-[0.2em] uppercase px-4 py-2 border border-ember text-ember hover:bg-ember hover:text-background transition">
            Garantir
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative md:min-h-screen md:h-screen flex flex-col md:block md:items-center pt-20 md:pt-24 md:pb-24 overflow-hidden grain isolate">
        {/* DESKTOP BG */}
        <div className="hidden md:block absolute inset-0 z-0">
        <img
            src={heroDesktopAsset.url}
            alt=""
            className="absolute inset-y-0 right-0 h-full w-auto max-w-none object-cover object-right"
            style={{ transform: "translateX(18%)" }}
          />
          {/* Gradient: narrower left-side fade so faces stay visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-background from-15% via-background/60 via-30% to-transparent to-50%" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,oklch(0.13_0.015_30/0.6)_95%)]" />
          <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30 animate-heat-haze bg-[radial-gradient(ellipse_at_center,oklch(0.7_0.22_45/0.12),transparent_60%)]" />
        </div>

        {/* MOBILE BANNER (top) */}
        <div className="md:hidden relative w-full">
          <img
            src={heroMobileAsset.url}
            alt="Parrilla Day"
            className="w-full h-auto block"
          />
          {/* Slight bottom fade to blend into the page, not hide flyer details */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent via-background/30 to-background pointer-events-none" />
        </div>

        {/* Rising embers (desktop only) */}
        <div className="hidden md:block absolute inset-0 z-[1] pointer-events-none overflow-hidden">
          {Array.from({ length: 22 }).map((_, i) => {
            const left = (i * 53) % 100;
            const delay = (i * 0.37) % 8;
            const dur = 6 + ((i * 7) % 8);
            const size = 2 + (i % 4);
            const drift = ((i % 5) - 2) * 30;
            return (
              <span
                key={i}
                className="absolute bottom-0 rounded-full bg-ember"
                style={{
                  left: `${left}%`,
                  width: size,
                  height: size,
                  boxShadow: "0 0 12px 2px oklch(0.7 0.22 45 / 80%)",
                  animation: `ember-rise ${dur}s linear ${delay}s infinite`,
                  ["--drift" as never]: `${drift}px`,
                }}
              />
            );
          })}
        </div>

        {/* CONTENT */}
        <div className="relative z-10 w-full md:absolute md:inset-0 md:flex md:items-center px-6 pt-6 md:pt-0 pb-16 md:pb-0">
          <div className="max-w-[1600px] mx-auto w-full md:pr-[35%]">
            <div
              className="flex items-center gap-2 md:gap-3 mb-4 md:mb-8 text-[8px] md:text-[12px] tracking-[0.28em] md:tracking-[0.4em] uppercase text-ember"
              style={{
                animation: loaded ? "char-rise 0.8s ease-out 0s both" : "none",
                opacity: loaded ? undefined : 0,
                textShadow: "0 2px 12px rgba(0,0,0,0.9), 0 0 4px rgba(0,0,0,0.8)",
              }}
            >
              <span
                className="h-px bg-ember origin-left block shrink-0"
                style={{
                  width: "1.5rem",
                  animation: loaded ? "slash-in 0.9s cubic-bezier(0.7,0,0.2,1) 0.1s both" : "none",
                }}
              />
              <span className="whitespace-nowrap">3ª Ed. · Caraguá · 05 Set 2026</span>
            </div>

            <HeroHeadline play={loaded} />

            <p
              className="mt-6 md:mt-8 text-serif-italic text-base md:text-xl text-bone max-w-xl leading-relaxed"
              style={{
                animation: loaded ? "char-rise 1s ease-out 1.6s both" : "none",
                opacity: loaded ? undefined : 0,
                textShadow: "0 2px 16px rgba(0,0,0,0.9), 0 0 6px rgba(0,0,0,0.7)",
              }}
            >
              Uma <span className="text-ember">experiência premium e única</span>, pensada para quem entende de churrasco e vive intensamente cada momento. Alta gastronomia, open bar premium e um lineup selecionado para um dia memorável.
            </p>
            <div
              className="mt-8 md:mt-10 flex flex-wrap gap-4"
              style={{
                animation: loaded ? "char-rise 1s ease-out 1.8s both" : "none",
                opacity: loaded ? undefined : 0,
              }}
            >
              <a href="#ingressos" className="group relative px-6 md:px-8 py-3 md:py-4 bg-ember text-background text-[10px] md:text-xs tracking-[0.3em] uppercase font-bold hover:bg-ember/90 transition overflow-hidden">
                <span className="relative z-10">Garantir agora →</span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-bone/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </a>
              <a href="#festival" className="px-6 md:px-8 py-3 md:py-4 border border-ember/40 text-[10px] md:text-xs tracking-[0.3em] uppercase hover:border-ember hover:text-ember transition">
                Saber Mais
              </a>
            </div>

            <div className="hidden md:block mt-12 text-[10px] tracking-[0.4em] uppercase text-muted-foreground animate-pulse">
              ↓ Role para descobrir
            </div>
          </div>
        </div>

      </section>

      {/* OPEN ICONS STRIP */}
      <section className="py-12 px-6 border-y border-border/40 bg-background">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { t: "Open Churrasco Premium", d: "Estações premium à vontade" },
            { t: "Open Bar Premium", d: "Cervejas & refrigerantes" },
            { t: "Música ao Vivo", d: "Sertanejo & shows" },
            { t: "Mega Estação Kids", d: "Diversão garantida" },
          ].map((x) => (
            <div key={x.t} className="flex flex-col items-center gap-2">
              <div className="text-display text-xl md:text-2xl text-ember tracking-wider">{x.t}</div>
              <div className="text-xs tracking-[0.2em] uppercase text-muted-foreground">{x.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="py-24 px-6 border-b border-border/40 bg-card/30">
        <div className="max-w-5xl mx-auto text-center">
          <div className="text-xs tracking-[0.4em] uppercase text-ember mb-4">5 de Setembro de 2026</div>
          <h2 data-reveal className="text-display text-4xl md:text-6xl mb-12 text-bone">A contagem regressiva</h2>
          <Countdown />
          <div className="mt-12">
            <a href="#ingressos" className="inline-block px-8 py-4 bg-ember text-background text-xs tracking-[0.25em] uppercase font-bold hover:bg-ember/90 transition rounded-md">
              Garantir agora →
            </a>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="py-8 border-b border-border/40 overflow-hidden">
        <div className="flex gap-12 animate-marquee whitespace-nowrap text-display text-4xl md:text-6xl text-ember/70">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-12 shrink-0">
              {["Open Churrasco Premium", "✦", "Open Bar Premium", "✦", "Estação de Churrasco Premium", "✦", "Sertanejo ao Vivo", "✦", "Roda Gigante", "✦", "Beira-Mar", "✦"].map((w, i) => (
                <span key={i}>{w}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* PHOTO STRIP */}
      {/* <PhotoStrip /> hidden — kept for potential restore */}
      <PhotoStripNew />

      <InlineCTA label="Garantir agora" />


      {/* ESTAÇÃO DE CHURRASCO PREMIUM */}
      <section id="estacoes" className="py-20 md:py-24 px-6 bg-card/30 border-y border-border/40 relative">
        <div className="absolute inset-0 -z-10 opacity-15 overflow-hidden pointer-events-none">
          <img src={estacoesImg} alt="" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
        </div>
        <div className="max-w-6xl mx-auto">
          <h2 data-reveal className="text-display text-5xl md:text-7xl text-bone mb-4">Estação de <span className="text-ember">Churrasco Premium</span></h2>
          <p data-reveal data-reveal-delay="150" className="text-serif-italic text-xl md:text-2xl text-muted-foreground mb-16 max-w-3xl">
            Uma experiência premium e única. Os maiores chefes do Brasil comandando estações à céu aberto, com cortes nobres em fogo lento e serviço de alto padrão do início ao fim.
          </p>

          <div className="border border-border/40 bg-background/60 backdrop-blur">
            <div className="p-6 md:p-8 border-b border-border/40 flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <div className="text-[10px] tracking-[0.4em] uppercase text-ember mb-2">Todos os cortes</div>
                <div className="text-display text-3xl md:text-4xl text-bone">Churrasco sem fim</div>
              </div>
              <div className="text-xs tracking-[0.25em] uppercase text-muted-foreground text-right max-w-sm">
                Camarote inclui <span className="text-ember">cortes premium exclusivos</span>, além de todos os cortes disponíveis no Front Stage.
              </div>
            </div>
            <ul className="grid grid-cols-2 md:grid-cols-3 divide-x divide-y divide-border/40">
              {CORTES.map((it) => (
                <li key={it} className="px-5 py-5 md:px-6 md:py-6 bg-background hover:bg-card transition group">
                  <div className="text-display text-lg md:text-2xl text-bone group-hover:text-ember transition">{it}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <InlineCTA label="Viver essa experiência" />

      {/* HEADLINERS */}
      <section className="py-16 md:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-xs tracking-[0.4em] uppercase text-ember mb-4">Headliners · Dia 05</div>
          <h2 data-reveal className="text-display text-5xl md:text-7xl text-bone mb-8">Os shows</h2>
        </div>
        <div className="relative overflow-hidden group">
          <img
            src={showsFlyerImg}
            alt="Flyer oficial dos shows do Parrilla Day 2026"
            className="w-full h-auto transition duration-[1500ms] group-hover:scale-[1.02]"
            style={{
              maskImage: "linear-gradient(to bottom, black 94%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 94%, transparent 100%)",
            }}
            loading="lazy"
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-6 md:mt-8">
          <div className="grid md:grid-cols-3 gap-4">
            {["Guilherme & Vinícius", "Naessa", "Peddro Henrique & Luciano"].map((n) => (
              <div key={n} className="p-4 md:p-5 border border-border/40 text-center hover:border-ember transition">
                <h3 className="text-display text-lg md:text-2xl text-bone">{n}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ATRAÇÕES / ENTRETENIMENTO */}
      <section id="atracoes" className="py-20 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs tracking-[0.4em] uppercase text-ember mb-4">Entretenimento</div>
          <h2 data-reveal className="text-display text-5xl md:text-7xl text-bone mb-4 max-w-4xl leading-[0.95]">
            Entretenimento de <span className="text-ember">outro nível</span>
          </h2>
          <p data-reveal data-reveal-delay="150" className="text-serif-italic text-xl md:text-2xl text-muted-foreground mb-16 max-w-3xl">
            Muito além do churrasco: um dia inteiro de experiências premium, com shows nacionais, atrações exclusivas e momentos únicos pensados para você viver de ponta a ponta.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ATRACOES.map((a) => (
              <div key={a.t} className="group relative overflow-hidden border border-border/40 hover:border-ember transition bg-card">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={a.img} alt={a.t} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition duration-[1200ms] ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="text-[10px] tracking-[0.3em] uppercase text-ember mb-2">{a.tag}</div>
                  <h3 className="text-display text-3xl text-bone mb-2 group-hover:text-ember transition">{a.t}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{a.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAPA DO FESTIVAL */}
      <section id="mapa" className="py-20 md:py-24 px-6 bg-card/30 border-y border-border/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs tracking-[0.4em] uppercase text-ember mb-4">Mapa do Festival</div>
          <h2 data-reveal className="text-display text-5xl md:text-7xl text-bone mb-12">
            Parrilla Day <span className="text-ember">Caraguá Beach</span>
          </h2>
          <div className="relative overflow-hidden border border-border/40">
            <img src={eventMapAsset.url} alt="Mapa do Parrilla Day Caraguá Beach" className="w-full h-auto" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ESTRUTURA / PALCO */}
      <section className="py-20 md:py-24">
        <div className="grid md:grid-cols-2 gap-0 items-stretch">
          <div className="relative overflow-hidden aspect-square w-full">
            <img src={rodaCarneImg} alt="Roda de carne Parrilla Day" loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div className="px-6 md:px-16 flex flex-col justify-center py-12">
            <div className="text-xs tracking-[0.4em] uppercase text-ember mb-4">Experiência</div>
            <h2 data-reveal className="text-display text-5xl md:text-7xl text-bone leading-none mb-6">
              Um churrasco <span className="text-ember">verdadeiramente premium</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Uma experiência premium e única, construída em cada detalhe. Do serviço de camarote às parrilleras selecionadas, tudo pensado para transformar esse dia no ponto alto do seu ano.
            </p>
            <div className="mt-10">
              <a href="#ingressos" className="inline-block px-8 py-4 bg-ember text-background text-xs tracking-[0.25em] uppercase font-bold hover:bg-ember/90 transition rounded-md">
                Garantir agora →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* INGRESSOS */}
      <section id="ingressos" className="py-20 md:py-24 px-6 relative overflow-hidden bg-card/30 border-y border-border/40">
        <div className="absolute inset-0 -z-10 opacity-20">
          <img src={skullAsset} alt="" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="text-xs tracking-[0.4em] uppercase text-ember mb-4">Ingressos</div>
          <h2 data-reveal className="text-display text-5xl md:text-7xl text-bone mb-4">Sua entrada no festival</h2>
          <p data-reveal data-reveal-delay="150" className="text-serif-italic text-xl text-muted-foreground mb-16 max-w-2xl">
            05 de setembro · Open Bar Premium · Open Churrasco Premium · Drinks vendidos à parte
          </p>
          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            <div className="p-10 md:p-14 border border-border/60 bg-card/60 backdrop-blur flex flex-col">
              <div className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">Front Stage · Dia 05</div>
              <div className="flex items-baseline gap-2 mb-2 flex-wrap">
                <span className="text-display text-7xl md:text-8xl text-bone">R$349</span>
                <span className="text-muted-foreground">+ taxa</span>
              </div>
              <ul className="space-y-3 mt-10 mb-12 text-sm text-muted-foreground">
                <li className="flex gap-3"><span className="text-ember">▸</span> Open Bar Premium</li>
                <li className="flex gap-3"><span className="text-ember">▸</span> Open Churrasco Premium</li>
                <li className="flex gap-3"><span className="text-ember">▸</span> Acesso a todos os shows e atrações</li>
              </ul>
              <a href="#ingressos" className="w-full text-center py-4 bg-ember text-background text-sm tracking-[0.2em] uppercase font-semibold hover:bg-ember/90 transition mt-auto rounded-md">
                Garantir agora
              </a>
            </div>
            <div className="p-10 md:p-14 border border-ember bg-gradient-to-br from-blood/40 to-card/60 backdrop-blur relative flex flex-col">
              <div className="absolute top-6 right-6 text-[10px] tracking-[0.3em] uppercase text-ember">★ Premium</div>
              <div className="text-xs tracking-[0.3em] uppercase text-ember mb-4">Camarote · Dia 05</div>
              <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                <span className="text-display text-6xl md:text-7xl text-bone">R$629</span>
                <span className="text-muted-foreground text-sm tracking-wide uppercase">por pessoa + taxa</span>
              </div>
              <div className="text-sm text-bone/70 mb-2">
                Camarote fechado para <span className="text-ember font-semibold">10 pessoas</span> · <span className="text-muted-foreground">R$6.290 + taxa no total</span>
              </div>
              <ul className="space-y-3 mt-10 mb-12 text-sm text-bone/80">
                <li className="flex gap-3"><span className="text-ember">▸</span> Tenda exclusiva com vista privilegiada</li>
                <li className="flex gap-3"><span className="text-ember">▸</span> Cortes Premium exclusivos do Camarote</li>
                <li className="flex gap-3"><span className="text-ember">▸</span> Open Churrasco Premium · Open Bar Premium</li>
                <li className="flex gap-3"><span className="text-ember">▸</span> Garçons exclusivos</li>
                <li className="flex gap-3"><span className="text-ember">▸</span> Banheiros e móveis diferenciados</li>
              </ul>
              <a href="#ingressos" className="w-full text-center py-4 bg-ember text-background text-sm tracking-[0.2em] uppercase font-semibold hover:bg-ember/90 transition mt-auto rounded-md">
                Reservar Camarote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PATROCINADORES */}
      <section id="patrocinadores" className="py-20 md:py-24 px-6 border-t border-border/40">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-xs tracking-[0.4em] uppercase text-ember mb-4">Patrocínio</div>
          <h2 data-reveal className="text-display text-5xl md:text-7xl text-bone mb-16">
            Quem faz o festival <span className="text-ember">acontecer</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 md:gap-10 items-center">
            {sponsorLogos.map((l) => (
              <div key={l.name} className="flex items-center justify-center aspect-square p-2 overflow-visible">
                <img
                  src={l.src}
                  alt={l.name}
                  loading="lazy"
                  className="w-full h-full object-contain transition duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DISCLAIMERS */}
      <section className="px-6 pt-12 pb-6 border-t border-border/40">
        <div className="max-w-4xl mx-auto space-y-2 text-xs text-muted-foreground/80 leading-relaxed text-center">
          <p>* Imagens meramente ilustrativas.</p>
          <p>* Teremos uma fila diferencial e um termo na entrada que será assinado pelo responsável. Os menores de idade receberão uma pulseira de identificação.</p>
        </div>
      </section>

      {/* FOOTER / CTA */}
      <footer className="py-24 md:py-28 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
            <div className="text-center md:text-left">
              <img src={logoBrancaVermelha} alt="Parrilla Day" className="h-32 md:h-40 mx-auto md:mx-0 mb-10 animate-flicker" />
              <h2 data-reveal className="text-display text-4xl md:text-6xl text-bone mb-4">Caraguatatuba te espera</h2>
              <p data-reveal data-reveal-delay="150" className="text-serif-italic text-xl text-muted-foreground">5 de setembro · 2026</p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-8">
              <p className="text-sm text-muted-foreground text-center md:text-right max-w-sm leading-relaxed">
                Garanta sua presença no maior festival de churrasco do litoral norte. Ingressos limitados para o dia 05.
              </p>
              <div className="flex flex-wrap justify-center md:justify-end gap-4">
                <a href="#ingressos" className="px-8 py-4 bg-ember text-background text-sm tracking-[0.2em] uppercase font-semibold hover:bg-ember/90 transition">
                  Garantir agora
                </a>
                <a href="https://instagram.com/parrilladaycaragua" target="_blank" rel="noreferrer" className="px-8 py-4 border border-border text-sm tracking-[0.2em] uppercase hover:border-ember transition">
                  @parrilladaycaragua
                </a>
              </div>
            </div>
          </div>
          <div className="mt-24 pt-10 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4 text-xs tracking-[0.2em] uppercase text-muted-foreground">
            <span>© 2026 Parrilla Day · Caraguá Beach · Caraguatatuba/SP</span>
            <span>3ª Edição · O maior festival de churrasco do litoral norte</span>
          </div>
        </div>
      </footer>

      <StickyBuyBar visible={showBar && loaded} />
    </div>
  );
}
