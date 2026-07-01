import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import logoAsset from "@/assets/parrilla-logo-vermelha.png";
import skullAsset from "@/assets/skull.jpg";
import porchettaAsset from "@/assets/porchetta.jpg";
import grillAsset from "@/assets/grill.jpg";
import chefAsset from "@/assets/chef.jpg";
import coupleAsset from "@/assets/couple.jpg";
import heroBgAsset from "@/assets/hero-bg.png";
import heroVideoAsset from "@/assets/hero-bg.mp4";
import eventMapAsset from "@/assets/event-map.jpg";
import rodaGiganteImg from "@/assets/roda-gigante-real.png";
import touroMecanicoImg from "@/assets/touro-real.png";
import roboGiganteImg from "@/assets/robo-real.png";
import balonismoImg from "@/assets/balonismo-real.png";
import estacoesImg from "@/assets/estacoes.jpg";
import showSertanejoImg from "@/assets/shows-real.png";
import danceImg from "@/assets/dance-show.png";
import beautyImg from "@/assets/beauty-salon.png";
import kidsZoneImg from "@/assets/kids-zone.png";
import decoBarnImg from "@/assets/deco-barn.png";
import decoCorridorImg from "@/assets/deco-corridor.png";
import decoTouroImg from "@/assets/deco-touro.png";
import fogosImg from "@/assets/fogos-real.png";
import showsFlyerImg from "@/assets/shows-flyer.png";
import rodaCarneImg from "@/assets/roda-carne.png";
import barBrahmaRealImg from "@/assets/bar-brahma-real.png";
const sponsorLogos = [
  { src: new URL("../assets/sponsors/tnc.png", import.meta.url).href, name: "TNC" },
  { src: new URL("../assets/sponsors/ford.png", import.meta.url).href, name: "Ford" },
  { src: new URL("../assets/sponsors/redbull.png", import.meta.url).href, name: "Red Bull" },
  { src: new URL("../assets/sponsors/trombini.png", import.meta.url).href, name: "Diversões Trombini" },
  { src: new URL("../assets/sponsors/ambev.png", import.meta.url).href, name: "Ambev" },
  { src: new URL("../assets/sponsors/realeza.png", import.meta.url).href, name: "Realeza" },
  { src: new URL("../assets/sponsors/selva.png", import.meta.url).href, name: "Selva Zeladoria" },
  { src: new URL("../assets/sponsors/hampton.png", import.meta.url).href, name: "Hampton by Hilton" },
  { src: new URL("../assets/sponsors/band.png", import.meta.url).href, name: "Band" },
  { src: new URL("../assets/sponsors/qb.png", import.meta.url).href, name: "QB Construções" },
  { src: new URL("../assets/sponsors/caraguafm.png", import.meta.url).href, name: "Caraguá FM 89.5" },
  { src: new URL("../assets/sponsors/bigjhon.png", import.meta.url).href, name: "Big Jhon" },
];

export const Route = createFileRoute("/")({
  component: Index,
});

const EVENT_DATE = new Date("2026-09-05T12:00:00-03:00").getTime();

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
      className="text-display leading-[0.82] text-bone select-none"
      style={{ perspective: "1000px" }}
    >
      {lines.map((line, li) => (
        <div
          key={li}
          className={`block overflow-hidden ${
            line.accent
              ? "text-[16vw] md:text-[12vw] text-ember"
              : "text-[11vw] md:text-[8vw]"
          }`}
          style={{ lineHeight: 0.82 }}
        >
          <span
            className="inline-block"
            style={{ transformStyle: "preserve-3d" }}
          >
            {line.text.split("").map((ch, i) => {
              const delay = 0.15 + charIndex * 0.022 + li * 0.08;
              charIndex++;
              return (
                <span
                  key={i}
                  className="inline-block"
                  style={{
                    animation: play
                      ? `char-rise 1.1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s both`
                      : "none",
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
                <div className="text-serif-italic text-ember text-lg md:text-2xl mb-4">
                  0{i + 1} / 0{photos.length}
                </div>
                <h2 className="text-display text-6xl md:text-9xl text-bone ember-glow">
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

const ATRACOES = [
  { t: "Balonismo", d: "Subida de balão de ar quente sobre o litoral ao nascer do sol.", img: balonismoImg, tag: "Dia 05" },
  { t: "Robô Gigante", d: "Performance interativa com LEDs e fumaça para todos os públicos.", img: roboGiganteImg, tag: "Dia 05" },
  { t: "Roda Gigante", d: "Vista panorâmica do festival e da praia de Caraguatatuba.", img: rodaGiganteImg, tag: "Dias 05 / 06 / 07" },
  { t: "Touro Mecânico", d: "O clássico desafio sertanejo. Quem aguenta os 8 segundos?", img: touroMecanicoImg, tag: "Dias 05 / 06" },
  { t: "Shows Sertanejos", d: "Atrações nacionais e locais no palco principal.", img: showSertanejoImg, tag: "Dia 05" },
  { t: "Apresentações de Dança", d: "Coreografias e performances temáticas pelo evento.", img: danceImg, tag: "Dia 05" },
];

function Index() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {!loaded && <Preloader onDone={() => setLoaded(true)} />}

      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/60 border-b border-border/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">
          <a href="#top" className="flex items-center gap-3">
            <img src={logoAsset} alt="Parrilla Day" className="h-12 md:h-14 w-auto" />
          </a>
          <nav className="hidden md:flex items-center gap-8 text-xs tracking-[0.25em] uppercase text-muted-foreground">
            <a href="#evento" className="hover:text-ember transition">O Evento</a>
            <a href="#atracoes" className="hover:text-ember transition">Atrações</a>
            <a href="#estacoes" className="hover:text-ember transition">Estações</a>
            <a href="#programacao" className="hover:text-ember transition">Programação</a>
            <a href="#mapa" className="hover:text-ember transition">Mapa</a>
            <a href="#ingressos" className="hover:text-ember transition">Ingressos</a>
          </nav>
          <a href="#ingressos" className="text-xs tracking-[0.2em] uppercase px-4 py-2 border border-ember text-ember hover:bg-ember hover:text-background transition">
            Garantir
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative min-h-screen h-screen flex items-center pt-24 md:pt-24 pb-24 md:pb-24 px-6 overflow-hidden grain isolate">
        <div className="absolute inset-0 z-0">
          <video
            src={heroVideoAsset}
            poster={heroBgAsset}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/35 to-background/95" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,oklch(0.13_0.015_30/0.75)_90%)]" />
          <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-40 animate-heat-haze bg-[radial-gradient(ellipse_at_center,oklch(0.7_0.22_45/0.15),transparent_60%)]" />
        </div>

        {/* Rising embers */}
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
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

        <div className="max-w-[1600px] mx-auto w-full relative z-10">
          <div
            className="flex items-center gap-3 mb-6 md:mb-8 text-[11px] md:text-[12px] tracking-[0.35em] md:tracking-[0.4em] uppercase text-ember"
            style={{
              animation: loaded ? "char-rise 0.8s ease-out 0s both" : "none",
              opacity: loaded ? undefined : 0,
              textShadow: "0 2px 12px rgba(0,0,0,0.9), 0 0 4px rgba(0,0,0,0.8)",
            }}
          >
            <span
              className="h-px bg-ember origin-left block shrink-0"
              style={{
                width: "3rem",
                animation: loaded ? "slash-in 0.9s cubic-bezier(0.7,0,0.2,1) 0.1s both" : "none",
              }}
            />
            <span>3ª Ed. · Caraguá · 05 a 07 Set 2026</span>
          </div>

          <HeroHeadline play={loaded} />

          <div className="mt-8 md:mt-10 grid md:grid-cols-[1.2fr_1fr] gap-8 md:gap-12 items-end">
            <p
              className="text-serif-italic text-lg md:text-2xl text-bone max-w-2xl leading-relaxed"
              style={{
                animation: loaded ? "char-rise 1s ease-out 1.6s both" : "none",
                opacity: loaded ? undefined : 0,
                textShadow: "0 2px 16px rgba(0,0,0,0.9), 0 0 6px rgba(0,0,0,0.7)",
              }}
            >
              Três dias de fogo, sertanejo e alta gastronomia <span className="text-ember">à beira-mar</span>. O feriado da Independência transformado em festa.
            </p>
            <div
              className="flex flex-wrap gap-4"
              style={{
                animation: loaded ? "char-rise 1s ease-out 1.8s both" : "none",
                opacity: loaded ? undefined : 0,
              }}
            >
              <a href="#ingressos" className="group relative px-6 md:px-8 py-3 md:py-4 bg-ember text-background text-[10px] md:text-xs tracking-[0.3em] uppercase font-bold hover:bg-ember/90 transition overflow-hidden">
                <span className="relative z-10">Comprar Ingresso →</span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-bone/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </a>
              <a href="#evento" className="px-6 md:px-8 py-3 md:py-4 border border-ember/40 text-[10px] md:text-xs tracking-[0.3em] uppercase hover:border-ember hover:text-ember transition">
                Saber Mais
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] uppercase text-muted-foreground animate-pulse">
          ↓ Role para descobrir
        </div>
      </section>

      {/* OPEN ICONS STRIP */}
      <section className="py-12 px-6 border-y border-border/40 bg-background">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { t: "Open Food", d: "30 estações de churrasco" },
            { t: "Open Bar", d: "Cervejas & refrigerantes" },
            { t: "Música ao Vivo", d: "Sertanejo & shows" },
            { t: "Espaço Kids", d: "Diversão garantida" },
          ].map((x) => (
            <div key={x.t} className="flex flex-col items-center gap-2">
              <div className="text-display text-2xl md:text-3xl text-ember tracking-wider">{x.t}</div>
              <div className="text-xs tracking-[0.2em] uppercase text-muted-foreground">{x.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="py-24 px-6 border-b border-border/40 bg-card/30">
        <div className="max-w-5xl mx-auto text-center">
          <div className="text-xs tracking-[0.4em] uppercase text-ember mb-4">5 de Setembro de 2026</div>
          <h2 className="text-display text-4xl md:text-6xl mb-12 text-bone">A contagem para a brasa</h2>
          <Countdown />
        </div>
      </section>

      {/* MARQUEE */}
      <div className="py-8 border-b border-border/40 overflow-hidden">
        <div className="flex gap-12 animate-marquee whitespace-nowrap text-display text-4xl md:text-6xl text-ember/70">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-12 shrink-0">
              {["Open Churrasco", "✦", "Open Bar", "✦", "Estações de Carne", "✦", "Sertanejo ao Vivo", "✦", "Roda Gigante", "✦", "Beira-Mar", "✦"].map((w, i) => (
                <span key={i}>{w}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* PHOTO STRIP */}
      <PhotoStrip />

      {/* O EVENTO */}
      <section id="evento" className="py-20 md:py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12">
          <Reveal className="md:col-span-5">
            <div className="text-xs tracking-[0.4em] uppercase text-ember mb-4">O Evento</div>
            <h2 className="text-display text-4xl md:text-5xl lg:text-6xl text-bone leading-[0.95]">
              Três dias.<br />Fogo em toda parte.<br /><span className="text-ember">26 mil pessoas.</span>
            </h2>
          </Reveal>
          <Reveal className="md:col-span-7 space-y-8" delay={120}>
            <p className="text-serif-italic text-2xl md:text-3xl text-bone/90 leading-snug">
              O Parrilla Day chega à sua 3ª edição com crescimento de <span className="text-ember">2000%</span> sobre as edições anteriores. Uma celebração do fogo, da carne e da brasa, à beira do mar em Caraguatatuba.
            </p>
            <div className="grid sm:grid-cols-2 gap-6 pt-8 border-t border-border/40">
              {[
                { n: "6.000", l: "Ingressos · Dia 05" },
                { n: "20.000", l: "Acesso livre · 06 e 07" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-display text-5xl text-ember">{s.n}</div>
                  <div className="text-xs tracking-[0.2em] uppercase text-muted-foreground mt-2">{s.l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ESTAÇÕES GASTRONÔMICAS */}
      <section id="estacoes" className="py-20 md:py-24 px-6 bg-card/30 border-y border-border/40 relative">
        <div className="absolute inset-0 -z-10 opacity-15 overflow-hidden pointer-events-none">
          <img src={estacoesImg} alt="" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="text-xs tracking-[0.4em] uppercase text-ember mb-4">Estações Gastronômicas</div>
          <h2 className="text-display text-5xl md:text-7xl text-bone mb-4">Estações de carne.<br /><span className="text-ember">Brasa sem fim.</span></h2>
          <p className="text-serif-italic text-xl text-muted-foreground mb-16 max-w-2xl">
            Cortes premium, fogo de chão e os melhores assadores do litoral norte trabalhando ao vivo.
          </p>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            {[
              {
                setor: "Camarote",
                sub: "Exclusivo · Dia 05",
                note: "Camarote inclui tudo da Pista + os cortes exclusivos abaixo",
                items: [
                  { p: "Alcatra de Cordeiro", c: "Juninho" },
                  { p: "Burger", c: "Renan Villar" },
                  { p: "Gnocchi & Ragu de Linguiça", c: "Jean Assador" },
                  { p: "Costela", c: "Elcio Henrique" },
                  { p: "Paella de Frutos do Mar", c: "Fábio Santana" },
                  { p: "Picanha", c: "Camila Damasceno" },
                ],
              },
              {
                setor: "Pista",
                sub: "Aberto ao público",
                items: [
                  { p: "Alcatra de Cordeiro", c: "Dorfo's & Patricia" },
                  { p: "Ancho", c: "Willian Hory" },
                  { p: "Ancho", c: "Luiz Otavio" },
                  { p: "Arroz à Mineira", c: "Tiago Palacio" },
                  { p: "Brisket", c: "Henrique Gonçalves" },
                  { p: "Burger", c: "Fábio Henrique" },
                  { p: "Burger", c: "Felipe Moika" },
                  { p: "Burger", c: "Big Jhon" },
                  { p: "Chorizo", c: "Diego Blasco" },
                  { p: "Costela", c: "Will Fernandes" },
                  { p: "Costelinha Suína", c: "Bruno Ribeiro" },
                  { p: "Cupim", c: "Gersão Ribeiro" },
                  { p: "Chicken Fries", c: "Caraguá Beach" },
                  { p: "Peixe", c: "Du Goiozo" },
                  { p: "Picanha", c: "Flávio Messias" },
                  { p: "Picanha", c: "Espeticho" },
                  { p: "Prime Rib", c: "Luiz Bueno" },
                  { p: "Sobrecoxa", c: "Dom Roasters" },
                  { p: "Torresmo", c: "Maurício" },
                ],
              },
            ].map((group, gi) => (
              <div
                key={group.setor}
                className={`border border-border/40 ${gi === 0 ? "md:sticky md:top-24" : ""}`}
              >
                <div className="p-6 border-b border-border/40 flex items-baseline justify-between gap-4 bg-background">
                  <div>
                    <div className="text-[10px] tracking-[0.4em] uppercase text-ember mb-2">Setor</div>
                    <div className="text-display text-3xl md:text-4xl text-bone">{group.setor}</div>
                  </div>
                  <div className="text-xs tracking-[0.2em] uppercase text-muted-foreground text-right">{group.sub}</div>
                </div>
                {group.note && (
                  <div className="px-6 py-3 bg-ember/10 border-b border-ember/30 text-[11px] tracking-[0.15em] uppercase text-ember">
                    {group.note}
                  </div>
                )}
                <ul className="divide-y divide-border/40">
                  {group.items.map((it, i) => (
                    <li key={`${group.setor}-${i}`} className="flex items-center justify-between gap-4 px-6 py-4 bg-background hover:bg-card transition group">
                      <div className="min-w-0">
                        <div className="text-display text-lg md:text-xl text-bone group-hover:text-ember transition truncate">{it.p}</div>
                        <div className="text-xs text-muted-foreground tracking-wide uppercase mt-0.5">{it.c}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mt-10">+ Food Trucks: Espeticho · Caramelo Comida de Rua · Doces</p>
        </div>
      </section>

      {/* PROGRAMAÇÃO */}
      <section id="programacao" className="py-20 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs tracking-[0.4em] uppercase text-ember mb-4">Programação</div>
          <h2 className="text-display text-5xl md:text-7xl text-bone mb-16">Três dias na brasa</h2>
          <div className="grid md:grid-cols-3 gap-px bg-border">
            {[
              { day: "05", month: "Setembro", time: "12h às 22h", title: "Parrilla Day", desc: "Open bar · Open churrasco · Drinks à parte. O dia principal com shows headliners, balonismo e show de fogos.", featured: true },
              { day: "06", month: "Setembro", time: "16h às 00h", title: "Estações Abertas", desc: "Entrada gratuita. Comidas e bebidas à parte. Atrações, roda gigante e touro mecânico." },
              { day: "07", month: "Setembro", time: "12h às 22h", title: "Encerramento", desc: "Acesso liberado ao público. Churrasco e bebidas à parte. Atrações continuam até o fim." },
            ].map((d) => (
              <div key={d.day} className={`p-10 bg-background relative ${d.featured ? "md:scale-[1.02] md:-my-2 bg-card" : ""}`}>
                {d.featured && <div className="absolute top-4 right-4 text-[10px] tracking-[0.3em] uppercase text-ember">★ Headline</div>}
                <div className="flex items-baseline gap-3 mb-6">
                  <div className="text-display text-8xl text-ember leading-none">{d.day}</div>
                  <div className="text-xs tracking-[0.3em] uppercase text-muted-foreground">{d.month}</div>
                </div>
                <div className="text-xs tracking-[0.2em] uppercase text-ember mb-2">{d.time}</div>
                <h3 className="text-display text-3xl text-bone mb-4">{d.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HEADLINERS */}
      <section className="py-16 md:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-xs tracking-[0.4em] uppercase text-ember mb-4">Headliners · Dia 05</div>
          <h2 className="text-display text-5xl md:text-7xl text-bone mb-8">Os shows</h2>
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

      {/* ATRAÇÕES */}
      <section id="atracoes" className="py-20 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs tracking-[0.4em] uppercase text-ember mb-4">Atrações</div>
          <h2 className="text-display text-5xl md:text-7xl text-bone mb-16 max-w-3xl">
            Muito além do <span className="text-ember">fogo</span>
          </h2>
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
          <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { t: "Salão de Beleza", d: "Para retoques de cabelo e maquiagem", img: beautyImg, pos: "center" },
              { t: "Brinquedos Kids", d: "Entrada gratuita para as crianças", img: kidsZoneImg, pos: "center", darkOverlay: true },
              { t: "Show de Fogos", d: "Encerramento cinematográfico no céu de Caraguá", img: fogosImg, pos: "center" },
            ].map((x) => (
              <div key={x.t} className="group relative overflow-hidden border border-border/40 hover:border-ember transition bg-card">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={x.img} alt={x.t} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-[1200ms]" style={{ objectPosition: x.pos }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  {x.darkOverlay && <div className="absolute inset-0 bg-background/40 mix-blend-multiply" />}
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="text-display text-2xl text-bone mb-1 group-hover:text-ember transition">{x.t}</h3>
                  <p className="text-xs text-muted-foreground">{x.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAPA DO EVENTO */}
      <section id="mapa" className="py-20 md:py-24 px-6 bg-card/30 border-y border-border/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs tracking-[0.4em] uppercase text-ember mb-4">Mapa do Evento</div>
          <h2 className="text-display text-5xl md:text-7xl text-bone mb-4">À beira mar.<br /><span className="text-ember">Caraguá Beach.</span></h2>
          <p className="text-serif-italic text-xl text-muted-foreground mb-12 max-w-2xl">
            Palco principal, parrilleras, camarotes premium, roda gigante e área kids. Tudo de frente para o Atlântico.
          </p>
          <div className="relative overflow-hidden border border-border/40">
            <img src={eventMapAsset} alt="Mapa do Parrilla Day" className="w-full h-auto" loading="lazy" />
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {[
              { t: "Palco Principal", d: "Estrutura completa de box truss e LED" },
              { t: "Camarote Premium", d: "Vista privilegiada · Open premium" },
              { t: "Área Kids", d: "Brinquedos e monitores" },
              { t: "Praia", d: "Acesso direto à beira-mar" },
            ].map((x) => (
              <div key={x.t} className="p-5 border border-border/40">
                <div className="text-display text-xl text-ember mb-1">{x.t}</div>
                <div className="text-xs text-muted-foreground">{x.d}</div>
              </div>
            ))}
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
            <div className="text-xs tracking-[0.4em] uppercase text-ember mb-4">Estrutura</div>
            <h2 className="text-display text-5xl md:text-7xl text-bone leading-none mb-6">
              Construída para <span className="text-ember">incendiar</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Cada detalhe pensado para uma experiência inesquecível. Do palco LED ao corredor de entrada cinematográfico, das parrilleras aos camarotes premium.
            </p>
            <div className="grid grid-cols-2 gap-px bg-border">
              {[
                "Palco principal LED",
                "Box Truss completo",
                "Som & iluminação pro",
                "30 parrilleras ativas",
                "30 assadores ao vivo",
                "Tendas climatizadas",
                "Decoração temática",
                "Corredor cinematográfico",
              ].map((s) => (
                <div key={s} className="p-4 bg-background text-sm tracking-wide text-bone/80">{s}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BAR BRAHMA */}
      <section className="py-20 md:py-24 bg-card/30 border-y border-border/40">
        <div className="grid md:grid-cols-2 gap-0 items-stretch">
          <div className="order-2 md:order-1 px-6 md:px-16 flex flex-col justify-center py-12">
            <div className="text-xs tracking-[0.4em] uppercase text-ember mb-4">Bar & Bebidas</div>
            <h2 className="text-display text-5xl md:text-7xl text-bone leading-none mb-6">
              Chopp gelado,<br /><span className="text-ember">copo cheio.</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Bar Brahma principal + 2 bares satélites espalhados pelo evento. Open bar de cervejas e refrigerantes para os ingressos do dia 05. Drinks especiais à parte.
            </p>
            <div className="flex flex-wrap gap-3 text-xs tracking-[0.2em] uppercase">
              {["Brahma", "Red Bull", "Drinks autorais", "Chopp artesanal"].map((b) => (
                <span key={b} className="px-4 py-2 border border-border/60 text-bone/80">{b}</span>
              ))}
            </div>
          </div>
          <div className="order-1 md:order-2 relative overflow-hidden aspect-square w-full">
            <img src={barBrahmaRealImg} alt="Bar Brahma" loading="lazy" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* DECORAÇÃO TEMÁTICA */}
      <section className="py-20 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs tracking-[0.4em] uppercase text-ember mb-4">Ambientação</div>
          <h2 className="text-display text-5xl md:text-7xl text-bone mb-16 max-w-3xl">
            Decoração <span className="text-ember">cinematográfica</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { t: "Cenário Rústico", d: "Galpão temático com elementos rurais autênticos.", img: decoBarnImg },
              { t: "Corredor Cinematográfico", d: "Túnel iluminado que prepara a experiência.", img: decoCorridorImg },
              { t: "Painéis Temáticos", d: "Instalações fotogênicas espalhadas pelo festival.", img: decoTouroImg },
            ].map((d) => (
              <div key={d.t} className="group relative overflow-hidden border border-border/40 hover:border-ember transition">
                <div className="aspect-[4/5] overflow-hidden bg-blood">
                  <img src={d.img} alt={d.t} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-[1200ms]" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-background via-background/80 to-transparent">
                  <h3 className="text-display text-2xl text-bone mb-1">{d.t}</h3>
                  <p className="text-xs text-muted-foreground">{d.d}</p>
                </div>
              </div>
            ))}
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
          <h2 className="text-display text-5xl md:text-7xl text-bone mb-4">Sua entrada na brasa</h2>
          <p className="text-serif-italic text-xl text-muted-foreground mb-16 max-w-2xl">
            05 de setembro · Open bar · Open churrasco · Drinks vendidos à parte
          </p>
          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            <div className="p-10 md:p-14 border border-border/60 bg-card/60 backdrop-blur flex flex-col">
              <div className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">Ingresso · Dia 05</div>
              <div className="flex items-baseline gap-2 mb-2 flex-wrap">
                <span className="text-display text-7xl md:text-8xl text-bone">R$349</span>
                <span className="text-muted-foreground">+ taxa</span>
              </div>
              <ul className="space-y-3 mt-10 mb-12 text-sm text-muted-foreground">
                <li className="flex gap-3"><span className="text-ember">▸</span> Acesso completo ao Parrilla Day</li>
                <li className="flex gap-3"><span className="text-ember">▸</span> Open Bar (cervejas e refrigerantes)</li>
                <li className="flex gap-3"><span className="text-ember">▸</span> Open Churrasco · 30 estações</li>
                <li className="flex gap-3"><span className="text-ember">▸</span> Acesso a todos os shows e atrações</li>
              </ul>
              <button className="w-full py-4 bg-ember text-background text-sm tracking-[0.2em] uppercase font-semibold hover:bg-ember/90 transition mt-auto">
                Comprar Ingresso
              </button>
            </div>
            <div className="p-10 md:p-14 border border-ember bg-gradient-to-br from-blood/40 to-card/60 backdrop-blur relative flex flex-col">
              <div className="absolute top-6 right-6 text-[10px] tracking-[0.3em] uppercase text-ember">★ Premium</div>
              <div className="text-xs tracking-[0.3em] uppercase text-ember mb-4">Camarote · Dia 05</div>
              <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                <span className="text-display text-6xl md:text-7xl text-bone">R$629</span>
                <span className="text-muted-foreground text-sm tracking-wide uppercase">por pessoa</span>
              </div>
              <div className="text-sm text-bone/70 mb-2">
                Camarote fechado para <span className="text-ember font-semibold">10 pessoas</span> · <span className="text-muted-foreground">R$6.290 + taxa no total</span>
              </div>
              <ul className="space-y-3 mt-10 mb-12 text-sm text-bone/80">
                <li className="flex gap-3"><span className="text-ember">▸</span> Tenda exclusiva com vista privilegiada</li>
                <li className="flex gap-3"><span className="text-ember">▸</span> Open Food · Open Bar Premium</li>
                <li className="flex gap-3"><span className="text-ember">▸</span> Estações de chopp · Garçons exclusivos</li>
                <li className="flex gap-3"><span className="text-ember">▸</span> Banheiros e móveis diferenciados</li>
              </ul>
              <button className="w-full py-4 bg-ember text-background text-sm tracking-[0.2em] uppercase font-semibold hover:bg-ember/90 transition mt-auto">
                Reservar Camarote
              </button>
            </div>
          </div>
          <div className="mt-12 p-8 border border-border/40 text-center bg-background/40">
            <div className="text-xs tracking-[0.3em] uppercase text-ember mb-2">Dias 06 e 07</div>
            <p className="text-bone text-lg">Entrada gratuita · Comidas e bebidas vendidas à parte</p>
          </div>
        </div>
      </section>

      {/* PATROCINADORES */}
      <section id="patrocinadores" className="py-20 md:py-24 px-6 border-t border-border/40">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-xs tracking-[0.4em] uppercase text-ember mb-4">Patrocínio</div>
          <h2 className="text-display text-5xl md:text-7xl text-bone mb-16">
            Quem <span className="text-ember">acende</span> a brasa
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
          <p>* Nos dias de entrada gratuita, as atrações serão cobradas à parte.</p>
          <p>* Imagens meramente ilustrativas.</p>
          <p>* Teremos uma fila diferencial e um termo na entrada que será assinado pelo responsável. Os menores de idade receberão uma pulseira de identificação.</p>
        </div>
      </section>


      {/* FOOTER / CTA */}
      <footer className="py-24 md:py-28 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
            <div className="text-center md:text-left">
              <img src={logoAsset} alt="Parrilla Day" className="h-32 md:h-40 mx-auto md:mx-0 mb-10 animate-flicker" />
              <h2 className="text-display text-4xl md:text-6xl text-bone mb-4">Caraguatatuba te espera</h2>
              <p className="text-serif-italic text-xl text-muted-foreground">5, 6 e 7 de setembro · 2026</p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-8">
              <p className="text-sm text-muted-foreground text-center md:text-right max-w-sm leading-relaxed">
                Garanta sua presença no maior festival de churrasco do litoral norte. Ingressos limitados para o dia 05.
              </p>
              <div className="flex flex-wrap justify-center md:justify-end gap-4">
                <a href="#ingressos" className="px-8 py-4 bg-ember text-background text-sm tracking-[0.2em] uppercase font-semibold hover:bg-ember/90 transition">
                  Garantir Presença
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
    </div>
  );
}
